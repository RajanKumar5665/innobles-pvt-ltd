import { useEffect, useState } from "react";
import { fetchProductBySlugApi } from "../features/products/productsApi";

// Fetches one published product by slug for the detail page. Uses local state
// (not Redux) so visiting a detail page never downloads the full product list.
// Returns { product, status, error }.
export const useProductBySlug = (slug) => {
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;
    // Reset for the new slug before fetching (derived-state reset).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus("loading");
    setError(null);
    setProduct(null);

    fetchProductBySlugApi(slug)
      .then((data) => {
        if (cancelled) return;
        setProduct(data);
        setStatus("success");
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || "Failed to load product");
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { product, status, error };
};