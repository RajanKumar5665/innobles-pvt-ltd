import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import BrandLogo from "./BrandLogo";
import FooterParticles from "./FooterParticles";
import { contactInfo, siteConfig } from "../../config/siteConfig";
import { PRODUCT_CATEGORIES } from "../../config/productCategories";

const socialIcons = [
  { label: "LinkedIn", url: siteConfig.socials.linkedin, Icon: FaLinkedinIn },
];

const contactIcons = {
  Email: Mail,
  Phone: Phone,
  Office: MapPin,
};

// Company column (footer labels — "Products" here, "Product" on the navbar).
const companyLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Products", path: "/products" },
  { label: "Careers", path: "/careers" },
  { label: "Blog", path: "/blog" },
  { label: "About Us", path: "/about" },
];

// Product categories — taken from the shared source so the footer and the
// Products page always stay in sync. Each category links to the products page
// with its category pre-selected.
const productLinks = PRODUCT_CATEGORIES.map((c) => ({
  label: c.label,
  hash: c.id,
}));

const Footer = () => {
  return (
    <footer className="site-footer mt-16 relative">
      <FooterParticles />

      <div className="footer-content container-x">
        {/* Link columns */}
        <div className="footer-columns grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/">
              <BrandLogo className="text-2xl" />
            </Link>
            <p className="footer-copy mt-4 max-w-xs text-sm leading-relaxed">
              Innobles builds and operates digital platforms for government
              departments, PSUs and institutions — software for the processes
              where accountability matters.
            </p>
            <div className="footer-social">
              {socialIcons.map(({ label, url, Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="social-link"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-list">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="footer-heading">Products</h3>
            <ul className="footer-list">
              {productLinks.map((link) => (
                <li key={link.hash}>
                  <Link to={`/products?category=${link.hash}`}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="footer-heading">Contact</h3>
            <ul className="footer-list">
              {contactInfo.map((contact) => {
                const IconComponent = contactIcons[contact.label] || Mail;
                return (
                  <li key={contact.label}>
                    {contact.href ? (
                      <a href={contact.href} className="footer-contact-link">
                        <IconComponent size={16} strokeWidth={2} aria-hidden="true" />
                        <span>{contact.value}</span>
                      </a>
                    ) : (
                      <span className="footer-contact-link">
                        <IconComponent size={16} strokeWidth={2} aria-hidden="true" />
                        <span>{contact.value}</span>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-content footer-bottom">
        <div className="container-x py-6 text-center text-sm">
          <span>
            © 2026 Innobles Smart Technologies Private Limited. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
