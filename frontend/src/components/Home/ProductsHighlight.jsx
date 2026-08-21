import ContentShowcase from "./ContentShowcase";
import ProductCard from "../product/ProductCard";
import { useRecentProducts } from "../../hooks/useRecentProducts";

const CARD_LIMIT = 3;

/**
 * Public-facing "Products" highlight on the homepage.
 *
 * Cards come from the existing /products API (same data managed in the
 * Admin panel) sorted newest-first and limited to 3 so the grid matches the
 * Services and Blog previews. Reuses the shared `ContentShowcase` shell
 * (centered header + staggered 3-column grid + consistent CTA) and the existing
 * public ProductCard component. "View All Products" navigates to the existing
 * Products listing page (/products). No product system is duplicated.
 */
const ProductsHighlight = () => {
  const { list, status, error } = useRecentProducts(CARD_LIMIT);

  return (
    <ContentShowcase
      sectionClassName="bg-slate-50"
      eyebrow="What We Build"
      title="Our Products"
      subtitle="Explore innovative digital products built to simplify processes, solve real business challenges, and create lasting value."
      list={list}
      status={status}
      errorMessage={error || "Something went wrong while loading products. Please refresh."}
      emptyMessage="No products available at the moment. Check back soon."
      renderCard={(p) => <ProductCard product={p} />}
      cta={{ to: "/products", label: "View All Products" }}
    />
  );
};

export default ProductsHighlight;
