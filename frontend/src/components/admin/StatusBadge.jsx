/**
 * Color-coded status badge used across admin tables and forms.
 * The `scheme` prop lets you pick the palette — otherwise it
 * auto-detects common status values.
 */
const STATUS_SCHEMES = {
  // blog / product / service (draft|published)
  draft: "bg-slate-100 text-slate-600",
  published: "bg-emerald-100 text-emerald-700",
  // career (open|closed)
  open: "bg-emerald-100 text-emerald-700",
  closed: "bg-slate-100 text-slate-600",
  // contact (unread|read|resolved)
  unread: "bg-red-100 text-red-700",
  read: "bg-amber-100 text-amber-700",
  resolved: "bg-emerald-100 text-emerald-700",
  // application (new|reviewing|shortlisted|rejected|hired)
  new: "bg-blue-100 text-blue-700",
  reviewing: "bg-amber-100 text-amber-700",
  shortlisted: "bg-indigo-100 text-indigo-700",
  rejected: "bg-red-100 text-red-700",
  hired: "bg-emerald-100 text-emerald-700",
};

const StatusBadge = ({ status, scheme, className = "" }) => {
  const cls = scheme ?? STATUS_SCHEMES[status] ?? "bg-slate-100 text-slate-600";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls} ${className}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
