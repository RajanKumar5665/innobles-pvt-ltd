import { useState } from "react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2, Users } from "lucide-react";
import { api } from "../../../lib/api";
import Loader from "../../common/Loader";
import { DeleteModal, FieldError, FieldLabel, fieldClass, ImageField, Toast } from "./AboutUi";

const emptyForm = () => ({ name: "", role: "", description: "", linkedin: "" });

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

const urlSafe = (value = "") => {
  const v = value.trim();
  if (!v) return true;
  try {
    new URL(v);
    return true;
  } catch {
    return false;
  }
};

export const TeamSection = ({ members = [], onChanged }) => {
  const [mode, setMode] = useState(null); // null | "create" | item
  const [form, setForm] = useState(emptyForm());
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [imageRemoved, setImageRemoved] = useState(false);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);
  const [reordering, setReordering] = useState(false);

  const resetForm = () => {
    setForm(emptyForm());
    setImageFile(null);
    setPreview("");
    setImageRemoved(false);
    setErrors({});
    setFormError(null);
    setBusy(false);
  };

  const openCreate = () => {
    resetForm();
    setMode("create");
  };

  const openEdit = (item) => {
    setForm({
      name: item.name || "",
      role: item.role || "",
      description: item.description || "",
      linkedin: item.linkedin || "",
    });
    setImageFile(null);
    setPreview(item.image?.url || "");
    setImageRemoved(false);
    setErrors({});
    setFormError(null);
    setMode(item);
  };

  const close = () => {
    resetForm();
    setMode(null);
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    window.setTimeout(() => setToast(null), 3500);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;

    const errs = {};
    if (!form.name.trim()) errs.name = "Full name is required.";
    if (form.linkedin.trim() && !urlSafe(form.linkedin)) errs.linkedin = "Please enter a valid LinkedIn / social URL.";
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;

    setBusy(true);
    setFormError(null);
    try {
      const fd = new FormData();
      fd.append("name", form.name.trim());
      fd.append("role", form.role.trim());
      fd.append("description", form.description || "");
      fd.append("linkedin", form.linkedin.trim());
      if (imageFile) fd.append("image", imageFile);
      if (mode !== "create" && imageRemoved) fd.append("imageRemoved", "true");

      if (mode === "create") await api.postForm("/admin/about/team", fd);
      else await api.putForm(`/admin/about/team/${mode._id}`, fd);

      close();
      onChanged();
      showToast("success", mode === "create" ? "Team member added." : "Team member updated.");
    } catch (err) {
      setFormError(err?.message || "Failed to save the team member.");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget || deleting) return;
    setDeleting(true);
    try {
      await api.delete(`/admin/about/team/${deleteTarget._id}`);
      setDeleteTarget(null);
      onChanged();
      showToast("success", "Team member deleted.");
    } catch (err) {
      showToast("error", err?.message || "Failed to delete the team member.");
    } finally {
      setDeleting(false);
    }
  };

  const handleReorder = async (index, dir) => {
    const target = index + dir;
    if (target < 0 || target >= members.length || reordering) return;
    const ids = members.map((m) => m._id.toString());
    [ids[index], ids[target]] = [ids[target], ids[index]];
    setReordering(true);
    try {
      await api.patch("/admin/about/team/reorder", { ids });
      onChanged();
    } catch (err) {
      showToast("error", err?.message || "Failed to reorder team members.");
    } finally {
      setReordering(false);
    }
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-disp text-lg font-bold text-slate-900">Team</h2>
          <p className="mt-1 text-sm text-slate-500">
            {members.length} member{members.length === 1 ? "" : "s"} · reorder with the arrows
          </p>
        </div>
        {!mode && (
          <button type="button" onClick={openCreate} className="btn-primary inline-flex items-center gap-2">
            <Plus size={16} aria-hidden="true" /> Add Member
          </button>
        )}
      </div>

      {mode && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-3">
            <h3 className="font-disp text-lg font-bold text-slate-900">
              {mode === "create" ? "Add Team Member" : "Edit Team Member"}
            </h3>
            <button
              type="button"
              onClick={close}
              disabled={busy}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <ImageField
              id="team-image"
              label="Profile image"
              preview={preview}
              onFile={(f) => {
                setImageFile(f);
                setImageRemoved(false);
                setPreview(URL.createObjectURL(f));
              }}
              onRemove={() => {
                setImageFile(null);
                setPreview("");
                setImageRemoved(Boolean(preview && !imageFile));
              }}
              error={errors.image}
            />
            <div>
              <FieldLabel htmlFor="team-name" required>
                Full Name
              </FieldLabel>
              <input
                id="team-name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Rahul Verma"
                className={fieldClass(!!errors.name)}
              />
              <FieldError message={errors.name} />
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="team-role">Designation</FieldLabel>
              <input
                id="team-role"
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                placeholder="Founder & CEO"
                className={fieldClass(false)}
              />
            </div>
            <div>
              <FieldLabel htmlFor="team-linkedin">LinkedIn / Social URL (optional)</FieldLabel>
              <input
                id="team-linkedin"
                value={form.linkedin}
                onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value }))}
                placeholder="https://linkedin.com/in/..."
                className={fieldClass(!!errors.linkedin)}
              />
              <FieldError message={errors.linkedin} />
            </div>
          </div>

          <div className="mt-6">
            <FieldLabel htmlFor="team-description">Short Description (optional)</FieldLabel>
            <textarea
              id="team-description"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              placeholder="A short line about this team member…"
              className={fieldClass(false)}
            />
          </div>

          {formError && <p className="mt-4 text-sm text-red-600">{formError}</p>}

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="submit" disabled={busy} className="btn-primary inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60">
              {busy && <Loader size="sm" />} {mode === "create" ? "Save Team Member" : "Save Changes"}
            </button>
            <button type="button" onClick={close} disabled={busy} className="btn-ghost">
              Cancel
            </button>
          </div>
        </form>
      )}


      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        {members.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
              <Users size={24} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-disp text-lg font-bold text-slate-900">No team members yet</h3>
            <p className="mt-1.5 text-sm text-slate-500">Add your first team member to start showcasing your people.</p>
            <button type="button" onClick={openCreate} className="btn-primary mt-6 inline-flex items-center gap-2">
              <Plus size={16} aria-hidden="true" /> Add Member
            </button>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Photo</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Designation</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {members.map((m, i) => (
                <tr key={m._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    {m.image?.url ? (
                      <img src={m.image.url} alt={m.name} className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                        {getInitials(m.name) || "?"}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{m.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{m.role || "—"}</td>
                  <td className="px-4 py-3 text-right text-sm">
                    <div className="flex items-center justify-end gap-1.5">
                      <button type="button" onClick={() => openEdit(m)} className="rounded-lg p-1.5 text-brand-cyan hover:bg-slate-100" aria-label="Edit"><Pencil size={14} aria-hidden="true" /></button>
                      <button type="button" onClick={() => setDeleteTarget(m)} className="rounded-lg p-1.5 text-red-600 hover:bg-red-50" aria-label="Delete"><Trash2 size={14} aria-hidden="true" /></button>
                      <button type="button" onClick={() => handleReorder(i, -1)} disabled={i === 0 || reordering} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-40" aria-label="Move up"><ArrowUp size={14} aria-hidden="true" /></button>
                      <button type="button" onClick={() => handleReorder(i, 1)} disabled={i === members.length - 1 || reordering} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-40" aria-label="Move down"><ArrowDown size={14} aria-hidden="true" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {deleteTarget && (
        <DeleteModal title={deleteTarget.name} busy={deleting} onCancel={() => setDeleteTarget(null)} onDelete={handleDelete} />
      )}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
};
