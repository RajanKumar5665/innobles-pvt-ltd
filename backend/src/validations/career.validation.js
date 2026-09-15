import Joi from "joi";
import { idParam, pagination } from "./common.js";

const baseCareer = {
  title: Joi.string().trim().min(3).max(200).required().messages({
    "any.required": "Title is required",
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must be 200 characters or fewer",
  }),
  department: Joi.string().trim().min(1).max(80).required().messages({
    "any.required": "Department is required",
    "string.max": "Department must be 80 characters or fewer",
  }),
  location: Joi.string().trim().allow("", null).max(120),
  jobType: Joi.string().valid("full-time", "part-time", "contract", "internship"),
  experience: Joi.string().trim().allow("", null).max(120),
  description: Joi.string().allow("", null).max(10000),
  responsibilities: Joi.array().items(Joi.string().allow("").max(1000)),
  requirements: Joi.array().items(Joi.string().allow("").max(1000)),
  status: Joi.string().valid("open", "closed").default("open"),
  closingDate: Joi.date().allow(null),
};

const createCareer = Joi.object(baseCareer);
const updateCareer = Joi.object({ ...baseCareer, title: baseCareer.title.optional() });

const careerStatusSchema = Joi.object({
  status: Joi.string().valid("open", "closed").required(),
});

const careerQuerySchema = pagination.keys({
  search: Joi.string().trim().allow(""),
  department: Joi.string().trim().allow(""),
  location: Joi.string().trim().allow(""),
  jobType: Joi.string().valid("full-time", "part-time", "contract", "internship"),
  status: Joi.string().valid("open", "closed"),
});

const careerIdParamSchema = Joi.object({ id: idParam() });

export {
  createCareer,
  updateCareer,
  careerStatusSchema,
  careerQuerySchema,
  careerIdParamSchema,
};
