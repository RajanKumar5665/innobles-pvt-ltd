export class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
  }
}

export const success = (res, data, message = "Operation successful", status = 200, extra = {}) =>
  res.status(status).json({ success: true, message, data, ...extra });