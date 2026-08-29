import multer from "multer";
import { ApiError } from "../utils/apiResponse.js";

// Files are held in memory, then pushed to Cloudinary.
const storage = multer.memoryStorage();

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_RESUME_SIZE = 8 * 1024 * 1024; // 8MB
const MAX_IMAGES = 6;

const imageFileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (allowed.includes(file.mimetype)) return cb(null, true);
  return cb(
    new ApiError(400, "Only image files (JPEG, PNG, WEBP, GIF) are allowed"),
  );
};

const documentFileFilter = (req, file, cb) => {
  const allowedMimes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const ext = (file.originalname.split(".").pop() || "").toLowerCase();
  if (
    allowedMimes.includes(file.mimetype) &&
    ["pdf", "doc", "docx"].includes(ext)
  ) {
    return cb(null, true);
  }
  return cb(new ApiError(400, "Only PDF, DOC or DOCX documents are allowed"));
};

export const uploadImage = multer({
  storage,
  limits: { fileSize: MAX_IMAGE_SIZE },
  fileFilter: imageFileFilter,
});

export const uploadImages = multer({
  storage,
  limits: { fileSize: MAX_IMAGE_SIZE, files: MAX_IMAGES },
  fileFilter: imageFileFilter,
});

export const uploadResume = multer({
  storage,
  limits: { fileSize: MAX_RESUME_SIZE },
  fileFilter: documentFileFilter,
});
