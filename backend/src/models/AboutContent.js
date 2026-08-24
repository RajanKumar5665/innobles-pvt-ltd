import mongoose from "mongoose";

// Single editable document — the intro copy stays hardcoded on the public page,
// only the admin-managed sections (team / locations / statistics) are stored here.
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

// General/intro copy is static (hardcoded in the public page) and intentionally
// not stored here; only the admin-managed sections live in this document.
const aboutContentSchema = new mongoose.Schema(
  {
    teamMembers: { type: [teamMemberSchema], default: [] },
    locations: { type: [locationSchema], default: [] },
    statistics: { type: [statisticSchema], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model("AboutContent", aboutContentSchema);
