import Seo from "../components/seo/Seo";
import ContactSection from "../components/Home/ContactSection";

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
    </>
  );
};

export default Contact;

