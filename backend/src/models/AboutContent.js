import mongoose from "mongoose";

/**
 * About Us content — a single editable document.
 *
 * Mirrors the existing HomeContent pattern: one document holds structured
 * sections, and the admin edits it through dedicated endpoints. Nested
 * sections (team / locations / statistics) are stored as arrays of
 * subdocuments. Each subdocument has its own `_id`, `createdAt`/`updatedAt`
 * and an `order` field used for explicit reordering.
 */

const imageObject = {
  url: { type: String, default: "" },
  publicId: { type: String, default: "" },
};

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    role: { type: String, default: "", trim: true },
    description: { type: String, default: "" },
    linkedin: { type: String, default: "", trim: true },
    image: imageObject,
    order: { type: Number, default: 0 },
  },
  { _id: true, timestamps: true },
);

const locationSchema = new mongoose.Schema(
  {
    city: { type: String, required: [true, "City is required"], trim: true },
    country: { type: String, default: "", trim: true },
    address: { type: String, default: "" },
    phone: { type: String, default: "", trim: true },
    email: { type: String, default: "", trim: true },
    mapLink: { type: String, default: "", trim: true },
    description: { type: String, default: "" },
    image: imageObject,
    order: { type: Number, default: 0 },
  },
  { _id: true, timestamps: true },
);

const statisticSchema = new mongoose.Schema(
  {
    value: { type: String, required: [true, "Value is required"], trim: true },
    label: { type: String, required: [true, "Label is required"], trim: true },
    icon: { type: String, default: "", trim: true },
    description: { type: String, default: "" },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { _id: true, timestamps: true },
);

/**
 * About Us content — the general/intro copy is STATIC (hardcoded in the
 * public page) and intentionally NOT stored here. Only the sections that are
 * managed through the admin panel — team, locations and statistics — live in
 * this document. Each entry is a subdocument with its own `_id`,
 * `createdAt`/`updatedAt` and an `order` field used for explicit reordering.
 */
const aboutContentSchema = new mongoose.Schema(
  {
    teamMembers: { type: [teamMemberSchema], default: [] },
    locations: { type: [locationSchema], default: [] },
    statistics: { type: [statisticSchema], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model("AboutContent", aboutContentSchema);