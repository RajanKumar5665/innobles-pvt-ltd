import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

/**
 * Bar chart comparing published vs draft counts for
 * Blogs, Products and Services side-by-side.
 */
const DashboardChart = ({ stats }) => {
  const data = [
    {
      name: "Blogs",
      published: stats?.blogs?.published ?? 0,
      draft: stats?.blogs?.draft ?? 0,
    },
    {
      name: "Products",
      published: stats?.products?.published ?? 0,
      draft: stats?.products?.draft ?? 0,
    },
    {
      name: "Services",
      published: stats?.services?.published ?? 0,
      draft: stats?.services?.draft ?? 0,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="font-disp text-lg font-bold text-slate-900">
        Content Overview
      </h3>
      <p className="mt-1 text-xs text-slate-500">Published vs draft items</p>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: "0.75rem", border: "1px solid #e2e8f0" }}
              cursor={{ fill: "#f1f5f9" }}
            />
            <Legend />
            <Bar
              dataKey="published"
              fill="#10b981"
              name="Published"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="draft"
              fill="#94a3b8"
              name="Draft"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;
