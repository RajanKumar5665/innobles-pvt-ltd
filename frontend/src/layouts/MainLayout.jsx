import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import BackToTop from "../components/common/BackToTop";

/**
 * Shared shell rendered around every page (public).
 * <Outlet /> renders the page matched by AppRoutes.
 */
const MainLayout = () => (
  <div className="flex min-h-screen flex-col">
    <ScrollToTop />
    <BackToTop />
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;

