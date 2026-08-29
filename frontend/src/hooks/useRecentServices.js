import { useEffect, useState } from "react";
import { fetchServicesApi } from "../features/services/servicesApi";

// Fetches the newest published services from the public /services API.
// Uses local state (not Redux) so the home preview does not affect the
// full Services listing/detail pages. Returns { list, status, error }.
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
