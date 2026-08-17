import jwt from "jsonwebtoken";

/**
 * Sign a JWT. Keep the payload minimal — never put passwords or the
 * setup secret inside the token.
 */
const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

export { signToken, verifyToken };
