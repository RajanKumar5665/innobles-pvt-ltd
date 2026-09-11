import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import { ApiError, success } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getCookieName, getRefreshCookieName } from "../middleware/auth.middleware.js";

// Parses a jsonwebtoken-style TTL string ("30s", "1m", "2h", "7d") into
// milliseconds, so the HttpOnly cookie keeps the exact same lifetime as the
// token it stores. Falls back to `fallbackMs` for missing/malformed values.
const ttlToMs = (ttl, fallbackMs) => {
  const match = /^(\d+)\s*(s|m|h|d)$/i.exec(ttl || "");
  if (!match) return fallbackMs;
  const value = Number(match[1]);
  const unit = match[2].toLowerCase();
  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };
  return value * multipliers[unit];
};

// Access-token cookie: short-lived (matches JWT_EXPIRES_IN, default 1 min).
const accessCookieOptions = () => {
  const production = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: production,
    sameSite: production ? "none" : "lax",
    maxAge: ttlToMs(process.env.JWT_EXPIRES_IN, 1 * 60 * 1000),
    path: "/",
  };
};

// Refresh-token cookie: matches JWT_REFRESH_EXPIRES_IN (default 7 days).
const refreshCookieOptions = () => {
  const production = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: production,
    sameSite: production ? "none" : "lax",
    maxAge: ttlToMs(process.env.JWT_REFRESH_EXPIRES_IN, 7 * 24 * 60 * 60 * 1000),
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

  if (!admin || !admin.isActive || !passwordMatches) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = signAccessToken({ sub: admin._id.toString(), role: admin.role });
  const refreshToken = signRefreshToken({ sub: admin._id.toString() });

  res.cookie(getCookieName(), accessToken, accessCookieOptions());
  res.cookie(getRefreshCookieName(), refreshToken, refreshCookieOptions());

  admin.lastLoginAt = new Date();
  await admin.save();

  return success(
    res,
    { id: admin._id.toString(), name: admin.name, email: admin.email, role: admin.role },
    "Login successful",
  );
});

// Uses the long-lived refresh cookie to mint a fresh 15-min access token.
const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.[getRefreshCookieName()];
  if (!token) throw new ApiError(401, "No refresh token");

  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch {
    throw new ApiError(401, "Refresh token invalid or expired");
  }

  const admin = await Admin.findById(payload.sub);
  if (!admin || !admin.isActive) throw new ApiError(401, "Admin not found");

  const accessToken = signAccessToken({ sub: admin._id.toString(), role: admin.role });
  res.cookie(getCookieName(), accessToken, accessCookieOptions());

  return success(res, null, "Token refreshed");
});

const logout = (req, res) => {
  res.clearCookie(getCookieName(), accessCookieOptions());
  res.clearCookie(getRefreshCookieName(), refreshCookieOptions());
  return success(res, null, "Logged out successfully");
};

const me = (req, res) => success(res, req.admin, "Authenticated admin information");

export default { register, login, logout, me, refresh };