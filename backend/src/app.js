import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import { configureCloudinary } from "./config/cloudinary.js";
import { requireAdmin } from "./middleware/auth.middleware.js";
import notFound from "./middleware/notFound.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import productRoutes from "./routes/product.routes.js";
import careerRoutes from "./routes/career.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import homeRoutes from "./routes/home.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import serviceRoutes from "./routes/service.routes.js";

/**
 * Build and configure the Express application.
 */
const createApp = () => {
  const app = express();

  // Trust the first proxy hop so rate limiting / secure cookies behave in production.
  app.set("trust proxy", 1);

  configureCloudinary();

  // ----- Security middleware -----
  app.use(helmet());

  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      credentials: true,
    }),
  );

  app.use(cookieParser());

  // Limited request bodies.
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: true, limit: "2mb" }));

  const api = "/api";

  // ----- Admin authentication (register/login/logout are public; /me is protected) -----
  app.use(`${api}/admin/auth`, authRoutes);

  // ----- Public API -----
  app.use(`${api}/home`, homeRoutes.publicRouter);
  app.use(`${api}/services`, serviceRoutes.publicRouter);
  app.use(`${api}/blogs`, blogRoutes.publicRouter);
  app.use(`${api}/products`, productRoutes.publicRouter);
  app.use(`${api}/careers`, careerRoutes.publicRouter);
  app.use(`${api}/careers`, applicationRoutes.publicRouter); // POST /:careerId/applications
  app.use(`${api}/contact`, contactRoutes.publicRouter);
  app.use(`${api}/upload`, uploadRoutes.publicRouter);

  // ----- Admin (protected) API -----
  app.use(`${api}/admin/blogs`, requireAdmin, blogRoutes.adminRouter);
  app.use(`${api}/admin/products`, requireAdmin, productRoutes.adminRouter);
  app.use(`${api}/admin/careers`, requireAdmin, careerRoutes.adminRouter);
  app.use(`${api}/admin/contacts`, requireAdmin, contactRoutes.adminRouter);
  app.use(`${api}/admin/applications`, requireAdmin, applicationRoutes.adminRouter);
  app.use(`${api}/admin/home`, requireAdmin, homeRoutes.adminRouter);
  app.use(`${api}/admin/services`, requireAdmin, serviceRoutes.adminRouter);
  app.use(`${api}/admin/dashboard`, requireAdmin, dashboardRoutes);

  // Simple health check
  app.get(`${api}/health`, (req, res) =>
    res.json({ success: true, message: "Innobles API is healthy" }),
  );

  // ----- Fallbacks -----
  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default createApp;
