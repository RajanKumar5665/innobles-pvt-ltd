import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    // Legacy icon key — kept for backward compatibility with services created
    // before the admin form was updated. New services omit it entirely.
    icon: {
      type: String,
      default: "",
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    features: {
      type: [String],
      default: [],
    },
    banner: {
      url: { type: String },
      publicId: { type: String },
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },
  },
  { timestamps: true }
);

serviceSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model("Service", serviceSchema);
