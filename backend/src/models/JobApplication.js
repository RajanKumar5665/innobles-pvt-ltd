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

export default mongoose.model("JobApplication", applicationSchema);
