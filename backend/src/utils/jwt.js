import jwt from "jsonwebtoken";

const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("JWT_SECRET is not configured on the server");
    }
    return "dev-only-insecure-secret-change-me";
  }
  return secret;
};

const getRefreshSecret = () => {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("JWT_REFRESH_SECRET is not configured on the server");
    }
    return "dev-only-insecure-refresh-secret-change-me";
  }
  return secret;
};

export const signToken = (payload) =>
  jwt.sign(payload, getSecret(), {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });

export const verifyToken = (token) => jwt.verify(token, getSecret());

// --- Access / refresh pair ---
export const signAccessToken = (payload) =>
  jwt.sign(payload, getSecret(), {
    expiresIn: process.env.JWT_EXPIRES_IN || "1m",
  });

export const verifyAccessToken = (token) => jwt.verify(token, getSecret());

export const signRefreshToken = (payload) =>
  jwt.sign(payload, getRefreshSecret(), {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "2m",
  });

export const verifyRefreshToken = (token) => jwt.verify(token, getRefreshSecret());