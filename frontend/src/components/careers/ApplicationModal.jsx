import { useEffect, useState } from "react";
import { api } from "../../lib/api";

const inputClass =
  "w-full rounded-xl border border-line bg-slate-50 px-4 py-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20";

/**
 * Application form shown when a candidate clicks "Apply Now" on a job card.
 * Submits the candidate's details + resume to POST /careers/:careerId/applications.
 */
const ApplicationModal = ({ job, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", coverLetter: "" });
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!job) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [job, onClose]);

  if (!job) return null;

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("phone", form.phone || "");
      fd.append("coverLetter", form.coverLetter || "");
      if (resume) fd.append("resume", resume);
      await api.postForm(`/careers/${job.id}/applications`, fd);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="application-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        aria-label="Close application form"
        onClick={onClose}
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-lg animate-fade-up overflow-y-auto rounded-2xl border border-line bg-white p-6 shadow-2xl md:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-ink"
          aria-label="Close"
        >
          ×
        </button>

        {status === "success" ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-600">
              ✓
            </div>
            <h2 className="font-disp text-xl font-bold text-ink">Application submitted!</h2>
            <p className="mt-2 text-sm text-slate-500">
              Thanks for applying to <span className="font-semibold text-ink">{job.title}</span>. Our team will review
              your application and get back to you soon.
            </p>
            <button type="button" onClick={onClose} className="btn-primary mt-6">
              Done
            </button>
          </div>
        ) : (
          <>
            <h2 id="application-modal-title" className="mb-1 pr-8 font-disp text-xl font-bold text-ink">
              Apply for {job.title}
            </h2>
            <p className="mb-6 text-sm text-slate-500">
              {job.department} · {job.location}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="app-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Full Name
                </label>
                <input
                  id="app-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="app-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Email
                  </label>
                  <input
                    id="app-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="app-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Phone
                  </label>
                  <input
                    id="app-phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="app-cover" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Cover Letter <span className="normal-case text-slate-400">(optional)</span>
                </label>
                <textarea
                  id="app-cover"
                  name="coverLetter"
                  value={form.coverLetter}
                  onChange={handleChange}
                  rows={4}
                  className={inputClass}
                  placeholder="Tell us why you're a great fit for this role..."
                />
              </div>

              <div>
                <label htmlFor="app-resume" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Resume
                </label>
                <input
                  id="app-resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResume(e.target.files[0] || null)}
                  className={inputClass}
                  required
                />
                <p className="mt-1 text-xs text-slate-400">PDF, DOC or DOCX — max 8MB.</p>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={status === "loading"} className="btn-primary">
                  {status === "loading" ? "Submitting..." : "Submit Application"}
                </button>
                <button type="button" onClick={onClose} className="btn-ghost">
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationModal;

