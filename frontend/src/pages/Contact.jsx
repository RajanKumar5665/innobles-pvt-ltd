import Seo from "../components/seo/Seo";
import PageHero from "../components/common/PageHero";
import ContactSection from "../components/Home/ContactSection";

const Contact = () => {
  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch with Innobles for a free discovery call. We reply within one business day."
        path="/contact"
      />

      <PageHero
        eyebrow="Contact Us"
        title="Tell us about your"
        highlight="project."
        description="Whether it's a quick question or a full product build, we'd love to hear from you."
      />

      <ContactSection />
    </>
  );
};

export default Contact;

