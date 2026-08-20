import Seo from "../components/seo/Seo";
import Hero from "../components/home/Hero";
import ServiceGrid from "../components/home/ServiceGrid";
import ProductsHighlight from "../components/home/ProductsHighlight";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CTA from "../components/home/CTA";
import ContactSection from "../components/home/ContactSection";

/**
 * Public homepage.
 *
 * Structure (clean, modern, content-focused):
 *   1. Hero section
 *   2. Latest published Services (3–4 cards, newest-first) → /services
 *   3. Latest published Products (3–4 cards, newest-first) → /products
 *   4. Testimonials
 *   5. CTA
 *   6. Contact
 *
 * Service / Product data is fetched live from the existing public API
 * (same data managed through the Admin panel). The "Our Technology" section
 * has been removed from the homepage.
 */
const Home = () => {
  return (
    <>
      <Seo title="Smart Software, Mobile & AI Solutions" path="/" />
      <Hero />
      <ServiceGrid />
      <ProductsHighlight />
      <TestimonialsSection />
      <CTA />
      <ContactSection />
    </>
  );
};

export default Home;

