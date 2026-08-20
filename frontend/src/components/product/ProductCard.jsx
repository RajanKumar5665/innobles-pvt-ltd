import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductImage from "./ProductImage";

/**
 * Public product card — rendered on the customer-facing products listing.
 * Built entirely from real backend data returned by the API:
 *
 *   image            → landscape image (16:10, object-cover, hover zoom, fallback)
 *   title            → primary heading (wraps safely)
 *   shortDescription → clamped 2–3 line teaser (full text lives on the detail page)
 *
 * This card is intentionally public-only: it exposes a single "View Details"
 * action that always opens the internal product detail page (the main
 * destination). The optional external product link is shown on the detail page
 * as a separate "Visit Product" button. No admin fields (id, status, etc.) are
 * ever exposed here.
 */
const ProductCard = ({
  product,
  to = `/products/${product.slug}`,
}) => {
  const image = product.image || "";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_4px_16px_-6px_rgba(23,32,51,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/40 hover:shadow-[0_18px_40px_-14px_rgba(23,32,51,0.22)]">
      {/* Image */}
      <Link
        to={to}
        aria-label={`View ${product.title} product`}
        tabIndex={-1}
        className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden"
      >
        <ProductImage
          src={image}
          alt={product.title || ""}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        {/* Title */}
        <h3 className="font-disp text-lg font-bold leading-snug text-ink break-words">
          <Link to={to} className="transition-colors hover:text-brand-orange">
            {product.title || "Untitled Product"}
          </Link>
        </h3>

        {/* Short description (clamped — full description only on detail page) */}
        {product.shortDescription ? (
          <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-2">
            {product.shortDescription}
          </p>
        ) : null}

        {/* View Details — single public action */}
        <div className="mt-auto pt-5">
          <Link
            to={to}
            className="btn-primary !px-4 !py-2.5 text-sm inline-flex items-center gap-1.5"
          >
            View Details
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;