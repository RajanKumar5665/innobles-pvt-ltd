import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import Loader from "../../components/common/Loader";

const emptyForm = {
  title: "",
  department: "",
  location: "",
  jobType: "full-time",
  description: "",
  responsibilities: "",
  requirements: "",
  status: "open",
};

const inputClass =
  "w-full rounded-xl border border-line bg-slate-50 px-4 py-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20";

const AdminCareers = () => {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formStatus, setFormStatus] = useState("idle");
  const [formError, setFormError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    setStatus("loading");
    setError(null);
    try {
      const res = await api.get("/admin/careers");
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

  const startCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
    setFormStatus("idle");
    setFormError(null);
  };

  const startEdit = (item) => {
    setEditing(item._id);
    setForm({
      title: item.title || "",
      department: item.department || "",
      location: item.location || "",
      jobType: item.jobType || "full-time",
      description: item.description || "",
      responsibilities: Array.isArray(item.responsibilities) ? item.responsibilities.join("\n") : "",
      requirements: Array.isArray(item.requirements) ? item.requirements.join("\n") : "",
      status: item.status || "open",
    });
    setShowForm(true);
    setFormStatus("idle");
    setFormError(null);
  };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");
    setFormError(null);
    try {
      const payload = {
        ...form,
        responsibilities: form.responsibilities ? form.responsibilities.split("\n").map((item) => item.trim()).filter(Boolean) : [],
        requirements: form.requirements ? form.requirements.split("\n").map((item) => item.trim()).filter(Boolean) : [],
      };
      if (editing) {
        await api.put(`/admin/careers/${editing}`, payload);
      } else {
        await api.post("/admin/careers", payload);
      }
      setFormStatus("success");
      setShowForm(false);
      setEditing(null);
      setForm(emptyForm);
      load();
    } catch (err) {
      setFormStatus("error");
      setFormError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this career?")) return;
    try {
      await api.delete(`/admin/careers/${id}`);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await api.patch(`/admin/careers/${id}/status`, { status });
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-disp text-2xl font-bold text-slate-900">Careers</h1>
          <p className="mt-1 text-sm text-slate-500">Manage job openings</p>
        </div>
        <button onClick={startCreate} className="btn-primary">New Career</button>
      </div>

      {showForm && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-disp text-lg font-bold text-slate-900">{editing ? "Edit Career" : "New Career"}</h2>
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Title</label>
                <input name="title" value={form.title} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Department</label>
                <input name="department" value={form.department} onChange={handleChange} className={inputClass} required />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Location</label>
                <input name="location" value={form.location} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Job Type</label>
                <select name="jobType" value={form.jobType} onChange={handleChange} className={inputClass}>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Responsibilities (one per line)</label>
              <textarea name="responsibilities" value={form.responsibilities} onChange={handleChange} rows={3} className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Requirements (one per line)</label>
              <textarea name="requirements" value={form.requirements} onChange={handleChange} rows={3} className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            {formError && <p className="text-sm text-red-600">{formError}</p>}
            <div className="flex gap-3">
              <button type="submit" disabled={formStatus === "loading"} className="btn-primary">
                {formStatus === "loading" ? "Saving..." : editing ? "Update" : "Create"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
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
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Title</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Department</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{item.title}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{item.department}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{item.location || "-"}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.status === "open" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => startEdit(item)} className="text-brand-cyan hover:underline">Edit</button>
                      <button onClick={() => handleStatus(item._id, item.status === "open" ? "closed" : "open")} className="text-brand-orange hover:underline">
                        {item.status === "open" ? "Close" : "Open"}
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">No careers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminCareers;
