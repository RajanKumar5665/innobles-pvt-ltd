import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import { signToken } from "../utils/jwt.js";
import { ApiError, success } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getCookieName } from "../middleware/auth.middleware.js";

// HttpOnly cookie options matching the JWT lifetime (JWT_EXPIRES_IN, in days).
const cookieOptions = () => {
  const production = process.env.NODE_ENV === "production";
  const expires = process.env.JWT_EXPIRES_IN || "1d";
  const days = /^(\d+)d$/.exec(expires) ? Number(RegExp.$1) : 1;
  return {
    httpOnly: true,
    secure: production,
    sameSite: production ? "none" : "lax",
    maxAge: days * 24 * 60 * 60 * 1000,
    path: "/",
  };
};

// One-time setup: creates the first (and only) admin via Postman.
const register = asyncHandler(async (req, res) => {
  const configuredSecret = process.env.ADMIN_SETUP_SECRET;
  if (!configuredSecret) {
    throw new ApiError(500, "ADMIN_SETUP_SECRET is not configured on the server");
  }

  if (req.headers["x-admin-setup-secret"] !== configuredSecret) {
    throw new ApiError(403, "Invalid setup secret");
  }

  if ((await Admin.countDocuments()) > 0) {
    throw new ApiError(403, "Admin registration is already completed");
  }

  const password = await bcrypt.hash(req.body.password, 12);
  const admin = await Admin.create({
    name: req.body.name,
    email: req.body.email,
    password,
  });

  return success(
    res,
    { id: admin._id.toString(), name: admin.name, email: admin.email, role: admin.role },
    "Admin created successfully",
    201,
  );
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email }).select("+password");
  const passwordMatches = admin && (await bcrypt.compare(password, admin.password));

  // Keep the message generic — don't reveal whether the email exists.
  if (!admin || !admin.isActive || !passwordMatches) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = signToken({ sub: admin._id.toString(), role: admin.role });
  res.cookie(getCookieName(), token, cookieOptions());

  admin.lastLoginAt = new Date();
  await admin.save();

  return success(
    res,
    { id: admin._id.toString(), name: admin.name, email: admin.email, role: admin.role },
    "Login successful",
  );
});

const logout = (req, res) => {
  res.clearCookie(getCookieName(), cookieOptions());
  return success(res, null, "Logged out successfully");
};

const me = (req, res) => success(res, req.admin, "Authenticated admin information");

export default { register, login, logout, me };