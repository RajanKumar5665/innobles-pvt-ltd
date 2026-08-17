import { verifyToken } from "../utils/jwt.js";
import Admin from "../models/Admin.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiResponse.js";

const getCookieName = () => process.env.JWT_COOKIE_NAME || "token";

/**
 * Protect admin routes: reads the HttpOnly JWT cookie, verifies it,
 * loads the admin and checks the account is active.
 * On success sets req.admin and calls next().
 */
const requireAdmin = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.[getCookieName()];
  if (!token) {
    throw new ApiError(401, "Not authenticated");
  }

  let payload;
  try {
    payload = verifyToken(token);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired session");
  }

  const admin = await Admin.findById(payload.sub);
  if (!admin || !admin.isActive) {
    throw new ApiError(403, "You are not authorized to perform this action");
  }

  req.admin = {
    id: admin._id.toString(),
    name: admin.name,
    email: admin.email,
    role: admin.role,
  };
  return next();
});

/**
 * Role guard — extensible for "super-admin"-only actions later.
 */
const requireRole = (...roles) => (req, res, next) => {
  if (!req.admin || !roles.includes(req.admin.role)) {
    return next(new ApiError(403, "You do not have permission to perform this action"));
  }
  return next();
};

export { requireAdmin, requireRole, getCookieName };
