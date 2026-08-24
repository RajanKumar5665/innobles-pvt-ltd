import HomeContent from "../models/HomeContent.js";
import asyncHandler from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import { uploadSingle, deleteByPublicId } from "../config/cloudinary.js";

// Public

const getPublicHome = asyncHandler(async (req, res) => {
  const content = await HomeContent.findOne()
    .populate({
      path: "featuredProducts",
      match: { status: "published" },
      select: "name slug shortDescription image images",
    })
    .populate({
      path: "featuredBlogs",
      match: { status: "published" },
      select: "title slug category description image publishedAt",
    });
  return success(res, content || {}, "Home content retrieved");
});

// Admin

const adminGetHome = asyncHandler(async (req, res) => {
  const content = await HomeContent.findOne()
    .populate("featuredProducts", "name slug")
    .populate("featuredBlogs", "title slug");
  return success(res, content || {}, "Home content retrieved");
});

const adminUpdateHome = asyncHandler(async (req, res) => {
  let content = await HomeContent.findOne();
  const payload = { ...req.body };

  // Multipart form data sends nested fields as JSON strings — parse them back.
  const parseIfString = (val) => (typeof val === "string" ? JSON.parse(val) : val);
  payload.hero = parseIfString(payload.hero);
  payload.highlights = parseIfString(payload.highlights);
  payload.featuredProducts = parseIfString(payload.featuredProducts);
  payload.featuredBlogs = parseIfString(payload.featuredBlogs);
  payload.cta = parseIfString(payload.cta);

  // Replace the hero image when a new file is uploaded.
  if (req.file) {
    const asset = await uploadSingle({ buffer: req.file.buffer, folder: "innobles/home" });
    if (content?.hero?.image?.publicId) await deleteByPublicId(content.hero.image.publicId);
    payload.hero = { ...(payload.hero || {}), image: asset };
  }

  if (!content) {
    content = await HomeContent.create(payload);
  } else {
    Object.assign(content, payload);
    await content.save();
  }

  return success(res, content, "Home content updated");
});

export default { getPublicHome, adminGetHome, adminUpdateHome };