import ContactForm from "../forms/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { contactInfo, siteConfig } from "../../config/siteConfig";

const contactIcons = { Email: Mail, Phone: Phone, Office: MapPin };

const socialIcons = [
  { label: "LinkedIn", url: siteConfig.socials.linkedin, Icon: FaLinkedinIn },
];

// Clean two-column contact section.
// LEFT  — "Reach out to us!" heading + description + the existing form.
// RIGHT — "Customer Care" heading + description + existing contact info + socials.
// Open layout: typography + whitespace + subtle dividers. No large cards,
// no heavy shadows, no new fake content — everything comes from siteConfig.
const ContactSection = () => (
  <section id="contact" className="bg-white pb-24 pt-16 md:pb-28 md:pt-20">
    <div className="container-x">
      <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
        {/* ---- LEFT COLUMN — FORM ---- */}
        <div>
          <p className="pill-eyebrow mb-4 !text-[#FF9866]">
            Contact
          </p>
          <h2 className="font-disp text-3xl font-bold leading-tight text-ink md:text-4xl">
            Reach out to us!
          </h2>
          <p className="mt-4 max-w-md text-slate-600 md:text-lg">
            We usually reply within one business day.
          </p>

          <div className="mt-10">
            <ContactForm />
          </div>
        </div>

        {/* ---- RIGHT COLUMN — INFORMATION ---- */}
        <div className="lg:border-l lg:border-line lg:pl-16">
          <h2 className="font-disp text-3xl font-bold leading-tight text-ink md:text-4xl">
            We&apos;re here to help
          </h2>
          <p className="mt-4 max-w-md text-slate-600 md:text-lg">
            {siteConfig.tagline}
          </p>

          <div className="mt-10 space-y-7">
            {contactInfo.map((c) => {
              const IconComponent = contactIcons[c.label] || Mail;
              return (
                <div
                  key={c.label}
                  className="flex items-start gap-4 border-b border-line pb-7 last:border-none last:pb-0"
                >
                  <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFE9DE] text-[#172B3A]">
                    <IconComponent className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#172B3A]">{c.label}</p>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="mt-1 block text-[15px] font-medium leading-relaxed text-[#334155] transition-colors hover:text-[#F0703F]"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-[15px] font-medium leading-relaxed text-[#334155]">{c.value}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              Other ways to connect
            </h3>
            <div className="mt-5 flex flex-wrap items-center gap-6">
              {socialIcons.map(({ label, url, Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group inline-flex items-center gap-3 text-sm font-semibold text-[#334155] transition-colors hover:text-[#F0703F]"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-[#FFE9DE] text-[#172B3A] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#FF9866] group-hover:bg-[#FF9866]">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  Follow {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
