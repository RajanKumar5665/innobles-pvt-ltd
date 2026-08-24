import { ApiError } from "../utils/apiResponse.js";

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

  // On newer Node versions req.query is read-only, so replace it via defineProperty.
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