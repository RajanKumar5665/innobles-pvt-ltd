import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

// Fixed back-to-top button. Rendered outside the footer so the footer's
// overflow/stacking context can never intercept its clicks.
const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <motion.button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      initial={false}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className="fixed right-4 bottom-4 z-[9999] flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange shadow-lg transition-colors hover:bg-brand-yellow cursor-pointer"
      style={visible ? undefined : { pointerEvents: "none" }}
    >
      <ArrowUp size={20} className="text-slate-50" />
    </motion.button>
  );
};

export default BackToTop;