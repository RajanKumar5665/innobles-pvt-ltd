import Joi from "joi";
import { idParam } from "./common.js";

const imageObject = Joi.object({
  url: Joi.string().uri().allow("", null),
  publicId: Joi.string().allow("", null),
});

const heroSchema = Joi.object({
  title: Joi.string().trim().allow("", null).max(200),
  highlightedText: Joi.string().trim().allow("", null).max(200),
  description: Joi.string().allow("", null),
  image: Joi.alternatives().try(Joi.string().uri(), imageObject).allow("", null),
  buttonText: Joi.string().trim().allow("", null).max(80),
  buttonLink: Joi.string().trim().allow("", null).max(200),
});

const highlightSchema = Joi.object({
  icon: Joi.string().allow("", null).max(80),
  title: Joi.string().allow("", null).max(120),
  description: Joi.string().allow("", null),
});

const ctaSchema = Joi.object({
  title: Joi.string().trim().allow("", null).max(200),
  description: Joi.string().allow("", null),
  buttonText: Joi.string().trim().allow("", null).max(80),
  buttonLink: Joi.string().trim().allow("", null).max(200),
});

const updateHome = Joi.object({
  hero: heroSchema,
  highlights: Joi.array().items(highlightSchema),
  featuredProducts: Joi.array().items(idParam()),
  featuredBlogs: Joi.array().items(idParam()),
  cta: ctaSchema,
});

export { updateHome };
