import { api } from "../../lib/api";

// Fetches the public About Us content (team + locations + statistics).
export const fetchAboutApi = async () => {
  const response = await api.get("/about");
  return response?.data || {};
};