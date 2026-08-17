import express from "express";
import { uploadImage } from "../middleware/upload.middleware.js";

const publicRouter = express.Router();
publicRouter.post("/image", uploadImage.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    const result = { url: req.file.path, publicId: req.file.filename };
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default { publicRouter };
