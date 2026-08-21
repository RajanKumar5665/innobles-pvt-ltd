import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Seo from "../components/seo/Seo";
import Loader from "../components/common/Loader";
import ProductImage from "../components/product/ProductImage";
import { useProducts } from "../hooks/useProducts";
import { toRenderableHtml } from "../lib/richText";

/**
 * Product detail page — shows the complete product. Built from the real
 * backend data (no fake/hard-coded content). The "View Details" card always
 * lands here; a separate "Visit Product" button appears only when the admin
 * provided an optional external link.
 */
const ProductDetail = () => {
  const { slug } = useParams();
  const { list, status, error } = useProducts();
  const product = list.find((p) => p.slug === slug);

  if (status === "loading" || status === "idle") {
    return (
      <section className="container-x py-20">
        <Loader className="!h-32" size="lg" />
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="container-x py-20">
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-700" role="alert">
          {error || "Product could not be loaded. Please refresh."}
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="container-x py-24 text-center">
        <p className="eyebrow mb-4 justify-center">Product not found</p>
        <h1 className="font-disp text-3xl font-bold text-ink">This product is unavailable.</h1>
        <Link to="/products" className="btn-primary mt-8 inline-flex items-center gap-2">
          <ArrowLeft size={16} aria-hidden="true" /> Back to all products
        </Link>
      </section>
    );
  }

  const hasDescription = Boolean(product.description && product.description.trim());

  return (
    <>
      <Seo
        title={product.title}
        description={product.shortDescription || product.description}
        path={`/products/${product.slug}`}
      />

      <section className="container-x py-8 md:py-10">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-brand-orange"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Back to all products
        </Link>

        {/* Hero image */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white">
          <ProductImage
            src={product.image}
            alt={product.title || ""}
            className="h-64 w-full object-cover md:h-80"
          />
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <div>
            <h1 className="font-disp text-3xl font-bold leading-tight text-ink break-words md:text-4xl">
              {product.title}
            </h1>

            {product.shortDescription ? (
              <p className="mt-4 text-lg font-medium text-muted">{product.shortDescription}</p>
            ) : null}

            {hasDescription && (
              <div className="mt-6 border-t border-line pt-6">
                <h2 className="font-disp text-xl font-bold text-ink">About this product</h2>
                <div
                  className="content-rich-body"
                  dangerouslySetInnerHTML={{ __html: toRenderableHtml(product.description) }}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-line bg-slate-50 p-6 lg:sticky lg:top-24">
            <p className="eyebrow">Product</p>
            <p className="mt-3 text-sm font-bold text-ink">{product.title}</p>

            <Link to="/contact" className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2">
              <CheckCircle2 size={16} aria-hidden="true" /> Get in touch
            </Link>
            <p className="mt-2 text-center text-xs text-muted">Start with a free discovery call</p>

            {/* Show the external product link only when the admin provided one. */}
            {product.productLink && (
              <a
                href={product.productLink}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost mt-3 inline-flex w-full items-center justify-center gap-2"
                aria-label={`Visit ${product.title} product`}
              >
                <ArrowUpRight size={16} aria-hidden="true" /> Visit Product
              </a>
            )}
          </aside>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;