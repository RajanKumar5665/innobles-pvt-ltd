import { useEffect, useState } from "react";
import { fetchBlogsApi } from "../features/blogs/blogsApi";

// Fetch the newest published blogs from the public /blogs API.
// Uses local state (not Redux) so the home page preview does not
// interfere with the full blog listing/detail pages.
// Returns { list, status, error }.
export const useRecentBlogs = (limit = 3) => {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setStatus("loading");
      setError(null);
      try {
        const data = await fetchBlogsApi({ limit });
        if (cancelled) return;
        setList(data);
        setStatus("success");
      } catch (err) {
        if (cancelled) return;
        setError(err.message || "Failed to load blogs");
        setStatus("error");
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { list, status, error };
};