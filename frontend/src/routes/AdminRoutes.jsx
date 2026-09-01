import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Loader from "../components/common/Loader";
import RequireAdmin from "../components/admin/RequireAdmin";

// Route-level code splitting for the (heavy) admin pages.
const Login = lazy(() => import("../pages/admin/Login"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const Blogs = lazy(() => import("../pages/admin/Blogs"));
const Products = lazy(() => import("../pages/admin/Products"));
const Services = lazy(() => import("../pages/admin/Services"));
const Careers = lazy(() => import("../pages/admin/Careers"));
const Contacts = lazy(() => import("../pages/admin/Contacts"));
const Applications = lazy(() => import("../pages/admin/Applications"));
const Home = lazy(() => import("../pages/admin/Home"));
const About = lazy(() => import("../pages/admin/About"));

// Fallback shown while an admin route chunk downloads.
const AdminPageLoader = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <Loader size="lg" />
  </div>
);

const AdminRoutes = () => {
  return (
    <Suspense fallback={<AdminPageLoader />}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="products" element={<Products />} />
          <Route path="services" element={<Services />} />
          <Route path="careers" element={<Careers />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="applications" element={<Applications />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
