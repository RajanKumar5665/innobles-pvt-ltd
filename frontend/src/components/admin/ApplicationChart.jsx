import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

// Donut chart showing the distribution of job application statuses.
const COLORS = ["#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444", "#10b981"];

const ApplicationChart = ({ stats }) => {
  const apps = stats?.applications ?? {};
  const data = [
    { name: "New", value: apps.new ?? 0 },
    { name: "Reviewing", value: apps.reviewing ?? 0 },
    { name: "Shortlisted", value: apps.shortlisted ?? 0 },
    { name: "Rejected", value: apps.rejected ?? 0 },
    { name: "Hired", value: apps.hired ?? 0 },
  ].filter((d) => d.value > 0);

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-disp text-lg font-bold text-slate-900">
          Applications
        </h3>
        <p className="mt-4 text-sm text-slate-400">No applications yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="font-disp text-lg font-bold text-slate-900">
        Applications by Status
      </h3>
      <p className="mt-1 text-xs text-slate-500">
        Total: {data.reduce((s, d) => s + d.value, 0)}
      </p>

      <div className="mt-4 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              content={({ name, value }) => [name, value]}
              contentStyle={{
                borderRadius: "0.75rem",
                border: "1px solid #e2e8f0",
              }}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              height={36}
            />
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {data.map((_, i) => (
                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ApplicationChart;