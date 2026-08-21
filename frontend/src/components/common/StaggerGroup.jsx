import { motion } from "framer-motion";
import { fadeUpItem, staggerContainer } from "./motionVariants";

/**
 * Reusable staggered-entrance container for card grids.
 *
 * Wrap the grid in `<StaggerGroup>` and each card in a matching `<StaggerItem>`
 * (a motion element carrying the same `hidden` / `visible` variant labels) so
 * cards rise into view one after another once the grid is in the viewport.
 */
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

/**
 * One animated grid item. Must be a direct child of `StaggerGroup` to take part
 * in the staggered entrance. The item itself never animates transform after the
 * entrance completes, so inner CSS hover lifts (cards, buttons) always work.
 */
export const StaggerItem = ({ children, className = "", ...rest }) => (
  <motion.div variants={fadeUpItem} className={className} {...rest}>
    {children}
  </motion.div>
);

export default StaggerGroup;