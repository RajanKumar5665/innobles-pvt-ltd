// Shared hero background.
// Every page hero (Home + Services / Products / Careers / About / Contact /
// Blog / 404) uses the SAME theme background — the Contact Us button's
// peach/orange theme — via `.hero-backdrop-theme` → `--hero-theme-bg`.
const HeroBackdrop = () => (
  <div className="hero-backdrop" aria-hidden="true">
    <div className="hero-backdrop-theme" />
  </div>
);

export default HeroBackdrop;
