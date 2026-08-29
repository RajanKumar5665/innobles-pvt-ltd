import mongoose from "mongoose";

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

applicationSchema.index({ careerId: 1, status: 1, createdAt: -1 });

// Prevent a candidate from submitting more than one application to the same job.
// Mongo enforces this atomically, so even concurrent double-submits (double-click,
// rapid refresh) raise a 11000 duplicate-key error instead of saving a duplicate.
applicationSchema.index({ careerId: 1, email: 1 }, { unique: true });

export default mongoose.model("JobApplication", applicationSchema);
