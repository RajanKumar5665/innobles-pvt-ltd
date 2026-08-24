import Joi from "joi";

const idParam = () =>
  Joi.string().hex().length(24).required().messages({
    "string.hex": "Invalid id format",
    "any.required": "id is required",
  });

const pagination = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(10),
});

const idParamSchema = Joi.object({ id: idParam() });

export { idParam, pagination, idParamSchema };

