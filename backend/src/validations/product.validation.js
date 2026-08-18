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
  shortDescription: Joi.string().trim().allow("", null).max(600),
  description: Joi.string().allow("", null),
  link: Joi.string().trim().uri().allow("", null).max(500),
  specifications: Joi.alternatives().try(
    Joi.array().items(Joi.string().allow("", null)),
    Joi.array().items(Joi.object()),
    Joi.object({}),
    Joi.string().allow("", null),
  ),
  images: Joi.array().items(imageObject).max(6),
  status: Joi.string().valid("draft", "published").default("draft"),
};

const createProduct = Joi.object(baseProduct);
const updateProduct = Joi.object({ ...baseProduct, name: baseProduct.name.optional() });

const productStatusSchema = Joi.object({
  status: Joi.string().valid("draft", "published").required(),
});

const productQuerySchema = pagination.keys({
  search: Joi.string().trim().allow(""),
  status: Joi.string().valid("draft", "published"),
});

export { createProduct, updateProduct, productStatusSchema, productQuerySchema };
