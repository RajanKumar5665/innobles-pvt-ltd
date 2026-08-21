import { motion } from "framer-motion";


const AnimatedSection = ({
  children,
  className = "",
  as = "section",
  delay = 0,
  y = 26,
  amount = 0.25,
  once = true,
  ...rest
}) => {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default AnimatedSection;