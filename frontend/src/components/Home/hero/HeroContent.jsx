import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Left column of the hero: badge, headline, description and CTAs.
 * Each block fades and slides in slightly from the left with a small stagger.
 */
const HeroContent = () => (
  <div className="hero-content">
    <div className="hero-badge hero-reveal-item" style={{ animationDelay: "0ms" }}>
      <span className="h-2 w-2 animate-pulse rounded-full bg-brand-orange" aria-hidden="true" />
      Innobles Smart Technology Solutions Pvt Ltd
    </div>

    <h1 className="hero-title font-hero hero-reveal-item" style={{ animationDelay: "120ms" }}>
      Build products that move{" "}
      <span className="hero-em">
        faster
        <span className="hero-em-underline" aria-hidden="true" />
      </span>{" "}
      than your market.
    </h1>

    <p className="hero-desc hero-reveal-item" style={{ animationDelay: "240ms" }}>
      Innobles builds web platforms, mobile apps, cloud infra and AI-driven systems for businesses
      that want to move faster than their market.
    </p>

    <div className="hero-cta-row hero-reveal-item" style={{ animationDelay: "360ms" }}>
      <Link to="/contact" className="btn-accent">
        Start a Project <ArrowRight size={16} aria-hidden="true" />
      </Link>
      <Link to="/products" className="btn-ghost">
        Explore Products
      </Link>
    </div>
  </div>
);

export default HeroContent;