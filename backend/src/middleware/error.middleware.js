import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { MulterError } from "multer";
import { ApiError } from "../utils/apiResponse.js";

// Central error handler — maps framework/DB errors to clean JSON and never
// leaks stack traces to clients.
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";
  let errors = err.errors || [];

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((e) => ({
      field: e.path || "path",
      message: e.message,
    }));
  } else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = "Invalid id format";
    errors = [
      { field: err.path || "id", message: "Invalid identifier provided" },
    ];
  } else if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate value";
    const field = Object.keys(err.keyValue || {})[0];
    errors = [{ field, message: `${field} already exists` }];
  } else if (
    err instanceof jwt.JsonWebTokenError ||
    err instanceof jwt.TokenExpiredError
  ) {
    statusCode = 401;
    message = "Invalid or expired token";
  } else if (err instanceof MulterError) {
    statusCode = 400;
    message = err.message;
  }

  // Log unexpected errors server-side only.
  if (statusCode >= 500) {
    console.error(`[${new Date().toISOString()}] Server error:`, err);
  }

  if (res.headersSent) return next(err);
  return res.status(statusCode).json({ success: false, message, errors });
};

export default errorHandler;
