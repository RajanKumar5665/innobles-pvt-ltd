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

// Registration is a one-time action, so it gets a strict limit.
export const adminRegisterLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: "Too many registration attempts. Please try again later.",
});

export const adminLoginLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Please try again later.",
});

export const contactLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many messages sent. Please try again later.",
});

export const applicationLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many applications submitted. Please try again later.",
});