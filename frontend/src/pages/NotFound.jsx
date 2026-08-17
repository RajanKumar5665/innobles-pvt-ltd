import { Link } from "react-router-dom";
import Seo from "../components/seo/Seo";

const NotFound = () => {
  return (
    <>
      <Seo title="Page Not Found" path="/404" />
      <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-disp text-8xl font-bold text-primary md:text-9xl">404</p>
        <h1 className="mt-6 font-disp text-3xl font-bold md:text-4xl">Page not found</h1>
        <p className="mt-4 max-w-md text-white/60">
          The page you're looking for doesn't exist or has moved. Let's get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
          <Link to="/contact" className="btn-ghost">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
};

export default NotFound;
