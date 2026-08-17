import { api } from "../../lib/api";

export const fetchHomeApi = async () => {
  const response = await api.get("/home");
  return response?.data || {};
};

export const updateHomeApi = async (payload) => {
  const response = await api.put("/admin/home", payload);
  return response?.data || null;
};
