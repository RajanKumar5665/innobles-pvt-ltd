import Reveal from "../common/Reveal";
import SectionHeader from "../common/SectionHeader";
import ContactForm from "../forms/ContactForm";

// Contact-page photo lives in /public as contact_us.webp (optimized from the
// AVIF the team uploaded). The JPG is a fallback for older browsers — swap the
// source files in /public to change the visual, nothing else needs touching.
const ContactPageSection = () => (
  <section className="bg-white py-16 md:py-24">
    <div className="container-x">
      <SectionHeader
        eyebrow="Contact"
        title="Send us a message"
        subtitle="Tell us about your project — we usually reply within one business day."
        align="center"
      />

      <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
        {/* Left — the form */}
        <Reveal className="mx-auto w-full max-w-xl lg:ml-0">
          <div className="rounded-3xl border border-line bg-white p-6 shadow-lg md:p-9">
            <h3 className="font-disp text-xl font-bold text-ink">
              Send us a message
            </h3>
            <p className="mt-1.5 text-sm text-slate-500">
              We usually reply within one business day.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Reveal>

        {/* Right — photo (local WebP + JPG fallback) */}
        <Reveal delay={120} className="mx-auto w-full max-w-xl lg:mr-0">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-slate-50">
            <picture>
              <source srcSet="/contact_us.webp" type="image/webp" />
              <img
                src="/contact_us.jpg"
                alt="Innobles team collaborating with a client on a new project"
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
                className="h-80 w-full object-cover md:h-[440px]"
              />
            </picture>

            {/* Floating caption chip (no dot icon) */}
            <div className="absolute bottom-4 left-4 rounded-full border border-line bg-white/95 px-4 py-2 text-xs font-semibold text-ink shadow-sm">
              Typical reply — within 1 business day
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default ContactPageSection;