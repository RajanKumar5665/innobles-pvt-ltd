import { api } from "../../lib/api";

export const loginApi = async (payload) => {
  const response = await api.post("/admin/auth/login", payload);
  return response?.data || null;
};

export const logoutApi = async () => {
  const response = await api.post("/admin/auth/logout");
  return response?.data || null;
};

export const fetchAdminMe = async () => {
  const response = await api.get("/admin/auth/me");
  return response?.data || null;
};

export const fetchDashboardStats = async () => {
  const response = await api.get("/admin/dashboard");
  return response?.data || {};
};
