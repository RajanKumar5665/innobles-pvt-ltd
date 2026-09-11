import express from "express";
import validate from "../middleware/validate.middleware.js";
import { uploadImage } from "../middleware/upload.middleware.js";
import ctrl from "../controllers/product.controller.js";
import {
  createProduct,
  updateProduct,
  productQuerySchema,
} from "../validations/product.validation.js";
import { idParamSchema } from "../validations/common.js";

const imageFields = [{ name: "image", maxCount: 1 }];

const publicRouter = express.Router();
publicRouter.get("/", validate(productQuerySchema, "query"), ctrl.getPublicProducts);

const adminRouter = express.Router();
adminRouter.post("/", uploadImage.fields(imageFields), validate(createProduct), ctrl.adminCreateProduct);
adminRouter.get("/", validate(productQuerySchema, "query"), ctrl.adminListProducts);
adminRouter.put("/:id", uploadImage.fields(imageFields), validate(updateProduct), ctrl.adminUpdateProduct);
adminRouter.delete("/:id", validate(idParamSchema, "params"), ctrl.adminDeleteProduct);

export default { publicRouter, adminRouter };