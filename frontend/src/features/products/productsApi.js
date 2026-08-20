import { api } from "../../lib/api";

/**
 * Fetch published products from the public API.
 *
 * The backend already sorts by `createdAt` descending (newest first) and
 * accepts `?limit=` / `?page=` query params (see productQuerySchema + paginate).
 *
 * Pass `{ limit }` to fetch only the N most-recent records (used by the
 * homepage highlight section). Omit it to fetch the full published set
 * (used by the Products listing / detail pages via the shared Redux slice).
 *
 * Backward-compatible: existing callers that pass no arguments still get the
 * default backend behaviour (all published products, newest-first).
 */
export const fetchProductsApi = async (options = {}) => {
  const params = new URLSearchParams();
  if (options.limit) params.set("limit", String(options.limit));
  const query = params.toString();

  const response = await api.get(`/products${query ? `?${query}` : ""}`);
  const list = Array.isArray(response?.data) ? response.data : [];
  return list.map((item) => ({
    id: item._id,
    slug: item.slug,
    title: item.name || "Untitled Product",
    shortDescription: item.shortDescription || "",
    description: item.description || "",
    // Backend stores the Cloudinary asset as `image: { url, publicId }`.
    // We surface the URL and also fall back to the legacy `images` gallery.
    image: item.image?.url || item.images?.[0]?.url || "",
    // Optional external link — the internal detail page is the main destination.
    productLink: item.productLink || item.link || "",
    status: item.status || "draft",
  }));
};
