import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  Inbox,
  Search,
  SearchX,
  Trash2,
  X,
} from "lucide-react";
import { api, API_BASE } from "../../lib/api";
import Loader from "../../components/common/Loader";

/* ----------------------------------------------------------------------
   Constants
---------------------------------------------------------------------- */

// Backend stores statuses as new|reviewing|shortlisted|rejected|hired.
// We keep those exact values (no separate/duplicate status system) and only
// present friendlier labels. `hired` is shown as "Selected" for the admin.
const STATUS_LABELS = {
  new: "New",
  reviewing: "Reviewing",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
  hired: "Selected",
};

const STATUS_BADGE_STYLES = {
  new: "bg-blue-100 text-blue-700",
  reviewing: "bg-amber-100 text-amber-700",
  shortlisted: "bg-indigo-100 text-indigo-700",
  rejected: "bg-red-100 text-red-700",
  hired: "bg-emerald-100 text-emerald-700",
};

const STATUS_OPTIONS = Object.entries(STATUS_LABELS).map(([value, label]) => ({
  value,
  label,
}));

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "name-asc", label: "Name (A → Z)" },
  { value: "name-desc", label: "Name (Z → A)" },
  { value: "position-asc", label: "Career (A → Z)" },
  { value: "position-desc", label: "Career (Z → A)" },
  { value: "status", label: "Status (A → Z)" },
  { value: "-status", label: "Status (Z → A)" },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                           */
/* ------------------------------------------------------------------ */

const humanizeKey = (key) =>
  String(key)
    .replace(/([a-z\d])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

// Fields shown in dedicated sections (or internal) — never re-rendered as
// free-form "Additional Information" rows.
const KNOWN_KEYS = new Set([
  "_id",
  "id",
  "__v",
  "createdAt",
  "updatedAt",
  "name",
  "email",
  "phone",
  "coverLetter",
  "status",
  "careerId",
  "career",
  "resume",
  "publicId",
]);

// Surface any other submitted scalar fields (e.g. future additions to the
// application form) without hard-coding field names that may not exist.
const getExtraFields = (app) => {
  if (!app || typeof app !== "object") return [];
  return Object.entries(app)
    .filter(([key, value]) => {
      if (KNOWN_KEYS.has(key)) return false;
      if (value == null || value === "") return false;
      const type = typeof value;
      return type === "string" || type === "number";
    })
    .map(([key, value]) => ({ key, value: String(value) }));
};

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleString();
};

const getCareer = (career) =>
  career && typeof career === "object" ? career : null;

/* ------------------------------------------------------------------ */
/* Small building blocks                                             */
/* ------------------------------------------------------------------ */

const StatusBadge = ({ status }) => {
  const value = status || "new";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        STATUS_BADGE_STYLES[value] || "bg-slate-100 text-slate-600"
      }`}
    >
      {STATUS_LABELS[value] || value}
    </span>
  );
};

const InfoField = ({ label, children }) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
      {label}
    </p>
    <div className="mt-1 text-sm break-words text-slate-900">
      {children || "—"}
    </div>
  </div>
);

const Toast = ({ toast, onDismiss }) => {
  if (!toast) return null;
  const success = toast.type === "success";
  return (
    <div
      className="fixed bottom-6 right-6 z-[80] w-[22.5rem] animate-fade-up"
      role="status"
      aria-live="polite"
    >
      <div
        className={`flex items-start gap-2.5 overflow-hidden rounded-xl border bg-white shadow-xl ${
          success ? "border-emerald-200" : "border-red-200"
        }`}
      >
        <span
          className={`shrink-0 flex h-6 w-6 items-center justify-center rounded-full ${
            success ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
          }`}
        >
          {success ? (
            <CheckCircle2 size={15} aria-hidden="true" />
          ) : (
            <AlertCircle size={15} aria-hidden="true" />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">
            {success ? "Success" : "Error"}
          </p>
          <p className="mt-0.5 text-sm text-slate-600">{toast.message}</p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          aria-label="Dismiss notification"
        >
          <X size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

const TableSkeleton = () => (
  <div className="animate-pulse">
    <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
      <div className="grid grid-cols-4 gap-4">
        <div className="h-3.5 w-14 rounded bg-slate-200" />
        <div className="h-3.5 w-16 rounded bg-slate-200" />
        <div className="h-3.5 w-14 rounded bg-slate-200" />
        <div className="h-3.5 w-16 rounded bg-slate-200" />
      </div>
    </div>
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className="grid grid-cols-4 items-center gap-4 border-b border-slate-100 px-4 py-3"
      >
        <div className="h-3.5 w-24 rounded bg-slate-200" />
        <div className="h-3.5 w-32 rounded bg-slate-200" />
        <div className="h-5 w-16 rounded-full bg-slate-200" />
        <div className="h-8 w-14 rounded bg-slate-200" />
      </div>
    ))}
  </div>
);

const EmptyState = () => (
  <div
    className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center"
    role="status"
  >
    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
      <Inbox size={24} strokeWidth={1.5} aria-hidden="true" />
    </span>
    <h2 className="mt-4 font-disp text-xl font-bold text-slate-900">
      No applications yet
    </h2>
    <p className="mx-auto mt-1.5 max-w-sm text-sm text-slate-500">
      Job applications submitted through the public careers page will appear here.
    </p>
  </div>
);

const FilteredEmptyState = ({ onClear }) => (
  <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
      <SearchX size={22} aria-hidden="true" />
    </span>
    <h2 className="mt-4 font-disp text-lg font-bold text-slate-800">
      No applications found
    </h2>
    <p className="mt-1.5 text-sm text-slate-500">
      Try changing your search or filter.
    </p>
    <button
      type="button"
      onClick={onClear}
      className="btn-ghost !py-2.5 text-sm mt-5"
    >
      Clear search &amp; filters
    </button>
  </div>
);

const ErrorState = ({ onRetry }) => (
  <div
    className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center"
    role="alert"
  >
    <h2 className="font-disp text-lg font-bold text-red-700">
      Unable to load applications
    </h2>
    <p className="mt-1.5 text-sm text-red-600">
      Something went wrong while loading your applications.
    </p>
    <button
      type="button"
      onClick={onRetry}
      className="btn-ghost !px-4 !py-2.5 text-sm border-red-300 text-red-600 hover:bg-red-100 hover:text-red-700 mt-5"
    >
      Try Again
    </button>
  </div>
);

const DeleteModal = ({ name, busy, onCancel, onDelete }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-[2px] overscroll-contain"
    role="dialog"
    aria-modal="true"
    aria-label="Delete application"
  >
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <h2 className="font-disp text-lg font-bold text-slate-900">
          Delete Application?
        </h2>
        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
      <div className="p-6">
        <p className="text-sm text-slate-600">
          Are you sure you want to delete this application
          {name ? (
            <>
              {" "}from <span className="font-semibold text-slate-800">{name}</span>
            </>
          ) : null}
          ? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3 pt-5">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="btn-ghost"
          >
            Cancel
          </button>
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

const DetailsModal = ({
  app,
  busy,
  onUpdateStatus,
  onViewResume,
  onClose,
}) => {
  if (!app) return null;
  const career = getCareer(app.careerId);
  const position = career?.title || "";
  const department = career?.department || "";
  const location = career?.location || "";
  const email = app.email || "";
  const phone = app.phone || "";
  const resume = app.resume || {};
  const resumeUrl = /^https?:\/\//i.test(resume.url || "");
  const extraFields = getExtraFields(app);
  const hasAdditional = Boolean(app.coverLetter) || extraFields.length > 0;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="application-detail-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        aria-label="Close details"
        onClick={onClose}
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-white shadow-2xl animate-fade-up overscroll-contain">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-6 py-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h2
                id="application-detail-title"
                className="font-disp text-lg font-bold text-slate-900"
              >
                Application Details
              </h2>
              <p className="mt-0.5 truncate text-xs text-slate-500">
                {position || "Job application"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-ink"
              aria-label="Close"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="space-y-5 p-6">
          {/* Applicant Information */}
          <section className="rounded-2xl border border-slate-100 bg-white p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Applicant Information
            </h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <InfoField label="Full Name">{app.name}</InfoField>
              <InfoField label="Email">
                {email ? (
                  <a href={`mailto:${email}`} className="break-all text-brand-cyan hover:underline">
                    {email}
                  </a>
                ) : (
                  "—"
                )}
              </InfoField>
              <InfoField label="Phone">
                {phone ? (
                  <a href={`tel:${phone}`} className="text-brand-cyan hover:underline">
                    {phone}
                  </a>
                ) : (
                  "—"
                )}
              </InfoField>
            </div>
          </section>

{/* Career Information */}
          <section className="rounded-2xl border border-slate-100 bg-white p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Career Information
            </h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <InfoField label="Applied Position">{position || "—"}</InfoField>
              <InfoField label="Department">{department || "—"}</InfoField>
              <InfoField label="Location">{location || "—"}</InfoField>
              <InfoField label="Application Status">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={app.status} />
                  <select
                    value={app.status}
                    onChange={onUpdateStatus}
                    disabled={busy}
                    aria-label="Change application status"
                    className="rounded-lg border border-line bg-white pl-2 pr-2 py-1.5 text-xs font-medium text-slate-700 focus:border-brand-orange focus:outline-none"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </InfoField>
              <InfoField label="Application Date">
                {formatDate(app.createdAt)}
              </InfoField>
            </div>
          </section>

          {/* Resume */}
          <section className="rounded-2xl border border-slate-100 bg-white p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Resume
            </h3>
            <div className="mt-3">
              {resumeUrl ? (
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={onViewResume}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-cyan px-4 py-2 text-xs font-semibold text-slate-50 transition-colors hover:brightness-105"
                  >
                    <Eye size={14} aria-hidden="true" /> View Resume
                  </button>
                  <a
                    href={resume.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-brand-cyan px-4 py-2 text-xs font-semibold text-brand-cyan transition-colors hover:bg-brand-orange/5"
                  >
                    <Download size={14} aria-hidden="true" /> Download
                  </a>
                  {resume.originalName && (
                    <span className="inline-flex min-w-0 items-center gap-1.5 text-xs text-slate-500">
                      <FileText size={13} aria-hidden="true" />
                      <span className="truncate">{resume.originalName}</span>
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No resume uploaded.</p>
              )}
            </div>
          </section>

  {/* Additional Information */}
          {hasAdditional && (
            <section className="rounded-2xl border border-slate-100 bg-white p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Additional Information
              </h3>
              <div className="mt-3 space-y-4">
                {app.coverLetter && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Cover Letter
                    </p>
                    <p className="mt-1.5 whitespace-pre-wrap rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">
                      {app.coverLetter}
                    </p>
                  </div>
                )}
                {extraFields.map(({ key, value }) => (
                  <InfoField key={key} label={humanizeKey(key)}>
                    {value}
                  </InfoField>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="sticky bottom-0 z-10 border-t border-slate-200 bg-white px-6 py-4">
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-ghost">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminApplications = () => {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [fetchStatus, setFetchStatus] = useState("idle");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [details, setDetails] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [viewResume, setViewResume] = useState(null);
  const [toast, setToast] = useState(null);

  const load = async () => {
    setFetchStatus("loading");
    try {
      const res = await api.get("/admin/applications?limit=50");
      const data = Array.isArray(res?.data) ? res.data : [];
      setList(data);
      const rawTotal = Number(res?.pagination?.total);
      setTotal(Number.isFinite(rawTotal) ? rawTotal : data.length);
      setFetchStatus("success");
    } catch (err) {
      console.error("Failed to load applications:", err);
      setFetchStatus("error");
    }
  };

  useEffect(() => {
    // Data fetch on mount; `load` synchronously sets the loading status (intentional).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  // Open the details overlay with the already-loaded row record for a snappy
  // feel, then refresh it in the background with the full record.
  const openDetails = async (item) => {
    setDetails(item);
    try {
      const res = await api.get(`/admin/applications/${item._id}`);
      const fresh = res?.data;
      if (fresh) setDetails(fresh);
    } catch (err) {
      console.error("Failed to refresh application details:", err);
    }
  };

  const handleStatusChange = async (e) => {
    if (!details) return;
    const next = e.target.value;
    if (next === details.status) return;
    const prev = details.status;
    // Optimistic update so the UI reflects the change instantly.
    setDetails((d) => (d ? { ...d, status: next } : d));
    setStatusUpdating(true);
    try {
      const res = await api.patch(`/admin/applications/${details._id}/status`, {
        status: next,
      });
      const updated = res?.data;
      if (updated) setDetails(updated);
      setList((cur) =>
        cur.map((it) =>
          it._id === details._id ? { ...it, status: updated?.status || next } : it,
        ),
      );
      setToast({
        type: "success",
        message: `Application marked as ${STATUS_LABELS[next] || next}.`,
      });
    } catch (err) {
      console.error("Failed to update application status:", err);
      setDetails((d) => (d ? { ...d, status: prev } : d));
      setToast({
        type: "error",
        message: "Could not update the status. Please try again.",
      });
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget || deleting) return;
    setDeleting(true);
    try {
      await api.delete(`/admin/applications/${deleteTarget._id}`);
      setList((cur) => cur.filter((it) => it._id !== deleteTarget._id));
      setTotal((t) => Math.max(0, t - 1));
      if (details?._id === deleteTarget._id) setDetails(null);
      setDeleteTarget(null);
      setToast({ type: "success", message: "Application deleted." });
    } catch (err) {
      console.error("Failed to delete application:", err);
      setToast({
        type: "error",
        message: "Could not delete the application. Please try again.",
      });
    } finally {
      setDeleting(false);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setSortBy("newest");
  };

// Lock body scroll + Escape-to-close while any overlay is open.
  const overlayOpen = Boolean(details) || Boolean(viewResume) || Boolean(deleteTarget);
  useEffect(() => {
    if (!overlayOpen) return undefined;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (viewResume) setViewResume(null);
      else if (details) setDetails(null);
      else if (deleteTarget) setDeleteTarget(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [overlayOpen, viewResume, details, deleteTarget]);

  // Auto-dismiss the toast after a short delay.
  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 3800);
    return () => clearTimeout(t);
  }, [toast]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const items = list.filter((item) => {
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (!term) return true;
      const haystack = [item.name, item.email, item.phone, item.careerId?.title]
        .map((v) => (v || "").toLowerCase())
        .join(" ");
      return haystack.includes(term);
    });

    return [...items].sort((a, b) => {
      const nameA = (a.name || "").toLowerCase();
      const nameB = (b.name || "").toLowerCase();
      const posA = (a.careerId?.title || "").toLowerCase();
      const posB = (b.careerId?.title || "").toLowerCase();
      const stA = a.status || "";
      const stB = b.status || "";
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      switch (sortBy) {
        case "oldest":
          return dateA - dateB;
        case "name-asc":
          return nameA.localeCompare(nameB);
        case "name-desc":
          return nameB.localeCompare(nameA);
        case "position-asc":
          return posA.localeCompare(posB);
        case "position-desc":
          return posB.localeCompare(posA);
        case "status":
          return stA.localeCompare(stB);
        case "-status":
          return stB.localeCompare(stA);
        default:
          return dateB - dateA; // newest first
      }
    });
  }, [list, search, statusFilter, sortBy]);

  const filtersActive = search.trim() !== "" || statusFilter !== "all";
  const countLabel = filtersActive
    ? `Showing ${filtered.length} of ${total} applications`
    : `${filtered.length} application${filtered.length === 1 ? "" : "s"}`;

  // PDFs are streamed through the backend proxy so they render inline.
  const isPdfResume = !viewResume?.originalName || /\.pdf$/i.test(viewResume.originalName);
  const resumePreviewUrl = viewResume
    ? `${API_BASE}/admin/applications/${viewResume.id}/resume`
    : "";

  return (
<div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-disp text-2xl font-bold text-slate-900">
            Applications
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage job applications
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-orange" aria-hidden="true" />
          <span className="font-disp text-sm font-bold text-slate-900">
            {fetchStatus === "success" ? total : "—"}
          </span>
          <span className="text-sm text-slate-500">Applications</span>
        </div>
      </div>

      {/* Search + filter + sort */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative min-w-[220px] flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search applications..."
            aria-label="Search applications"
            className="w-full rounded-xl border border-line bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 placeholder-slate-400 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter by status"
          className="min-w-[150px] rounded-xl border border-line bg-white px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-brand-orange focus:outline-none"
        >
          <option value="all">All Statuses</option>
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort applications"
          className="min-w-[190px] rounded-xl border border-line bg-white px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-brand-orange focus:outline-none"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Result count */}
      {fetchStatus === "success" && (
        <p className="mt-5 text-xs text-slate-500" aria-live="polite">
          {countLabel}
        </p>
      )}
{/* Table / states */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {(fetchStatus === "idle" || fetchStatus === "loading") && <TableSkeleton />}

        {fetchStatus === "error" && (
          <div className="p-6">
            <ErrorState onRetry={load} />
          </div>
        )}

        {fetchStatus === "success" && (
          <div className="overflow-x-auto">
            {filtered.length > 0 ? (
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Career
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((item) => (
                    <tr
                      key={item._id}
                      className={`cursor-pointer hover:bg-slate-50 transition-colors ${
                        details?._id === item._id ? "bg-brand-orange/5" : ""
                      }`}
                      onClick={() => openDetails(item)}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {item.careerId?.title || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openDetails(item);
                            }}
                            title="View application"
                            aria-label={`View application from ${item.name || "applicant"}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-brand-orange/40 hover:bg-brand-orange/10 hover:text-brand-orange"
                          >
                            <Eye size={15} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteTarget(item);
                            }}
                            title="Delete application"
                            aria-label={`Delete application from ${item.name || "applicant"}`}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 size={15} aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : list.length === 0 ? (
              <EmptyState />
            ) : (
              <FilteredEmptyState onClear={clearFilters} />
            )}
          </div>
        )}
      </div>
{/* Application details modal */}
      {details && (
        <DetailsModal
          app={details}
          busy={statusUpdating}
          onUpdateStatus={handleStatusChange}
          onViewResume={() => setViewResume({ id: details._id, ...details.resume })}
          onClose={() => setDetails(null)}
        />
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <DeleteModal
          name={deleteTarget.name}
          busy={deleting}
          onCancel={() => setDeleteTarget(null)}
          onDelete={handleDeleteConfirm}
        />
      )}

      {/* Resume preview */}
      {viewResume && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-preview-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            aria-label="Close resume preview"
            onClick={() => setViewResume(null)}
          />
          <div className="relative z-10 flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
              <h3
                id="resume-preview-title"
                className="min-w-0 truncate font-disp text-sm font-bold text-ink"
              >
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
                  <X size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
            {isPdfResume ? (
              <iframe
                src={resumePreviewUrl}
                title="Resume preview"
                className="h-full w-full flex-1 bg-slate-50"
              />
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-slate-50 p-8 text-center">
                <p className="max-w-sm text-sm text-slate-500">
                  Preview is not available for{" "}
                  <span className="font-semibold text-ink">
                    {viewResume.originalName}
                  </span>
                  . Please download the file to view it.
                </p>
                <a
                  href={viewResume.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  Download file
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
};

export default AdminApplications;