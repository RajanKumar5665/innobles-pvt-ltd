import { useEffect, useState } from "react";
import { fetchBlogsApi } from "../features/blogs/blogsApi";

/**
 * Fetches the most-recently published blogs (limited, newest-first) directly
 * from the existing public /blogs API.
 *
 * Uses local component state (NOT the shared blogs Redux slice) so the
 * homepage's small preview fetch never interferes with the Blog listing /
 * detail pages which need the full published set.
 *
 * Returns the same shape as the existing `useBlogs` hook:
 *   { list, status, error }
 * where status is one of: "idle" | "loading" | "success" | "error".
 */
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