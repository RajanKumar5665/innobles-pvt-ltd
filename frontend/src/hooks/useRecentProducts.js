import { useEffect, useState } from "react";
import { fetchProductsApi } from "../features/products/productsApi";

// Fetches the newest published products from the public /products API.
// Uses local state (not Redux) so the home preview does not affect the
// full Products listing/detail pages. Returns { list, status, error }.
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
