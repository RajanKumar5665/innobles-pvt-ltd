import HeroContent from "./hero/HeroContent";
import HeroVisual from "./hero/HeroVisual";
import TrustedCompanies from "./hero/TrustedCompanies";

/**
 * Premium homepage hero:
 * left = business messaging + CTA + stats
 * right = futuristic animated AI/Web/Cloud visual
 */
const Hero = () => (
  <section className="hero-section">
    <div className="hero-bg-left" aria-hidden="true" />
    <div className="hero-bg-right" aria-hidden="true" />
    <div className="hero-bg-purple" aria-hidden="true" />

    <div className="container-x relative">
      <div className="hero-grid">
        <HeroContent />
        <HeroVisual />
      </div>
      <TrustedCompanies />
    </div>
  </section>
);

export default Hero;
