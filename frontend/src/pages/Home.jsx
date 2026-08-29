import Seo from "../components/seo/Seo";
import Hero from "../components/home/Hero";
import ServiceGrid from "../components/home/ServiceGrid";
import ProductsHighlight from "../components/home/ProductsHighlight";
import BlogPreview from "../components/home/BlogPreview";
import CTA from "../components/home/CTA";
import ContactSection from "../components/home/ContactSection";

// Public home page. Fetches services, products and blogs live from the API
// (the same data managed through the Admin panel).
const Home = () => {
  return (
    <>
      <Seo title="Smart Software, Mobile & AI Solutions" path="/" />
      <Hero />
      <ServiceGrid />
      <ProductsHighlight />
      <BlogPreview />
      <CTA />
      <ContactSection />
    </>
  );
};

export default Home;

