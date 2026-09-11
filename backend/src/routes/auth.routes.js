import express from "express";
import validate from "../middleware/validate.middleware.js";
import { requireAdmin } from "../middleware/auth.middleware.js";
import {
  adminRegisterLimiter,
  adminLoginLimiter,
} from "../middleware/rateLimit.middleware.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";
import authController from "../controllers/auth.controller.js";
import { getPublicKey } from "../utils/crypto.js";
import { success } from "../utils/apiResponse.js";
const router = express.Router();

// One-time setup (Postman only, protected by x-admin-setup-secret header).
router.post("/register", adminRegisterLimiter, validate(registerSchema), authController.register);

router.post("/login", adminLoginLimiter, validate(loginSchema), authController.login);

router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);

router.get("/me", requireAdmin, authController.me);


router.get("/public-key", (req, res) => {
  res.set("Cache-Control", "no-store");
  return success(res, { key: getPublicKey() }, "Public key fetched");
});

export default router;