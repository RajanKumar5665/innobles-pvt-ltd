import Joi from "joi";
import { idParam, pagination, phoneString } from "./common.js";

const createContact = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    "any.required": "Name is required",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name must be 100 characters or fewer",
  }),
  email: Joi.string().email().trim().lowercase().max(254).required().messages({
    "string.email": "Please provide a valid email",
    "string.max": "Email must be 254 characters or fewer",
    "any.required": "Email is required",
    "string.empty": "Email is required",
  }),
  phone: phoneString(),
  subject: Joi.string().trim().min(1).max(100).required().messages({
    "any.required": "Please choose a topic",
    "string.empty": "Please choose a topic",
    "string.max": "Topic must be 100 characters or fewer",
  }),
  message: Joi.string().trim().min(10).max(1000).required().messages({
    "any.required": "Message is required",
    "string.empty": "Message is required",
    "string.min": "Message must be at least 10 characters",
    "string.max": "Message must be 1000 characters or fewer",
  }),
  // NOTE: `status` is intentionally NOT part of the public schema. stripUnknown
  // drops it, so a website visitor can never mark their own message as
  // read/resolved.
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
