import { useEffect, useMemo, useRef, useState } from "react";
import { Layers, Pencil, Plus, Search, SearchX, Trash2, Upload, X } from "lucide-react";
import { api } from "../../lib/api";
import Loader from "../../components/common/Loader";
import StatusBadge from "../../components/admin/StatusBadge";
import ProductImage from "../../components/product/ProductImage";
import RichTextEditor from "../../components/common/RichTextEditor";
import { isRichContentEmpty } from "../../lib/richText";

const STATUSES = ["draft", "published"];

const emptyForm = () => ({
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  productLink: "",
  status: "draft",
});

const NAME_MAX = 200;
const SHORT_MAX = 600;
const DESCRIPTION_MAX = 10000;
const IMAGE_MAX_MB = 5;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

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

const DeleteModal = ({ title = "", busy, onCancel, onDelete }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-[2px] overscroll-contain" role="dialog" aria-modal="true" aria-label="Delete product">
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <h2 className="font-disp text-lg font-bold text-slate-900">Delete Product?</h2>
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

const AdminProducts = () => {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("idle");
  const [loadError, setLoadError] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [formStatus, setFormStatus] = useState("idle");
  const [formError, setFormError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [imageRemoved, setImageRemoved] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const imageInputRef = useRef(null);

  const resetForm = () => {
    setForm(emptyForm());
    setErrors({});
    setImageFile(null);
    setImagePreview("");
    setExistingImageUrl("");
    setImageRemoved(false);
    setSlugTouched(false);
    setFormStatus("idle");
    setFormError(null);
  };

  const load = async () => {
    setStatus("loading");
    setLoadError(null);
    try {
      // The backend productQuerySchema caps `limit` at 50 (see validations/common.js),
      // and paginate clamps it to 50. Requesting a larger value makes the GET fail
      // Joi validation with a 400, so the listing would stay empty/error. Use 50.
      const res = await api.get("/admin/products?limit=50");
      const data = Array.isArray(res?.data) ? res.data : [];
      setList(data);
      setStatus("success");
      return data;
    } catch (err) {
      setLoadError(err?.message || "Something went wrong while loading products.");
      setStatus("error");
      console.error("Failed to load admin products:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  /* Search matches name and slug; filtering happens client-side using the
     already-fetched records so the table stays snappy for admin management. */
  const filteredList = useMemo(() => {
    const term = search.trim().toLowerCase();
    return list.filter((item) => {
      const itemStatus = item.status || "draft";
      if (statusFilter !== "all" && itemStatus !== statusFilter) return false;
      if (term) {
        const name = (item.name || "").toLowerCase();
        const slug = (item.slug || "").toLowerCase();
        if (!name.includes(term) && !slug.includes(term)) return false;
      }
      return true;
    });
  }, [list, search, statusFilter]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  const validateImageFile = (file) => {
    if (!file) return "";
    if (!IMAGE_TYPES.includes(file.type))
      return "Only JPG, JPEG, PNG, WebP or GIF images are allowed.";
    if (file.size > IMAGE_MAX_MB * 1024 * 1024)
      return `Image must be ${IMAGE_MAX_MB}MB or smaller.`;
    return "";
  };

  const applyImageFile = (file) => {
    if (!file) return;
    const message = validateImageFile(file);
    if (message) {
      setErrors((prev) => ({ ...prev, image: message }));
      setImageFile(null);
      setImagePreview("");
      return;
    }
    setErrors((prev) => ({ ...prev, image: "" }));
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setImageRemoved(false);
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    e.target.value = ""; // allow re-selecting the same file
    applyImageFile(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (existingImageUrl) {
      setExistingImageUrl("");
      setImageRemoved(true);
    }
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const startCreate = () => {
    setEditing(null);
    resetForm();
    setShowForm(true);
  };

  const startEdit = (item) => {
    setEditing(item._id);
    setForm({
      name: item.name || "",
      slug: item.slug || "",
      shortDescription: item.shortDescription || "",
      description: item.description || "",
      productLink: item.productLink || item.link || "",
      status: item.status || "draft",
    });
    setErrors({});
    setImageFile(null);
    setImagePreview("");
    setExistingImageUrl(item.image?.url || item.images?.[0]?.url || "");
    setImageRemoved(false);
    setSlugTouched(true);
    setShowForm(true);
    setFormStatus("idle");
    setFormError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Auto-fill the slug from the name until the admin edits it manually.
    if (name === "name" && !slugTouched) {
      setForm((prev) => ({ ...prev, name: value, slug: slugify(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSlugChange = (e) => {
    setSlugTouched(true);
    handleChange(e);
  };

  const handleDescriptionChange = (html) => {
    setForm((prev) => ({ ...prev, description: html }));
    if (errors.description) setErrors((prev) => ({ ...prev, description: "" }));
  };

  const validate = () => {
    const errs = {};
    const name = form.name.trim();
    const short = form.shortDescription.trim();
    const desc = form.description.trim();
    if (!name) errs.name = "Product name is required.";
    else if (name.length > NAME_MAX) errs.name = `Product name must be ${NAME_MAX} characters or fewer.`;
    if (!short) errs.shortDescription = "Short description is required.";
    else if (short.length > SHORT_MAX) errs.shortDescription = `Short description must be ${SHORT_MAX} characters or fewer.`;
    if (isRichContentEmpty(form.description)) errs.description = "Description is required.";
    else if (desc.length > DESCRIPTION_MAX) errs.description = `Description must be ${DESCRIPTION_MAX} characters or fewer.`;
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
      const fd = new FormData();
      fd.append("name", form.name.trim());
      fd.append("slug", form.slug.trim());
      fd.append("shortDescription", form.shortDescription.trim());
      fd.append("productLink", form.productLink.trim());
      fd.append("description", form.description.trim());
      fd.append("status", form.status);
      if (imageFile) fd.append("image", imageFile);
      if (editing && imageRemoved) fd.append("imageRemoved", "true");
      if (editing) {
        await api.putForm(`/admin/products/${editing}`, fd);
      } else {
        await api.postForm("/admin/products", fd);
      }
      setFormStatus("success");
      resetForm();
      setShowForm(false);
      setEditing(null);
      await load();
    } catch (err) {
      setFormStatus("error");
      setFormError(err?.message || "Failed to save the product.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/admin/products/${deleteTarget._id}`);
      setDeleteTarget(null);
      await load();
    } catch (err) {
      alert(err?.message || "Failed to delete the product.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-disp text-2xl font-bold text-slate-900">Products</h1>
          <p className="mt-1 text-sm text-slate-500">Manage the products shown on your website.</p>
        </div>
        <button onClick={startCreate} className="btn-primary inline-flex items-center gap-2">
          <Plus size={16} aria-hidden="true" /> New Product
        </button>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or slug..." className="w-full rounded-xl border border-line bg-white py-2.5 pl-10 pr-3 text-sm text-ink placeholder-slate-400 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-line bg-white px-3 py-2.5 text-sm font-medium text-slate-700 capitalize focus:border-brand-orange focus:outline-none">
          <option value="all">All Statuses</option>
          {STATUSES.map((st) => (
            <option key={st} value={st} className="capitalize">{st}</option>
          ))}
        </select>
      </div>

      {showForm && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-disp text-lg font-bold text-slate-900">{editing ? "Edit Product" : "New Product"}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {editing ? "Update the details of this product." : "Fill in the details below to add a new product."}
                </p>
              </div>
              <button type="button" onClick={() => { resetForm(); setShowForm(false); }} className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600" aria-label="Close form">
                <X size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6 p-6 sm:p-8">
            {/* Product image */}
            <div>
              <FieldLabel htmlFor="image">Product Image <span className="font-normal normal-case text-slate-400">(optional)</span></FieldLabel>
              <input ref={imageInputRef} id="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="sr-only" onChange={handleImageFileChange} />
              {imagePreview || existingImageUrl ? (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <img src={imagePreview || existingImageUrl} alt="Product image preview" className="h-44 w-full rounded-t-xl object-cover" />
                  <div className="flex items-center justify-between gap-3 border-t border-slate-200 px-4 py-3">
                    <span className="text-xs text-slate-500">{imageFile ? "New image selected" : "Current image"}</span>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => imageInputRef.current?.click()} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                        <Upload size={14} aria-hidden="true" /> Replace
                      </button>
                      <button type="button" onClick={removeImage} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100">
                        <X size={14} aria-hidden="true" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button type="button" onClick={() => imageInputRef.current?.click()} className="flex w-full cursor-pointer flex-col items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition-colors hover:border-brand-orange hover:bg-brand-orange/5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                    <Upload size={22} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-slate-700">Click to upload product image</span>
                  <span className="text-xs text-slate-500">JPG, JPEG, PNG, WebP or GIF — Max {IMAGE_MAX_MB}MB</span>
                </button>
              )}
              <FieldError message={errors.image} />
            </div>
            {/* Name + Slug */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="name" required>Product Name</FieldLabel>
                <input id="name" name="name" value={form.name} onChange={handleChange} maxLength={NAME_MAX} placeholder="e.g. Innobles CRM" className={fieldClass(!!errors.name)} />
                <FieldError message={errors.name} />
              </div>
              <div>
                <FieldLabel htmlFor="slug">Slug</FieldLabel>
                <input id="slug" name="slug" value={form.slug} onChange={handleSlugChange} maxLength={NAME_MAX} placeholder="auto-generated from name" className={fieldClass(!!errors.slug)} />
                <FieldError message={errors.slug} />
              </div>
            </div>
            {/* Short Description */}
            <div>
              <FieldLabel htmlFor="shortDescription" required>Short Description</FieldLabel>
              <input id="shortDescription" name="shortDescription" value={form.shortDescription} onChange={handleChange} maxLength={SHORT_MAX} placeholder="A one-line summary shown on product cards." className={fieldClass(!!errors.shortDescription)} />
              <FieldError message={errors.shortDescription} />
            </div>

            {/* Product Link (optional) */}
            <div>
              <FieldLabel htmlFor="productLink">Product Link <span className="font-normal normal-case text-slate-400">(optional)</span></FieldLabel>
              <input id="productLink" name="productLink" type="url" value={form.productLink} onChange={handleChange} maxLength={500} placeholder="https://example.com/product" className={fieldClass(!!errors.productLink)} />
              <p className="mt-1.5 text-xs text-slate-400">External product URL. When empty, the internal product page is used.</p>
              <FieldError message={errors.productLink} />
            </div>

            {/* Description */}
            <div>
              <FieldLabel htmlFor="description" required>Description</FieldLabel>
              <div className={errors.description ? "ring-2 ring-red-300 rounded-xl" : ""}>
                <RichTextEditor
                  value={form.description}
                  onChange={handleDescriptionChange}
                  placeholder="Write a detailed description of this product…"
                />
              </div>
              <FieldError message={errors.description} />
            </div>

            {/* Status */}
            <div>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <select id="status" name="status" value={form.status} onChange={handleChange} className={fieldClass(!!errors.status)}>
                {STATUSES.map((st) => (
                  <option key={st} value={st} className="capitalize">{st.charAt(0).toUpperCase() + st.slice(1)}</option>
                ))}
              </select>
              <FieldError message={errors.status} />
            </div>
            {formError && <p className="text-sm text-red-600" role="alert">{formError}</p>}

            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={formStatus === "loading"} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
                {formStatus === "loading" ? (<><Loader size="sm" /> {editing ? "Updating..." : "Creating..."}</>) : editing ? "Update Product" : "Create Product"}
              </button>
              <button type="button" onClick={() => { resetForm(); setShowForm(false); }} className="btn-ghost">Cancel</button>
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
          <div className="p-4 text-sm text-red-600" role="alert">
            <p className="font-semibold">Failed to load products.</p>
            {loadError && <p className="mt-1 text-red-500">{loadError}</p>}
            <button type="button" onClick={load} className="mt-2 font-semibold text-brand-orange hover:underline">Retry</button>
          </div>
        )}
        {status === "success" && (
          filteredList.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Image</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Slug</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredList.map((item) => {
                    const img = item.image?.url || item.images?.[0]?.url || "";
                    return (
                      <tr key={item._id} className="hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <div className="h-12 w-16 overflow-hidden rounded-lg border border-slate-200">
                            <ProductImage src={img} alt={item.name || ""} className="h-full w-full object-cover" />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-slate-900">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{item.slug}</td>
                        <td className="px-4 py-3 text-sm"><StatusBadge status={item.status || "draft"} /></td>
                        <td className="px-4 py-3 text-right text-sm">
                          <div className="flex items-center justify-end gap-3">
                            <button onClick={() => startEdit(item)} className="inline-flex items-center gap-1.5 font-semibold text-brand-cyan transition-colors hover:text-brand-orange">
                              <Pencil size={14} aria-hidden="true" /> Edit
                            </button>
                            <button onClick={() => setDeleteTarget(item)} className="inline-flex items-center gap-1.5 font-semibold text-red-600 transition-colors hover:text-red-700">
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
          ) : list.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                <Layers size={24} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-disp text-xl font-bold text-slate-900">No products found</h2>
              <p className="mx-auto mt-1.5 max-w-sm text-sm text-slate-500">Create your first product to start showcasing what you offer.</p>
              <button type="button" onClick={startCreate} className="btn-primary mt-6 inline-flex items-center gap-2">
                <Plus size={16} aria-hidden="true" /> Create Product
              </button>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <SearchX size={22} aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-disp text-lg font-bold text-slate-800">No matching products</h2>
              <p className="mt-1.5 text-sm text-slate-500">Try changing your search or active filters.</p>
              <button type="button" onClick={clearFilters} className="btn-ghost !py-2.5 text-sm mt-5">Clear filters</button>
            </div>
          )
        )}
      </div>

      {deleteTarget && (
        <DeleteModal
          title={deleteTarget.name}
          busy={deleting}
          onCancel={() => setDeleteTarget(null)}
          onDelete={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default AdminProducts;
