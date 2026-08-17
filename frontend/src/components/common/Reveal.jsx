import { useReveal } from "../../hooks/useReveal";

/**
 * Applies the scroll-reveal animation to any content.
 * Prop `variant`: "up" (default) | "left" | "right".
 */
const Reveal = ({ children, variant = "up", delay = 0, className = "" }) => {
  const ref = useReveal();
  const cls = variant === "left" ? "reveal-left" : variant === "right" ? "reveal-right" : "reveal";
  return (
    <div ref={ref} className={`${cls} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
};

export default Reveal;
