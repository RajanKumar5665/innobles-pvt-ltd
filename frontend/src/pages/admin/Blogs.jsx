import { useEffect, useRef, useState } from "react";
import { api } from "../../lib/api";
import Loader from "../../components/common/Loader";
import RichTextEditor from "../../components/common/RichTextEditor";

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
  "w-full rounded-xl border border-line bg-slate-50 px-4 py-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20";

/* ----------------------------------------------------------------------------
 * Draft persistence (localStorage)
 * A unique key per form context keeps the "New Blog" draft separate from any
 * per-blog edit draft, so editing one post never overwrites another's draft.
 * -------------------------------------------------------------------------- */
const DRAFT_CREATE_KEY = "blog_form_draft_create";
const DRAFT_EDIT_KEY = (id) => `blog_form_draft_${id}`;

const readDraft = (key) => {
  const drop = () => {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  };
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      drop();
      return null;
    }
    return parsed;
  } catch {
    // Malformed/corrupted JSON → ignore it and remove it.
    drop();
    return null;
  }
};

const writeDraft = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota / private-mode errors */
  }
};

const clearDraft = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
};

// A rich-text value is "empty" when it has no visible text or image.
const isRichContentEmpty = (html) => {
  if (!html) return true;
  const node = document.createElement("div");
  node.innerHTML = html;
  return !node.textContent.trim() && !node.querySelector("img");
};

// Only restore a saved draft that actually has user-entered content.
const draftHasContent = (draft) =>
  Boolean(
    (draft.title && draft.title.trim()) ||
      (draft.category && draft.category.trim()) ||
      (draft.content && draft.content.trim()) ||
      (draft.author && draft.author.trim()) ||
      (draft.description && !isRichContentEmpty(draft.description)),
  );

const AdminBlogs = () => {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formStatus, setFormStatus] = useState("idle");
  const [formError, setFormError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  // File uploads for the blog image and author avatar.
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [existingAvatarUrl, setExistingAvatarUrl] = useState("");
  // Tracks the last persisted draft so we skip redundant writes.
  const lastDraftRef = useRef("");

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
    // Data fetch on mount; `load` synchronously sets the loading status (intentional).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const resetUploads = () => {
    setImageFile(null);
    setImagePreview(null);
    setAvatarFile(null);
    setAvatarPreview(null);
    setExistingImageUrl("");
    setExistingAvatarUrl("");
  };

  // Persist the current form as a draft whenever a field changes, using a
  // context-specific key (create vs. per-blog edit). Writing to localStorage
  // never re-renders React, so there is no save loop; the lastDraftRef guard
  // additionally skips re-saving an identical restored state.
  useEffect(() => {
    if (!showForm) return;
    const key = editing ? DRAFT_EDIT_KEY(editing) : DRAFT_CREATE_KEY;
    const draft = {
      title: form.title || "",
      category: form.category || "",
      status: form.status || "draft",
      description: form.description || "",
      content: form.content || "",
      author: form.author || "",
      authorAvatar: form.authorAvatar || "",
    };
    const token = `${key}::${JSON.stringify(draft)}`;
    if (lastDraftRef.current === token) return;
    writeDraft(key, draft);
    lastDraftRef.current = token;
  }, [showForm, editing, form]);

  // Warn the user before leaving/reloading with unsaved content.
  useEffect(() => {
    if (!showForm) return undefined;
    const hasContent = draftHasContent(form);
    if (!hasContent) return undefined;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [showForm, form]);

  const startCreate = () => {
    setEditing(null);
    lastDraftRef.current = "";
    const saved = readDraft(DRAFT_CREATE_KEY);
    resetUploads();
    if (saved && draftHasContent(saved)) {
      setForm({
        title: saved.title || "",
        category: saved.category || "",
        status: saved.status || "draft",
        description: saved.description || "",
        content: saved.content || "",
        author: saved.author || "",
        authorAvatar: saved.authorAvatar || "",
      });
    } else {
      setForm(emptyForm);
    }
    setShowForm(true);
    setFormStatus("idle");
    setFormError(null);
  };

  const startEdit = (item) => {
    setEditing(item._id);
    lastDraftRef.current = "";
    resetUploads();
    // Load the persisted blog (source of truth) — never the create draft.
    setForm({
      title: item.title || "",
      category: item.category || "",
      description: item.description || "",
      content: item.content || "",
      author: item.author || "",
      authorAvatar: item.authorAvatar || "",
      status: item.status || "draft",
    });
    setExistingImageUrl(item.image?.url || "");
    setExistingAvatarUrl(item.authorAvatar || "");
    setShowForm(true);
    setFormStatus("idle");
    setFormError(null);
  };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleDescriptionChange = (html) => setForm((prev) => ({ ...prev, description: html }));

  const handleContentChange = (html) => setForm((prev) => ({ ...prev, content: html }));

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file || null);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleAvatarFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file || null);
    setAvatarPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleCancel = () => {
    clearDraft(editing ? DRAFT_EDIT_KEY(editing) : DRAFT_CREATE_KEY);
    lastDraftRef.current = "";
    setEditing(null);
    setForm(emptyForm);
    resetUploads();
    setShowForm(false);
    setFormStatus("idle");
    setFormError(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    // Guard against publishing a blog with empty required fields. Drafts are
    // allowed to be incomplete, but a published article must be fully filled.
    if (form.status === "published") {
      const missing = [];
      if (!form.title || !form.title.trim()) missing.push("Title");
      if (!form.category || !form.category.trim()) missing.push("Category");
      if (isRichContentEmpty(form.description)) missing.push("Description");
      if (isRichContentEmpty(form.content)) missing.push("Content");
      if (missing.length) {
        setFormError(
          `Cannot publish: ${missing.join(", ")} ${missing.length > 1 ? "are required" : "is required"}.`,
        );
        setFormStatus("idle");
        return;
      }
    }

    setFormStatus("loading");
    setFormError(null);
    try {
      // Normalize an "empty" rich-text description (e.g. only <p></p>) to "".
      const description = isRichContentEmpty(form.description) ? "" : form.description;
      const content = isRichContentEmpty(form.content) ? "" : form.content;
      const payload = { ...form, description, content };
      const hasUploads = imageFile || avatarFile;
      if (hasUploads) {
        // multipart/form-data so the uploaded files reach the backend.
        const fd = new FormData();
        fd.append("title", payload.title);
        fd.append("category", payload.category);
        fd.append("description", payload.description || "");
        fd.append("content", payload.content || "");
        fd.append("author", payload.author || "");
        fd.append("status", payload.status);
        if (imageFile) fd.append("image", imageFile);
        if (avatarFile) fd.append("authorAvatar", avatarFile);
        if (editing) {
          await api.putForm(`/admin/blogs/${editing}`, fd);
        } else {
          await api.postForm("/admin/blogs", fd);
        }
      } else if (editing) {
        await api.put(`/admin/blogs/${editing}`, payload);
      } else {
        await api.post("/admin/blogs", payload);
      }
      // Clear the draft after a successful create/edit and reset the form.
      clearDraft(editing ? DRAFT_EDIT_KEY(editing) : DRAFT_CREATE_KEY);
      lastDraftRef.current = "";
      setFormStatus("success");
      setShowForm(false);
      setEditing(null);
      setForm(emptyForm);
      resetUploads();
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
              <RichTextEditor
                value={form.description}
                onChange={handleDescriptionChange}
                placeholder="Write a short description for this blog…"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Content</label>
              <RichTextEditor
                value={form.content}
                onChange={handleContentChange}
                placeholder="Write the full blog article here…"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Author</label>
                <input name="author" value={form.author} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Blog Image</label>
                <input type="file" accept="image/*" onChange={handleImageFileChange} className={inputClass} />
                {(imagePreview || existingImageUrl) && (
                  <div className="mt-2 flex items-center gap-3">
                    <img
                      src={imagePreview || existingImageUrl}
                      alt="Blog image preview"
                      className="h-16 w-24 rounded-lg border border-slate-200 object-cover"
                    />
                    <span className="text-xs text-slate-500">
                      {imageFile ? "New image selected" : "Current image"}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Author Avatar</label>
                <input type="file" accept="image/*" onChange={handleAvatarFileChange} className={inputClass} />
                <p className="mt-1 text-xs text-slate-400">Optional. JPEG/PNG/WEBP up to 5MB.</p>
              </div>
              {(avatarPreview || existingAvatarUrl) && (
                <div className="flex items-end">
                  <div className="flex items-center gap-3">
                    <img
                      src={avatarPreview || existingAvatarUrl}
                      alt="Author avatar preview"
                      className="h-14 w-14 rounded-full border border-slate-200 object-cover"
                    />
                    <span className="text-xs text-slate-500">
                      {avatarFile ? "New avatar selected" : "Current avatar"}
                    </span>
                  </div>
                </div>
              )}
            </div>
            {formError && <p className="text-sm text-red-600">{formError}</p>}
            <div className="flex gap-3">
              <button type="submit" disabled={formStatus === "loading"} className="btn-primary">
                {formStatus === "loading" ? "Saving..." : editing ? "Update" : "Create"}
              </button>
              <button type="button" onClick={handleCancel} className="btn-ghost">Cancel</button>
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

