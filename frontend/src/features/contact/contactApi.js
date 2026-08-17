import { api } from "../../lib/api";

export const submitContactApi = async (payload) => {
  const response = await api.post("/contact", payload);
  return response?.data || { id: payload.id, ...payload };
};
