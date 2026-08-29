import Contact from "../models/Contact.js";
import paginate from "../utils/paginate.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError, success } from "../utils/apiResponse.js";

// Public

const createContact = asyncHandler(async (req, res) => {
  const contact = await Contact.create(req.body);
  return success(res, { id: contact._id }, "Message sent successfully", 201);
});

// Admin

const adminListContacts = asyncHandler(async (req, res) => {
  const { page, limit, search, status } = req.query;
  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { subject: { $regex: search, $options: "i" } },
    ];
  }
  if (status) filter.status = status;

  const result = await paginate({
    model: Contact,
    query: filter,
    page,
    limit,
    sort: { createdAt: -1 },
  });
  return success(res, result.data, "Contact messages retrieved", 200, {
    pagination: result.pagination,
  });
});

const adminGetContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) throw new ApiError(404, "Contact message not found");
  return success(res, contact, "Contact message retrieved");
});

const adminUpdateContactStatus = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) throw new ApiError(404, "Contact message not found");
  contact.status = req.body.status;
  await contact.save();
  return success(res, contact, "Contact status updated");
});

const adminDeleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) throw new ApiError(404, "Contact message not found");
  return success(res, null, "Contact message deleted");
});

export default {
  createContact,
  adminListContacts,
  adminGetContact,
  adminUpdateContactStatus,
  adminDeleteContact,
};
