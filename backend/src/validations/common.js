import Joi from "joi";

const idParam = () =>
  Joi.string().hex().length(24).required().messages({
    "string.hex": "Invalid id format",
    "any.required": "id is required",
  });

const slugParam = () => Joi.string().trim().min(1).max(220).required();

const pageField = () => Joi.number().integer().min(1).default(1);
const limitField = () => Joi.number().integer().min(1).max(50).default(10);

const pagination = Joi.object({
  page: pageField(),
  limit: limitField(),
});

const idParamSchema = Joi.object({ id: idParam() });

export { idParam, slugParam, pageField, limitField, pagination, idParamSchema };

