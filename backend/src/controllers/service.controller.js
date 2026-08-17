import Service from "../models/Service.js";
import paginate from "../utils/paginate.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError, success } from "../utils/apiResponse.js";

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
  const service = await Service.create(req.body);
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
  Object.assign(service, req.body);
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
