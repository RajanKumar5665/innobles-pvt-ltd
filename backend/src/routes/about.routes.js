import express from "express";
import validate from "../middleware/validate.middleware.js";
import { uploadImage } from "../middleware/upload.middleware.js";
import { idParamSchema } from "../validations/common.js";
import ctrl from "../controllers/about.controller.js";
import {
  teamMemberSchema,
  locationSchema,
  statisticSchema,
  reorderSchema,
} from "../validations/about.validation.js";

const publicRouter = express.Router();
publicRouter.get("/", ctrl.getPublicAbout);

const adminRouter = express.Router();
const singleImage = uploadImage.single("image");

/* Admin read — team / locations / statistics (the only managed sections) */
adminRouter.get("/", ctrl.adminGetAbout);

/* Team */
adminRouter.get("/team", ctrl.adminListTeam);
adminRouter.post("/team", singleImage, validate(teamMemberSchema), ctrl.adminCreateTeamMember);
adminRouter.patch("/team/reorder", validate(reorderSchema), ctrl.adminReorderTeam);
adminRouter.put("/team/:id", singleImage, validate(teamMemberSchema), ctrl.adminUpdateTeamMember);
adminRouter.delete("/team/:id", validate(idParamSchema, "params"), ctrl.adminDeleteTeamMember);

/* Locations */
adminRouter.get("/locations", ctrl.adminListLocations);
adminRouter.post("/locations", singleImage, validate(locationSchema), ctrl.adminCreateLocation);
adminRouter.patch("/locations/reorder", validate(reorderSchema), ctrl.adminReorderLocations);
adminRouter.put("/locations/:id", singleImage, validate(locationSchema), ctrl.adminUpdateLocation);
adminRouter.delete("/locations/:id", validate(idParamSchema, "params"), ctrl.adminDeleteLocation);

/* Statistics */
adminRouter.get("/statistics", ctrl.adminListStatistics);
adminRouter.post("/statistics", validate(statisticSchema), ctrl.adminCreateStatistic);
adminRouter.patch("/statistics/reorder", validate(reorderSchema), ctrl.adminReorderStatistics);
adminRouter.put("/statistics/:id", validate(statisticSchema), ctrl.adminUpdateStatistic);
adminRouter.delete("/statistics/:id", validate(idParamSchema, "params"), ctrl.adminDeleteStatistic);

export default { publicRouter, adminRouter };