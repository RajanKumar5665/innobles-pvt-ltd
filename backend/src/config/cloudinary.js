import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "../utils/apiResponse.js";

/**
 * Configure the Cloudinary SDK from environment variables.
 * Call this once during app startup.
 */
const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
};

const isConfigured = () =>
  Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );

/** Upload a single file (buffer) to Cloudinary and return { url, publicId }. */
const uploadSingle = async ({ buffer, folder = "innobles", resourceType = "auto", fileName }) => {
  if (!isConfigured()) {
    throw new ApiError(500, "Cloudinary is not configured on the server");
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType, public_id: fileName },
      (error, result) => {
        if (error) return reject(new ApiError(500, "File upload failed"));
        resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );
    stream.end(buffer);
  });
};

/** Delete a previously uploaded asset by its public id (best-effort). */
const deleteByPublicId = async (publicId) => {
  if (!publicId || !isConfigured()) return null;
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete failed:", error.message);
    return null;
  }
};

export { cloudinary, configureCloudinary, uploadSingle, deleteByPublicId, isConfigured };
