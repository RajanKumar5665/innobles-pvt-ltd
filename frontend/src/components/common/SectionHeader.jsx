import { motion } from "framer-motion";

/**
 * Consistent, animated section heading: eyebrow pill + title + optional
 * subtitle. Fades/slides in when the section scrolls into view.
 */
const SectionHeader = ({ eyebrow, title, subtitle, align = "left", id, as = "h2" }) => {
  const center = align === "center";
  const Heading = as;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}
    >
      {eyebrow ? (
        <p className={`pill-eyebrow mb-4 ${center ? "justify-center" : ""}`}>
          <span className="pill-dot" />
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <Heading id={id} className="font-disp text-3xl font-bold leading-tight text-ink md:text-4xl">
          {title}
        </Heading>
      ) : null}
      {subtitle ? (
        <p className={`mt-4 text-slate-600 md:text-lg ${center ? "text-center" : ""}`}>{subtitle}</p>
      ) : null}
    </motion.div>
  );
};

export default SectionHeader;