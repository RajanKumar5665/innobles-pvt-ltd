import { api } from "../../lib/api";

export const fetchProductsApi = async () => {
  const response = await api.get("/products");
  const list = Array.isArray(response?.data) ? response.data : [];
  return list.map((item) => ({
    id: item._id,
    slug: item.slug,
    title: item.name || "Untitled Product",
    tagline: item.shortDescription || "",
    category: "Product",
    icon: "package",
    link: item.link || "",
    desc: item.description || "",
    features: Array.isArray(item.specifications) ? item.specifications : [],
    pricing: "Custom",
  }));
};
