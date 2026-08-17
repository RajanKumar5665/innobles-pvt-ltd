import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      default: "",
    },
    image: {
      url: { type: String },
      publicId: { type: String },
    },
    author: {
      type: String,
      trim: true,
      default: "Innobles Team",
    },
    authorAvatar: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
    publishedAt: {
      type: Date,
      index: true,
    },
  },
  { timestamps: true },
);

blogSchema.index({ status: 1, publishedAt: -1 });

export default mongoose.model("Blog", blogSchema);
