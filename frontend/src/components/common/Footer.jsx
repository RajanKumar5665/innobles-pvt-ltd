import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, ArrowUp } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import BrandLogo from "./BrandLogo";
import FooterParticles from "./FooterParticles";
import { contactInfo, navLinks, siteConfig } from "../../config/siteConfig";
import { services } from "../../data/dummyData";

const socialIcons = [
  { label: "LinkedIn", url: siteConfig.socials.linkedin, Icon: FaLinkedinIn },
  { label: "Twitter (X)", url: siteConfig.socials.twitter, Icon: FaXTwitter },
  { label: "GitHub", url: siteConfig.socials.github, Icon: FaGithub },
  { label: "Instagram", url: siteConfig.socials.instagram, Icon: FaInstagram },
];

const contactIcons = {
  Email: Mail,
  Phone: Phone,
  Office: MapPin,
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

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
              {siteConfig.tagline} We help businesses move faster with thoughtful software, AI, and
              cloud solutions.
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
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="footer-heading">Services</h3>
            <ul className="footer-list">
              {services.map((service) => (
                <li key={service.id}>
                  <Link to="/services">{service.title}</Link>
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
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </span>
        </div>
      </div>

      {/* Fixed back-to-top icon on right side (same side as slider) */}
      <div
        className="fixed right-4 bottom-4 flex items-center justify-center w-10 h-10 rounded-full bg-brand-orange shadow-lg hover:bg-brand-yellow transition-colors cursor-pointer z-40"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp size={20} aria-hidden="true" className="text-slate-50" />
      </div>
    </footer>
  );
};

export default Footer;