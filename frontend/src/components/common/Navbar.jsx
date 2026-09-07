import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { navLinks } from "../../config/siteConfig";
import BrandLogo from "./BrandLogo";
import ContactModal from "./ContactModal";

// Every public page uses the same light theme-based hero background, so the
// transparent navbar always uses dark links. Kept configurable in case a dark
// hero page is added later.
const DARK_HERO_ROUTES = [];
const LIGHT_HERO_ROUTES = ["/", "/services", "/products", "/about", "/careers", "/blog", "/contact"];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  const closeAll = () => setOpen(false);

  const openContact = () => {
    closeAll();
    setContactOpen(true);
  };

  const topLinks = navLinks.filter((l) => !["Home", "Services"].includes(l.label));

  // Overlay = transparent navbar floating on top of a hero.
  const overlay = DARK_HERO_ROUTES.includes(pathname) || LIGHT_HERO_ROUTES.includes(pathname);
  // White links only when floating over a dark image hero (before scrolling).
  const lightText = overlay && !scrolled;
  const solid = !overlay || scrolled;

  const headerClass = `fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
    solid
      ? "border-b border-line/70 bg-white/85 backdrop-blur-xl"
      : "border-b border-transparent bg-transparent"
  } ${!solid ? "navbar-hero" : ""}`;

  const linkBase = lightText
    ? "text-white/90 hover:text-white"
    : "text-slate-600 hover:text-[#FF9866]";
  const activeClass = lightText ? "text-white" : "text-[#FF9866]";

  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-semibold transition-colors duration-200 ${linkBase} after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:rounded-full after:bg-[#FF9866] after:transition-transform after:duration-300 ${
      isActive
        ? `${activeClass} after:scale-x-100`
        : "after:scale-x-0 hover:after:scale-x-100"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-200 ${
      isActive ? "bg-brand-orange/10 text-[#FF9866]" : "text-slate-600 hover:bg-slate-50 hover:text-[#FF9866]"
    }`;

  const ctaClass =
    "group inline-flex items-center justify-center gap-1.5 rounded-full bg-[#172B3A] px-6 py-2.5 text-[13px] font-semibold text-[#FFFFFF] shadow-[0_8px_18px_-10px_rgba(23,43,58,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0F172A]";

  useEffect(() => {
    // Intentionally closes the mobile menu on navigation (derived state).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    closeAll();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={headerClass}>
        <nav className="container-x flex items-center justify-between py-4">
          <Link to="/" onClick={closeAll} className="transition-transform duration-300 hover:scale-[1.02]">
            <BrandLogo variant="wordmark" className={lightText ? "!text-white" : "!text-ink"} />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <NavLink to="/" end className={navLinkClass} onClick={closeAll}>
              Home
            </NavLink>

            <NavLink to="/services" className={navLinkClass} onClick={closeAll}>
              Services
            </NavLink>

            {topLinks.map((l) => (
              <NavLink key={l.path} to={l.path} className={navLinkClass} onClick={closeAll}>
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button type="button" onClick={openContact} className={`${ctaClass} hidden md:inline-flex`}>
              Contact Us <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className={`rounded-lg p-1 transition-colors lg:hidden ${lightText ? "text-white hover:bg-white/15" : "text-ink hover:bg-slate-100"}`}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-line bg-white lg:hidden"
            >
              <div className="container-x flex flex-col gap-1 py-4">
                <NavLink to="/" end className={mobileLinkClass} onClick={closeAll}>
                  Home
                </NavLink>

                <NavLink to="/services" className={mobileLinkClass} onClick={closeAll}>
                  Services
                </NavLink>

                {topLinks.map((l) => (
                  <NavLink key={l.path} to={l.path} className={mobileLinkClass} onClick={closeAll}>
                    {l.label}
                  </NavLink>
                ))}

                <button
                  type="button"
                  onClick={openContact}
                  className={`${ctaClass} mt-3 w-full`}
                >
                  Contact Us <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
};

export default Navbar;
