import Product from "../models/Product.js";
import { uniqueSlug } from "../utils/slugify.js";
import paginate from "../utils/paginate.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError, success } from "../utils/apiResponse.js";
import { uploadSingle, deleteByPublicId } from "../config/cloudinary.js";

// Public

const getPublicProducts = asyncHandler(async (req, res) => {
  const { page, limit, search, category } = req.query;
  const filter = { status: "published" };
  if (search) {
    // Search across name, description and category.
    const term = { $regex: search, $options: "i" };
    filter.$or = [{ name: term }, { description: term }, { category: term }];
  }
  if (category) filter.category = category;

  const result = await paginate({
    model: Product,
    query: filter,
    page,
    limit,
    sort: { createdAt: -1 },
  });
  return success(res, result.data, "Products retrieved", 200, {
    pagination: result.pagination,
  });
});

const getPublicProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    slug: req.params.slug,
    status: "published",
  });
  if (!product) throw new ApiError(404, "Product not found");
  return success(res, product, "Product retrieved");
});

// Admin

const adminCreateProduct = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  delete payload.imageRemoved;

  // Prefer an explicit slug, otherwise derive one from the name.
  const slugBase =
    payload.slug && payload.slug.trim() ? payload.slug : payload.name;
  const slug = await uniqueSlug(Product, slugBase);

  if (req.files?.image?.[0]) {
    payload.image = await uploadSingle({
      buffer: req.files.image[0].buffer,
      folder: "innobles/products",
    });
  }

  const product = await Product.create({ ...payload, slug });
  return success(res, product, "Product created", 201);
});

const adminListProducts = asyncHandler(async (req, res) => {
  const { page, limit, search, status, category } = req.query;
  const filter = {};
  if (search) {
    const term = { $regex: search, $options: "i" };
    filter.$or = [{ name: term }, { description: term }, { category: term }];
  }
  if (status) filter.status = status;
  if (category) filter.category = category;

  const result = await paginate({
    model: Product,
    query: filter,
    page,
    limit,
    sort: { createdAt: -1 },
  });
  return success(res, result.data, "Products retrieved", 200, {
    pagination: result.pagination,
  });
});

const adminGetProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");
  return success(res, product, "Product retrieved");
});

const adminUpdateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");

  const payload = { ...req.body };
  delete payload.imageRemoved;

  // Regenerate the slug when the name/slug changed and none was supplied explicitly.
  const explicitSlug = payload.slug && payload.slug.trim();
  if (explicitSlug && explicitSlug !== product.slug) {
    payload.slug = await uniqueSlug(Product, explicitSlug, product._id);
  } else if (payload.name && payload.name !== product.name && !explicitSlug) {
    payload.slug = await uniqueSlug(Product, payload.name, product._id);
  }

  // Replace the image on upload, or clear it when the admin removed it.
  if (req.files?.image?.[0]) {
    if (product.image?.publicId) await deleteByPublicId(product.image.publicId);
    payload.image = await uploadSingle({
      buffer: req.files.image[0].buffer,
      folder: "innobles/products",
    });
  } else if (req.body.imageRemoved === "true") {
    if (product.image?.publicId) await deleteByPublicId(product.image.publicId);
    payload.image = null;
  }

  Object.assign(product, payload);
  await product.save();
  return success(res, product, "Product updated");
});

const adminUpdateProductStatus = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");
  product.status = req.body.status;
  await product.save();
  return success(
    res,
    product,
    `Product ${product.status === "published" ? "published" : "unpublished"}`,
  );
});

const adminDeleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");
  if (product.image?.publicId) await deleteByPublicId(product.image.publicId);
  return success(res, null, "Product deleted");
});

export default {
  getPublicProducts,
  getPublicProductBySlug,
  adminCreateProduct,
  adminListProducts,
  adminGetProduct,
  adminUpdateProduct,
  adminUpdateProductStatus,
  adminDeleteProduct,
};
