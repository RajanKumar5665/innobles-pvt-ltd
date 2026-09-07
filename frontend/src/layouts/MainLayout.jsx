import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import BackToTop from "../components/common/BackToTop";

// Shared layout for public pages. <Outlet /> shows the current page inside it.
const MainLayout = () => (
  <div className="public-site flex min-h-screen flex-col">
    <ScrollToTop />
    <BackToTop />
    <Navbar />
    <main className="flex-1">
      {/* Clears the fixed navbar height; heroes pull back up over it. */}
      <div aria-hidden="true" className="nav-anchor" />
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;

