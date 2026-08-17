/**
 * Consistent API response helpers + a small operational error class.
 */

class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
  }
}

/**
 * Send a success response.
 * @param {object} res Express response
 * @param {*} data Response payload for the `data` key
 * @param {string} message
 * @param {number} status HTTP status code
 * @param {object} extra Optional extra keys (e.g. pagination)
 */
const success = (res, data, message = "Operation successful", status = 200, extra = {}) =>
  res.status(status).json({ success: true, message, data, ...extra });

/** Send a generic failure response (mostly used explicitly outside errors middleware). */
const fail = (res, status, message, errors = []) =>
  res.status(status).json({ success: false, message, errors });

export { ApiError, success, fail };
