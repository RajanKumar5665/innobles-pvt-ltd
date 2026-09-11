import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import BackToTop from "../components/common/BackToTop";

// Shared layout for public pages. <Outlet /> shows the current page inside it.
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

