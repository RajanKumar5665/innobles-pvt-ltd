import express from "express";
import validate from "../middleware/validate.middleware.js";
import { uploadImage } from "../middleware/upload.middleware.js";
import ctrl from "../controllers/home.controller.js";
import { updateHome } from "../validations/home.validation.js";

const publicRouter = express.Router();
publicRouter.get("/", ctrl.getPublicHome);

const adminRouter = express.Router();
adminRouter.get("/", ctrl.adminGetHome);
adminRouter.put("/", uploadImage.single("image"), validate(updateHome), ctrl.adminUpdateHome);

export default { publicRouter, adminRouter };