import express from "express";
const router = express.Router();
import ctrl from "../controllers/dashboard.controller.js";

router.get("/", ctrl.getDashboardStats);

export default router;
