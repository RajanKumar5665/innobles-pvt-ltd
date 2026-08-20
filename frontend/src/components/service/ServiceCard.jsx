import { Link } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import FeatureCheck from "../common/FeatureCheck";
import ServiceBanner from "./ServiceBanner";

/**
 * Public service card — rendered on the customer-facing services listing and
 * the Home services grid. Built from the real backend data returned by the API:
 *
 *   bannerImage      → landscape banner (16:9, object-cover, hover zoom, fallback)
 *   category         → small uppercase badge
 *   title            → primary heading (wraps safely)
 *   shortDescription → 2–3 line clamped teaser (full text lives on the details page)
 *   features         → up to 4 checks, then "+N more"
 *
 * This card is intentionally public-only: it exposes a single "View Service"
 * action and no admin controls (edit / delete / publish). The admin service
 * management page uses its own table layout and does not render this card.
 */
const ServiceCard = ({
  service,
  to = `/services/${service.id || service._id}`,
}) => {
  const bannerImage = service.bannerImage || service.banner?.url || "";
  const features = (Array.isArray(service.features) ? service.features : [])
    .map((f) => String(f).trim())
    .filter(Boolean);
  const visibleFeatures = features.slice(0, 4);
  const extraCount = features.length - visibleFeatures.length;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_4px_16px_-6px_rgba(23,32,51,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/40 hover:shadow-[0_18px_40px_-14px_rgba(23,32,51,0.22)]">
      {/* Banner */}
      <Link
        to={to}
        aria-label={`View ${service.title} service`}
        tabIndex={-1}
        className="relative block aspect-[16/9] w-full shrink-0 overflow-hidden"
      >
        <ServiceBanner
          src={bannerImage}
          alt={service.title || ""}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        {/* Category badge */}
        {service.category ? (
          <span className="inline-flex max-w-full items-center rounded-full bg-brand-orange/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-orange truncate">
            <span className="truncate">{service.category}</span>
          </span>
        ) : null}

        {/* Title */}
        <h3 className="mt-3 font-disp text-lg font-bold leading-snug text-ink break-words">
          <Link to={to} className="transition-colors hover:text-brand-orange">
            {service.title || "Untitled Service"}
          </Link>
        </h3>

        {/* Short description (clamped — full description only on detail page) */}
        {service.shortDescription ? (
          <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-2">
            {service.shortDescription}
          </p>
        ) : null}

        {/* Features (max 4) */}
        {visibleFeatures.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-x-1 gap-y-1.5">
            {visibleFeatures.map((f, idx) => (
              <li
                key={`${f}-${idx}`}
                className="inline-flex min-w-0 items-center gap-1 text-xs font-medium text-slate-600 break-words"
              >
                <FeatureCheck className="h-3.5 w-3.5 shrink-0 text-brand-cyan" />
                <span className="min-w-0 break-words">{f}</span>
              </li>
            ))}
            {extraCount > 0 && (
              <li className="inline-flex items-center gap-1 text-xs font-medium text-brand-cyan">
                <Plus size={12} aria-hidden="true" strokeWidth={2.5} />
                {extraCount} more feature{extraCount > 1 ? "s" : ""}
              </li>
            )}
          </ul>
        )}

        {/* View Service — single public action */}
        <div className="mt-auto pt-5">
          <Link
            to={to}
            className="btn-primary !px-4 !py-2.5 text-sm inline-flex items-center gap-1.5"
          >
            View Service
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;