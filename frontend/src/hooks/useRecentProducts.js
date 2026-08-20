import { useEffect, useState } from "react";
import { fetchProductsApi } from "../features/products/productsApi";

/**
 * Fetches the most-recently added published products (limited, newest-first)
 * directly from the existing public /products API.
 *
 * Uses local component state (NOT the shared products Redux slice) so that
 * the homepage's limited fetch never pollutes the Products listing / detail
 * pages which need the full published set.
 *
 * Returns the same shape as the existing `useProducts` hook:
 *   { list, status, error }
 * where status is one of: "idle" | "loading" | "success" | "error"
 */
export const useRecentProducts = (limit = 4) => {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setStatus("loading");
      setError(null);
      try {
        const data = await fetchProductsApi({ limit });
        if (cancelled) return;
        setList(data);
        setStatus("success");
      } catch (err) {
        if (cancelled) return;
        setError(err.message || "Failed to load products");
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
