import Blog from "../models/Blog.js";
import { uniqueSlug } from "../utils/slugify.js";
import paginate from "../utils/paginate.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError, success } from "../utils/apiResponse.js";
import { uploadSingle, deleteByPublicId } from "../config/cloudinary.js";

/* ------------------------------ Public ------------------------------ */

const getPublicBlogs = asyncHandler(async (req, res) => {
  const { page, limit, search, category } = req.query;
  const filter = { status: "published" };
  if (category) filter.category = category;
  if (search) filter.title = { $regex: search, $options: "i" };

  const result = await paginate({
    model: Blog,
    query: filter,
    page,
    limit,
    sort: { publishedAt: -1 },
  });
  return success(res, result.data, "Blogs retrieved", 200, { pagination: result.pagination });
});

const getPublicBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug, status: "published" });
  if (!blog) throw new ApiError(404, "Blog not found");
  return success(res, blog, "Blog retrieved");
});

/* ------------------------------ Admin ------------------------------ */

const adminCreateBlog = asyncHandler(async (req, res) => {
  const slug = await uniqueSlug(Blog, req.body.title);
  const payload = { ...req.body };

  // Optional blog image upload (Cloudinary).
  if (req.files?.image?.[0]) {
    payload.image = await uploadSingle({ buffer: req.files.image[0].buffer, folder: "innobles/blogs" });
  }
  // Optional author avatar upload — stored as a URL string on the model.
  if (req.files?.authorAvatar?.[0]) {
    const { url } = await uploadSingle({ buffer: req.files.authorAvatar[0].buffer, folder: "innobles/avatars" });
    payload.authorAvatar = url;
  }

  const blog = await Blog.create({
    ...payload,
    slug,
    publishedAt: payload.status === "published" ? new Date() : undefined,
  });

  return success(res, blog, "Blog created", 201);
});

const adminListBlogs = asyncHandler(async (req, res) => {
  const { page, limit, search, category, status } = req.query;
  const filter = {};
  if (search) filter.title = { $regex: search, $options: "i" };
  if (category) filter.category = category;
  if (status) filter.status = status;

  const result = await paginate({
    model: Blog,
    query: filter,
    page,
    limit,
    sort: { createdAt: -1 },
  });
  return success(res, result.data, "Blogs retrieved", 200, { pagination: result.pagination });
});

const adminGetBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new ApiError(404, "Blog not found");
  return success(res, blog, "Blog retrieved");
});

const adminUpdateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new ApiError(404, "Blog not found");

  const payload = { ...req.body };

  // Regenerate the slug if the title changed and none was explicitly supplied.
  if (payload.title && payload.title !== blog.title && !payload.slug) {
    payload.slug = await uniqueSlug(Blog, payload.title, blog._id);
  } else if (payload.slug && payload.slug !== blog.slug) {
    payload.slug = await uniqueSlug(Blog, payload.slug, blog._id);
  }

  // If a new blog image was uploaded, replace the old one.
  if (req.files?.image?.[0]) {
    const { url, publicId } = await uploadSingle({ buffer: req.files.image[0].buffer, folder: "innobles/blogs" });
    if (blog.image?.publicId) await deleteByPublicId(blog.image.publicId);
    payload.image = { url, publicId };
  }

  // If a new author avatar was uploaded, store the Cloudinary URL string.
  if (req.files?.authorAvatar?.[0]) {
    const { url } = await uploadSingle({ buffer: req.files.authorAvatar[0].buffer, folder: "innobles/avatars" });
    payload.authorAvatar = url;
  }

  if (payload.status === "published" && blog.status !== "published") {
    payload.publishedAt = new Date();
  }
  if (payload.status === "draft") {
    payload.publishedAt = null;
  }

  Object.assign(blog, payload);
  await blog.save();
  return success(res, blog, "Blog updated");
});

const adminUpdateBlogStatus = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new ApiError(404, "Blog not found");

  blog.status = req.body.status;
  if (blog.status === "published" && !blog.publishedAt) blog.publishedAt = new Date();
  if (blog.status === "draft") blog.publishedAt = null;
  await blog.save();

  return success(res, blog, `Blog ${blog.status === "published" ? "published" : "unpublished"}`);
});

const adminDeleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) throw new ApiError(404, "Blog not found");
  if (blog.image?.publicId) await deleteByPublicId(blog.image.publicId);
  return success(res, null, "Blog deleted");
});

export default {
  getPublicBlogs,
  getPublicBlogBySlug,
  adminCreateBlog,
  adminListBlogs,
  adminGetBlog,
  adminUpdateBlog,
  adminUpdateBlogStatus,
  adminDeleteBlog,
};
