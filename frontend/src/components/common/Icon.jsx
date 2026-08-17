import { Globe, Smartphone, Cloud, BrainCircuit, Palette, Lightbulb, Users, Package, UserCog, BarChart3, ShoppingCart } from "lucide-react";

/**
 * Maps data-level string keys to lucide-react icon components.
 * Keeping only STRING keys in the data keeps the Redux store serializable.
 */
const lucideMap = {
  web: Globe,
  mobile: Smartphone,
  cloud: Cloud,
  ai: BrainCircuit,
  design: Palette,
  consulting: Lightbulb,
  crm: Users,
  inventory: Package,
  hrms: UserCog,
  analytics: BarChart3,
  commerce: ShoppingCart,
};

/**
 * Renders an icon, supporting three shapes:
 *   1. string KEY matching `lucideMap`  -> renders the mapped lucide icon
 *   2. plain emoji / text               -> renders it as a span
 *   3. any React component reference    -> renders it directly
 */
const Icon = ({ icon, className = "h-6 w-6", strokeWidth = 2, ...rest }) => {
  if (!icon) return null;

  // 1) String key mapped to a lucide icon.
  const mapped = typeof icon === "string" ? lucideMap[icon] : null;
  if (mapped) {
    const Tag = mapped;
    return <Tag className={className} strokeWidth={strokeWidth} aria-hidden="true" {...rest} />;
  }

  // 2) Plain emoji / text.
  if (typeof icon === "string") {
    return (
      <span className={className} aria-hidden="true">
        {icon}
      </span>
    );
  }

  // 3) Already a component reference.
  const Tag = icon;
  return <Tag className={className} strokeWidth={strokeWidth} aria-hidden="true" {...rest} />;
};

export default Icon;
