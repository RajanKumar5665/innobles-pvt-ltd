import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, BarChart3 } from "lucide-react";
import { api } from "../../../lib/api";
import Loader from "../../common/Loader";
import { FieldError, FieldLabel, fieldClass, Toast } from "./AboutUi";

// The four fixed statistics shown on the About Us page. These defaults
// only seed the form for a fresh document.
const DEFAULT_STATS = [
  { key: "projects", label: "Projects Delivered", value: "50+" },
  { key: "clients", label: "Happy Clients", value: "30+" },
  { key: "experience", label: "Years of Experience", value: "5+" },
  { key: "support", label: "24/7 Operations", value: "24/7" },
];

const byOrder = (a, b) =>
  (a.order ?? 0) - (b.order ?? 0) ||
  new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

// Merge saved stats into the four fixed slots, seeding defaults where empty.
const mergeRows = (statistics = []) => {
  const sorted = [...statistics].sort(byOrder);
  return DEFAULT_STATS.map((def, i) => {
    const existing = sorted[i];
    return {
      _id: existing?._id || null,
      key: def.key,
      label: existing?.label || def.label,
      value: existing?.value || def.value,
      active: existing?.active !== false,
    };
  });
};

export const StatisticsSection = ({ statistics = [], onChanged }) => {
  const [rows, setRows] = useState(() => mergeRows(statistics));
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Sync local form rows whenever fresh statistics arrive from the server.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRows(mergeRows(statistics));
  }, [statistics]);

  const updateRow = (key, field, value) =>
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, [field]: value } : r)));

  const reorderRow = (index, dir) => {
    const target = index + dir;
    if (target < 0 || target >= rows.length || busy) return;
    setRows((prev) => {
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    window.setTimeout(() => setToast(null), 3500);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (busy) return;

    const errs = {};
    rows.forEach((r) => {
      if (!r.value.trim()) errs[r.key] = "Value is required. e.g. 50+";
      if (!r.label.trim()) errs[`${r.key}-label`] = "Label is required.";
    });
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;

    setBusy(true);
    setFormError(null);
    try {
      const nextRows = [...rows];
      // Upsert each of the four fixed statistics through the existing API.
      for (let i = 0; i < nextRows.length; i++) {
        const r = nextRows[i];
        const body = { value: r.value.trim(), label: r.label.trim(), active: r.active };
        if (r._id) {
          await api.put(`/admin/about/statistics/${r._id}`, body);
        } else {
          const created = await api.post("/admin/about/statistics", body);
          r._id = created?.data?._id || null;
        }
      }

      // Persist the exact display + ordering. Reorder replaces the whole array,
      // so any old statistics not in these four ids are removed automatically.
      await api.patch("/admin/about/statistics/reorder", {
        ids: nextRows.map((r) => (r._id ? r._id.toString() : "")).filter(Boolean),
      });

      setRows(nextRows);
      onChanged();
      showToast("success", "Statistics updated.");
    } catch (err) {
      setFormError(err?.message || "Failed to update statistics.");
    } finally {
      setBusy(false);
    }
  };
return (
    <div className="mt-6 space-y-6">
      <div>
        <h2 className="font-disp text-lg font-bold text-slate-900">Statistics</h2>
        <p className="mt-1 text-sm text-slate-500">
          Edit the four statistics shown on the public About Us page. Reorder with the arrows.
        </p>
      </div>

      <form onSubmit={handleSave} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {rows.map((r, i) => (
            <div key={r.key} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-cyan/10 text-brand-cyan">
                    <BarChart3 size={16} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="font-disp text-sm font-bold text-slate-700">Statistic {i + 1}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button type="button" onClick={() => reorderRow(i, -1)} disabled={i === 0 || busy} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-40" aria-label="Move up"><ArrowUp size={14} aria-hidden="true" /></button>
                  <button type="button" onClick={() => reorderRow(i, 1)} disabled={i === rows.length - 1 || busy} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-40" aria-label="Move down"><ArrowDown size={14} aria-hidden="true" /></button>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel htmlFor={`stat-value-${r.key}`} required>
                    Value
                  </FieldLabel>
                  <input
                    id={`stat-value-${r.key}`}
                    value={r.value}
                    onChange={(e) => updateRow(r.key, "value", e.target.value)}
                    placeholder="50+"
                    className={fieldClass(!!errors[r.key])}
                  />
                  <FieldError message={errors[r.key]} />
                </div>
                <div>
                  <FieldLabel htmlFor={`stat-label-${r.key}`} required>
                    Label
                  </FieldLabel>
                  <input
                    id={`stat-label-${r.key}`}
                    value={r.label}
                    onChange={(e) => updateRow(r.key, "label", e.target.value)}
                    placeholder="Projects Delivered"
                    className={fieldClass(!!errors[`${r.key}-label`])}
                  />
                  <FieldError message={errors[`${r.key}-label`]} />
                </div>
              </div>

              <div className="mt-3">
                <label className="inline-flex items-center gap-2.5 text-sm font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={r.active}
                    onChange={(e) => updateRow(r.key, "active", e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  Active
                  <span className="text-xs text-slate-400">— show this statistic on the About Us page</span>
                </label>
              </div>
            </div>
          ))}
        </div>

        {formError && <p className="mt-4 text-sm text-red-600">{formError}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button type="submit" disabled={busy} className="btn-primary inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60">
            {busy && <Loader size="sm" />} Save Statistics
          </button>
        </div>
      </form>

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
};