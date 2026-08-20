import { api } from "../../lib/api";

/**
 * Fetch published services from the public API.
 *
 * The backend already sorts by `createdAt` descending (newest first) and
 * accepts `?limit=` / `?page=` query params (see serviceQuerySchema + paginate).
 *
 * Pass `{ limit }` to fetch only the N most-recent records (used by the
 * homepage highlight section). Omit it to fetch the full published set
 * (used by the Services listing / detail pages via the shared Redux slice).
 *
 * Backward-compatible: existing callers that pass no arguments still get the
 * default backend behaviour (all published services, newest-first).
 */
export const fetchServicesApi = async (options = {}) => {
  const params = new URLSearchParams();
  if (options.limit) params.set("limit", String(options.limit));
  const query = params.toString();

  const response = await api.get(`/services${query ? `?${query}` : ""}`);
  const list = Array.isArray(response?.data) ? response.data : [];
  return list.map((item) => ({
    id: item._id,
    // Backend stores the Cloudinary asset as `banner: { url, publicId }`.
    // We surface the URL as `bannerImage` so cards/details can use one field.
    bannerImage: item.banner?.url || "",
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
