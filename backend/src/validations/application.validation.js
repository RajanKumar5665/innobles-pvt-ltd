import Joi from "joi";
import { idParam, pagination } from "./common.js";

const createApplication = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    "any.required": "Name is required",
  }),
  email: Joi.string().email().trim().lowercase().required().messages({
    "string.email": "Please provide a valid email",
    "any.required": "Email is required",
  }),
  phone: Joi.string().trim().allow("", null).max(30),
  coverLetter: Joi.string().trim().allow("", null).max(4000),
});

const careerApplyParamSchema = Joi.object({ careerId: idParam() });

const applicationStatusSchema = Joi.object({
  status: Joi.string().valid("new", "reviewing", "shortlisted", "rejected", "hired").required(),
});

const applicationQuerySchema = pagination.keys({
  search: Joi.string().trim().allow(""),
  status: Joi.string().valid("new", "reviewing", "shortlisted", "rejected", "hired"),
  careerId: Joi.string().hex().length(24),
});

const applicationIdParamSchema = Joi.object({ id: idParam() });

export {
  createApplication,
  careerApplyParamSchema,
  applicationStatusSchema,
  applicationQuerySchema,
  applicationIdParamSchema,
};
