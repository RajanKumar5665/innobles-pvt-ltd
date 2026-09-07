import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroItem, heroStagger } from "../../common/motionVariants";

const HeroContent = () => (
  <motion.div
    className="hero-content"
    variants={heroStagger}
    initial="hidden"
    animate="visible"
  >
    <motion.div variants={heroItem} className="hero-badge">
      <span>Innobles Smart Technologies Private Limited</span>
    </motion.div>

    <motion.h1 variants={heroItem} className="hero-title font-hero">
      <motion.span variants={heroItem} className="hero-title-line">
        Platforms that run
      </motion.span>
      <motion.span variants={heroItem} className="hero-title-line">
        <span className="hero-em">Public</span> systems.
      </motion.span>
    </motion.h1>

    <motion.p variants={heroItem} className="hero-desc">
      Innobles builds and operates the software behind government collections,
      disbursements, procurement and citizen services, with 37 products deployed
      with departments, PSUs and institutions across India.
    </motion.p>

    <motion.div variants={heroItem} className="hero-cta-row">
      <Link
        to="/products"
        className="group btn-accent inline-flex items-center justify-center gap-2"
        aria-label="Explore Innobles products"
      >
        <span>Explore Products</span>
        <ArrowRight
          size={16}
          strokeWidth={2}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </Link>

      <Link
        to="/contact"
        className="btn-ghost inline-flex items-center justify-center"
        aria-label="Contact Innobles"
      >
        Talk to Us
      </Link>
    </motion.div>
  </motion.div>
);

export default HeroContent;
