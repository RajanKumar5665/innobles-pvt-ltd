import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import ServiceDetail from "../pages/ServiceDetail";
import Blog from "../pages/Blog";
import BlogDetail from "../pages/BlogDetail";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Careers from "../pages/Careers";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import AdminRoutes from "./AdminRoutes";

// Central routing — every URL maps to a page here.
// MainLayout wraps each page so the Navbar + Footer stay fixed.
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:id" element={<ServiceDetail />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:slug" element={<ProductDetail />} />
        <Route path="careers" element={<Careers />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
