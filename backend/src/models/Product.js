import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
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
    shortDescription: {
      type: String,
      trim: true,
    },
    // Product category (one of the shared category labels, e.g. "Collections").
    // Kept as a plain string so it stays easy to filter and read; the admin
    // form uses a controlled dropdown so arbitrary spellings are avoided.
    category: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    // Canonical external product link (optional, e.g. a SaaS landing page).
    productLink: {
      type: String,
      trim: true,
      default: "",
    },
    // Canonical single product image (Cloudinary asset).
    image: {
      url: { type: String },
      publicId: { type: String },
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
    // --- Legacy fields kept for backward compatibility with products created
    // before the form was redesigned. No longer used by the current UI/API but
    // preserved so existing records keep their data and nothing crashes.
    link: {
      type: String,
      trim: true,
      default: "",
    },
    specifications: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    images: [
      {
        url: String,
        publicId: String,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
