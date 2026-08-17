import { Link } from "react-router-dom";

/**
 * Reusable button.
 * - variant: "primary" | "ghost"
 * - `to`   -> renders react-router <Link>
 * - `href` -> renders an <a>
 * - otherwise renders a <button>
 */
const Button = ({ children, variant = "primary", to, href, className = "", type = "button", ...rest }) => {
  const base = variant === "ghost" ? "btn-ghost" : "btn-primary";
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

