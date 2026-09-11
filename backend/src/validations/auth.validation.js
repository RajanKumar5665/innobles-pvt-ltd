import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(80).required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
  }),
  email: Joi.string().email().trim().lowercase().required().messages({
    "string.email": "Please provide a valid email",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).max(100).required().messages({
    "string.min": "Password must be at least 8 characters",
    "any.required": "Password is required",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().max(254).required().messages({
    "string.email": "Please provide a valid email",
    "any.required": "Email is required",
  }),
  // The request body arrives RSA/AES-encrypted and is decrypted by the
  // decryptBody middleware before validation runs, so `password` here is the
  // plaintext (but only ever in server memory — never over the wire).
  password: Joi.string().min(8).max(100).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password must be 100 characters or fewer",
    "any.required": "Password is required",
  }),
});

export { registerSchema, loginSchema };
