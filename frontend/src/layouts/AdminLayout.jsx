import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LayoutDashboard,
  Package,
  Briefcase,
  Users,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Settings,
  Info,
} from "lucide-react";
import Loader from "../components/common/Loader";
import {
  logout,
  fetchMe,
  fetchStats,
  selectIsAuthenticated,
} from "../features/auth/authThunks";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/products", icon: Package, label: "Products" },
  { to: "/admin/services", icon: Settings, label: "Services" },
  { to: "/admin/careers", icon: Briefcase, label: "Careers" },
  { to: "/admin/contacts", icon: MessageSquare, label: "Contacts" },
  { to: "/admin/applications", icon: Users, label: "Applications" },
  { to: "/admin/about", icon: Info, label: "About" },
];

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(fetchMe()).catch(() => navigate("/admin/login"));
    } else {
      dispatch(fetchStats());
    }
  }, [isAuthenticated, dispatch, navigate]);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/admin/login");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile header — stays fixed on scroll */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <span className="font-disp text-lg font-bold text-slate-900">Admin</span>
        <MobileMenu onLogout={handleLogout} />
      </div>

      <div className="flex">
        {/* Sidebar — sticky so it stays visible while the content scrolls */}
        <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white lg:sticky lg:top-0 lg:h-screen lg:flex">
          <div className="border-b border-slate-200 px-6 py-5">
            <p className="font-disp text-xl font-bold text-slate-900">Innobles</p>
            <p className="text-xs text-slate-500">Admin Panel</p>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-brand-orange/10 text-brand-orange"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`
                    }
                  >
                    <item.icon size={18} aria-hidden="true" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-slate-200 px-4 py-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut size={18} aria-hidden="true" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const MobileMenu = ({ onLogout }) => {
  const [open, setOpen] = useState(false);

  // Lock body scroll + close on Escape while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    // Auto-close if the viewport grows to desktop while the drawer is open.
    const mq = window.matchMedia("(min-width: 1024px)");
    const onResize = () => mq.matches && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <Menu size={22} />
      </button>

      {/* Backdrop — closes the drawer when tapped */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Drawer — slides in from the right edge */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-72 flex-col border-l border-slate-200 bg-white shadow-2xl lg:hidden [transition:transform_300ms_ease,visibility_0s_linear_300ms] ${
          open
            ? "visible translate-x-0"
            : "invisible translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Admin menu"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <p className="font-disp text-lg font-bold text-slate-900">Innobles</p>
            <p className="text-xs text-slate-500">Admin Panel</p>
          </div>
          <button
            onClick={close}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={close}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-orange/10 text-brand-orange"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <item.icon size={18} aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200 px-4 py-4">
          <button
            onClick={() => {
              close();
              onLogout();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut size={18} aria-hidden="true" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
