import express from "express";
import validate from "../middleware/validate.middleware.js";
import { contactLimiter } from "../middleware/rateLimit.middleware.js";
import ctrl from "../controllers/contact.controller.js";
import {
  createContact,
  contactStatusSchema,
  contactQuerySchema,
  contactIdParamSchema,
} from "../validations/contact.validation.js";

const publicRouter = express.Router();
publicRouter.post("/", contactLimiter, validate(createContact), ctrl.createContact);

const adminRouter = express.Router();
adminRouter.get("/", validate(contactQuerySchema, "query"), ctrl.adminListContacts);
adminRouter.get("/:id", validate(contactIdParamSchema, "params"), ctrl.adminGetContact);
adminRouter.patch("/:id/status", validate(contactStatusSchema), ctrl.adminUpdateContactStatus);
adminRouter.delete("/:id", validate(contactIdParamSchema, "params"), ctrl.adminDeleteContact);

export default { publicRouter, adminRouter };