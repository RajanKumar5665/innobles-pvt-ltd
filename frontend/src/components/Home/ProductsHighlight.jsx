import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRecentProducts } from "../../hooks/useRecentProducts";
import Reveal from "../common/Reveal";
import ProductCard from "../product/ProductCard";

const CARD_LIMIT = 4;

/**
 * Skeleton card shown while products are loading.
 * Mirrors the public ProductCard surface so the loading state
 * feels consistent rather than a generic spinner.
 */
const CardSkeleton = () => (
  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_4px_16px_-6px_rgba(23,32,51,0.10)]">
    <div className="aspect-[16/10] w-full animate-pulse bg-slate-200" />
    <div className="flex flex-1 flex-col gap-2.5 p-6">
      <div className="h-4 w-full rounded bg-slate-200" />
      <div className="h-3.5 w-4/5 rounded bg-slate-200" />
      <div className="h-3.5 w-full rounded bg-slate-200" />
      <div className="h-3.5 w-3/5 rounded bg-slate-200" />
      <div className="mt-auto pt-5">
        <div className="h-9 w-28 rounded bg-slate-200" />
      </div>
    </div>
  </div>
);

/**
 * Public-facing "Products" highlight on the homepage.
 *
 * Cards come from the existing /products API (same data managed in the
 * Admin panel) sorted newest-first and limited to 4 via `?limit=4` at the
 * database level — no frontend slicing of a larger list.
 *
 * Reuses the existing public ProductCard component and "View All Products"
 * navigates to the existing Products listing page (/products).
 */
const ProductsHighlight = () => {
  const { list, status, error } = useRecentProducts(CARD_LIMIT);

  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <div className="container-x">
        {/* Heading */}
        <Reveal>
          <h2 className="font-disp text-3xl font-bold leading-tight text-ink md:text-4xl">
            Products
          </h2>
        </Reveal>
        <Reveal delay={60}>
          <p className="mt-4 max-w-2xl text-slate-600 md:text-lg">
            Discover our products and digital solutions designed for real-world
            business needs.
          </p>
        </Reveal>

        {/* Loading: skeleton cards */}
        {status === "loading" && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: CARD_LIMIT }).map((_, i) => (
              <Reveal key={i} delay={i * 70} className="h-full">
                <CardSkeleton />
              </Reveal>
            ))}
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
            {error ||
              "Something went wrong while loading products. Please refresh."}
          </div>
        )}

        {/* Empty */}
        {status === "success" && list.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-200 bg-white py-12 text-center">
            <p className="text-slate-500">
              No products available at the moment. Check back soon.
            </p>
          </div>
        )}

        {/* Success: cards + View All */}
        {status === "success" && list.length > 0 && (
          <>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {list.slice(0, CARD_LIMIT).map((p, i) => (
                <Reveal key={p.id} delay={i * 70} className="h-full">
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>

            <Reveal delay={CARD_LIMIT * 70 + 30}>
              <div className="mt-12 flex justify-center">
                <Link
                  to="/products"
                  className="btn-ghost inline-flex items-center gap-2 !py-2.5 text-sm"
                >
                  View All Products
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductsHighlight;
