import express from "express";
import validate from "../middleware/validate.middleware.js";
import ctrl from "../controllers/career.controller.js";
import {
  createCareer,
  updateCareer,
  careerStatusSchema,
  careerQuerySchema,
  careerIdParamSchema,
} from "../validations/career.validation.js";

const publicRouter = express.Router();
publicRouter.get("/", validate(careerQuerySchema, "query"), ctrl.getPublicCareers);
publicRouter.get("/:id", validate(careerIdParamSchema, "params"), ctrl.getPublicCareerById);

const adminRouter = express.Router();
adminRouter.post("/", validate(createCareer), ctrl.adminCreateCareer);
adminRouter.get("/", validate(careerQuerySchema, "query"), ctrl.adminListCareers);
adminRouter.get("/:id", validate(careerIdParamSchema, "params"), ctrl.adminGetCareer);
adminRouter.put("/:id", validate(updateCareer), ctrl.adminUpdateCareer);
adminRouter.patch("/:id/status", validate(careerStatusSchema), ctrl.adminUpdateCareerStatus);
adminRouter.delete("/:id", validate(careerIdParamSchema, "params"), ctrl.adminDeleteCareer);

export default { publicRouter, adminRouter };