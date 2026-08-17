import Joi from "joi";
import { idParam, pagination } from "./common.js";

const baseCareer = {
  title: Joi.string().trim().min(3).max(200).required().messages({
    "any.required": "Title is required",
  }),
  department: Joi.string().trim().min(1).max(80).required().messages({
    "any.required": "Department is required",
  }),
  location: Joi.string().trim().allow("", null).max(120),
  jobType: Joi.string().valid("full-time", "part-time", "contract", "internship"),
  description: Joi.string().allow("", null),
  responsibilities: Joi.array().items(Joi.string().allow("")),
  requirements: Joi.array().items(Joi.string().allow("")),
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
