import Seo from "../components/seo/Seo";
import Hero from "../components/Home/Hero";
import ServiceGrid from "../components/Home/ServiceGrid";
import ProductsHighlight from "../components/Home/ProductsHighlight";
import CTA from "../components/Home/CTA";
import ContactSection from "../components/Home/ContactSection";

// Public home page. Fetches services and products live from the API
// (the same data managed through the Admin panel).
const Home = () => {
  return (
    <>
      <Seo title="Smart Software, Mobile & AI Solutions" path="/" />
      <Hero />
      <ServiceGrid />
      <ProductsHighlight />
      <CTA />
      <ContactSection />
    </>
  );
};

export default Home;

