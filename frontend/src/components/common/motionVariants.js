/**
 * Shared Framer Motion animation variants for the public frontend.
 *
 * Keeping reusable, performance-friendly (GPU-accelerated `transform`/`opacity`
 * only) entrance variants in one place lets every homepage section and card
 * grid animate with the same smooth, lightweight feel.
 */

/** Simple fade + slight upward rise used by individual cards grid items. */
export const fadeUpItem = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Stagger orchestration for a grid/group container (matches `.StaggerItem`). */
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

/** Soft fade-up for headings / standalone blocks. */
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};