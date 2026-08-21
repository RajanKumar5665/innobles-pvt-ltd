import { api } from "../../lib/api";

const toDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
};

export const fetchBlogsApi = async (options = {}) => {
  // `?limit=` is optional — used by the homepage preview to fetch only the N
  // most-recent published articles. When omitted we keep the original
  // full-newest-first behaviour (up to the 50 record cap) so the client-side
  // pager on /blog still has the complete published set to slice.
  const params = new URLSearchParams();
  const limit = options.limit ?? 50;
  if (limit) params.set("limit", String(limit));
  const query = params.toString();

  const response = await api.get(`/blogs${query ? `?${query}` : ""}`);
  const list = Array.isArray(response?.data) ? response.data : [];
  return list.map((item) => ({
    id: item._id,
    title: item.title,
    slug: item.slug,
    category: item.category,
    tag: item.category,
    description: item.description || "",
    content: item.content || "",
    excerpt: item.description || "",
    image: item.image?.url || "",
    author: item.author || "Innobles Team",
    authorAvatar: item.authorAvatar || "",
    date: toDate(item.publishedAt),
    readTime: "6 min read",
  }));
};
