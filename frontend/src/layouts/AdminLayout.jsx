import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LayoutDashboard,
  FileText,
  Package,
  Briefcase,
  Users,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Settings,
  Home,
} from "lucide-react";
import Loader from "../components/common/Loader";
import {
  logout,
  fetchMe,
  fetchStats,
  selectIsAuthenticated,
  selectAdmin,
} from "../features/auth/authThunks";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
    { to: "/admin/blogs", icon: FileText, label: "Blogs" },
  { to: "/admin/products", icon: Package, label: "Products" },
  { to: "/admin/services", icon: Settings, label: "Services" },
  { to: "/admin/careers", icon: Briefcase, label: "Careers" },
  { to: "/admin/contacts", icon: MessageSquare, label: "Contacts" },
  { to: "/admin/applications", icon: Users, label: "Applications" },
  { to: "/admin/home", icon: Home, label: "Home" },
];

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const admin = useSelector(selectAdmin);

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
      {/* Mobile header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <span className="font-disp text-lg font-bold text-slate-900">Admin</span>
        <MobileMenu onLogout={handleLogout} />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
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

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
        aria-label="Toggle menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      {open && (
        <div className="absolute inset-x-0 top-full z-50 border-b border-slate-200 bg-white shadow-lg">
          <nav className="px-4 py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive ? "bg-brand-orange/10 text-brand-orange" : "text-slate-600"
                  }`
                }
              >
                <item.icon size={18} aria-hidden="true" />
                {item.label}
              </NavLink>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600"
            >
              <LogOut size={18} aria-hidden="true" />
              Logout
            </button>
          </nav>
        </div>
      )}
    </>
  );
};

export default AdminLayout;
