import { api } from "../../lib/api";

// Fetches published products from the public API.
// Pass { limit } to get only the N newest (home page preview).
// Otherwise we request up to 50 so the /products pager has the full set.
export const fetchProductsApi = async (options = {}) => {
  const params = new URLSearchParams();
  const limit = options.limit ?? 50;
  if (limit) params.set("limit", String(limit));
  const query = params.toString();

  const response = await api.get(`/products${query ? `?${query}` : ""}`);
  const list = Array.isArray(response?.data) ? response.data : [];
  return list.map((item) => ({
    id: item._id,
    slug: item.slug,
    title: item.name || "Untitled Product",
    shortDescription: item.shortDescription || "",
    description: item.description || "",
    // Category label stored on the product (empty for existing/uncategorized).
    category: item.category || "",
    createdAt: item.createdAt || "",
    // Backend stores the image as { url, publicId }; fall back to the images gallery.
    image: item.image?.url || item.images?.[0]?.url || "",
    productLink: item.productLink || item.link || "",
    status: item.status || "draft",
  }));
};
