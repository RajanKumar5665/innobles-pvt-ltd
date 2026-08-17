import { TrendingUp, TrendingDown } from "lucide-react";

/**
 * Reusable stat card for the dashboard.
 * - label:  sub-text above the value
 * - value:  main number / text
 * - icon:   optional lucide icon component
 * - trend:  "up" | "down" | "neutral" (controls the trend arrow)
 * - color:  bg color class for the accent (e.g. "bg-brand-orange")
 */
const StatCard = ({ label, value, icon: Icon, trend, color = "bg-brand-orange" }) => {
  const IconColor = color.replace("bg-", "text-");

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <p className={`mt-2 font-disp text-3xl font-bold ${IconColor}`}>
            {value ?? 0}
          </p>
        </div>
        {Icon && (
          <div className={`rounded-lg p-2.5 ${color}/10`}>
            <Icon size={20} className={IconColor} />
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
          {trend === "up" && <TrendingUp size={14} className="text-emerald-500" />}
          {trend === "down" && <TrendingDown size={14} className="text-red-500" />}
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
