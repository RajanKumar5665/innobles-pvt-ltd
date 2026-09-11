import HeroContent from "./hero/HeroContent";
import HeroVisual from "./hero/HeroVisual";

// Home page hero: left = messaging + CTA, right = animated visual.
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
    </div>
  </section>
);

export default Hero;
