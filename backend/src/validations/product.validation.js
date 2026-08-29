import Joi from "joi";
import { pagination } from "./common.js";

const imageObject = Joi.object({
  url: Joi.string().uri().allow("", null),
  publicId: Joi.string().allow("", null),
});

// Must match the category labels in frontend/src/config/productCategories.js.
const PRODUCT_CATEGORY_LABELS = [
  "Collections",
  "Disbursements",
  "Treasury & Finance",
  "Bank Instruments",
  "Procurement",
  "Governance & Citizen Services",
  "Sector Solutions",
  "Workforce & Operations",
];

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
  // Category uses a controlled value so duplicate/incorrect spellings are
  // rejected instead of silently creating new categories.
  category: Joi.string()
    .trim()
    .valid(...PRODUCT_CATEGORY_LABELS)
    .allow("")
    .default("")
    .messages({ "any.only": "Please select a valid product category" }),
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
  category: baseProduct.category,
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
  category: Joi.string().trim().allow(""),
});

export { createProduct, updateProduct, productStatusSchema, productQuerySchema };
