// Home hero right visual. The image is intentionally STATIC — no float/bob
// animation and no load-time entrance motion (per design request).
const HeroVisual = () => (
  <div className="hero-visual">
    <div className="hero-visual-glow" aria-hidden="true" />

    <div className="hero-particles" aria-hidden="true">
      <span className="hero-particle hero-particle-1" />
      <span className="hero-particle hero-particle-2" />
      <span className="hero-particle hero-particle-3" />
      <span className="hero-particle hero-particle-4" />
    </div>

    <img
      src="/hero-image.png"
      alt="Innobles premium technology platform — software, mobile, AI and cloud solutions"
      className="hero-visual-img"
      loading="eager"
      decoding="async"
      fetchPriority="high"
    />
  </div>
);

export default HeroVisual;
