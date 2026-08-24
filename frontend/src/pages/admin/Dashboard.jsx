import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Package, Users, FileText, MessageSquare, Briefcase } from "lucide-react";
import {
  fetchStats,
  selectStats,
  selectStatsStatus,
  selectStatsError,
} from "../../features/auth/authThunks";
import Loader from "../../components/common/Loader";
import ContentStatCard from "../../components/admin/ContentStatCard";
import DashboardChart from "../../components/admin/DashboardChart";
import ApplicationChart from "../../components/admin/ApplicationChart";
import RecentActivity from "../../components/admin/RecentActivity";

const Dashboard = () => {
  const dispatch = useDispatch();
  const stats = useSelector(selectStats);
  const status = useSelector(selectStatsStatus);
  const error = useSelector(selectStatsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStats());
    }
  }, [status, dispatch]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-disp text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of your website content and activity
        </p>
      </div>

      {status === "loading" && (
        <div className="flex justify-center py-12">
          <Loader size="lg" />
        </div>
      )}

      {status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error || "Failed to load dashboard stats."}
        </div>
      )}

      {status === "success" && (
        <div className="space-y-6">
          {/* --- Stats: one card per content type, all values combined --- */}
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <ContentStatCard
              title="Blogs"
              icon={FileText}
              color="bg-brand-orange"
              stats={[
                { label: "Total", value: stats.blogs?.total, dot: "bg-brand-orange" },
                { label: "Published", value: stats.blogs?.published, dot: "bg-emerald-500" },
                { label: "Draft", value: stats.blogs?.draft, dot: "bg-slate-400" },
              ]}
            />
            <ContentStatCard
              title="Products"
              icon={Package}
              color="bg-brand-orange"
              stats={[
                { label: "Total", value: stats.products?.total, dot: "bg-brand-orange" },
                { label: "Published", value: stats.products?.published, dot: "bg-emerald-500" },
                { label: "Draft", value: stats.products?.draft, dot: "bg-slate-400" },
              ]}
            />
            <ContentStatCard
              title="Services"
              icon={Package}
              color="bg-brand-orange"
              stats={[
                { label: "Total", value: stats.services?.total, dot: "bg-brand-orange" },
                { label: "Published", value: stats.services?.published, dot: "bg-emerald-500" },
                { label: "Draft", value: stats.services?.draft, dot: "bg-slate-400" },
              ]}
            />
            <ContentStatCard
              title="Careers"
              icon={Briefcase}
              color="bg-emerald-500"
              stats={[
                { label: "Open", value: stats.careers?.open, dot: "bg-emerald-500" },
                { label: "Closed", value: stats.careers?.closed, dot: "bg-slate-400" },
                { label: "Total", value: stats.careers?.total, dot: "bg-brand-orange" },
              ]}
            />
            <ContentStatCard
              title="Contacts"
              icon={MessageSquare}
              color="bg-red-500"
              stats={[
                { label: "Unread", value: stats.contacts?.unread, dot: "bg-red-500" },
                { label: "Read", value: stats.contacts?.read, dot: "bg-amber-500" },
                { label: "Total", value: stats.contacts?.total, dot: "bg-brand-orange" },
              ]}
            />
            <ContentStatCard
              title="Applications"
              icon={Users}
              color="bg-blue-500"
              stats={[
                { label: "New", value: stats.applications?.new, dot: "bg-blue-500" },
                { label: "Hired", value: stats.applications?.hired, dot: "bg-emerald-500" },
                { label: "Total", value: stats.applications?.total, dot: "bg-brand-orange" },
              ]}
            />
          </div>

          {/* --- Charts --- */}
          <div className="grid gap-6 lg:grid-cols-2">
            <DashboardChart stats={stats} />
            <ApplicationChart stats={stats} />
          </div>

          {/* --- Recent Activity --- */}
          <RecentActivity stats={stats} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;