import { api } from "../../lib/api";

/** Fetch the public About Us content (team + locations + statistics). */
export const fetchAboutApi = async () => {
  const response = await api.get("/about");
  return response?.data || {};
};