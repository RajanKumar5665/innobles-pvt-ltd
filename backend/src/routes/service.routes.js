import express from "express";
import validate from "../middleware/validate.middleware.js";
import { uploadImage } from "../middleware/upload.middleware.js";
import ctrl from "../controllers/service.controller.js";
import {
  createService,
  updateService,
  serviceQuerySchema,
} from "../validations/service.validation.js";
import { idParamSchema } from "../validations/common.js";

const bannerFields = [{ name: "banner", maxCount: 1 }];

const publicRouter = express.Router();
publicRouter.get("/", validate(serviceQuerySchema, "query"), ctrl.getPublicServices);

const adminRouter = express.Router();
adminRouter.post(
  "/",
  uploadImage.fields(bannerFields),
  validate(createService),
  ctrl.adminCreateService,
);
adminRouter.get("/", validate(serviceQuerySchema, "query"), ctrl.adminListServices);
adminRouter.put(
  "/:id",
  uploadImage.fields(bannerFields),
  validate(updateService),
  ctrl.adminUpdateService,
);
adminRouter.delete("/:id", validate(idParamSchema, "params"), ctrl.adminDeleteService);

export default { publicRouter, adminRouter };