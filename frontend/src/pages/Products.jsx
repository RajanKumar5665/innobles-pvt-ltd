import Seo from "../components/seo/Seo";
import SectionHeading from "../components/common/SectionHeading";
import Loader from "../components/common/Loader";
import StaggerGroup, { StaggerItem } from "../components/common/StaggerGroup";
import ProductCard from "../components/product/ProductCard";
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
          <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <StaggerItem key={p.id} className="h-full">
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>

      <CTA />
    </>
  );
};

export default Products;
