import Joi from "joi";

const imageObject = Joi.object({
  url: Joi.string().allow("", null),
  publicId: Joi.string().allow("", null),
});

// Images arrive as multipart files, so the schema only accepts a removal flag
// plus a backward-compatible URL/object value.
const imageAlternative = Joi.alternatives()
  .try(Joi.string().uri(), imageObject)
  .allow("", null);

const teamMemberSchema = Joi.object({
  name: Joi.string().trim().min(1).max(200).required().messages({
    "any.required": "Name is required",
    "string.min": "Name is required",
  }),
  role: Joi.string().trim().allow("", null).max(200),
  description: Joi.string().allow("", null),
  linkedin: Joi.string().trim().uri().allow("", null).max(300).messages({
    "string.uri": "LinkedIn URL must be a valid URL",
  }),
  image: imageAlternative.optional(),
  imageRemoved: Joi.string().valid("true", "false").allow("").optional(),
});

const locationSchema = Joi.object({
  city: Joi.string().trim().min(1).max(200).required().messages({
    "any.required": "City is required",
    "string.min": "City is required",
  }),
  country: Joi.string().trim().allow("", null).max(200),
  address: Joi.string().allow("", null),
  phone: Joi.string().trim().allow("", null).max(60),
  email: Joi.string().trim().email().allow("", null).max(200).messages({
    "string.email": "Please enter a valid email address",
  }),
  mapLink: Joi.string().trim().uri().allow("", null).max(300).messages({
    "string.uri": "Map URL must be a valid URL",
  }),
  description: Joi.string().allow("", null),
  image: imageAlternative.optional(),
  imageRemoved: Joi.string().valid("true", "false").allow("").optional(),
});

const statisticSchema = Joi.object({
  value: Joi.string().trim().min(1).max(80).required().messages({
    "any.required": "Value is required",
    "string.min": "Value is required",
  }),
  label: Joi.string().trim().min(1).max(200).required().messages({
    "any.required": "Label is required",
    "string.min": "Label is required",
  }),
  active: Joi.boolean().optional(),
});

// Reorder payload: an ordered array of subdocument ids.
const reorderSchema = Joi.object({
  ids: Joi.array()
    .items(Joi.string().hex().length(24))
    .required()
    .messages({ "any.required": "ids are required" }),
});

export {
  teamMemberSchema,
  locationSchema,
  statisticSchema,
  reorderSchema,
};