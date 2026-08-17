const brands = ["Microsoft", "Google", "AWS", "Azure", "Shopify"];

/**
 * Subtle, monochrome "trusted by" strip below the hero.
 */
const TrustedCompanies = () => (
  <div className="trusted-shell">
    <p className="trusted-label">Trusted by innovative companies</p>
    <div className="trusted-row">
      {brands.map((brand) => (
        <span key={brand} className="trusted-brand">
          {brand}
        </span>
      ))}
    </div>
  </div>
);

export default TrustedCompanies;