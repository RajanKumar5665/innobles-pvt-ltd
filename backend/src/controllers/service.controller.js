import Service from "../models/Service.js";
import paginate from "../utils/paginate.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError, success } from "../utils/apiResponse.js";
import { uploadSingle, deleteByPublicId } from "../config/cloudinary.js";

/** Normalize the features field (array, or single string from one FormData entry). */
const normalizeFeatures = (value) => {
  const arr = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? [value]
      : [];
  return arr.map((f) => String(f).trim()).filter(Boolean);
};

/* ------------------------------ Public ------------------------------ */

const getPublicServices = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const filter = { status: "published" };

  const result = await paginate({
    model: Service,
    query: filter,
    page,
    limit,
    sort: { createdAt: -1 },
  });
  return success(res, result.data, "Services retrieved", 200, { pagination: result.pagination });
});

/* ------------------------------ Admin ------------------------------ */

const adminCreateService = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  payload.features = normalizeFeatures(payload.features);
  delete payload.bannerRemoved;

  // Banner image is required for a new service. It is uploaded through the
  // same Cloudinary pipeline used by blogs and products.
  if (req.files?.banner?.[0]) {
    payload.banner = await uploadSingle({ buffer: req.files.banner[0].buffer, folder: "innobles/services" });
  } else {
    throw new ApiError(400, "Banner image is required");
  }

  const service = await Service.create(payload);
  return success(res, service, "Service created", 201);
});

const adminListServices = asyncHandler(async (req, res) => {
  const { page, limit, search, status } = req.query;
  const filter = {};
  if (search) filter.title = { $regex: search, $options: "i" };
  if (status) filter.status = status;

  const result = await paginate({
    model: Service,
    query: filter,
    page,
    limit,
    sort: { createdAt: -1 },
  });
  return success(res, result.data, "Services retrieved", 200, { pagination: result.pagination });
});

const adminGetService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) throw new ApiError(404, "Service not found");
  return success(res, service, "Service retrieved");
});

const adminUpdateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) throw new ApiError(404, "Service not found");

  const payload = { ...req.body };
  delete payload.bannerRemoved;
  if (payload.features !== undefined) payload.features = normalizeFeatures(payload.features);

  Object.assign(service, payload);

  // Replace the existing banner when a new file is supplied, or remove it when
  // the admin explicitly cleared it on the edit form.
  if (req.files?.banner?.[0]) {
    if (service.banner?.publicId) await deleteByPublicId(service.banner.publicId);
    service.banner = await uploadSingle({ buffer: req.files.banner[0].buffer, folder: "innobles/services" });
  } else if (req.body.bannerRemoved === "true") {
    if (service.banner?.publicId) await deleteByPublicId(service.banner.publicId);
    service.banner = null;
  }

  await service.save();
  return success(res, service, "Service updated");
});

const adminUpdateServiceStatus = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) throw new ApiError(404, "Service not found");
  service.status = req.body.status;
  await service.save();
  return success(res, service, `Service ${service.status === "published" ? "published" : "unpublished"}`);
});

const adminDeleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) throw new ApiError(404, "Service not found");
  if (service.banner?.publicId) await deleteByPublicId(service.banner.publicId);
  return success(res, null, "Service deleted");
});

export default {
  getPublicServices,
  adminCreateService,
  adminListServices,
  adminGetService,
  adminUpdateService,
  adminUpdateServiceStatus,
  adminDeleteService,
};
