/**
 * Central site configuration.
 * Change things in ONE place — brand name, contact details, links, socials —
 * and it updates everywhere across the site.
 */
export const siteConfig = {
  name: "Innobles",
  legalName: "Innobles Smart Technologies Pvt. Ltd.",
  tagline: "We engineer software that thinks ahead.",
  description:
    "Innobles builds web platforms, mobile apps, cloud infra and AI-driven systems for businesses that want to move faster than their market.",
  url: "https://www.innobles.in",
  email: "info@innobles.in",
  phone: "+91 98765 43210",
  address: "5th Floor, Tech Park One, Salt Lake Sector V, Kolkata, West Bengal 700091, India",
  socials: {
    linkedin: "https://linkedin.com/company/innobles",
    twitter: "https://twitter.com/innobles",
    github: "https://github.com/innobles",
    instagram: "https://instagram.com/innobles",
  },
};

/* ---------- Navigation (used by Navbar + Footer + routes) ---------- */
export const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Product", path: "/products" },
  { label: "Careers", path: "/careers" },
  { label: "Blog", path: "/blog" },
  { label: "About Us", path: "/about" },
];

export const contactInfo = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
  { label: "Office", value: siteConfig.address },
];



