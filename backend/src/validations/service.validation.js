import Joi from "joi";

const serviceStatusSchema = Joi.object({
  status: Joi.string().valid("draft", "published").required(),
});

const serviceQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  search: Joi.string().allow("").default(""),
  status: Joi.string().valid("draft", "published").allow("").default(""),
});

export {
  serviceStatusSchema,
  serviceQuerySchema,
};
