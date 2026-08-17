import { api } from "../../lib/api";

const toDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
};

export const fetchBlogsApi = async () => {
  const response = await api.get("/blogs");
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
    featured: false,
  }));
};
