const BrandLogo = ({ className = "" }) => (
  <div className={`flex items-center ${className}`}>
    <img
      src="/innobles_logo.png"
      alt="Brand Logo"
      className="h-12 w-auto object-contain"
    />
  </div>
);

export default BrandLogo;