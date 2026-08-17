import { api } from "../../lib/api";

export const fetchServicesApi = async () => {
  const response = await api.get("/services");
  const list = Array.isArray(response?.data) ? response.data : [];
  return list.map((item) => ({
    id: item._id,
    title: item.title,
    icon: item.icon || "circle",
    desc: item.description || "",
    features: Array.isArray(item.features) ? item.features : [],
  }));
};
