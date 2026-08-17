import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../lib/api";
import { selectAdmin } from "../../features/auth/authSlice";
import Loader from "../../components/common/Loader";

const emptyForm = {
  title: "",
  category: "",
  description: "",
  content: "",
  author: "",
  authorAvatar: "",
  status: "draft",
};

const inputClass =
  "w-full rounded-xl border border-line bg-slate-50 px-4 py-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20";

const AdminBlogs = () => {
  const dispatch = useDispatch();
  const admin = useSelector(selectAdmin);
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
      const res = await api.get("/admin/blogs");
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
      category: item.category || "",
      description: item.description || "",
      content: item.content || "",
      author: item.author || "",
      authorAvatar: item.authorAvatar || "",
      status: item.status || "draft",
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
      if (editing) {
        await api.put(`/admin/blogs/${editing}`, form);
      } else {
        await api.post("/admin/blogs", form);
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
    if (!confirm("Delete this blog?")) return;
    try {
      await api.delete(`/admin/blogs/${id}`);
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await api.patch(`/admin/blogs/${id}/status`, { status });
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-disp text-2xl font-bold text-slate-900">Blogs</h1>
          <p className="mt-1 text-sm text-slate-500">Manage blog posts</p>
        </div>
        <button onClick={startCreate} className="btn-primary">New Blog</button>
      </div>

      {showForm && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-disp text-lg font-bold text-slate-900">{editing ? "Edit Blog" : "New Blog"}</h2>
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Title</label>
              <input name="title" value={form.title} onChange={handleChange} className={inputClass} required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Category</label>
                <input name="category" value={form.category} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Content</label>
              <textarea name="content" value={form.content} onChange={handleChange} rows={5} className={inputClass} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Author</label>
                <input name="author" value={form.author} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Author Avatar URL</label>
                <input name="authorAvatar" value={form.authorAvatar} onChange={handleChange} className={inputClass} />
              </div>
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
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{item.title}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{item.category}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => startEdit(item)} className="text-brand-cyan hover:underline">Edit</button>
                      <button onClick={() => handleStatus(item._id, item.status === "published" ? "draft" : "published")} className="text-brand-orange hover:underline">
                        {item.status === "published" ? "Unpublish" : "Publish"}
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-sm text-slate-500">No blogs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminBlogs;
