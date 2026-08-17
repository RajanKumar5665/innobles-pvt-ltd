import { Link } from "react-router-dom";
import Stats from "./Stats";

/**
 * Left column of the hero: badge, headline, description, CTAs and stats.
 */
const HeroContent = () => (
  <div className="animate-fade-up">
    <div className="hero-badge">
      <span className="h-2 w-2 animate-pulse rounded-full bg-brand-orange" aria-hidden="true" />
      SOFTWARE • MOBILE • AI • CLOUD
    </div>

    <h1 className="hero-title font-hero">
      Build products that move{" "}
      <span className="hero-em">
        faster
        <span className="hero-em-underline" aria-hidden="true" />
      </span>{" "}
      than your market.
    </h1>

    <p className="hero-desc">
      Innobles builds web platforms, mobile apps, cloud infra and AI-driven systems for businesses
      that want to move faster than their market.
    </p>

    <div className="hero-cta-row">
      <Link to="/contact" className="btn-primary">
        Start a Project <span aria-hidden="true">→</span>
      </Link>
      <Link to="/products" className="btn-ghost">
        Explore Products
      </Link>
    </div>

    <Stats />
  </div>
);

export default HeroContent;