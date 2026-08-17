import { useState } from "react";
import Seo from "../components/seo/Seo";
import Reveal from "../components/common/Reveal";
import ContactSection from "../components/home/ContactSection";
import { faqs } from "../data/dummyData";

const FAQItem = ({ faq }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
        aria-expanded={open}
      >
        <span className="font-disp font-semibold">{faq.q}</span>
        <span className={`text-primary transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && <div className="border-t border-white/10 p-5 text-sm leading-relaxed text-white/60">{faq.a}</div>}
    </div>
  );
};

const Contact = () => {
  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch with Innobles for a free discovery call. We reply within one business day."
        path="/contact"
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 hero-glow" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="container-x relative py-20 text-center md:py-24">
          <p className="eyebrow mb-4 justify-center">Contact Us</p>
          <h1 className="mx-auto max-w-3xl font-disp text-4xl font-bold leading-tight md:text-5xl">
            Tell us about your <span className="text-gradient">project.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-white/60 md:text-lg">
            Whether it's a quick question or a full product build, we'd love to hear from you.
          </p>
        </div>
      </section>

      <ContactSection />

      {/* FAQ */}
      <section className="container-x border-t border-white/10 py-20">
        <Reveal>
          <h2 className="text-center font-disp text-3xl font-bold">Frequently asked questions</h2>
        </Reveal>
        <div className="mx-auto mt-10 max-w-3xl space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 70}>
              <FAQItem faq={f} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
};

export default Contact;

