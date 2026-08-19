import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Circular prev/next button for the testimonial carousel.
 * `direction`: "prev" | "next". Positioning is controlled by the parent
 * through `className` (absolute on desktop, inline on mobile).
 */
const TestimonialNavigation = ({ direction = "prev", onClick, className = "" }) => {
  const isPrev = direction === "prev";
  const Icon = isPrev ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous testimonials" : "Next testimonials"}
      className={`group/nav inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line bg-white text-ink shadow-[0_10px_24px_-14px_rgba(26,35,50,0.35)] transition-all duration-300 ease-out hover:scale-105 hover:border-brand-orange/40 hover:bg-orange-50 hover:text-brand-orange active:scale-95 ${className}`}
    >
      <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
    </button>
  );
};

export default TestimonialNavigation;
