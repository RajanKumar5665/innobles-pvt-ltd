import Product from "../models/Product.js";
import { uniqueSlug } from "../utils/slugify.js";
import paginate from "../utils/paginate.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError, success } from "../utils/apiResponse.js";
import { uploadSingle, deleteByPublicId } from "../config/cloudinary.js";

/* ------------------------------ Public ------------------------------ */

const getPublicProducts = asyncHandler(async (req, res) => {
  const { page, limit, search } = req.query;
  const filter = { status: "published" };
  if (search) filter.name = { $regex: search, $options: "i" };

  const result = await paginate({
    model: Product,
    query: filter,
    page,
    limit,
    sort: { createdAt: -1 },
  });
  return success(res, result.data, "Products retrieved", 200, { pagination: result.pagination });
});

const getPublicProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, status: "published" });
  if (!product) throw new ApiError(404, "Product not found");
  return success(res, product, "Product retrieved");
});

/* ------------------------------ Admin ------------------------------ */

const adminCreateProduct = asyncHandler(async (req, res) => {
  const slug = await uniqueSlug(Product, req.body.name);
  let images = req.body.images || [];

  if (req.files && req.files.length) {
    const uploaded = [];
    for (const file of req.files) {
      const asset = await uploadSingle({ buffer: file.buffer, folder: "innobles/products" });
      uploaded.push(asset);
    }
    images = uploaded;
  }

  const product = await Product.create({ ...req.body, slug, images });
  return success(res, product, "Product created", 201);
});

const adminListProducts = asyncHandler(async (req, res) => {
  const { page, limit, search, status } = req.query;
  const filter = {};
  if (search) filter.name = { $regex: search, $options: "i" };
  if (status) filter.status = status;

  const result = await paginate({
    model: Product,
    query: filter,
    page,
    limit,
    sort: { createdAt: -1 },
  });
  return success(res, result.data, "Products retrieved", 200, { pagination: result.pagination });
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

  if (payload.name && payload.name !== product.name && !payload.slug) {
    payload.slug = await uniqueSlug(Product, payload.name, product._id);
  }

  if (req.files && req.files.length) {
    const uploaded = [];
    for (const file of req.files) {
      const asset = await uploadSingle({ buffer: file.buffer, folder: "innobles/products" });
      uploaded.push(asset);
    }
    // Remove previously uploaded images when replacing.
    for (const img of product.images || []) {
      if (img.publicId) await deleteByPublicId(img.publicId);
    }
    payload.images = uploaded;
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
  return success(res, product, `Product ${product.status === "published" ? "published" : "unpublished"}`);
});

const adminDeleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");
  for (const img of product.images || []) {
    if (img.publicId) await deleteByPublicId(img.publicId);
  }
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
