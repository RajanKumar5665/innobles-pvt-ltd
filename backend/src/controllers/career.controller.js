import Career from "../models/Career.js";
import paginate from "../utils/paginate.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError, success } from "../utils/apiResponse.js";
import { escapeRegex } from "../utils/escapeRegex.js";

// Public

const getPublicCareers = asyncHandler(async (req, res) => {
  const { page, limit, search, department, location, jobType } = req.query;
  const filter = { status: "open" };
  if (department) filter.department = department;
  if (location) {
    const term = escapeRegex(String(location).trim());
    if (term) filter.location = { $regex: term, $options: "i" };
  }
  if (jobType) filter.jobType = jobType;
  if (search) {
    const term = escapeRegex(String(search).trim());
    if (term) filter.title = { $regex: term, $options: "i" };
  }

  const result = await paginate({
    model: Career,
    query: filter,
    page,
    limit,
    sort: { postedAt: -1 },
  });
  return success(res, result.data, "Careers retrieved", 200, {
    pagination: result.pagination,
  });
});

// Admin

const adminCreateCareer = asyncHandler(async (req, res) => {
  const career = await Career.create(req.body);
  return success(res, career, "Career created", 201);
});

const adminListCareers = asyncHandler(async (req, res) => {
  const { page, limit, search, department, location, jobType, status } =
    req.query;
  const filter = {};
  if (search) {
    const term = escapeRegex(String(search).trim());
    if (term) filter.title = { $regex: term, $options: "i" };
  }
  if (department) filter.department = department;
  if (location) {
    const term = escapeRegex(String(location).trim());
    if (term) filter.location = { $regex: term, $options: "i" };
  }
  if (jobType) filter.jobType = jobType;
  if (status) filter.status = status;

  const result = await paginate({
    model: Career,
    query: filter,
    page,
    limit,
    sort: { postedAt: -1 },
  });
  return success(res, result.data, "Careers retrieved", 200, {
    pagination: result.pagination,
  });
});

const adminUpdateCareer = asyncHandler(async (req, res) => {
  const career = await Career.findById(req.params.id);
  if (!career) throw new ApiError(404, "Career not found");
  Object.assign(career, req.body);
  await career.save();
  return success(res, career, "Career updated");
});

const adminUpdateCareerStatus = asyncHandler(async (req, res) => {
  const career = await Career.findById(req.params.id);
  if (!career) throw new ApiError(404, "Career not found");
  career.status = req.body.status;
  await career.save();
  return success(
    res,
    career,
    `Career ${career.status === "open" ? "opened" : "closed"}`,
  );
});

const adminDeleteCareer = asyncHandler(async (req, res) => {
  const career = await Career.findByIdAndDelete(req.params.id);
  if (!career) throw new ApiError(404, "Career not found");
  return success(res, null, "Career deleted");
});

export default {
  getPublicCareers,
  adminCreateCareer,
  adminListCareers,
  adminUpdateCareer,
  adminUpdateCareerStatus,
  adminDeleteCareer,
};
