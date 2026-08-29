import { useCallback, useEffect, useState } from "react";
import { BarChart3, MapPin, Users } from "lucide-react";
import { api } from "../../lib/api";
import Loader from "../../components/common/Loader";
import { TeamSection } from "../../components/about/admin/TeamSection";
import { LocationsSection } from "../../components/about/admin/LocationsSection";
import { StatisticsSection } from "../../components/about/admin/StatisticsSection";

// About Us admin panel. Manages the dynamic Team, Locations and Statistics
// sections. General/intro copy stays static on the public page.
const TABS = [
  { id: "team", label: "Team", icon: Users },
  { id: "locations", label: "Locations", icon: MapPin },
  { id: "statistics", label: "Statistics", icon: BarChart3 },
];

const emptyContent = { teamMembers: [], locations: [], statistics: [] };

const AdminAbout = () => {
  const [content, setContent] = useState(emptyContent);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("team");

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const payload = await api.get("/admin/about");
      const data = payload?.data ?? payload;
      setContent({
        teamMembers: Array.isArray(data?.teamMembers) ? data.teamMembers : [],
        locations: Array.isArray(data?.locations) ? data.locations : [],
        statistics: Array.isArray(data?.statistics) ? data.statistics : [],
      });
      setStatus("success");
      setError(null);
    } catch (err) {
      setError(err?.message || "Failed to load About content.");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-disp text-2xl font-bold text-slate-900">About Us</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage the dynamic sections — Team, Locations and Statistics — shown on the public About Us page.
        </p>
      </div>

      {status === "loading" && (
        <div className="mt-6 flex justify-center py-12">
          <Loader size="lg" />
        </div>
      )}

      {status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
          <div className="mt-3">
            <button type="button" onClick={load} className="btn-ghost !px-3 !py-2 text-sm">
              Try again
            </button>
          </div>
        </div>
      )}

      {status === "success" && (
        <>
          <nav className="flex flex-wrap gap-2" role="tablist" aria-label="About sections">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  id={`about-tab-${t.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-brand-orange/10 text-brand-orange"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon size={16} aria-hidden="true" /> {t.label}
                </button>
              );
            })}
          </nav>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            {tab === "team" && <TeamSection members={content.teamMembers} onChanged={load} />}
            {tab === "locations" && <LocationsSection locations={content.locations} onChanged={load} />}
            {tab === "statistics" && <StatisticsSection statistics={content.statistics} onChanged={load} />}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={load} className="btn-ghost">
              Refresh
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminAbout;
