import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import FeatureCheck from "../common/FeatureCheck";
import ServiceBanner from "./ServiceBanner";


const ServiceCard = ({
  service,
  to = `/services/${service.id || service._id}`,
  showFeatures = true,
  enableHover = true,
}) => {
  const bannerImage = service.bannerImage || service.banner?.url || "";
  const features = (Array.isArray(service.features) ? service.features : [])
    .map((f) => String(f).trim())
    .filter(Boolean);
  const visibleFeatures = features.slice(0, 3);
  const extraCount = features.length - visibleFeatures.length;

  const imageClass = [
    "h-full w-full object-cover",
    enableHover ? "transition-transform duration-500 ease-out group-hover:scale-105" : "",
  ].filter(Boolean).join(" ");

  return (
    <article className={`content-card ${enableHover ? "group " : ""}relative flex h-full flex-col`}>
      {/* Banner — consistent 16:9 crop; hover zoom + gradient overlay are optional */}
      <Link
        to={to}
        aria-label={`View ${service.title} service`}
        tabIndex={-1}
        className="relative block aspect-[16/9] w-full shrink-0 overflow-hidden"
      >
        <ServiceBanner
          src={bannerImage}
          alt={service.title || ""}
          className={imageClass}
        />
        {/* Gradient overlay for subtle depth on hover */}
        {enableHover ? (
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        ) : null}

        {service.category ? (
          <span className="card-category-badge">
            <Sparkles size={11} className="shrink-0" aria-hidden="true" />
            <span className="truncate">{service.category}</span>
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-disp text-lg font-bold leading-snug tracking-tight text-ink break-words">
          <Link to={to} className="transition-colors hover:text-brand-orange">
            {service.title || "Untitled Service"}
          </Link>
        </h3>

        {service.shortDescription ? (
          <p className="mt-2 text-sm leading-6 text-slate-500 line-clamp-2">{service.shortDescription}</p>
        ) : null}

        {showFeatures && visibleFeatures.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {visibleFeatures.map((f, idx) => (
              <li
                key={`${f}-${idx}`}
                className="flex items-start gap-2 text-[13px] font-medium leading-snug text-slate-600"
              >
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-cyan/10">
                  <FeatureCheck className="h-2.5 w-2.5 text-brand-cyan" />
                </span>
                <span className="min-w-0 flex-1 break-words">{f}</span>
              </li>
            ))}
            {extraCount > 0 ? (
              <li className="pl-3 text-xs font-semibold text-brand-orange">
                +{extraCount} more feature{extraCount > 1 ? "s" : ""}
              </li>
            ) : null}
          </ul>
        ) : null}

        <div className="mt-auto pt-4">
          <Link to={to} className="content-link">
            View Service <ArrowRight className="content-link-icon" size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;