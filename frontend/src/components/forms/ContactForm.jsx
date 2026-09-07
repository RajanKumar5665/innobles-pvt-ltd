import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { resetContact, selectContactStatus, selectContactError } from "../../features/contact/contactSlice";
import { submitContact } from "../../features/contact/contactThunks";
import Loader from "../common/Loader";
import FeatureCheck from "../common/FeatureCheck";

const emptyForm = { name: "", email: "", phone: "", subject: "", message: "" };
const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder-slate-400 transition-all duration-300 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20";

const validate = (v) => {
  const errs = {};
  if (!v.name.trim()) errs.name = "Please enter your name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errs.email = "Enter a valid email";
  if (v.message.trim().length < 10) errs.message = "Message should be at least 10 characters";
  return errs;
};

const ContactForm = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectContactStatus);
  const error = useAppSelector(selectContactError);
  const [formData, setFormData] = useState(emptyForm);
  const [touched, setTouched] = useState({});

  // Derived validation — recomputed on every render from current values.
  const errors = validate(formData);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleBlur = (e) => setTouched((prev) => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(formData);
    setTouched({ name: true, email: true, message: true });
    if (!Object.keys(errs).length) dispatch(submitContact(formData));
  };

  const handleReset = () => {
    setFormData(emptyForm);
    setTouched({});
    dispatch(resetContact());
  };

  if (status === "success") {
    return (
      <div className="text-center" role="status" aria-live="polite">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
          <FeatureCheck className="h-8 w-8 text-emerald-600" strokeWidth={2.5} />
        </div>
        <h3 className="font-disp text-2xl font-bold">Thanks, there!</h3>
        <p className="mt-3 text-slate-500">
          Your message has been received. We&apos;ll reply within one business day.
        </p>
        <button onClick={handleReset} className="btn-ghost mt-8 !py-2.5 text-sm">Send another message</button>
      </div>
    );
  }

  const fieldError = (n) => (touched[n] && errors[n] ? errors[n] : null);

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold text-slate-600">Your name <span className="text-brand-orange">*</span></label>
          <input id="contact-name" type="text" name="name" placeholder="e.g. Priya Sharma" autoComplete="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} aria-invalid={Boolean(fieldError("name"))} aria-describedby={fieldError("name") ? "contact-name-error" : undefined} className={`${inputClass} ${fieldError("name") ? "!border-red-500/60" : ""}`} />
          {fieldError("name") && <p id="contact-name-error" className="mt-1 text-xs text-red-500">{fieldError("name")}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold text-slate-600">Work email <span className="text-brand-orange">*</span></label>
          <input id="contact-email" type="email" name="email" placeholder="you@company.com" autoComplete="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} aria-invalid={Boolean(fieldError("email"))} aria-describedby={fieldError("email") ? "contact-email-error" : undefined} className={`${inputClass} ${fieldError("email") ? "!border-red-500/60" : ""}`} />
          {fieldError("email") && <p id="contact-email-error" className="mt-1 text-xs text-red-500">{fieldError("email")}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className="mb-1.5 block text-xs font-semibold text-slate-600">Phone <span className="font-normal text-slate-400">(optional)</span></label>
          <input id="contact-phone" type="tel" name="phone" placeholder="+91 98765 43210" autoComplete="tel" value={formData.phone} onChange={handleChange} onBlur={handleBlur} className={inputClass} />
        </div>
        <div>
          <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-semibold text-slate-600">How can we help?</label>
          <select id="contact-subject" name="subject" value={formData.subject} onChange={handleChange} onBlur={handleBlur} className={`${inputClass} ${formData.subject ? "" : "text-slate-400"}`}>
          <option value="" disabled className="bg-white text-ink">Select a topic</option>
          {["Product demo", "New platform / custom build", "Integration (payments, eBG, Aadhaar)", "Careers", "Other"].map((s) => (
            <option key={s} className="bg-white text-ink">{s}</option>
          ))}
          </select>
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between gap-3">
          <label htmlFor="contact-message" className="text-xs font-semibold text-slate-600">Project brief <span className="text-brand-orange">*</span></label>
          <span className="text-[11px] text-slate-400">{formData.message.length}/1000</span>
        </div>
        <textarea id="contact-message" name="message" placeholder="Tell us what you are building and how we can help..." rows={5} maxLength={1000} value={formData.message} onChange={handleChange} onBlur={handleBlur} aria-invalid={Boolean(fieldError("message"))} aria-describedby={fieldError("message") ? "contact-message-error" : undefined} className={`${inputClass} resize-none ${fieldError("message") ? "!border-red-500/60" : ""}`} />
        {fieldError("message") && <p id="contact-message-error" className="mt-1 text-xs text-red-500">{fieldError("message")}</p>}
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error} — please try again.</p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-submit mt-2 disabled:cursor-not-allowed disabled:opacity-60">
        {status === "sending" ? (<><Loader size="sm" /> Sending...</>) : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
