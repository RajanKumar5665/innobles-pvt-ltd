import { Clock, FileText, MessageSquare, Briefcase } from "lucide-react";

const iconMap = {
  blog: FileText,
  application: Briefcase,
  contact: MessageSquare,
};

const statusLabel = (type, status) => {
  if (type === "blog") {
    return status === "published" ? "Published" : "Draft";
  }
  if (type === "application") {
    return status?.charAt(0).toUpperCase() + status?.slice(1);
  }
  return status ?? "Unread";
};

const statusColor = (type, status) => {
  if (type === "blog") {
    return status === "published"
      ? "bg-emerald-500"
      : "bg-slate-400";
  }
  if (type === "application") {
    const map = {
      new: "bg-blue-500",
      reviewing: "bg-amber-500",
      shortlisted: "bg-indigo-500",
      rejected: "bg-red-500",
      hired: "bg-emerald-500",
    };
    return map[status] || "bg-slate-400";
  }
  const map = {
    unread: "bg-red-500",
    read: "bg-amber-500",
    resolved: "bg-emerald-500",
  };
  return map[status] || "bg-slate-400";
};

const timeAgo = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const now = new Date();
  const diff = Math.floor((now - d) / 1000); // seconds
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

/**
 * Shows the latest activity from blogs, applications and contacts.
 */
const RecentActivity = ({ stats }) => {
  const items = [];

  (stats?.recentBlogs || []).forEach((b) => {
    items.push({
      type: "blog",
      title: b.title,
      status: b.status,
      time: timeAgo(b.updatedAt || b.createdAt),
      id: b._id,
    });
  });
  (stats?.recentApplications || []).forEach((a) => {
    items.push({
      type: "application",
      title: `${a.name} — ${a.careerId?.title || "Job"}`,
      status: a.status,
      time: timeAgo(a.createdAt),
      id: a._id,
    });
  });
  (stats?.recentContacts || []).forEach((c) => {
    items.push({
      type: "contact",
      title: `${c.name}: ${c.subject || "New message"}`,
      status: c.status,
      time: timeAgo(c.createdAt),
      id: c._id,
    });
  });

  items.sort((a, b) => (a.time > b.time ? -1 : 1));
  const safeItems = items.slice(0, 8);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-disp text-lg font-bold text-slate-900">
          Recent Activity
        </h3>
        <Clock size={16} className="text-slate-400" />
      </div>

      <div className="mt-4 space-y-3">
        {safeItems.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-400">
            No recent activity.
          </p>
        ) : (
          safeItems.map((item) => {
            const Icon = iconMap[item.type] || FileText;
            return (
              <div
                key={`${item.type}-${item.id}`}
                className="flex items-start gap-3"
              >
                <div
                  className={`rounded-lg p-1.5 ${statusColor(item.type, item.status)}/10`}
                >
                  <Icon
                    size={16}
                    className={statusColor(item.type, item.status).replace(
                      "bg-",
                      "text-",
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-semibold ${statusColor(item.type, item.status)} text-white`}
                    >
                      {statusLabel(item.type, item.status)}
                    </span>
                    <span className="text-xs text-slate-400">
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentActivity;