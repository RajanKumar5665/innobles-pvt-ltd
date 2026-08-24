import express from "express";
import ctrl from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/", ctrl.getDashboardStats);

export default router;