import { useEffect, useMemo, useRef, useState } from "react";
import { api } from "../../lib/api";
import {
  Layers,
  Pencil,
  Plus,
  Search,
  SearchX,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Loader from "../../components/common/Loader";
import StatusBadge from "../../components/admin/StatusBadge";
import ServiceBanner from "../../components/service/ServiceBanner";

/* Broad service categories — used by the New/Edit form and the category filter.
   Category is optional on a service, so "Not selected" is always a valid choice. */
const CATEGORIES = [
  "Development",
  "Design & Creative",
  "AI & Automation",
  "Cloud & DevOps",
  "Data & Analytics",
  "Consulting",
  "Other",
];

const STATUSES = ["published", "draft", "archived"];

const emptyForm = () => ({
  title: "",
  shortDescription: "",
  description: "",
  features: "",
  category: "",
  status: "draft",
});

const TITLE_MAX = 200;
const SHORT_MAX = 200;
const DESCRIPTION_MAX = 10000;
const FEATURE_MAX = 200;
const MAX_FEATURES = 30;
const BANNER_MAX_MB = 5;
const BANNER_TYPES = ["image/jpeg", "image/png", "image/webp"];

const fieldClass = (hasError) =>
  `w-full rounded-xl border ${hasError ? "border-red-400" : "border-line"} bg-slate-50 px-4 py-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20`;

const FieldLabel = ({ htmlFor, required = false, children }) => (
  <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
    {children}
    {required && <span className="text-red-500" aria-hidden="true"> *</span>}
  </label>
);

const FieldError = ({ message }) =>
  message ? <p className="mt-1.5 text-sm text-red-600">{message}</p> : null;

const EmptyState = ({ onCreate }) => (
  <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
      <Layers size={24} strokeWidth={1.5} aria-hidden="true" />
    </span>
    <h2 className="mt-4 font-disp text-xl font-bold text-slate-900">No services yet</h2>
    <p className="mx-auto mt-1.5 max-w-sm text-sm text-slate-500">
      Create your first service to start showcasing your company&apos;s capabilities.
    </p>
    <button type="button" onClick={onCreate} className="btn-primary mt-6 inline-flex items-center gap-2">
      <Plus size={16} aria-hidden="true" /> Create Service
    </button>
  </div>
);

const FilteredEmptyState = ({ onClear }) => (
  <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
      <SearchX size={22} aria-hidden="true" />
    </span>
    <h2 className="mt-4 font-disp text-lg font-bold text-slate-800">No matching services</h2>
    <p className="mt-1.5 text-sm text-slate-500">Try changing your search or active filters.</p>
    <button type="button" onClick={onClear} className="btn-ghost !py-2.5 text-sm mt-5">Clear filters</button>
  </div>
);

const ErrorState = ({ onRetry }) => (
  <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center" role="alert">
    <h2 className="font-disp text-lg font-bold text-red-700">Unable to load services</h2>
    <p className="mt-1.5 text-sm text-red-600">Something went wrong while loading your services.</p>
    <button type="button" onClick={onRetry} className="btn-ghost !px-4 !py-2.5 text-sm border-red-300 text-red-600 hover:bg-red-100 hover:text-red-700 mt-5">
      Try Again
    </button>
  </div>
);

const DeleteModal = ({ title = "", busy, onCancel, onDelete }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-[2px] overscroll-contain" role="dialog" aria-modal="true" aria-label="Delete service">
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <h2 className="font-disp text-lg font-bold text-slate-900">Delete Service?</h2>
        <button type="button" onClick={onCancel} disabled={busy} className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600" aria-label="Close">
          <X size={18} aria-hidden="true" />
        </button>
      </div>
      <div className="p-6">
        <p className="text-sm text-slate-600">
          Are you sure you want to delete <span className="font-semibold text-slate-800">{title}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3 pt-5">
          <button type="button" onClick={onCancel} disabled={busy} className="btn-ghost">Cancel</button>
          <button
            type="button"
            onClick={onDelete}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? <Loader size="sm" /> : <Trash2 size={15} aria-hidden="true" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AdminServices = () => {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("idle");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [formStatus, setFormStatus] = useState("idle");
  const [formError, setFormError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");
  const [existingBannerUrl, setExistingBannerUrl] = useState("");
  const [bannerRemoved, setBannerRemoved] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const bannerInputRef = useRef(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const resetForm = () => {
    setForm(emptyForm());
    setErrors({});
    setBannerFile(null);
    setBannerPreview("");
    setExistingBannerUrl("");
    setBannerRemoved(false);
    setFormStatus("idle");
    setFormError(null);
  };

  const load = async () => {
    setStatus("loading");
    try {
      const res = await api.get("/admin/services?limit=50");
      setList(Array.isArray(res?.data) ? res.data : []);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    load();
  }, []);

  /* Search matches title, short description and category. Because the admin
     list is small, filtering happens client-side using the already-fetched
     records instead of an extra API round-trip. */
  const filteredList = useMemo(() => {
    const term = search.trim().toLowerCase();
    return list.filter((item) => {
      const itemStatus = item.status || "draft";
      if (statusFilter !== "all" && itemStatus !== statusFilter) return false;
      if (categoryFilter !== "all" && (item.category || "") !== categoryFilter) return false;
      if (term) {
        const title = (item.title || "").toLowerCase();
        const short = (item.shortDescription || "").toLowerCase();
        const category = (item.category || "").toLowerCase();
        if (!title.includes(term) && !short.includes(term) && !category.includes(term)) return false;
      }
      return true;
    });
  }, [list, search, categoryFilter, statusFilter]);

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("all");
    setStatusFilter("all");
  };

  const validateBannerFile = (file) => {
    if (!file) return "Banner image is required.";
    if (!BANNER_TYPES.includes(file.type))
      return "Only JPG, JPEG, PNG or WebP images are allowed.";
    if (file.size > BANNER_MAX_MB * 1024 * 1024)
      return `Banner must be ${BANNER_MAX_MB}MB or smaller.`;
    return "";
  };

  const applyBannerFile = (file) => {
    if (!file) return;
    const message = validateBannerFile(file);
    if (message) {
      setErrors((prev) => ({ ...prev, banner: message }));
      setBannerFile(null);
      setBannerPreview("");
      return;
    }
    setErrors((prev) => ({ ...prev, banner: "" }));
    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
    setBannerRemoved(false);
  };

  const handleBannerFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    e.target.value = ""; // allow re-selecting the same file
    applyBannerFile(file);
  };

  const handleBannerDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    applyBannerFile(e.dataTransfer?.files?.[0] || null);
  };

  const removeBanner = () => {
    setBannerFile(null);
    setBannerPreview("");
    if (existingBannerUrl) {
      setExistingBannerUrl("");
      setBannerRemoved(true);
    }
    setErrors((prev) => ({ ...prev, banner: "" }));
  };

  const startCreate = () => {
    setEditing(null);
    resetForm();
    setShowForm(true);
  };

  const startEdit = (item) => {
    setEditing(item._id);
    setForm({
      title: item.title || "",
      shortDescription: item.shortDescription || "",
      description: item.description || "",
      features: Array.isArray(item.features) ? item.features.join("\n") : "",
      category: item.category || "",
      status: item.status || "draft",
    });
    setErrors({});
    setBannerFile(null);
    setBannerPreview("");
    setExistingBannerUrl(item.banner?.url || "");
    setBannerRemoved(false);
    setShowForm(true);
    setFormStatus("idle");
    setFormError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

const validate = () => {
    const errs = {};
    const title = form.title.trim();
    const short = form.shortDescription.trim();
    const desc = form.description.trim();
    if (!title) errs.title = "Title is required.";
    else if (title.length > TITLE_MAX) errs.title = `Title must be ${TITLE_MAX} characters or fewer.`;
    if (!short) errs.shortDescription = "Short description is required.";
    else if (short.length > SHORT_MAX)
      errs.shortDescription = `Short description must be ${SHORT_MAX} characters or fewer.`;
    if (!desc) errs.description = "Description is required.";
    else if (desc.length > DESCRIPTION_MAX)
      errs.description = `Description must be ${DESCRIPTION_MAX} characters or fewer.`;
    const features = form.features
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);
    if (!features.length) errs.features = "Add at least one feature.";
    else if (features.length > MAX_FEATURES) errs.features = `At most ${MAX_FEATURES} features are allowed.`;
    else if (features.some((f) => f.length > FEATURE_MAX))
      errs.features = `Each feature must be ${FEATURE_MAX} characters or fewer.`;
    if (!bannerFile && !existingBannerUrl) errs.banner = "Banner image is required.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formStatus === "loading") return; // prevent duplicate submissions
    const errs = validate();
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;
    setFormStatus("loading");
    setFormError(null);
    try {
      const features = form.features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean);
      const fd = new FormData();
      fd.append("title", form.title.trim());
      fd.append("shortDescription", form.shortDescription.trim());
      fd.append("category", form.category.trim());
      fd.append("description", form.description.trim());
      features.forEach((feature) => fd.append("features", feature));
      fd.append("status", form.status);
      if (bannerFile) fd.append("banner", bannerFile);
      if (editing && bannerRemoved) fd.append("bannerRemoved", "true");
      if (editing) {
        await api.putForm(`/admin/services/${editing}`, fd);
      } else {
        await api.postForm("/admin/services", fd);
      }
      setFormStatus("success");
      resetForm();
      setShowForm(false);
      setEditing(null);
      await load();
    } catch (err) {
      setFormStatus("error");
      setFormError(err?.message || "Failed to save the service.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget || deleting) return;
    setDeleting(true);
    try {
      await api.delete(`/admin/services/${deleteTarget._id}`);
      setDeleteTarget(null);
      await load();
    } catch (err) {
      alert(err?.message || "Failed to delete the service.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
<div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-disp text-2xl font-bold text-slate-900">Services</h1>
          <p className="mt-1 text-sm text-slate-500">Manage your service offerings</p>
        </div>
        <button onClick={startCreate} className="btn-primary inline-flex items-center gap-2">
          <Plus size={16} aria-hidden="true" /> New Service
        </button>
      </div>

      {/* Search + filters */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative min-w-[220px] flex-1">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services..."
            className="w-full rounded-xl border border-line bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 placeholder-slate-400 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter by category"
          className="min-w-[180px] rounded-xl border border-line bg-white px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-brand-orange focus:outline-none"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter by status"
          className="min-w-[150px] rounded-xl border border-line bg-white px-3 py-2.5 text-sm font-medium text-slate-700 capitalize focus:border-brand-orange focus:outline-none"
        >
          <option value="all">All Statuses</option>
          {STATUSES.map((st) => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
      </div>

{showForm && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-disp text-lg font-bold text-slate-900">{editing ? "Edit Service" : "New Service"}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {editing
                    ? "Update the details of this service offering."
                    : "Fill in the details below to add a new service offering."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => { resetForm(); setShowForm(false); }}
                className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close form"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6 p-6 sm:p-8">
            {/* Banner image */}
            <div>
              <FieldLabel htmlFor="banner" required>Banner Image</FieldLabel>
              <input
                ref={bannerInputRef}
                id="banner"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={handleBannerFileChange}
              />
              {bannerPreview || existingBannerUrl ? (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <img
                    src={bannerPreview || existingBannerUrl}
                    alt="Banner preview"
                    className="h-44 w-full rounded-t-xl object-cover"
                  />
                  <div className="flex items-center justify-between gap-3 border-t border-slate-200 px-4 py-3">
                    <span className="text-xs text-slate-500">{bannerFile ? "New banner selected" : "Current banner"}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => bannerInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                      >
                        <Upload size={14} aria-hidden="true" /> Replace
                      </button>
                      <button
                        type="button"
                        onClick={removeBanner}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100"
                      >
                        <X size={14} aria-hidden="true" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => bannerInputRef.current?.click()}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); bannerInputRef.current?.click(); } }}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleBannerDrop}
                  className={`flex w-full cursor-pointer flex-col items-center gap-3 rounded-xl border border-dashed ${isDragging ? "border-brand-orange bg-brand-orange/10" : "border-slate-300 bg-slate-50"} px-6 py-10 text-center transition-colors ${isDragging ? "" : "hover:border-brand-orange hover:bg-brand-orange/5"}`}
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                    <Upload size={26} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-slate-700">Click to upload or drag and drop</span>
                  <span className="text-xs text-slate-500">JPG, JPEG, PNG or WebP</span>
                  <span className="text-xs text-slate-400">Recommended: 1600 × 600px — Max size: {BANNER_MAX_MB}MB</span>
                </div>
              )}
              <FieldError message={errors.banner} />
            </div>

<div className="grid gap-6 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="title" required>Title</FieldLabel>
                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  maxLength={TITLE_MAX}
                  placeholder="e.g. Web Development"
                  className={fieldClass(!!errors.title)}
                />
                <FieldError message={errors.title} />
              </div>
              <div>
                <FieldLabel htmlFor="shortDescription" required>Short Description</FieldLabel>
                <input
                  id="shortDescription"
                  name="shortDescription"
                  value={form.shortDescription}
                  onChange={handleChange}
                  maxLength={SHORT_MAX}
                  placeholder="We build fast, scalable and modern web applications."
                  className={fieldClass(!!errors.shortDescription)}
                />
                <FieldError message={errors.shortDescription} />
              </div>
            </div>

            {/* Description */}
            <div>
              <FieldLabel htmlFor="description" required>Description</FieldLabel>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={6}
                maxLength={DESCRIPTION_MAX}
                className={fieldClass(!!errors.description)}
              />
              <p className="mt-1.5 text-xs text-slate-400">Write a detailed description about this service.</p>
              <FieldError message={errors.description} />
            </div>

            {/* Features */}
            <div>
              <FieldLabel htmlFor="features" required>Features (One per line)</FieldLabel>
              <textarea
                id="features"
                name="features"
                value={form.features}
                onChange={handleChange}
                rows={5}
                placeholder={"Responsive Design\nSEO Friendly\nFast Performance\nScalable Architecture"}
                className={fieldClass(!!errors.features)}
              />
              <p className="mt-1.5 text-xs text-slate-400">
                Add one feature per line. These are shown as highlights on the service listing.
              </p>
              <FieldError message={errors.features} />
            </div>

            {/* Category (optional) + Status */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="category">Category <span className="font-normal normal-case text-slate-400">(optional)</span></FieldLabel>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={fieldClass(!!errors.category)}
                >
                  <option value="">Not selected</option>
                  {CATEGORIES.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
                <FieldError message={errors.category} />
              </div>
              <div>
                <FieldLabel htmlFor="status">Status</FieldLabel>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className={fieldClass(!!errors.status)}
                >
                  {STATUSES.map((st) => (
                    <option key={st} value={st} className="capitalize">{st}</option>
                  ))}
                </select>
                <FieldError message={errors.status} />
              </div>
            </div>

            {formError && <p className="mt-2 text-sm text-red-600" role="alert">{formError}</p>}

            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {formStatus === "loading" ? (
                  <><Loader size="sm" /> {editing ? "Updating..." : "Creating..."}</>
                ) : editing ? "Update Service" : "Create Service"}
              </button>
              <button type="button" onClick={() => { resetForm(); setShowForm(false); }} className="btn-ghost">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

{/* Loading skeletons */}
      {status === "loading" && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex justify-center py-12">
            <Loader size="lg" />
          </div>
        </div>
      )}

      {/* Error state */}
      {status === "error" && (
        <div className="mt-6"><ErrorState onRetry={load} /></div>
      )}

      {/* Service table */}
      {status === "success" && (
        filteredList.length > 0 ? (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Banner</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredList.map((item) => {
                    const bannerUrl = item.banner?.url || item.bannerImage || "";
                    return (
                      <tr key={item._id} className="hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <div className="h-12 w-16 overflow-hidden rounded-lg border border-slate-200">
                            <ServiceBanner src={bannerUrl} alt={item.title || ""} className="h-full w-full object-cover" />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-slate-900 break-words">
                          {item.title}
                          {item.shortDescription ? (
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.shortDescription}</p>
                          ) : null}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">{item.category || "—"}</td>
                        <td className="px-4 py-3 text-sm"><StatusBadge status={item.status || "draft"} /></td>
                        <td className="px-4 py-3 text-right text-sm">
                          <div className="flex items-center justify-end gap-3">
                            <button
                              onClick={() => startEdit(item)}
                              className="inline-flex items-center gap-1.5 font-semibold text-brand-cyan transition-colors hover:text-brand-orange"
                            >
                              <Pencil size={14} aria-hidden="true" /> Edit
                            </button>
                            <button
                              onClick={() => setDeleteTarget(item)}
                              className="inline-flex items-center gap-1.5 font-semibold text-red-600 transition-colors hover:text-red-700"
                            >
                              <Trash2 size={14} aria-hidden="true" /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : list.length === 0 ? (
          <div className="mt-6"><EmptyState onCreate={startCreate} /></div>
        ) : (
          <div className="mt-6"><FilteredEmptyState onClear={clearFilters} /></div>
        )
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <DeleteModal
          title={deleteTarget.title}
          busy={deleting}
          onCancel={() => setDeleteTarget(null)}
          onDelete={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default AdminServices;