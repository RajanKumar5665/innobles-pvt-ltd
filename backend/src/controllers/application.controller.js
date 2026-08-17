import Career from "../models/Career.js";
import JobApplication from "../models/JobApplication.js";
import paginate from "../utils/paginate.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError, success } from "../utils/apiResponse.js";
import { uploadSingle, deleteByPublicId } from "../config/cloudinary.js";

/* ------------------------------ Public ------------------------------ */

const createApplication = asyncHandler(async (req, res) => {
  const career = await Career.findOne({ _id: req.params.careerId, status: "open" });
  if (!career) throw new ApiError(404, "This career is no longer accepting applications");

  let resume = {};
  if (req.file) {
    const asset = await uploadSingle({
      buffer: req.file.buffer,
      folder: "innobles/resumes",
      resourceType: "raw",
      fileName: `resume-${Date.now()}`,
    });
    resume = { ...asset, originalName: req.file.originalname };
  }

  const application = await JobApplication.create({
    careerId: career._id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    coverLetter: req.body.coverLetter,
    resume,
  });

  return success(res, { id: application._id }, "Application submitted successfully", 201);
});

/* ------------------------------ Admin ------------------------------ */

const adminListApplications = asyncHandler(async (req, res) => {
  const { page, limit, search, status, careerId } = req.query;
  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }
  if (status) filter.status = status;
  if (careerId) filter.careerId = careerId;

  const result = await paginate({
    model: JobApplication,
    query: filter,
    page,
    limit,
    sort: { createdAt: -1 },
    populate: { path: "careerId", select: "title department" },
  });
  return success(res, result.data, "Applications retrieved", 200, {
    pagination: result.pagination,
  });
});

const adminGetApplication = asyncHandler(async (req, res) => {
  const application = await JobApplication.findById(req.params.id).populate(
    "careerId",
    "title department location",
  );
  if (!application) throw new ApiError(404, "Application not found");
  return success(res, application, "Application retrieved");
});

const adminUpdateApplicationStatus = asyncHandler(async (req, res) => {
  const application = await JobApplication.findById(req.params.id);
  if (!application) throw new ApiError(404, "Application not found");
  application.status = req.body.status;
  await application.save();
  return success(res, application, "Application status updated");
});

const adminDeleteApplication = asyncHandler(async (req, res) => {
  const application = await JobApplication.findByIdAndDelete(req.params.id);
  if (!application) throw new ApiError(404, "Application not found");
  if (application.resume?.publicId) await deleteByPublicId(application.resume.publicId);
  return success(res, null, "Application deleted");
});

export default {
  createApplication,
  adminListApplications,
  adminGetApplication,
  adminUpdateApplicationStatus,
  adminDeleteApplication,
};
