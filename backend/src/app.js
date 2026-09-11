import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import { configureCloudinary } from "./config/cloudinary.js";
import { requireAdmin } from "./middleware/auth.middleware.js";
import notFound from "./middleware/notFound.middleware.js";
import errorHandler from "./middleware/error.middleware.js";
import decryptBody from "./middleware/decryptBody.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import careerRoutes from "./routes/career.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import aboutRoutes from "./routes/about.routes.js";

const createApp = () => {
  const app = express();
  const api = "/api";

  // Needed behind a reverse proxy (Render, Nginx, etc.) so secure cookies and rate-limit IPs work correctly.
  app.set("trust proxy", 1);

  configureCloudinary();

  app.use(helmet());

  // Comma-separated list in .env so multiple frontend origins can be allowed.
  const defaultOrigins = "http://localhost:5173";
  const rawOrigins =
    process.env.FRONTEND_URLS || process.env.FRONTEND_URL || defaultOrigins;
  const allowedOrigins = rawOrigins
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
      methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
      maxAge: 86400,
    }),
  );

  app.use(cookieParser());
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: true, limit: "2mb" }));

  // Decrypts the hybrid-encrypted request body before routes/validation see it.
  app.use(decryptBody);

  app.use(`${api}/admin/auth`, authRoutes);

  // Public routes
  app.use(`${api}/services`, serviceRoutes.publicRouter);
  app.use(`${api}/products`, productRoutes.publicRouter);
  app.use(`${api}/careers`, careerRoutes.publicRouter);
  app.use(`${api}/careers`, applicationRoutes.publicRouter); // POST /:careerId/applications
  app.use(`${api}/contact`, contactRoutes.publicRouter);
  app.use(`${api}/about`, aboutRoutes.publicRouter);

  // Admin routes — all behind requireAdmin
  app.use(`${api}/admin/products`, requireAdmin, productRoutes.adminRouter);
  app.use(`${api}/admin/careers`, requireAdmin, careerRoutes.adminRouter);
  app.use(`${api}/admin/contacts`, requireAdmin, contactRoutes.adminRouter);
  app.use(`${api}/admin/applications`, requireAdmin, applicationRoutes.adminRouter);
  app.use(`${api}/admin/services`, requireAdmin, serviceRoutes.adminRouter);
  app.use(`${api}/admin/about`, requireAdmin, aboutRoutes.adminRouter);
  app.use(`${api}/admin/dashboard`, requireAdmin, dashboardRoutes);

  app.get(`${api}/health`, (req, res) =>
    res.json({ success: true, message: "Innobles API is healthy" }),
  );

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default createApp;