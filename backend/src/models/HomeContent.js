import mongoose from "mongoose";

const homeContentSchema = new mongoose.Schema(
  {
    hero: {
      title: { type: String, trim: true },
      highlightedText: { type: String, trim: true },
      description: { type: String },
      image: { url: String, publicId: String },
      buttonText: { type: String, trim: true },
      buttonLink: { type: String, trim: true },
    },
    highlights: [
      {
        icon: { type: String, default: "" },
        title: { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],
    featuredProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    featuredBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
    cta: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      buttonText: { type: String, default: "" },
      buttonLink: { type: String, default: "" },
    },
  },
  { timestamps: true },
);

export default mongoose.model("HomeContent", homeContentSchema);
