import { ArrowLeft, Check, CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Seo from "../components/seo/Seo";
import Loader from "../components/common/Loader";
import ServiceBanner from "../components/service/ServiceBanner";
import { useServices } from "../hooks/useServices";

// Service detail page — shows everything about one service.
const ServiceDetail = () => {
  const { id } = useParams();
  const { list, status, error } = useServices();
  const service = list.find((item) => item.id === id);

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
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-600" role="alert">
          {error || "Service could not be loaded. Please refresh."}
        </div>
      </section>
    );
  }

  if (!service) {
    return (
      <section className="container-x py-24 text-center">
        <p className="eyebrow mb-4 justify-center">Service not found</p>
        <h1 className="font-disp text-3xl font-bold text-ink">This service is unavailable.</h1>
        <Link to="/services" className="btn-primary mt-8 inline-flex items-center gap-2">
          <ArrowLeft size={16} aria-hidden="true" /> Back to all services
        </Link>
      </section>
    );
  }

  const features = (Array.isArray(service.features) ? service.features : [])
    .map((f) => String(f).trim())
    .filter(Boolean);
  const hasDescription = Boolean(service.description && service.description.trim());

  return (
    <>
      <Seo
        title={service.title}
        description={service.shortDescription || service.description}
        path={`/services/${service.id}`}
      />

      <section className="container-x py-8 md:py-10">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-brand-orange"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Back to all services
        </Link>

        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white">
          <ServiceBanner
            src={service.bannerImage}
            alt={service.title}
            className="h-56 w-full object-cover"
          />
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {service.category ? (
                <span className="inline-flex items-center rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-orange">
                  {service.category}
                </span>
              ) : null}
              {service.status ? (
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                    service.status === "published"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {service.status}
                </span>
              ) : null}
            </div>

            <h1 className="mt-4 font-disp text-3xl font-bold leading-tight text-ink md:text-4xl break-words">
              {service.title}
            </h1>

            {service.shortDescription ? (
              <p className="mt-4 text-lg font-medium text-muted">{service.shortDescription}</p>
            ) : null}

            {hasDescription ? (
              <div className="mt-6 border-t border-line pt-6">
                <h2 className="font-disp text-xl font-bold text-ink">About this service</h2>
                <p className="mt-4 whitespace-pre-line text-base leading-7 text-slate-600">
                  {service.description}
                </p>
              </div>
            ) : null}

            {features.length > 0 && (
              <div className="mt-8">
                <h2 className="font-disp text-xl font-bold text-ink">What&apos;s included</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {features.map((f, idx) => (
                    <li
                      key={`${f}-${idx}`}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
                      <span className="min-w-0 break-words">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-line bg-slate-50 p-6 lg:sticky lg:top-24">
            <p className="eyebrow">Service</p>
            <p className="mt-3 text-sm font-bold text-ink">{service.category || service.title}</p>

            {service.status ? (
              <>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted">Status</p>
                <p className="mt-1 text-sm capitalize">{service.status}</p>
              </>
            ) : null}

            <Link to="/contact" className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2">
              <CheckCircle2 size={16} aria-hidden="true" /> Get in touch
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

export default ServiceDetail;