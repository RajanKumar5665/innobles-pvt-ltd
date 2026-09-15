import Joi from "joi";

const idParam = () =>
  Joi.string().hex().length(24).required().messages({
    "string.hex": "Invalid id format",
    "any.required": "id is required",
  });

const pagination = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(10),
});

const idParamSchema = Joi.object({ id: idParam() });

// Optional phone number: empty is allowed, but a non-empty value must be a
// valid Indian mobile (optional +91/0 prefix + 10 digits starting 6-9) or a
// general E.164 international number (leading + and 7-14 digits). Spaces and
// hyphens are allowed purely for readability and are stripped before
// validating, so the 15-character cap is applied to the COMPACT form
// ("+91 98765 43210" is exactly 15 compact digits and must stay accepted).
const phoneString = () =>
  Joi.string()
    .trim()
    .allow("", null)
    .custom((value, helpers) => {
      if (!value) return value;
      const compact = String(value).replace(/[\s-]/g, "");
      if (compact.length > 15) {
        return helpers.error("string.max");
      }
      const valid =
        /^(\+?91|0)?[6-9]\d{9}$/.test(compact) || /^\+\d{7,14}$/.test(compact);
      if (!valid) return helpers.error("string.invalidPhone");
      return value;
    })
    .messages({
      "string.invalidPhone": "Please enter a valid phone number",
      "string.max": "Phone number must be 15 digits or fewer",
    });

export { idParam, pagination, idParamSchema, phoneString };

