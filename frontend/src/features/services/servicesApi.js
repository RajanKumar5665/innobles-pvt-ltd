import { api } from "../../lib/api";

// Fetches published services from the public API.
// Pass { limit } to get only the N newest ones (used on the home page).
export const fetchServicesApi = async (options = {}) => {
  const params = new URLSearchParams();
  if (options.limit) params.set("limit", String(options.limit));
  const query = params.toString();

  const response = await api.get(`/services${query ? `?${query}` : ""}`);
  const list = Array.isArray(response?.data) ? response.data : [];

  return list.map((item) => ({
    id: item._id,
    bannerImage: item.banner?.url || "", // backend stores it as banner: { url, publicId }
    title: item.title || "",
    category: item.category || "",
    shortDescription: item.shortDescription || "",
    description: item.description || "",
    features: Array.isArray(item.features)
      ? item.features.map((f) => String(f).trim()).filter(Boolean)
      : [],
    status: item.status || "draft",
  }));
};