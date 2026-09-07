// Shared Framer Motion animation variants used across the frontend.
// Kept GPU-friendly (only transform/opacity) so cards animate smoothly.

// Simple fade + small upward rise for individual cards.
export const fadeUpItem = {
  hidden: { opacity: 0, y: 36, scale: 0.965 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Stagger the cards appearing one after another in a grid.
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
};

const heroEase = [0.22, 1, 0.36, 1];

export const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

export const heroItem = {
  hidden: { opacity: 0, y: 36, scale: 0.96, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.78, ease: heroEase },
  },
};
