import { Link } from "react-router-dom";
import { ArrowUpRight, Eye, Pencil, Plus, Power, Trash2 } from "lucide-react";
import ServiceBanner from "../service/ServiceBanner";
import StatusBadge from "./StatusBadge";
import FeatureCheck from "../common/FeatureCheck";

/**
 * Admin service card — rendered only on the Admin → Services page.
 *
 * Shows the management view of a service:
 *   bannerImage      → landscape banner at the top (object-cover, neutral fallback)
 *   category         → small uppercase badge (hidden when the service has none)
 *   title            → primary heading (long titles wrap)
 *   shortDescription → clamped 2–3 line summary (full text lives in the form)
 *   features         → up to 3 checks, then "+N more"
 *   status           → compact color-coded badge
 *
 * Actions (admin-only): View Service, Edit, Publish/Unpublish and Delete.
 * This card intentionally carries admin controls — the customer-facing public
 * service card (`components/service/ServiceCard.jsx`) is a separate component
 * that exposes only a "View Service" link.
 *
 * Props:
 *   service        – raw service record from GET /admin/services
 *   onEdit         – open the edit form for this service
 *   onToggleStatus – toggle publish status
 *   onDelete       – request deletion (opens the confirmation dialog)
 */
const VISIBLE_FEATURES = 3;

const AdminServiceCard = ({ service, onEdit, onToggleStatus, onDelete }) => {
  const id = service._id || service.id;
  const title = service.title || "Untitled Service";
  // Backend stores the Cloudinary asset as `banner: { url, publicId }`.
  // `bannerImage` is also accepted for mapped responses from the public API.
  const bannerImage = service.banner?.url || service.bannerImage || "";

  const features = (Array.isArray(service.features) ? service.features : [])
    .map((f) => String(f).trim())
    .filter(Boolean);
  const visibleFeatures = features.slice(0, VISIBLE_FEATURES);
  const extraCount = features.length - visibleFeatures.length;

  const status = service.status || "draft";
  const isPublished = status === "published";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-orange/40 hover:shadow-[0_14px_32px_-16px_rgba(23,32,51,0.25)]">
      {/* Banner image */}
      <Link
        to={`/services/${id}`}
        tabIndex={-1}
        aria-label={`View ${title}`}
        className="relative block aspect-[16/9] w-full shrink-0 overflow-hidden"
      >
        <ServiceBanner
          src={bannerImage}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {/* Category badge + Status */}
        <div className="flex items-center gap-2">
          {service.category ? (
            <span className="inline-flex max-w-[60%] items-center rounded-full bg-brand-orange/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-orange">
              <span className="truncate">{service.category}</span>
            </span>
          ) : null}
          <span className="ml-auto shrink-0">
            <StatusBadge status={status} />
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-3 font-disp text-lg font-bold leading-snug text-ink break-words">
          {title}
        </h3>

        {/* Short description — 2–3 line summary only */}
        {service.shortDescription ? (
          <p className="mt-1.5 text-sm leading-6 text-slate-600 line-clamp-2">
            {service.shortDescription}
          </p>
        ) : null}

        {/* Compact feature summary */}
        {visibleFeatures.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {visibleFeatures.map((f, idx) => (
              <li
                key={`${f}-${idx}`}
                className="flex items-start gap-1.5 text-xs font-medium text-slate-600"
              >
                <FeatureCheck className="mt-0.5 h-3.5 w-3.5 text-brand-cyan" />
                <span className="min-w-0 break-words">{f}</span>
              </li>
            ))}
            {extraCount > 0 && (
              <li className="inline-flex items-center gap-1 text-xs font-semibold text-brand-cyan">
                <Plus size={12} aria-hidden="true" strokeWidth={2.5} />
                +{extraCount} more
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Admin actions */}
      <div className="mt-auto flex divide-x divide-slate-200 border-t border-slate-100 bg-slate-50/70">
        <Link
          to={`/services/${id}`}
          className="flex flex-1 items-center justify-center gap-1 py-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-white hover:text-brand-orange"
        >
          <Eye size={14} aria-hidden="true" />
          View Service
          <ArrowUpRight size={12} aria-hidden="true" />
        </Link>
        <button
          type="button"
          onClick={() => onEdit(service)}
          className="flex flex-1 items-center justify-center gap-1 py-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-white hover:text-brand-orange"
        >
          <Pencil size={13} aria-hidden="true" />
          Edit
        </button>
        <button
          type="button"
          onClick={() => onToggleStatus(service)}
          className="flex flex-1 items-center justify-center gap-1 py-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-white hover:text-brand-orange"
        >
          <Power size={13} aria-hidden="true" />
          {isPublished ? "Unpublish" : "Publish"}
        </button>
        <button
          type="button"
          onClick={() => onDelete(service)}
          className="flex flex-1 items-center justify-center gap-1 py-3 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
        >
          <Trash2 size={13} aria-hidden="true" />
          Delete
        </button>
      </div>
    </article>
  );
};

export default AdminServiceCard;