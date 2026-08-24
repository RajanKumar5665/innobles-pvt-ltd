import express from "express";
import Joi from "joi";
import validate from "../middleware/validate.middleware.js";
import { uploadImage } from "../middleware/upload.middleware.js";
import ctrl from "../controllers/product.controller.js";
import {
  createProduct,
  updateProduct,
  productStatusSchema,
  productQuerySchema,
} from "../validations/product.validation.js";
import { idParamSchema } from "../validations/common.js";

const slugParamSchema = Joi.object({ slug: Joi.string().trim().required() });
const imageFields = [{ name: "image", maxCount: 1 }];

const publicRouter = express.Router();
publicRouter.get("/", validate(productQuerySchema, "query"), ctrl.getPublicProducts);
publicRouter.get("/:slug", validate(slugParamSchema, "params"), ctrl.getPublicProductBySlug);

const adminRouter = express.Router();
adminRouter.post("/", uploadImage.fields(imageFields), validate(createProduct), ctrl.adminCreateProduct);
adminRouter.get("/", validate(productQuerySchema, "query"), ctrl.adminListProducts);
adminRouter.get("/:id", validate(idParamSchema, "params"), ctrl.adminGetProduct);
adminRouter.put("/:id", uploadImage.fields(imageFields), validate(updateProduct), ctrl.adminUpdateProduct);
adminRouter.patch("/:id/status", validate(productStatusSchema), ctrl.adminUpdateProductStatus);
adminRouter.delete("/:id", validate(idParamSchema, "params"), ctrl.adminDeleteProduct);

export default { publicRouter, adminRouter };