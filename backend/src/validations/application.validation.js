import Joi from "joi";
import { idParam, pagination, phoneString } from "./common.js";

const createApplication = Joi.object({
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
  coverLetter: Joi.string().trim().allow("", null).min(10).max(4000),
});

const careerApplyParamSchema = Joi.object({ careerId: idParam() });

const applicationStatusSchema = Joi.object({
  status: Joi.string().valid("new", "reviewing", "shortlisted", "rejected", "hired").required(),
});

const applicationQuerySchema = pagination.keys({
  search: Joi.string().trim().allow(""),
  status: Joi.string().valid("new", "reviewing", "shortlisted", "rejected", "hired"),
  careerId: Joi.string().hex().length(24),
  sort: Joi.string().valid(
    "name",
    "-name",
    "status",
    "-status",
    "createdAt",
    "-createdAt",
  ),
});

const applicationIdParamSchema = Joi.object({ id: idParam() });

export {
  createApplication,
  careerApplyParamSchema,
  applicationStatusSchema,
  applicationQuerySchema,
  applicationIdParamSchema,
};
