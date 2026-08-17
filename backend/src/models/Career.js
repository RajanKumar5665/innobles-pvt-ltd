import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      default: "full-time",
    },
    description: {
      type: String,
      default: "",
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    requirements: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    postedAt: {
      type: Date,
      default: Date.now,
    },
    closingDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

careerSchema.index({ status: 1, department: 1, jobType: 1 });
careerSchema.index({ postedAt: -1, closingDate: 1 });

export default mongoose.model("Career", careerSchema);
