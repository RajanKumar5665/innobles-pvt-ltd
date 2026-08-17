import Joi from "joi";
import { idParam, pagination } from "./common.js";

const createContact = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    "any.required": "Name is required",
  }),
  email: Joi.string().email().trim().lowercase().required().messages({
    "string.email": "Please provide a valid email",
    "any.required": "Email is required",
  }),
  phone: Joi.string().trim().allow("", null).max(30),
  subject: Joi.string().trim().allow("", null).max(200),
  message: Joi.string().trim().min(3).max(4000).required().messages({
    "any.required": "Message is required",
  }),
  status: Joi.string().valid("unread", "read", "resolved"),
});

const contactStatusSchema = Joi.object({
  status: Joi.string().valid("unread", "read", "resolved").required(),
});

const contactQuerySchema = pagination.keys({
  search: Joi.string().trim().allow(""),
  status: Joi.string().valid("unread", "read", "resolved"),
});

const contactIdParamSchema = Joi.object({ id: idParam() });

export { createContact, contactStatusSchema, contactQuerySchema, contactIdParamSchema };
