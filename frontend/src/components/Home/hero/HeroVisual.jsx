/**
 * Right column of the hero: the Innobles hero image floating gently,
 * wrapped in a soft orange/cyan glow with a few subtle decorative particles
 * kept behind the image.
 */
const HeroVisual = () => (
  <div className="hero-visual">
    {/* soft orange + cyan radial glows behind the image */}
    <div className="hero-visual-glow" aria-hidden="true" />

    {/* gentle decorative particles (kept behind the image) */}
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