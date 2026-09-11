import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { api } from "../../lib/api";
import FeatureCheck from "../common/FeatureCheck";
import {
  LIMITS,
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
  validateResume,
  fieldError,
} from "../../lib/formValidation";

const inputClass =
  "w-full rounded-xl border border-line bg-slate-50 px-4 py-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20";

const initialForm = () => ({ name: "", email: "", phone: "", coverLetter: "" });

// Application form shown when a candidate clicks "Apply Now" on a job.
// Submits candidate details + resume to POST /careers/:careerId/applications.
const ApplicationModal = ({ job, onClose }) => {
  const [form, setForm] = useState(initialForm());
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const validateForm = (values = form, file = resume) => ({
    name: validateName(values.name),
    email: validateEmail(values.email),
    phone: values.phone.trim() ? validatePhone(values.phone) : "",
    coverLetter: values.coverLetter.trim()
      ? validateMessage(values.coverLetter, {
          min: LIMITS.COVER_MIN,
          max: LIMITS.COVER_MAX,
        })
      : "",
    resume: validateResume(file),
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0] || null;
    setResume(file);
    setErrors((prev) => ({ ...prev, resume: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateForm();
    setTouched({ name: true, email: true, phone: true, coverLetter: true, resume: true });
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;

    setStatus("loading");
    setError(null);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("phone", form.phone || "");
      fd.append("coverLetter", form.coverLetter || "");
      fd.append("resume", resume);
      await api.postForm(`/careers/${job.id}/applications`, fd);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong. Please try again.");
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
          <X size={16} aria-hidden="true" />
        </button>

        {status === "success" ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <FeatureCheck className="h-7 w-7" strokeWidth={2.5} />
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

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="app-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Full Name
                </label>
                <input
                  id="app-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={LIMITS.NAME_MAX}
                  className={`${inputClass} ${fieldError(errors, touched, "name") ? "!border-red-500/60" : ""}`}
                  placeholder="Your full name"
                />
                {fieldError(errors, touched, "name") && (
                  <p className="mt-1 text-xs text-red-600">{fieldError(errors, touched, "name")}</p>
                )}
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
                    onBlur={handleBlur}
                    maxLength={LIMITS.EMAIL_MAX}
                    className={`${inputClass} ${fieldError(errors, touched, "email") ? "!border-red-500/60" : ""}`}
                    placeholder="you@example.com"
                  />
                  {fieldError(errors, touched, "email") && (
                    <p className="mt-1 text-xs text-red-600">{fieldError(errors, touched, "email")}</p>
                  )}
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
                    onBlur={handleBlur}
                    maxLength={LIMITS.PHONE_MAX}
                    className={`${inputClass} ${fieldError(errors, touched, "phone") ? "!border-red-500/60" : ""}`}
                    placeholder="+91 98765 43210"
                  />
                  {fieldError(errors, touched, "phone") && (
                    <p className="mt-1 text-xs text-red-600">{fieldError(errors, touched, "phone")}</p>
                  )}
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
                  onBlur={handleBlur}
                  rows={4}
                  maxLength={LIMITS.COVER_MAX}
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
                  onChange={handleResumeChange}
                  className={`${inputClass} ${fieldError(errors, touched, "resume") ? "!border-red-500/60" : ""}`}
                />
                {fieldError(errors, touched, "resume") ? (
                  <p className="mt-1 text-xs text-red-600">{fieldError(errors, touched, "resume")}</p>
                ) : (
                  <p className="mt-1 text-xs text-slate-400">PDF, DOC or DOCX — max 8MB.</p>
                )}
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

