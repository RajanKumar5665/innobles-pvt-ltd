import { motion } from "framer-motion";
import HeroBackdrop from "./HeroBackdrop";
import { heroItem, heroStagger } from "./motionVariants";

const PageHero = ({
  eyebrow,
  title,
  highlight,
  afterHighlight,
  description,
  children,
  className = "",
}) => (
  <section className={`page-hero ${className}`}>
    <HeroBackdrop />
    <motion.div
      className="container-x relative z-[1] text-center"
      variants={heroStagger}
      initial="hidden"
      animate="visible"
    >
      {eyebrow ? (
        <motion.p variants={heroItem} className="eyebrow mb-5 justify-center">
          {eyebrow}
        </motion.p>
      ) : null}

      <motion.h1
        variants={heroItem}
        className="mx-auto max-w-3xl font-disp text-4xl font-bold uppercase leading-[1.08] tracking-tight text-ink md:text-5xl lg:text-[3.5rem]"
      >
        {title}
        {highlight ? (
          <>
            {" "}
            <span className="page-hero-em">{highlight}</span>
          </>
        ) : null}
        {afterHighlight ? <> {afterHighlight}</> : null}
      </motion.h1>

      {description ? (
        <motion.p
          variants={heroItem}
          className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-slate-500 md:text-lg"
        >
          {description}
        </motion.p>
      ) : null}

      {children ? (
        <motion.div variants={heroItem} className="mt-8">
          {children}
        </motion.div>
      ) : null}
    </motion.div>
  </section>
);

export default PageHero;
