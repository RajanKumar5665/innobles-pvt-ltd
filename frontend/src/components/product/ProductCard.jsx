import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductImage from "./ProductImage";

/**
 * Public product card — rendered on the homepage preview and the Products
 * listing. Uses the shared `.content-card` surface so it stays visually
 * consistent with Service and Blog cards (same radius, border, shadow, aspect
 * ratio, spacing and CTA). Built entirely from real backend data; the single
 * "View Details" action always opens the existing product detail page.
 */
const ProductCard = ({ product, to = `/products/${product.slug}` }) => {
  const image = product.image || "";

  return (
    <article className="content-card group relative flex h-full flex-col">
      {/* Image — consistent 16:9 crop with subtle hover zoom */}
      <Link
        to={to}
        aria-label={`View ${product.title} product`}
        tabIndex={-1}
        className="relative block aspect-[16/9] w-full shrink-0 overflow-hidden"
      >
        <ProductImage
          src={image}
          alt={product.title || ""}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-disp text-lg font-bold leading-snug tracking-tight text-ink break-words">
          <Link to={to} className="transition-colors hover:text-brand-orange">
            {product.title || "Untitled Product"}
          </Link>
        </h3>

        {product.shortDescription ? (
          <p className="mt-2 text-sm leading-6 text-slate-500 line-clamp-2">{product.shortDescription}</p>
        ) : null}

        <div className="mt-auto pt-4">
          <Link to={to} className="content-link">
            View Details <ArrowRight className="content-link-icon" size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;