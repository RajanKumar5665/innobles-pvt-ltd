// Navbar brand: clean "Innobles" wordmark — Plus Jakarta Sans extrabold, navy,
// with the theme's peach/orange accent dot. No image, scales crisply.
const BrandLogo = ({ className = "", variant = "image" }) => {
  if (variant === "wordmark") {
    return (
      <a
        href="/"
        aria-label="Innobles — go to homepage"
        className={`brand-wordmark inline-flex select-none items-baseline font-disp text-[1.7rem] font-extrabold leading-none tracking-tight text-ink transition-colors duration-300 ${className}`}
      >
        <span className="brand-wordmark-i">I</span>nnobles
      </a>
    );
  }

  return (
    <a href="/" className={`flex items-center ${className}`}>
      <img
        src="/innobles_logo.png"
        alt="Brand Logo"
        className="brand-logo-image h-12 w-auto object-contain"
      />
    </a>
  );
};

export default BrandLogo;