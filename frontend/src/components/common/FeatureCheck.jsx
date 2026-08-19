import { Check } from "lucide-react";

/**
 * Reusable feature/checkmark icon.
 *
 * - Renders a lucide `Check` component, so it is never replaced by font
 *   glyphs or corrupted characters.
 * - `shrink-0` keeps it from collapsing or overlapping surrounding text.
 * - Inherits `currentColor` (set the color on a parent with Tailwind text-*).
 * - Defaults to 16px; override the size via Tailwind classes in `className`.
 */
const FeatureCheck = ({ className = "h-4 w-4", strokeWidth = 2.5, ...rest }) => (
  <Check
    className={`shrink-0 ${className}`}
    strokeWidth={strokeWidth}
    aria-hidden="true"
    {...rest}
  />
);

export default FeatureCheck;
