import Joi from "joi";
import { pagination } from "./common.js";

const imageObject = Joi.object({
  url: Joi.string().uri().allow("", null),
  publicId: Joi.string().allow("", null),
});

const baseBlog = {
  title: Joi.string().trim().min(3).max(200).required().messages({
    "any.required": "Title is required",
  }),
  category: Joi.string().trim().min(1).max(80).required().messages({
    "any.required": "Category is required",
  }),
  description: Joi.string().trim().allow("", null).max(10000),
  content: Joi.string().allow("", null),
  image: Joi.alternatives().try(Joi.string().uri(), imageObject).allow("", null),
  author: Joi.string().trim().allow("", null).max(100),
  authorAvatar: Joi.string().uri().allow("", null),
  status: Joi.string().valid("draft", "published").default("draft"),
};

const createBlog = Joi.object(baseBlog);

const updateBlog = Joi.object({ ...baseBlog, title: baseBlog.title.optional() });

const blogStatusSchema = Joi.object({
  status: Joi.string().valid("draft", "published").required(),
});

const blogSlugSchema = Joi.object({ slug: Joi.string().trim().required() });

const blogQuerySchema = pagination.keys({
  search: Joi.string().trim().allow(""),
  category: Joi.string().trim().allow(""),
  status: Joi.string().valid("draft", "published"),
});

export {
  createBlog,
  updateBlog,
  blogStatusSchema,
  blogSlugSchema,
  blogQuerySchema,
};
