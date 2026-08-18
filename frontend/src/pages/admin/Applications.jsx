import { useEffect, useState } from "react";
import { api, API_BASE } from "../../lib/api";
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
  const [viewResume, setViewResume] = useState(null);

  useEffect(() => {
    if (!viewResume) return;
    const onKey = (e) => e.key === "Escape" && setViewResume(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [viewResume]);

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

  // PDFs are streamed through the backend proxy so they render inline.
  const isPdfResume = !viewResume?.originalName || /\.pdf$/i.test(viewResume.originalName);
  const resumePreviewUrl = viewResume
    ? `${API_BASE}/admin/applications/${viewResume.id}/resume`
    : "";

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
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setViewResume({ id: selected._id, ...selected.resume })}
                        className="rounded-lg bg-brand-cyan px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:brightness-105"
                      >
                        View
                      </button>
                      <a
                        href={selected.resume.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-brand-cyan px-3 py-1.5 text-xs font-semibold text-brand-cyan transition-colors hover:bg-brand-cyan/5"
                      >
                        Download
                      </a>
                      {selected.resume.originalName && (
                        <span className="text-xs text-slate-400">{selected.resume.originalName}</span>
                      )}
                    </div>
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

      {viewResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="resume-preview-title">
          <button type="button" className="absolute inset-0 bg-ink/50 backdrop-blur-sm" aria-label="Close resume preview" onClick={() => setViewResume(null)} />
          <div className="relative z-10 flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
              <h3 id="resume-preview-title" className="min-w-0 truncate font-disp text-sm font-bold text-ink">
                Resume — {viewResume.originalName || "Preview"}
              </h3>
              <div className="flex shrink-0 items-center gap-3">
                {isPdfResume && (
                  <a
                    href={resumePreviewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-brand-cyan hover:underline"
                  >
                    Open in new tab
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setViewResume(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-ink"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>
            {isPdfResume ? (
              <iframe src={resumePreviewUrl} title="Resume preview" className="h-full w-full flex-1 bg-slate-50" />
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-slate-50 p-8 text-center">
                <p className="max-w-sm text-sm text-slate-500">
                  Preview is not available for{" "}
                  <span className="font-semibold text-ink">{viewResume.originalName}</span>. Please download the file
                  to view it.
                </p>
                <a href={viewResume.url} target="_blank" rel="noreferrer" className="btn-primary">
                  Download file
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApplications;
