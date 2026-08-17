import rateLimit from "express-rate-limit";

const createLimiter = ({ windowMs, max, message }) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) =>
      res.status(429).json({ success: false, message, errors: [] }),
  });

// Strict — admin registration is a one-time action
const adminRegisterLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: "Too many registration attempts. Please try again later.",
});

// Strict — protect the admin login endpoint from brute force
const adminLoginLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Please try again later.",
});

// Public form — reasonable limit
const contactLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many messages sent. Please try again later.",
});

// Public form — reasonable limit
const applicationLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many applications submitted. Please try again later.",
});

export {
  adminRegisterLimiter,
  adminLoginLimiter,
  contactLimiter,
  applicationLimiter,
};
