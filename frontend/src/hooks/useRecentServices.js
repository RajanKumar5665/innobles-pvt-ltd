import { useEffect, useState } from "react";
import { fetchServicesApi } from "../features/services/servicesApi";

/**
 * Fetches the most-recently added published services (limited, newest-first)
 * directly from the existing public /services API.
 *
 * Uses local component state (NOT the shared services Redux slice) so that
 * the homepage's limited fetch never pollutes the Services listing / detail
 * pages which need the full published set.
 *
 * Returns the same shape as the existing `useServices` hook:
 *   { list, status, error }
 * where status is one of: "idle" | "loading" | "success" | "error"
 */
export const useRecentServices = (limit = 4) => {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setStatus("loading");
      setError(null);
      try {
        const data = await fetchServicesApi({ limit });
        if (cancelled) return;
        setList(data);
        setStatus("success");
      } catch (err) {
        if (cancelled) return;
        setError(err.message || "Failed to load services");
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
