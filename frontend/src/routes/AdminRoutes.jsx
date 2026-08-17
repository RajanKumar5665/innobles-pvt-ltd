import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import Blogs from "../pages/admin/Blogs";
import Products from "../pages/admin/Products";
import Services from "../pages/admin/Services";
import Careers from "../pages/admin/Careers";
import Contacts from "../pages/admin/Contacts";
import Applications from "../pages/admin/Applications";
import Home from "../pages/admin/Home";
import RequireAdmin from "../components/admin/RequireAdmin";

const AdminRoutes = () => {
  return (
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
        <Route path="blogs" element={<Blogs />} />
        <Route path="products" element={<Products />} />
        <Route path="services" element={<Services />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="applications" element={<Applications />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
