// Right side of the hero: the large flat hero image with glows and decorative
// particles. Ships as a tiny WebP (~78KB vs the 2MB PNG that used to be the
// hero) with a JPEG fallback for older browsers.
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

    <picture>
      <source
        srcSet="/hero-image.webp"
        type="image/webp"
      />
      <source
        srcSet="/hero-image.jpg"
        type="image/jpeg"
      />
      <img
        src="/hero-image.jpg"
        alt="Innobles premium technology platform — software, mobile, AI and cloud solutions"
        className="hero-visual-img"
        width={1536}
        height={1024}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    </picture>
  </div>
);

export default HeroVisual;