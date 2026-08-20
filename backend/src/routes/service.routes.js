import express from "express";
import validate from "../middleware/validate.middleware.js";
import { uploadImage } from "../middleware/upload.middleware.js";
import ctrl from "../controllers/service.controller.js";
import {
  createService,
  updateService,
  serviceStatusSchema,
  serviceQuerySchema,
} from "../validations/service.validation.js";
import { idParamSchema } from "../validations/common.js";

const publicRouter = express.Router();
publicRouter.get("/", validate(serviceQuerySchema, "query"), ctrl.getPublicServices);

const adminRouter = express.Router();
const bannerFields = [{ name: "banner", maxCount: 1 }];

adminRouter.post(
  "/",
  uploadImage.fields(bannerFields),
  validate(createService),
  ctrl.adminCreateService,
);
adminRouter.get("/", validate(serviceQuerySchema, "query"), ctrl.adminListServices);
adminRouter.get("/:id", validate(idParamSchema, "params"), ctrl.adminGetService);
adminRouter.put(
  "/:id",
  uploadImage.fields(bannerFields),
  validate(updateService),
  ctrl.adminUpdateService,
);
adminRouter.patch("/:id/status", validate(serviceStatusSchema), ctrl.adminUpdateServiceStatus);
adminRouter.delete("/:id", validate(idParamSchema, "params"), ctrl.adminDeleteService);

export default { publicRouter, adminRouter };
