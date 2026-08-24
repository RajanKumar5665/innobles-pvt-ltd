import express from "express";
import validate from "../middleware/validate.middleware.js";
import { uploadResume } from "../middleware/upload.middleware.js";
import { applicationLimiter } from "../middleware/rateLimit.middleware.js";
import ctrl from "../controllers/application.controller.js";
import {
  createApplication,
  careerApplyParamSchema,
  applicationStatusSchema,
  applicationQuerySchema,
  applicationIdParamSchema,
} from "../validations/application.validation.js";

const publicRouter = express.Router();
publicRouter.post(
  "/:careerId/applications",
  applicationLimiter,
  uploadResume.single("resume"),
  validate(careerApplyParamSchema, "params"),
  validate(createApplication),
  ctrl.createApplication,
);

const adminRouter = express.Router();
adminRouter.get("/", validate(applicationQuerySchema, "query"), ctrl.adminListApplications);
adminRouter.get("/:id", validate(applicationIdParamSchema, "params"), ctrl.adminGetApplication);
adminRouter.get("/:id/resume", validate(applicationIdParamSchema, "params"), ctrl.adminGetResume);
adminRouter.patch(
  "/:id/status",
  validate(applicationStatusSchema),
  ctrl.adminUpdateApplicationStatus,
);
adminRouter.delete("/:id", validate(applicationIdParamSchema, "params"), ctrl.adminDeleteApplication);

export default { publicRouter, adminRouter };