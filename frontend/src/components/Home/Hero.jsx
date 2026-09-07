import HeroContent from "./hero/HeroContent";
import HeroVisual from "./hero/HeroVisual";
import HeroBackdrop from "../common/HeroBackdrop";

// Home page hero: left = messaging + CTA, right = hero artwork (/hero-image.png).
const Hero = () => (
  <section className="hero-section">
    <HeroBackdrop />
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
