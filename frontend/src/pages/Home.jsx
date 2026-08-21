import Seo from "../components/seo/Seo";
import Hero from "../components/home/Hero";
import ServiceGrid from "../components/home/ServiceGrid";
import ProductsHighlight from "../components/home/ProductsHighlight";
import BlogPreview from "../components/home/BlogPreview";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CTA from "../components/home/CTA";
import ContactSection from "../components/home/ContactSection";

/**
 * Public homepage.
 *
 * Structure (clean, modern, content-focused):
 *   1. Hero section
 *   2. Company introduction (inside the hero)
 *   3. Latest published Services (3–4 cards, newest-first) → /services
 *   4. Latest published Products (3–4 cards, newest-first) → /products
 *   5. Latest published Blogs (3 cards, newest-first) → /blog
 *   6. Testimonials
 *   7. CTA
 *   8. Contact
 *
 * Services, Products and Blogs are fetched live from the existing public API
 * (the same data managed through the Admin panel).
 */
const Home = () => {
  return (
    <>
      <Seo title="Smart Software, Mobile & AI Solutions" path="/" />
      <Hero />
      <ServiceGrid />
      <ProductsHighlight />
      <BlogPreview />
      <TestimonialsSection />
      <CTA />
      <ContactSection />
    </>
  );
};

export default Home;

