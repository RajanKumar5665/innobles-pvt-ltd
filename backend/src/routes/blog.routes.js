import express from "express";
import validate from "../middleware/validate.middleware.js";
import { uploadImage } from "../middleware/upload.middleware.js";
import ctrl from "../controllers/blog.controller.js";
import {
  createBlog,
  updateBlog,
  blogStatusSchema,
  blogQuerySchema,
  blogSlugSchema,
} from "../validations/blog.validation.js";
import { idParamSchema } from "../validations/common.js";

const blogImageFields = [
  { name: "image", maxCount: 1 },
  { name: "authorAvatar", maxCount: 1 },
];

const publicRouter = express.Router();
publicRouter.get("/", validate(blogQuerySchema, "query"), ctrl.getPublicBlogs);
publicRouter.get("/:slug", validate(blogSlugSchema, "params"), ctrl.getPublicBlogBySlug);

const adminRouter = express.Router();
adminRouter.post(
  "/",
  uploadImage.fields(blogImageFields),
  validate(createBlog),
  ctrl.adminCreateBlog,
);
adminRouter.get("/", validate(blogQuerySchema, "query"), ctrl.adminListBlogs);
adminRouter.get("/:id", validate(idParamSchema, "params"), ctrl.adminGetBlog);
adminRouter.put(
  "/:id",
  uploadImage.fields(blogImageFields),
  validate(updateBlog),
  ctrl.adminUpdateBlog,
);
adminRouter.patch("/:id/status", validate(blogStatusSchema), ctrl.adminUpdateBlogStatus);
adminRouter.delete("/:id", validate(idParamSchema, "params"), ctrl.adminDeleteBlog);

export default { publicRouter, adminRouter };