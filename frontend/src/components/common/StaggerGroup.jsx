import { motion } from "framer-motion";
import { fadeUpItem, staggerContainer } from "./motionVariants";

// Wrap a grid so its cards fade/slide in one after another.
// Use <StaggerGroup> for the grid and <StaggerItem> for each card.
const StaggerGroup = ({ children, className = "", amount = "some", as = "div", ...rest }) => {
  const Tag = motion[as];
  return (
    <Tag
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// One animated card in the grid. Must be a direct child of <StaggerGroup>.
export const StaggerItem = ({ children, className = "", ...rest }) => (
  <motion.div variants={fadeUpItem} className={className} {...rest}>
    {children}
  </motion.div>
);

export default StaggerGroup;