import { useRef } from "react";
import { Image as ImageIcon, Loader as LoaderIcon, Trash2, X } from "lucide-react";

// Allowed image types + size limit (kept in sync with the other admin forms).
export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
export const IMAGE_MAX_MB = 5;

// Shared input class, aligned with the Product/Service admin forms.
export const fieldClass = (hasError) =>
  `w-full rounded-xl border ${
    hasError ? "border-red-400" : "border-line"
  } bg-slate-50 px-4 py-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20`;

export const FieldLabel = ({ htmlFor, required = false, children }) => (
  <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
    {children}
    {required && (
      <span className="text-red-500" aria-hidden="true">
        {" "}
        *
      </span>
    )}
  </label>
);

export const FieldError = ({ message }) =>
  message ? <p className="mt-1.5 text-sm text-red-600">{message}</p> : null;


export const ImageField = ({ id, label, preview = "", onFile, onRemove, error }) => {
  const ref = useRef(null);
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input
        id={id}
        ref={ref}
        type="file"
        accept={IMAGE_TYPES.join(",")}
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          e.target.value = "";
          if (!file) return;
          if (!IMAGE_TYPES.includes(file.type)) {
            alert("Only JPG, PNG, WEBP or GIF images are allowed.");
            return;
          }
          if (file.size > IMAGE_MAX_MB * 1024 * 1024) {
            alert(`Image must be ${IMAGE_MAX_MB}MB or smaller.`);
            return;
          }
          onFile(file);
        }}
      />
      <div className="flex items-center gap-3">
        {preview ? (
          <img src={preview} alt="" className="h-20 w-20 rounded-xl border border-slate-200 object-cover" />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-400">
            <ImageIcon size={18} aria-hidden="true" />
          </div>
        )}
        <button type="button" onClick={() => ref.current?.click()} className="btn-ghost !px-3 !py-2 text-xs">
          {preview ? "Replace image" : "Upload image"}
        </button>
        {preview && (
          <button type="button" onClick={onRemove} className="text-xs font-semibold text-red-600 hover:underline">
            Remove
          </button>
        )}
      </div>
      <FieldError message={error} />
    </div>
  );
};

// Confirmation modal used when deleting any About Us entry.
export const DeleteModal = ({ title = "", busy = false, onCancel, onDelete }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-[2px] overscroll-contain"
    role="dialog"
    aria-modal="true"
    aria-label="Delete item"
  >
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <h2 className="font-disp text-lg font-bold text-slate-900">Delete?</h2>
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
          Are you sure you want to delete <span className="font-semibold text-slate-800">{title}</span>? This
          action cannot be undone.
        </p>
        <div className="flex justify-end gap-3 pt-5">
          <button type="button" onClick={onCancel} disabled={busy} className="btn-ghost">
            Cancel
          </button>
          <button
            type="button"
            onClick={onDelete}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? <LoaderIcon size={15} className="animate-spin" aria-hidden="true" /> : <Trash2 size={15} aria-hidden="true" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Simple success/error toast.
export const Toast = ({ toast, onDismiss }) => {
  if (!toast) return null;
  const success = toast.type === "success";
  return (
    <div
      className={`fixed right-4 top-4 z-[60] flex max-w-sm items-start gap-3 rounded-xl border p-4 shadow-lg ${
        success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
      }`}
      role="status"
    >
      <div className="flex-1">
        <p className={`text-sm font-semibold ${success ? "text-green-700" : "text-red-700"}`}>
          {success ? "Success" : "Error"}
        </p>
        <p className="mt-0.5 text-sm text-slate-600">{toast.message}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        aria-label="Dismiss"
      >
        <X size={15} aria-hidden="true" />
      </button>
    </div>
  );
};
