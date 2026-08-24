import { verifyToken } from "../utils/jwt.js";
import Admin from "../models/Admin.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiResponse.js";

export const getCookieName = () => process.env.JWT_COOKIE_NAME || "token";

// Reads the HttpOnly JWT cookie, verifies it, and loads the active admin onto req.admin.
export const requireAdmin = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.[getCookieName()];
  if (!token) throw new ApiError(401, "Not authenticated");

  let payload;
  try {
    payload = verifyToken(token);
  } catch {
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