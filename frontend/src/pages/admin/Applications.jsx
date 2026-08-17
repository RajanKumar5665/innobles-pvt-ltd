import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import Loader from "../../components/common/Loader";

const inputClass =
  "w-full rounded-xl border border-line bg-slate-50 px-4 py-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20";

const AdminApplications = () => {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ status: "new" });
  const [formStatus, setFormStatus] = useState("idle");

  const load = async () => {
    setStatus("loading");
    setError(null);
    try {
      const res = await api.get("/admin/applications");
      setList(Array.isArray(res?.data) ? res.data : []);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const open = async (id) => {
    try {
      const res = await api.get(`/admin/applications/${id}`);
      setSelected(res?.data || null);
      setForm({ status: res?.data?.status || "new" });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setForm({ status: newStatus });
    setFormStatus("loading");
    try {
      await api.patch(`/admin/applications/${selected._id}/status`, { status: newStatus });
      setFormStatus("success");
      load();
    } catch (err) {
      setFormStatus("error");
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this application?")) return;
    try {
      await api.delete(`/admin/applications/${id}`);
      if (selected?._id === id) setSelected(null);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-disp text-2xl font-bold text-slate-900">Applications</h1>
          <p className="mt-1 text-sm text-slate-500">Manage job applications</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {status === "loading" && (
            <div className="flex justify-center py-12">
              <Loader size="lg" />
            </div>
          )}
          {status === "error" && (
            <div className="p-4 text-sm text-red-600">{error}</div>
          )}
          {status === "success" && (
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Career</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {list.map((item) => (
                  <tr key={item._id} className={`cursor-pointer hover:bg-slate-50 ${selected?._id === item._id ? "bg-brand-orange/5" : ""}`} onClick={() => open(item._id)}>
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">{item.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{item.careerId?.title || "-"}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.status === "new" ? "bg-red-100 text-red-700" : item.status === "reviewing" ? "bg-amber-100 text-amber-700" : item.status === "shortlisted" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm">
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(item._id); }} className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
                {list.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-sm text-slate-500">No applications found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {selected && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-disp text-lg font-bold text-slate-900">Application Details</h3>
              <select value={form.status} onChange={handleStatusChange} className={inputClass + " !w-auto"}>
                <option value="new">New</option>
                <option value="reviewing">Reviewing</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
                <option value="hired">Hired</option>
              </select>
            </div>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Applicant</dt>
                <dd className="mt-1 text-slate-900">{selected.name}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email</dt>
                <dd className="mt-1 text-slate-900">{selected.email}</dd>
              </div>
              {selected.phone && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Phone</dt>
                  <dd className="mt-1 text-slate-900">{selected.phone}</dd>
                </div>
              )}
              {selected.careerId && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Role</dt>
                  <dd className="mt-1 text-slate-900">{selected.careerId.title} • {selected.careerId.department}</dd>
                </div>
              )}
              {selected.coverLetter && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Cover Letter</dt>
                  <dd className="mt-1 whitespace-pre-wrap rounded-lg border border-slate-100 bg-slate-50 p-3 text-slate-700">{selected.coverLetter}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Resume</dt>
                <dd className="mt-1">
                  {selected.resume?.url ? (
                    <a href={selected.resume.url} target="_blank" rel="noreferrer" className="text-brand-cyan hover:underline">Download resume</a>
                  ) : (
                    <span className="text-slate-500">No resume uploaded</span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Submitted</dt>
                <dd className="mt-1 text-slate-900">{new Date(selected.createdAt).toLocaleString()}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminApplications;
