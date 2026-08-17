import express from "express";
import validate from "../middleware/validate.middleware.js";
import { requireAdmin } from "../middleware/auth.middleware.js";
import { adminRegisterLimiter, adminLoginLimiter, } from "../middleware/rateLimit.middleware.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

// One-time initial admin creation (Postman only, via x-admin-setup-secret header).
router.post(
  "/register",
  adminRegisterLimiter,
  validate(registerSchema),
  authController.register,
);

router.post("/login", adminLoginLimiter, validate(loginSchema), authController.login);

router.post("/logout", authController.logout);

router.get("/me", requireAdmin, authController.me);

export default router;
