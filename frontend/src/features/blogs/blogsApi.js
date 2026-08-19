import { api } from "../../lib/api";

const toDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
};

export const fetchBlogsApi = async () => {
  // Fetch every available blog (the backend caps at 50) so the
  // client-side pager on /blog has the full data set to work with.
  const response = await api.get("/blogs?limit=50");
  const list = Array.isArray(response?.data) ? response.data : [];
  return list.map((item) => ({
    id: item._id,
    title: item.title,
    slug: item.slug,
    category: item.category,
    tag: item.category,
    description: item.description || "",
    excerpt: item.description || "",
    image: item.image?.url || "",
    author: item.author || "Innobles Team",
    authorAvatar: item.authorAvatar || "",
    date: toDate(item.publishedAt),
    readTime: "6 min read",
  }));
};
