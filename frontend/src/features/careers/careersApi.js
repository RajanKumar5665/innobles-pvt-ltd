import { api } from "../../lib/api";

export const fetchCareersApi = async () => {
  const response = await api.get("/careers?limit=50");
  const list = Array.isArray(response?.data) ? response.data : [];
  return list.map((item) => ({
    id: item._id,
    title: item.title,
    department: item.department,
    location: item.location || "",
    type: item.jobType || "full-time",
    status: item.status === "open" ? "Open" : "Closed",
    postedLabel: "Posted recently",
    postedDays: 0,
    description: item.description || "",
    responsibilities: Array.isArray(item.responsibilities) ? item.responsibilities : [],
    requirements: Array.isArray(item.requirements) ? item.requirements : [],
  }));
};
