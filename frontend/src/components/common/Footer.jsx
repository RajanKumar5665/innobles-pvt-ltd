import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import BrandLogo from "./BrandLogo";
import { contactInfo, navLinks, siteConfig } from "../../config/siteConfig";
import { services } from "../../data/dummyData";

const particles = [
  { left: "6%", top: "15%", size: 5, delay: "0s", duration: "8s" },
  { left: "18%", top: "78%", size: 3, delay: "-4s", duration: "11s" },
  { left: "32%", top: "28%", size: 4, delay: "-7s", duration: "9s" },
  { left: "49%", top: "70%", size: 6, delay: "-2s", duration: "12s" },
  { left: "66%", top: "16%", size: 3, delay: "-6s", duration: "10s" },
  { left: "78%", top: "58%", size: 5, delay: "-3s", duration: "9s" },
  { left: "91%", top: "24%", size: 4, delay: "-8s", duration: "11s" },
  { left: "24%", top: "52%", size: 3, delay: "-5s", duration: "13s" },
  { left: "58%", top: "88%", size: 4, delay: "-1s", duration: "10s" },
  { left: "84%", top: "76%", size: 3, delay: "-9s", duration: "8s" },
];

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
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="site-footer mt-16">
      <div className="footer-particles" aria-hidden="true">
        {particles.map((particle, index) => (
          <span
            key={index}
            className="footer-particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      <div className="footer-content container-x">
        {/* Newsletter strip */}
        <div className="footer-newsletter">
          <div>
            <h2 className="footer-newsletter-title">Stay in the loop</h2>
            <p className="footer-newsletter-text">
              Product updates, engineering deep-dives and tech insights — straight to your inbox, no
              spam.
            </p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            {subscribed ? (
              <p className="newsletter-success">✓ You're subscribed — welcome to the list!</p>
            ) : (
              <>
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  className="newsletter-input"
                  placeholder="Your email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe <Send size={16} strokeWidth={2} aria-hidden="true" />
                </button>
              </>
            )}
          </form>
        </div>

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
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-sm md:flex-row">
          <span>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </span>
          <Link to="/" className="footer-back-link">
            Back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
