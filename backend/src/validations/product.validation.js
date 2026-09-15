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
  // rejected instead of silently creating new categories. UPDATE stays
  // permissive so legacy records without a category can still be saved; CREATE
  // (below) requires one because the admin form does.
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

// CREATE requires a category — this rule lives OUTSIDE baseProduct so it is
// never passed as a separate body key (Joi would otherwise reject the payload
// for containing an unexpected `categoryOnCreate` key).
const categoryOnCreate = Joi.string()
  .trim()
  .valid(...PRODUCT_CATEGORY_LABELS)
  .min(1)
  .required()
  .messages({
    "any.only": "Please select a valid product category",
    "any.required": "Please select a category",
    "string.empty": "Please select a category",
  });

const createProduct = Joi.object({
  ...baseProduct,
  category: categoryOnCreate,
});
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

const productQuerySchema = pagination.keys({
  search: Joi.string().trim().allow(""),
  status: Joi.string().valid("draft", "published"),
  category: Joi.string().trim().allow(""),
});

export { createProduct, updateProduct, productQuerySchema };
