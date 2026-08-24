/**
 * ContentStatCard — combines all the stats for one content type
 * into a single compact card.
 *
 * props:
 * - title:   content type heading (e.g. "Blogs")
 * - icon:    optional lucide icon component
 * - color:   accent color classes (e.g. "bg-brand-orange")
 * - stats:   array of { label, value, dot } rows shown together
 */
const ContentStatCard = ({ title, icon: Icon, color = "bg-brand-orange", stats = [] }) => {
  const IconColor = color.replace("bg-", "text-");

  return (
    <div className="card p-3">
      <div className="flex items-center justify-between">
        <p className="min-w-0 truncate text-xs font-bold uppercase tracking-wider text-slate-700">
          {title}
        </p>
        {Icon && (
          <div className={`ml-1 rounded-md p-1 ${color}/10`}>
            <Icon size={14} className={`${IconColor} shrink-0`} strokeWidth={2.5} />
          </div>
        )}
      </div>

      <div className="mt-2 space-y-1">
        {stats.map(({ label, value, dot }) => (
          <div
            key={label}
            className="flex items-center justify-between gap-2 text-xs text-slate-600"
          >
            <span className="flex min-w-0 items-center gap-1.5 truncate">
              {dot && <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} />}
              <span className="truncate">{label}</span>
            </span>
            <span className="font-semibold text-slate-900 tabular-nums">{value ?? 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentStatCard;