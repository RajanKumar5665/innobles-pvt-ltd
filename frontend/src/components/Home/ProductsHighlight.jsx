import ContentShowcase from "./ContentShowcase";
import ProductCard from "../product/ProductCard";
import { useRecentProducts } from "../../hooks/useRecentProducts";

const CARD_LIMIT = 3;

// Home page "Products" section — shows the 3 newest products.
const ProductsHighlight = () => {
  const { list, status, error } = useRecentProducts(CARD_LIMIT);

  return (
    <ContentShowcase
      sectionClassName="bg-slate-50"
      eyebrow="What We Build"
      title="Our Products"
      subtitle="Ready-to-deploy platforms for collections, disbursements, treasury, procurement
and governance — configured to your department, not built from scratch."
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
