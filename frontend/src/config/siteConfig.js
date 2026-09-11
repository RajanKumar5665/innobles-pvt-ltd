// Central site config. Change brand info, links and socials here once,
// and it updates everywhere on the site.
export const siteConfig = {
  name: "Innobles",
  legalName: "Innobles Smart Technologies Pvt. Ltd.",
  tagline: "We engineer software that thinks ahead.",
  description:
    "Innobles builds web platforms, mobile apps, cloud infra and AI-driven systems for businesses that want to move faster than their market.",
  url: "https://www.innobles.in",
  email: "info@innobles.com",
  address: "X-15, 1st Floor, Hauz Khas, New Delhi – 110016, India",
  socials: {
    // Only link profiles that actually exist. LinkedIn is confirmed; the rest
    // are removed until real profiles are available.
    linkedin: "https://linkedin.com/company/innobles",
  },
};

/* ---------- Navigation (used by Navbar + Footer + routes) ---------- */
export const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Products", path: "/products" },
  { label: "Careers", path: "/careers" },
  { label: "About Us", path: "/about" },
];

export const contactInfo = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: "Office", value: siteConfig.address },
];



