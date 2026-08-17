import Seo from "../components/seo/Seo";
import SectionHeading from "../components/common/SectionHeading";
import Reveal from "../components/common/Reveal";
import Loader from "../components/common/Loader";
import Icon from "../components/common/Icon";
import CTA from "../components/Home/CTA";
import { useProducts } from "../hooks/useProducts";

const Products = () => {
  const { list, status, error } = useProducts();

  return (
    <>
      <Seo
        title="Products"
        description="Explore Innobles software products — CRM, HRMS, inventory, analytics, e-commerce and AI document automation."
        path="/products"
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 hero-glow" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="container-x relative py-20 text-center md:py-24">
          <p className="eyebrow mb-4 justify-center">Our Products</p>
          <h1 className="mx-auto max-w-3xl font-disp text-4xl font-bold leading-tight md:text-5xl">
            Software products built to <span className="text-gradient">run your business</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-white/60 md:text-lg">
            Ready-to-deploy platforms for sales, operations, HR, analytics and more — with room to customise as you
            scale.
          </p>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHeading eyebrow="Product suite" title="What we offer" />

        {status === "loading" && (
          <div className="mt-12">
            <Loader className="!h-32" size="lg" />
          </div>
        )}

        {status === "error" && (
          <div className="mt-12 rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-700" role="alert">
            {error || "Something went wrong while loading products. Please refresh."}
          </div>
        )}

        {status === "success" && (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {list.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 90}>
                <article className="card group flex h-full flex-col p-7">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-accent/15 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110">
                        <Icon icon={p.icon} className="h-7 w-7 text-accent" strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary">{p.category}</p>
                        <h3 className="font-disp text-xl font-bold">{p.title}</h3>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                      {p.pricing}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-white/70">{p.tagline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{p.desc}</p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] text-accent">
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <CTA />
    </>
  );
};

export default Products;
