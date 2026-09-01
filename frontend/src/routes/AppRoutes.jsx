import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Loader from "../components/common/Loader";
import AdminRoutes from "./AdminRoutes";

// Route-level code splitting — each page loads in its own chunk so the initial
// bundle stays small and only the requested page is downloaded.
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Services = lazy(() => import("../pages/Services"));
const ServiceDetail = lazy(() => import("../pages/ServiceDetail"));
const Blog = lazy(() => import("../pages/Blog"));
const BlogDetail = lazy(() => import("../pages/BlogDetail"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Careers = lazy(() => import("../pages/Careers"));
const Contact = lazy(() => import("../pages/Contact"));
const NotFound = lazy(() => import("../pages/NotFound"));

// Fallback shown while a route chunk downloads.
const PageLoader = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <Loader size="lg" />
  </div>
);

// Central routing — every URL maps to a page here.
// MainLayout wraps each page so the Navbar + Footer stay fixed.
const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
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
    </Suspense>
  );
};

export default AppRoutes;
