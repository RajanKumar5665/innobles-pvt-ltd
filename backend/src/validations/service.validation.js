import Joi from "joi";

const imageObject = Joi.object({
  url: Joi.string().allow("", null),
  publicId: Joi.string().allow("", null),
});

/**
 * `features` arrives as an array when multiple FormData entries are used, or as
 * a single string when only one feature line is submitted. Accept either and
 * let the controller normalize it into an array.
 */
const features = Joi.alternatives()
  .try(
    Joi.array().items(Joi.string().trim().min(1).max(200)).min(1).max(30),
    Joi.string().trim().min(1).max(200),
  )
  .required()
  .messages({
    "any.required": "Features are required",
    "array.min": "Add at least one feature",
  });

const titleRule = (isRequired) =>
  Joi.string()
    .trim()
    .min(1)
    .max(200)
    .required(isRequired)
    .messages({ "any.required": "Title is required" });

const shortDescriptionRule = (isRequired) =>
  Joi.string()
    .trim()
    .min(1)
    .max(200)
    .required(isRequired)
    .messages({
      "any.required": "Short description is required",
      "string.max": "Short description must be 200 characters or fewer",
    });

const descriptionRule = (isRequired) =>
  Joi.string().trim().min(1).max(10000).required(isRequired);

const categoryRule = (isRequired) => {
  // Optional category: allow a missing value, an empty string ("Not selected")
  // or null so a service can be created/persisted without a category.
  let schema = Joi.string().trim().max(80).messages({ "any.required": "Category is required" });
  schema = isRequired ? schema.min(1).required() : schema.allow("", null).default("");
  return schema;
};

const statusRule = (isRequired) =>
  Joi.string()
    .valid("draft", "published", "archived")
    .required(isRequired)
    .default("draft");

const createService = Joi.object({
  title: titleRule(true),
  shortDescription: shortDescriptionRule(true),
  description: descriptionRule(true),
  features,
  // Category is optional — a service may be created without one.
  category: categoryRule(false),
  status: statusRule(false),
  banner: Joi.alternatives()
    .try(Joi.string().uri(), imageObject)
    .allow("", null)
    .optional(),
  bannerRemoved: Joi.string().valid("true", "false").allow("").optional(),
});

// Update keeps every field optional so existing (legacy) services that lack
// the new fields — such as category or banner — can still be saved without
// being forced to backfill them before the admin adds the values.
const updateService = Joi.object({
  title: titleRule(false),
  shortDescription: shortDescriptionRule(false),
  description: descriptionRule(false),
  features: Joi.alternatives()
    .try(
      Joi.array().items(Joi.string().trim().min(1).max(200)).min(1).max(30),
      Joi.string().trim().min(1).max(200),
    )
    .optional(),
  category: categoryRule(false),
  status: Joi.string().valid("draft", "published", "archived").allow("", null),
  banner: Joi.alternatives()
    .try(Joi.string().uri(), imageObject)
    .allow("", null)
    .optional(),
  bannerRemoved: Joi.string().valid("true", "false").allow("").optional(),
});

const serviceStatusSchema = Joi.object({
  status: Joi.string().valid("draft", "published", "archived").required(),
});

const serviceQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  search: Joi.string().allow("").default(""),
  status: Joi.string().valid("draft", "published", "archived").allow("").default(""),
});

export {
  createService,
  updateService,
  serviceStatusSchema,
  serviceQuerySchema,
};
