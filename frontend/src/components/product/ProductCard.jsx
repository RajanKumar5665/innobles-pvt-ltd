import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductImage from "./ProductImage";

// Card grid layouts: 1 column on phones, 2 up to desktop, 3 on xl. The
// `sizes` hint tells the browser which srcset width to pick for each viewport.
const CARD_IMAGE_SIZES = "(min-width: 1280px) 380px, (min-width: 640px) 50vw, 100vw";

// Public product card used on the home preview and Products listing.
// Memoized so paginating/filtering never re-renders cards whose product
// didn't change.
const ProductCard = memo(
  ({ product, to = `/products/${product.slug}`, priority = false }) => {
    const image = product.image || "";

    return (
      <article className="content-card group relative flex h-full flex-col">
        <Link
          to={to}
          aria-label={`View ${product.title} product`}
          tabIndex={-1}
          className="content-card-media relative block aspect-[16/9] w-full shrink-0 overflow-hidden"
        >
          <ProductImage
            src={image}
            alt={product.title || ""}
            priority={priority}
            sizes={CARD_IMAGE_SIZES}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#172B3A]/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </Link>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-disp text-[1.05rem] font-bold leading-snug tracking-tight text-ink break-words">
            <Link to={to} className="transition-colors duration-200 hover:text-brand-orange">
              {product.title || "Untitled Product"}
            </Link>
          </h3>

          {product.shortDescription ? (
            <p className="mt-2 text-sm leading-6 text-slate-500 line-clamp-2">{product.shortDescription}</p>
          ) : null}

          <div className="mt-auto border-t border-line/80 pt-4">
            <Link to={to} className="content-link">
              View Details <ArrowRight className="content-link-icon" size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    );
  },
);

// Keep the component name visible in React DevTools.
ProductCard.displayName = "ProductCard";

export default ProductCard;
