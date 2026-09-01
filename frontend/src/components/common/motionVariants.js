// Shared Framer Motion animation variants used across the frontend.
// Kept GPU-friendly (only transform/opacity) so cards animate smoothly.

// Simple fade + small upward rise for individual cards.
export const fadeUpItem = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Stagger the cards appearing one after another in a grid.
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};