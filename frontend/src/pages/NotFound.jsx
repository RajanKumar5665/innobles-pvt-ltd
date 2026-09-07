import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/seo/Seo";
import HeroBackdrop from "../components/common/HeroBackdrop";

const NotFound = () => {
  return (
    <>
      <Seo title="Page Not Found" path="/404" />
      <section className="page-hero flex min-h-[70vh] flex-col items-center justify-center overflow-hidden py-24 text-center">
        <HeroBackdrop />

        <div className="container-x relative z-[1]">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow mb-5 justify-center"
          >
            404 · Page not found
          </motion.p>

          <motion.p
            initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-disp text-8xl font-bold text-primary md:text-9xl"
            aria-hidden="true"
          >
            404<span className="text-gradient">.</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-disp text-3xl font-bold text-ink md:text-4xl"
          >
            Page not found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-4 max-w-md text-slate-600"
          >
            The page you&apos;re looking for doesn&apos;t exist or has moved.
            Let&apos;s get you back on track.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
            <Link to="/contact" className="btn-ghost">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
