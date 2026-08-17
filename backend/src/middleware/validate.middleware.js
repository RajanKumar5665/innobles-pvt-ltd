import { ApiError } from "../utils/apiResponse.js";

/**
 * Validate a request part against a Joi schema before it reaches the controller.
 * @param {object} schema Joi schema
 * @param {string} source "body" | "query" | "params"
 */
const validate = (schema, source = "body") => (req, res, next) => {
  const { error, value } = schema.validate(req[source], {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = error.details.map((d) => ({
      field: d.path.join("."),
      message: d.message,
    }));
    return next(new ApiError(400, "Validation failed", errors));
  }

  // On Node >= 17, `req.query` is exposed as a read-only getter on
  // IncomingMessage, so a plain assignment (`req.query = value`) throws.
  // Replace it via defineProperty instead so controllers receive the
  // validated + stripped value.
  if (source === "query") {
    Object.defineProperty(req, "query", {
      value,
      writable: true,
      configurable: true,
      enumerable: true,
    });
  } else {
    req[source] = value;
  }

  return next();
};

export default validate;
