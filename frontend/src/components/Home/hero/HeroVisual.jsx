import { Zap } from "lucide-react";
import heroImage from "../../../assets/hero.png";

/**
 * Right column: a simple, subtly animated hero image with an orange glow,
 * a soft gradient ring and one small floating badge.
 */
const HeroVisual = () => (
  <div className="hero-visual">
    {/* soft orange glow behind the image */}
    <div className="hero-visual-glow" aria-hidden="true" />

    {/* gradient ring + white padded frame */}
    <div className="hero-visual-ring" aria-hidden="true" />
    <div className="hero-visual-frame">
      <img src={heroImage} alt="Innobles technology platform" className="hero-visual-img" />
    </div>

    {/* small floating badge */}
    <div className="hero-fcard hero-fcard-live">
      <span className="hero-fcard-icon orange">
        <Zap size={18} aria-hidden="true" />
      </span>
      <div>
        <p className="hero-fcard-title">On-time delivery</p>
        <p className="hero-fcard-value">98%</p>
      </div>
    </div>
  </div>
);

export default HeroVisual;