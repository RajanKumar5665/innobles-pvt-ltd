import { api } from "../../lib/api.js";

export const submitContactApi = async (payload) => {
  const response = await api.post("/contact", payload);
  return response?.data;
};
