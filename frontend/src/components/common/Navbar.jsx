
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, Briefcase, ChevronDown, ChevronRight, FileText, Home, Layers, Menu, Package, Users, X } from "lucide-react";
import { navLinks } from "../../config/siteConfig";
import { serviceMegaMenu } from "../../data/dummyData";
import BrandLogo from "./BrandLogo";
import ContactModal from "./ContactModal";
import ServicesMegaMenu from "./ServicesMegaMenu";

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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { pathname } = useLocation();

  const closeAll = () => {
    setOpen(false);
    setMobileServicesOpen(false);
    setServicesOpen(false);
  };

  const openContact = () => {
    closeAll();
    setContactOpen(true);
  };

  const servicesActive = pathname === "/services" || servicesOpen;
  const topLinks = navLinks.filter((l) => !["Home", "Services"].includes(l.label));

  return (
    <>
      <header
        className="relative sticky top-0 z-40 border-b border-line/80 bg-white/95 shadow-sm backdrop-blur-md after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-[#F59E0B]"
        onMouseLeave={() => setServicesOpen(false)}
      >
        <nav className="container-x flex items-center justify-between py-3.5">
          <Link to="/" onClick={closeAll}>
            <BrandLogo className="text-2xl" />
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            <NavLink to="/" end className={linkClass} onClick={closeAll}>
              <Home size={16} aria-hidden="true" /> Home
            </NavLink>

            <div className="relative" onMouseEnter={() => setServicesOpen(true)}>
              <Link
                to="/services"
                onClick={closeAll}
                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-[#F59E0B] ${servicesActive ? "text-[#F59E0B]" : "text-slate-600"}`}
              >
                <Layers size={16} aria-hidden="true" /> Services
                <ChevronDown size={14} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </Link>
              {servicesOpen && (
                <span className="absolute left-1/2 top-full z-50 -translate-x-1/2 border-[6px] border-transparent border-b-white" />
              )}
            </div>

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

        {servicesOpen && (
          <div className="absolute left-0 right-0 top-full hidden md:block" onMouseEnter={() => setServicesOpen(true)}>
            <ServicesMegaMenu onNavigate={closeAll} />
          </div>
        )}

        {open && (
          <div className="border-t border-line bg-white lg:hidden">
            <div className="container-x flex flex-col gap-1 py-5">
              <NavLink to="/" end className={`${linkClass({ isActive: pathname === "/" })} py-2.5`} onClick={closeAll}>
                <Home size={16} aria-hidden="true" /> Home
              </NavLink>

              <div className="flex items-center justify-between">
                <NavLink to="/services" className={`${linkClass({ isActive: pathname === "/services" })} py-2.5`} onClick={closeAll}>
                  <Layers size={16} aria-hidden="true" /> Services
                </NavLink>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="px-2 py-2.5 text-slate-600"
                  aria-label="Toggle services menu"
                  aria-expanded={mobileServicesOpen}
                >
                  <ChevronDown size={18} className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
              </div>
              {mobileServicesOpen && (
                <div className="mb-2 flex flex-col gap-4 border-l border-line pl-4">
                  {serviceMegaMenu.map((category) => (
                    <div key={category.id}>
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-orange">{category.title}</p>
                      <div className="flex flex-col gap-1">
                        {category.items.map((item) => (
                          <Link key={item} to="/services" onClick={closeAll} className="flex items-center gap-1.5 py-1.5 text-sm text-slate-600 hover:text-brand-orange">
                            <ChevronRight size={12} className="shrink-0" aria-hidden="true" />
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

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