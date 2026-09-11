import { useState } from "react";
import Reveal from "../common/Reveal";
import SectionHeader from "../common/SectionHeader";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { contactInfo, siteConfig } from "../../config/siteConfig";

const contactIcons = { Email: Mail, Office: MapPin };

// Google Maps embed — no API key needed with ?output=embed. The office
// address comes from siteConfig so it stays in sync everywhere.
const MAP_QUERY = encodeURIComponent(
  siteConfig.address.replace(/–|-/g, "").replace(/\s+/g, " ").trim() || "Hauz Khas New Delhi India",
);
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;
const MAP_LINK = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;

// Lazy map behaviour: we show a lightweight placeholder until the iframe
// signals it has finished loading, then fade it in. The iframe itself is
// deferred with loading="lazy" so the home page never blocks on it.
const ContactSection = () => {
  const [mapReady, setMapReady] = useState(false);

  const contactRows = contactInfo.map((c) => {
    const IconComponent = contactIcons[c.label] || Mail;
    return (
      <li key={c.label} className="flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange" aria-hidden="true">
          <IconComponent className="h-5 w-5" strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {c.label}
          </span>
          {c.href ? (
            <a href={c.href} className="mt-0.5 block break-words text-sm font-medium text-ink transition-colors hover:text-brand-orange">
              {c.value}
            </a>
          ) : (
            <span className="mt-0.5 block break-words text-sm font-medium text-ink">{c.value}</span>
          )}
        </div>
      </li>
    );
  });

  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="container-x">
        <SectionHeader
          // eyebrow="Contact"
          title="Let&apos;s build something together"
          subtitle="A quick call or email is all it takes to start — we reply within one business day."
          align="center"
        />

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          {/* Left — direct contact, clean rows instead of cards, no form */}
          <Reveal className="mx-auto max-w-lg lg:ml-0">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">Reach us directly</p>
            {/* <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Skip the form — the fastest way to reach our team is a call or an email. We&apos;re in
              Hauz Khas, New Delhi, and work with clients across India.
            </p> */}

            <ul className="mt-8 space-y-5">
              {contactRows}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href={`mailto:${siteConfig.email}`} className="btn-primary inline-flex items-center gap-2">
                <Mail size={16} aria-hidden="true" /> Email us
              </a>
            </div>
          </Reveal>

          {/* Right — interactive Google Maps embed (lazy) */}
          <Reveal delay={120} className="mx-auto w-full max-w-xl lg:mr-0">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-md">
              <div
                className={`absolute inset-0 z-10 flex items-center justify-center bg-slate-100 transition-opacity duration-500 ${mapReady ? "pointer-events-none opacity-0" : "opacity-100"}`}
                aria-hidden="true"
              >
                <span className="flex animate-pulse flex-col items-center gap-3 text-slate-400">
                  <MapPin className="h-8 w-8" strokeWidth={1.5} />
                  <span className="text-xs font-medium uppercase tracking-wider">Loading map…</span>
                </span>
              </div>

              <iframe
                src={MAP_EMBED_SRC}
                title={`Innobles office — ${siteConfig.address}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                onLoad={() => setMapReady(true)}
                className="h-80 w-full md:h-96"
              />
            </div>

            <a
              href={MAP_LINK}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-orange transition-colors hover:text-ink"
            >
              Open in Google Maps <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
