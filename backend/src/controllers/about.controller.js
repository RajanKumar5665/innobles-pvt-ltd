import AboutContent from "../models/AboutContent.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError, success } from "../utils/apiResponse.js";
import { uploadSingle, deleteByPublicId } from "../config/cloudinary.js";

const IMAGE_FOLDER = "innobles/about";


const getDoc = async () => {
  let doc = await AboutContent.findOne();
  if (!doc) doc = await AboutContent.create({});
  return doc;
};


const sortByOrder = (arr = []) =>
  [...arr].sort(
    (a, b) =>
      (a.order ?? 0) - (b.order ?? 0) ||
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

/** Build the payload shared by the public + admin read endpoints. */
const serialize = (doc, { publicOnly = false } = {}) => ({
  teamMembers: sortByOrder(doc.teamMembers),
  locations: sortByOrder(doc.locations),
  statistics: sortByOrder(
    publicOnly ? doc.statistics.filter((s) => s.active !== false) : doc.statistics,
  ),
});

const findIndex = (items, id) => items.findIndex((item) => item._id.toString() === id);

/* ------------------------------ Public ------------------------------ */

const getPublicAbout = asyncHandler(async (req, res) => {
  const doc = await getDoc();
  return success(res, serialize(doc, { publicOnly: true }), "About content retrieved");
});

/* ------------------------------ Admin read (team/locations/stats) ------------------------------ */

const adminGetAbout = asyncHandler(async (req, res) => {
  const doc = await getDoc();
  return success(res, serialize(doc), "About content retrieved");
});

/* ------------------------------ Team ------------------------------ */

const adminListTeam = asyncHandler(async (req, res) => {
  const doc = await getDoc();
  return success(res, sortByOrder(doc.teamMembers), "Team members retrieved");
});

const adminCreateTeamMember = asyncHandler(async (req, res) => {
  const doc = await getDoc();
  const nextOrder = doc.teamMembers.length
    ? Math.max(...doc.teamMembers.map((m) => m.order ?? 0)) + 1
    : 0;

  let image = null;
  if (req.file) {
    image = await uploadSingle({ buffer: req.file.buffer, folder: IMAGE_FOLDER });
  }

  const member = {
    name: req.body.name,
    role: req.body.role ?? "",
    description: req.body.description ?? "",
    linkedin: req.body.linkedin ?? "",
    image,
    order: nextOrder,
  };
  doc.teamMembers.push(member);
  await doc.save();
  return success(res, doc.teamMembers[doc.teamMembers.length - 1], "Team member added", 201);
});

const adminUpdateTeamMember = asyncHandler(async (req, res) => {
  const doc = await getDoc();
  const idx = findIndex(doc.teamMembers, req.params.id);
  if (idx === -1) throw new ApiError(404, "Team member not found");
  const member = doc.teamMembers[idx];

  if (req.file) {
    if (member.image?.publicId) await deleteByPublicId(member.image.publicId);
    member.image = await uploadSingle({ buffer: req.file.buffer, folder: IMAGE_FOLDER });
  } else if (req.body.imageRemoved === "true") {
    if (member.image?.publicId) await deleteByPublicId(member.image.publicId);
    member.image = null;
  }
  if (req.body.name !== undefined) member.name = req.body.name;
  if (req.body.role !== undefined) member.role = req.body.role;
  if (req.body.description !== undefined) member.description = req.body.description;
  if (req.body.linkedin !== undefined) member.linkedin = req.body.linkedin;

  await doc.save();
  return success(res, member, "Team member updated");
});

const adminDeleteTeamMember = asyncHandler(async (req, res) => {
  const doc = await getDoc();
  const idx = findIndex(doc.teamMembers, req.params.id);
  if (idx === -1) throw new ApiError(404, "Team member not found");
  const [removed] = doc.teamMembers.splice(idx, 1);
  if (removed.image?.publicId) await deleteByPublicId(removed.image.publicId);
  await doc.save();
  return success(res, null, "Team member deleted");
});

const adminReorderTeam = asyncHandler(async (req, res) => {
  const doc = await getDoc();
  const byId = new Map(doc.teamMembers.map((m) => [m._id.toString(), m]));
  const ids = req.body.ids;
  doc.teamMembers = ids
    .map((id, i) => {
      const item = byId.get(id);
      if (item) item.order = i;
      return item;
    })
    .filter(Boolean);
  await doc.save();
  return success(res, sortByOrder(doc.teamMembers), "Team reordered");
});

/* ------------------------------ Locations ------------------------------ */

const adminListLocations = asyncHandler(async (req, res) => {
  const doc = await getDoc();
  return success(res, sortByOrder(doc.locations), "Locations retrieved");
});

const adminCreateLocation = asyncHandler(async (req, res) => {
  const doc = await getDoc();
  const nextOrder = doc.locations.length
    ? Math.max(...doc.locations.map((l) => l.order ?? 0)) + 1
    : 0;

  let image = null;
  if (req.file) {
    image = await uploadSingle({ buffer: req.file.buffer, folder: IMAGE_FOLDER });
  }

  const location = {
    city: req.body.city,
    country: req.body.country ?? "",
    address: req.body.address ?? "",
    phone: req.body.phone ?? "",
    email: req.body.email ?? "",
    mapLink: req.body.mapLink ?? "",
    description: req.body.description ?? "",
    image,
    order: nextOrder,
  };
  doc.locations.push(location);
  await doc.save();
  return success(res, doc.locations[doc.locations.length - 1], "Location added", 201);
});

const adminUpdateLocation = asyncHandler(async (req, res) => {
  const doc = await getDoc();
  const idx = findIndex(doc.locations, req.params.id);
  if (idx === -1) throw new ApiError(404, "Location not found");
  const location = doc.locations[idx];

  if (req.file) {
    if (location.image?.publicId) await deleteByPublicId(location.image.publicId);
    location.image = await uploadSingle({ buffer: req.file.buffer, folder: IMAGE_FOLDER });
  } else if (req.body.imageRemoved === "true") {
    if (location.image?.publicId) await deleteByPublicId(location.image.publicId);
    location.image = null;
  }
  if (req.body.city !== undefined) location.city = req.body.city;
  if (req.body.country !== undefined) location.country = req.body.country;
  if (req.body.address !== undefined) location.address = req.body.address;
  if (req.body.phone !== undefined) location.phone = req.body.phone;
  if (req.body.email !== undefined) location.email = req.body.email;
  if (req.body.mapLink !== undefined) location.mapLink = req.body.mapLink;
  if (req.body.description !== undefined) location.description = req.body.description;

  await doc.save();
  return success(res, location, "Location updated");
});

const adminDeleteLocation = asyncHandler(async (req, res) => {
  const doc = await getDoc();
  const idx = findIndex(doc.locations, req.params.id);
  if (idx === -1) throw new ApiError(404, "Location not found");
  const [removed] = doc.locations.splice(idx, 1);
  if (removed.image?.publicId) await deleteByPublicId(removed.image.publicId);
  await doc.save();
  return success(res, null, "Location deleted");
});

const adminReorderLocations = asyncHandler(async (req, res) => {
  const doc = await getDoc();
  const byId = new Map(doc.locations.map((l) => [l._id.toString(), l]));
  const ids = req.body.ids;
  doc.locations = ids
    .map((id, i) => {
      const item = byId.get(id);
      if (item) item.order = i;
      return item;
    })
    .filter(Boolean);
  await doc.save();
  return success(res, sortByOrder(doc.locations), "Locations reordered");
});

/* ------------------------------ Statistics ------------------------------ */

const adminListStatistics = asyncHandler(async (req, res) => {
  const doc = await getDoc();
  return success(res, sortByOrder(doc.statistics), "Statistics retrieved");
});

const adminCreateStatistic = asyncHandler(async (req, res) => {
  const doc = await getDoc();
  const nextOrder = doc.statistics.length
    ? Math.max(...doc.statistics.map((s) => s.order ?? 0)) + 1
    : 0;
  const statistic = {
    value: req.body.value,
    label: req.body.label,
    active: req.body.active ?? true,
    order: nextOrder,
  };
  doc.statistics.push(statistic);
  await doc.save();
  return success(res, doc.statistics[doc.statistics.length - 1], "Statistic added", 201);
});

const adminUpdateStatistic = asyncHandler(async (req, res) => {
  const doc = await getDoc();
  const idx = findIndex(doc.statistics, req.params.id);
  if (idx === -1) throw new ApiError(404, "Statistic not found");
  const statistic = doc.statistics[idx];
  if (req.body.value !== undefined) statistic.value = req.body.value;
  if (req.body.label !== undefined) statistic.label = req.body.label;
  if (req.body.active !== undefined) statistic.active = req.body.active;
  await doc.save();
  return success(res, statistic, "Statistic updated");
});

const adminDeleteStatistic = asyncHandler(async (req, res) => {
  const doc = await getDoc();
  const idx = findIndex(doc.statistics, req.params.id);
  if (idx === -1) throw new ApiError(404, "Statistic not found");
  doc.statistics.splice(idx, 1);
  await doc.save();
  return success(res, null, "Statistic deleted");
});

const adminReorderStatistics = asyncHandler(async (req, res) => {
  const doc = await getDoc();
  const byId = new Map(doc.statistics.map((s) => [s._id.toString(), s]));
  const ids = req.body.ids;
  doc.statistics = ids
    .map((id, i) => {
      const item = byId.get(id);
      if (item) item.order = i;
      return item;
    })
    .filter(Boolean);
  await doc.save();
  return success(res, sortByOrder(doc.statistics), "Statistics reordered");
});

export default {
  getPublicAbout,
  adminGetAbout,
  adminListTeam,
  adminCreateTeamMember,
  adminUpdateTeamMember,
  adminDeleteTeamMember,
  adminReorderTeam,
  adminListLocations,
  adminCreateLocation,
  adminUpdateLocation,
  adminDeleteLocation,
  adminReorderLocations,
  adminListStatistics,
  adminCreateStatistic,
  adminUpdateStatistic,
  adminDeleteStatistic,
  adminReorderStatistics,
};