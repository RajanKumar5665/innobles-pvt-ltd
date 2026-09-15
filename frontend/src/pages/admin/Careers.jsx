import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import Loader from "../../components/common/Loader";

const emptyForm = {
  title: "",
  department: "",
  location: "",
  jobType: "full-time",
  experience: "",
  description: "",
  responsibilities: "",
  requirements: "",
  status: "open",
};

const fieldClass = (hasError) =>
  `w-full rounded-xl border ${
    hasError ? "border-red-400" : "border-line"
  } bg-slate-50 px-4 py-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20`;

const FieldError = ({ message }) =>
  message ? <p className="mt-1 text-sm text-red-600">{message}</p> : null;

const TITLE_MAX = 200;
const TITLE_MIN = 3;
const DEPARTMENT_MAX = 80;
const LOCATION_MAX = 120;
const EXPERIENCE_MAX = 120;
const DESCRIPTION_MAX = 10000;
const LIST_ITEM_MAX = 1000;

// Mirrors backend/src/validations/career.validation.js so the admin gets
// immediate, field-level feedback before the request is fired.
const validateCareerForm = (v) => {
  const errs = {};
  const title = v.title.trim();
  const department = v.department.trim();
  if (!title) errs.title = "Title is required.";
  else if (title.length < TITLE_MIN) errs.title = `Title must be at least ${TITLE_MIN} characters.`;
  else if (title.length > TITLE_MAX) errs.title = `Title must be ${TITLE_MAX} characters or fewer.`;

  if (!department) errs.department = "Department is required.";
  else if (department.length > DEPARTMENT_MAX) errs.department = `Department must be ${DEPARTMENT_MAX} characters or fewer.`;

  if (v.location.trim().length > LOCATION_MAX) errs.location = `Location must be ${LOCATION_MAX} characters or fewer.`;
  if (v.experience.trim().length > EXPERIENCE_MAX) errs.experience = `Experience must be ${EXPERIENCE_MAX} characters or fewer.`;
  if (v.description.trim().length > DESCRIPTION_MAX) errs.description = `Description must be ${DESCRIPTION_MAX} characters or fewer.`;

  for (const [key, label] of [
    ["responsibilities", "Responsibilities"],
    ["requirements", "Requirements"],
  ]) {
    const items = v[key]
      ? v[key].split("\n").map((s) => s.trim()).filter(Boolean)
      : [];
    if (items.some((s) => s.length > LIST_ITEM_MAX)) {
      errs[key] = `Each ${label.toLowerCase()} line must be ${LIST_ITEM_MAX} characters or fewer.`;
    }
  }
  return errs;
};

const AdminCareers = () => {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formStatus, setFormStatus] = useState("idle");
  const [formError, setFormError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
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
    // Data fetch on mount; `load` synchronously sets the loading status (intentional).
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      experience: item.experience || "",
      description: item.description || "",
      responsibilities: Array.isArray(item.responsibilities) ? item.responsibilities.join("\n") : "",
      requirements: Array.isArray(item.requirements) ? item.requirements.join("\n") : "",
      status: item.status || "open",
    });
    setShowForm(true);
    setFormStatus("idle");
    setFormError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formStatus === "loading") return; // prevent duplicate submissions
    const errs = validateCareerForm(form);
    setFormErrors(errs);
    if (Object.values(errs).some(Boolean)) return;

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
      setFormErrors({});
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
          <form onSubmit={handleSubmit} noValidate className="mt-4 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="career-title" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Title <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="career-title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  maxLength={TITLE_MAX}
                  className={fieldClass(!!formErrors.title)}
                  placeholder="e.g. Senior React Developer"
                />
                <FieldError message={formErrors.title} />
              </div>
              <div>
                <label htmlFor="career-department" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Department <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="career-department"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  maxLength={DEPARTMENT_MAX}
                  className={fieldClass(!!formErrors.department)}
                  placeholder="e.g. Engineering"
                />
                <FieldError message={formErrors.department} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="career-location" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Location</label>
                <input
                  id="career-location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  maxLength={LOCATION_MAX}
                  className={fieldClass(!!formErrors.location)}
                  placeholder="e.g. Bengaluru, India or Remote - Global"
                />
                <FieldError message={formErrors.location} />
              </div>
              <div>
                <label htmlFor="career-jobType" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Job Type</label>
                <select id="career-jobType" name="jobType" value={form.jobType} onChange={handleChange} className={fieldClass(false)}>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="career-experience" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Required Experience <span className="font-normal normal-case text-slate-400">(e.g. 2-4 years)</span>
              </label>
              <input
                id="career-experience"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                maxLength={EXPERIENCE_MAX}
                className={fieldClass(!!formErrors.experience)}
                placeholder="e.g. 2-4 years, 5+ years, Fresher"
              />
              <FieldError message={formErrors.experience} />
            </div>
            <div>
              <label htmlFor="career-description" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Description</label>
              <textarea
                id="career-description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                maxLength={DESCRIPTION_MAX}
                className={fieldClass(!!formErrors.description)}
                placeholder="Describe the role, team and what success looks like..."
              />
              <FieldError message={formErrors.description} />
            </div>
            <div>
              <label htmlFor="career-responsibilities" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Responsibilities (one per line)</label>
              <textarea
                id="career-responsibilities"
                name="responsibilities"
                value={form.responsibilities}
                onChange={handleChange}
                rows={3}
                className={fieldClass(!!formErrors.responsibilities)}
                placeholder={"Ship features end to end\nMentor junior engineers\nCollaborate with design"}
              />
              <FieldError message={formErrors.responsibilities} />
            </div>
            <div>
              <label htmlFor="career-requirements" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Requirements (one per line)</label>
              <textarea
                id="career-requirements"
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                rows={3}
                className={fieldClass(!!formErrors.requirements)}
                placeholder={"3+ years of experience\nStrong JavaScript skills\nExcellent communication"}
              />
              <FieldError message={formErrors.requirements} />
            </div>
            <div>
              <label htmlFor="career-status" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Status</label>
              <select id="career-status" name="status" value={form.status} onChange={handleChange} className={fieldClass(false)}>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            {formError && <p role="alert" className="text-sm text-red-600">{formError}</p>}
            <div className="flex gap-3">
              <button type="submit" disabled={formStatus === "loading"} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
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
