/**
 * Reusable floating "glass" card used inside the hero visual.
 * `icon` = lucide icon component, `tone` = color accent, `className` = positioning (e.g. hero-fcard-ai).
 */
const FloatingCard = ({ icon: Icon, title, value, tone = "cyan", className = "" }) => (
  <div className={`hero-fcard ${className}`}>
    {Icon && (
      <span className={`hero-fcard-icon ${tone}`}>
        <Icon size={18} aria-hidden="true" />
      </span>
    )}
    <div>
      {title && <p className="hero-fcard-title">{title}</p>}
      {value && <p className="hero-fcard-value">{value}</p>}
    </div>
  </div>
);

export default FloatingCard;