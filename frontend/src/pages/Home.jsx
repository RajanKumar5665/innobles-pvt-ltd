import Seo from "../components/seo/Seo";
import Hero from "../components/home/Hero";
import Technology from "../components/home/Technology";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CTA from "../components/home/CTA";
import ContactSection from "../components/home/ContactSection";

const Home = () => {
  return (
    <>
      <Seo title="Smart Software, Mobile & AI Solutions" path="/" />
      <Hero />
      <Technology />
      <TestimonialsSection />
      <CTA />
      <ContactSection />
    </>
  );
};

export default Home;

