import Joi from "joi";
import { pagination } from "./common.js";

const imageObject = Joi.object({
  url: Joi.string().uri().allow("", null),
  publicId: Joi.string().allow("", null),
});

const baseProduct = {
  name: Joi.string().trim().min(2).max(200).required().messages({
    "any.required": "Name is required",
  }),
  slug: Joi.string().trim().allow("", null).max(200),
  shortDescription: Joi.string().trim().min(1).max(600).required().messages({
    "any.required": "Short description is required",
  }),
  description: Joi.string().trim().min(1).required().messages({
    "any.required": "Description is required",
  }),
  // Optional external link — an empty string / missing value is allowed.
  productLink: Joi.string().trim().uri().allow("", null).max(500),
  link: Joi.string().trim().uri().allow("", null).max(500),
  image: Joi.alternatives()
    .try(Joi.string().uri(), imageObject)
    .allow("", null)
    .optional(),
  imageRemoved: Joi.string().valid("true", "false").allow("").optional(),
  status: Joi.string().valid("draft", "published").default("draft"),
};

const createProduct = Joi.object(baseProduct);
const updateProduct = Joi.object({
  name: baseProduct.name.optional(),
  slug: baseProduct.slug,
  shortDescription: baseProduct.shortDescription.optional(),
  description: baseProduct.description.optional(),
  productLink: baseProduct.productLink,
  link: baseProduct.link,
  image: baseProduct.image,
  imageRemoved: baseProduct.imageRemoved,
  status: baseProduct.status,
});

const productStatusSchema = Joi.object({
  status: Joi.string().valid("draft", "published").required(),
});

const productQuerySchema = pagination.keys({
  search: Joi.string().trim().allow(""),
  status: Joi.string().valid("draft", "published"),
});

export { createProduct, updateProduct, productStatusSchema, productQuerySchema };
