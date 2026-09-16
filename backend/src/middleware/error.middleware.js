import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { MulterError } from "multer";
import { ApiError } from "../utils/apiResponse.js";

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";
  let errors = err.errors || [];

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else if (err instanceof mongoose.Error.ValidationError) {
    // mongoose gives errors as an object keyed by field, flatten it to an array
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
    // mongo duplicate key error, grab the field name from keyValue
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

  if (statusCode >= 500) {
    console.error(`[${new Date().toISOString()}] Server error:`, err);
  }

  // if response already started streaming, delegate to express's default handler
  if (res.headersSent) return next(err);

  return res.status(statusCode).json({ success: false, message, errors });
};

export default errorHandler;