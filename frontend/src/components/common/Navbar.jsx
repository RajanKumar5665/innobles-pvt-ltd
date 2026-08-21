
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, Briefcase, FileText, Home, Layers, Menu, Package, Users, X } from "lucide-react";
import { navLinks } from "../../config/siteConfig";
import BrandLogo from "./BrandLogo";
import ContactModal from "./ContactModal";

const navIcons = {
  Home: Home,
  Services: Layers,
  Product: Package,
  Careers: Briefcase,
  Blog: FileText,
  "About Us": Users,
};

const linkClass = ({ isActive }) =>
  `relative flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-[#F59E0B] ${isActive ? "text-[#F59E0B]" : "text-slate-600"}`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { pathname } = useLocation();

  const closeAll = () => {
    setOpen(false);
  };

  const openContact = () => {
    closeAll();
    setContactOpen(true);
  };

  const topLinks = navLinks.filter((l) => !["Home", "Services"].includes(l.label));

  return (
    <>
      <header className="relative sticky top-0 z-40 border-b border-line/80 bg-white/95 shadow-sm backdrop-blur-md after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-[#F59E0B]">
        <nav className="container-x flex items-center justify-between py-3.5">
          <Link to="/" onClick={closeAll}>
            <BrandLogo className="text-2xl" />
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            <NavLink to="/" end className={linkClass} onClick={closeAll}>
              <Home size={16} aria-hidden="true" /> Home
            </NavLink>

            <NavLink to="/services" className={linkClass} onClick={closeAll}>
              <Layers size={16} aria-hidden="true" /> Services
            </NavLink>

            {topLinks.map((l) => {
              const IconName = navIcons[l.label];
              return (
                <NavLink key={l.path} to={l.path} className={linkClass} onClick={closeAll}>
                  {IconName && <IconName size={16} aria-hidden="true" />}
                  {l.label}
                </NavLink>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openContact}
              className="hidden items-center gap-1.5 rounded-full bg-[#F59E0B] !px-5 !py-2.5 !text-[13px] font-semibold !text-white transition-colors hover:bg-[#D97706] md:inline-flex"
            >
              Contact Us <ArrowRight size={14} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="text-ink lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="border-t border-line bg-white lg:hidden">
            <div className="container-x flex flex-col gap-1 py-5">
              <NavLink to="/" end className={`${linkClass({ isActive: pathname === "/" })} py-2.5`} onClick={closeAll}>
                <Home size={16} aria-hidden="true" /> Home
              </NavLink>

              <NavLink to="/services" className={`${linkClass({ isActive: pathname === "/services" })} py-2.5`} onClick={closeAll}>
                <Layers size={16} aria-hidden="true" /> Services
              </NavLink>

              {topLinks.map((l) => {
                const IconName = navIcons[l.label];
                return (
                  <NavLink key={l.path} to={l.path} className={`${linkClass({ isActive: pathname === l.path })} py-2.5`} onClick={closeAll}>
                    {IconName && <IconName size={16} aria-hidden="true" />}
                    {l.label}
                  </NavLink>
                );
              })}

              <button
                type="button"
                onClick={openContact}
                className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-full bg-[#F59E0B] px-5 py-3 text-sm font-semibold !text-white transition-colors hover:bg-[#D97706]"
              >
                Contact Us <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </header>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
};

export default Navbar;