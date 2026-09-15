import mongoose from "mongoose";
import { normalizePhoneKey } from "../utils/applicationDuplicate.js";

const applicationSchema = new mongoose.Schema(
  {
    careerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      required: [true, "Career is required"],
      index: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    // Auto-derived from phone, used only for the duplicate-check index below.
    phoneKey: {
      type: String,
      trim: true,
    },
    resume: {
      url: String,
      publicId: String,
      originalName: String,
    },
    coverLetter: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["new", "reviewing", "shortlisted", "rejected", "hired"],
      default: "new",
    },
  },
  { timestamps: true },
);

// Keeps phoneKey in sync with phone before every save.
applicationSchema.pre("validate", function () {
  this.phoneKey = this.phone ? normalizePhoneKey(this.phone) : undefined;
});

applicationSchema.index({ careerId: 1, status: 1, createdAt: -1 });

// One application per candidate per job.
applicationSchema.index({ careerId: 1, email: 1 }, { unique: true });

// Same rule for phone, but only applies when a phone is actually present.
applicationSchema.index(
  { careerId: 1, phoneKey: 1 },
  {
    unique: true,
    partialFilterExpression: { phoneKey: { $type: "string", $ne: "" } },
  },
);

export default mongoose.model("JobApplication", applicationSchema);