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
import StatCard from "../../components/admin/StatCard";
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
        <div className="space-y-8">
          {/* --- Stat Cards (grouped by content type) --- */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              label="Total Blogs"
              value={stats.blogs?.total}
              icon={FileText}
              color="bg-brand-cyan"
            />
            <StatCard
              label="Published Blogs"
              value={stats.blogs?.published}
              color="bg-emerald-500"
            />
            <StatCard
              label="Draft Blogs"
              value={stats.blogs?.draft}
              color="bg-slate-400"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              label="Total Products"
              value={stats.products?.total}
              icon={Package}
              color="bg-brand-cyan"
            />
            <StatCard
              label="Published Products"
              value={stats.products?.published}
              color="bg-emerald-500"
            />
            <StatCard
              label="Draft Products"
              value={stats.products?.draft}
              color="bg-slate-400"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              label="Total Services"
              value={stats.services?.total}
              icon={Package}
              color="bg-brand-cyan"
            />
            <StatCard
              label="Published Services"
              value={stats.services?.published}
              color="bg-emerald-500"
            />
            <StatCard
              label="Draft Services"
              value={stats.services?.draft}
              color="bg-slate-400"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              label="Open Careers"
              value={stats.careers?.open}
              icon={Briefcase}
              color="bg-emerald-500"
            />
            <StatCard
              label="Closed Careers"
              value={stats.careers?.closed}
              color="bg-slate-400"
            />
            <StatCard
              label="Total Careers"
              value={stats.careers?.total}
              icon={Briefcase}
              color="bg-brand-cyan"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              label="Unread Contacts"
              value={stats.contacts?.unread}
              icon={MessageSquare}
              color="bg-red-500"
            />
            <StatCard
              label="Read Contacts"
              value={stats.contacts?.read}
              color="bg-amber-500"
            />
            <StatCard
              label="Total Contacts"
              value={stats.contacts?.total}
              icon={MessageSquare}
              color="bg-brand-cyan"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              label="New Applications"
              value={stats.applications?.new}
              icon={Users}
              color="bg-blue-500"
            />
            <StatCard
              label="Total Applications"
              value={stats.applications?.total}
              icon={Users}
              color="bg-brand-cyan"
            />
            <StatCard
              label="Hired"
              value={stats.applications?.hired}
              color="bg-emerald-500"
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
