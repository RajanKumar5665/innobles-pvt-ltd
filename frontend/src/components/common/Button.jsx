import { Link } from "react-router-dom";

/**
 * Reusable button.
 * - variant: "primary" (dark navy) | "accent" (orange) | "secondary" | "outline" | "ghost"
 * - `to`   -> renders react-router <Link>
 * - `href` -> renders an <a>
 * - otherwise renders a <button>
 */
const variantClass = {
  primary: "btn-primary",
  accent: "btn-accent",
  secondary: "btn-secondary",
  outline: "btn-secondary",
  ghost: "btn-ghost",
};

const Button = ({ children, variant = "primary", to, href, className = "", type = "button", ...rest }) => {
  const base = variantClass[variant] || "btn-primary";
  const classes = `${base} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;

