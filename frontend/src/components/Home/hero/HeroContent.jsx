import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Hero content: badge, headline, description and action buttons.
const HeroContent = () => (
  <div className="hero-content">
    <div
      className="hero-badge hero-reveal-item"
      style={{ animationDelay: "0ms" }}
    >
      <span
        className="h-2 w-2 animate-pulse rounded-full bg-brand-orange"
        aria-hidden="true"
      />
      <span>Innobles Smart Technologies Private Limited</span>
    </div>

    <h1
      className="hero-title font-hero hero-reveal-item"
      style={{ animationDelay: "120ms" }}
    >
      Platforms that run{" "}
      <span className="hero-em">
        public  
        <span className="hero-em-underline" aria-hidden="true" />
      </span>{" "}
      systems.
    </h1>

    <p
      className="hero-desc hero-reveal-item"
      style={{ animationDelay: "240ms" }}
    >
      Innobles builds and operates the software behind government collections,
      disbursements, procurement and citizen services 37 products, deployed
      with departments, PSUs and institutions across India.
    </p>

    <div
      className="hero-cta-row hero-reveal-item"
      style={{ animationDelay: "360ms" }}
    >
      <Link
        to="/products"
        className="btn-accent inline-flex items-center justify-center gap-2"
        aria-label="Explore Innobles products"
      >
        <span>Explore Products</span>
        <ArrowRight
          size={16}
          strokeWidth={2}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </Link>

      <Link
        to="/contact"
        className="btn-ghost inline-flex items-center justify-center "
        aria-label="Contact Innobles"
      >
        Talk to Us 
      </Link>
    </div>
  </div>
);

export default HeroContent;