import Reveal from "../common/Reveal";
import SectionHeader from "../common/SectionHeader";
import ContactForm from "../forms/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";
import { contactInfo } from "../../config/siteConfig";

const contactIcons = { Email: Mail, Phone: Phone, Office: MapPin };

const ContactSection = () => {
  return (
    <section className="pb-24 pt-8">
      <div className="container-x">
        {/* Consistent section heading (matches Services + Products + Blog + Contact) */}
        <SectionHeader
          eyebrow="Contact"
          title="Let&apos;s build something together"
          align="center"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {contactInfo.map((c, i) => {
            const IconComponent = contactIcons[c.label] || Mail;
            return (
              <Reveal key={c.label} delay={i * 80}>
                <div className="rounded-2xl border border-line bg-white p-5 text-center transition-all hover:border-brand-orange/30 hover:shadow-md">
                  <span className="inline-flex items-center justify-center text-brand-orange">
                    <IconComponent className="h-7 w-7" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <p className="mt-3 text-xs font-bold uppercase tracking-wider text-brand-orange">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="mt-2 block text-sm text-slate-700 transition-colors hover:text-brand-orange">
                      {c.value}
                    </a>
                  ) : (
                    <p className="mt-2 text-sm text-slate-700">{c.value}</p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10">
          <div className="mx-auto max-w-2xl rounded-3xl border border-line bg-white p-6 shadow-lg md:p-10">
            <h3 className="mb-2 font-disp text-xl font-bold">Send us a message</h3>
            <p className="mb-6 text-sm text-slate-500">We usually reply within one business day.</p>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
