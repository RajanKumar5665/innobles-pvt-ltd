import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Seo from "../components/seo/Seo";
import Loader from "../components/common/Loader";
import Icon from "../components/common/Icon";
import { useProducts } from "../hooks/useProducts";

const ProductDetail = () => {
  const { slug } = useParams();
  const { list, status, error } = useProducts();
  const product = list.find((p) => p.slug === slug);

  if (status === "loading" || status === "idle") {
    return (
      <div className="container-x py-20">
        <Loader className="!h-32" size="lg" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="container-x py-20">
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-700" role="alert">
          {error || "Product could not be loaded. Please refresh."}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-x py-24 text-center">
        <p className="eyebrow mb-4 justify-center">Product not found</p>
        <h1 className="font-disp text-3xl font-bold">This product is unavailable.</h1>
        <Link to="/products" className="btn-primary mt-8 inline-flex items-center gap-2">
          <ArrowLeft size={16} aria-hidden="true" /> Back to all products
        </Link>
      </div>
    );
  }

  return (
    <>
      <Seo
        title={product.title}
        description={product.tagline || product.desc}
        path={`/products/${product.slug}`}
      />

      <section className="container-x py-8 md:py-10">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-brand-orange"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Back to all products
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-line/60">
                <Icon icon={product.icon} className="h-8 w-8 text-accent" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{product.category}</p>
                <h1 className="font-disp text-3xl font-bold leading-tight md:text-4xl">{product.title}</h1>
              </div>
            </div>

            <p className="mt-6 text-lg font-medium text-white/70">{product.tagline}</p>
            <p className="mt-4 text-base leading-relaxed text-white/60">{product.desc}</p>

            {product.features.length > 0 && (
              <div className="mt-8">
                <h2 className="font-disp text-xl font-bold">Features</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/60">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:sticky lg:top-24">
            <p className="eyebrow">Details</p>
            <p className="mt-3 text-sm font-bold">{product.category}</p>

            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted">Pricing</p>
            <p className="mt-1 text-sm">{product.pricing}</p>

            <Link to="/contact" className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2">
              Get in touch
            </Link>
            <p className="mt-2 text-center text-xs text-muted">
              Start with a free discovery call
            </p>
          </aside>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;