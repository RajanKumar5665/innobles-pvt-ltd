import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { resetContact } from "../../features/contact/contactSlice";
import { submitContact } from "../../features/contact/contactThunks";
import Loader from "../common/Loader";
import FeatureCheck from "../common/FeatureCheck";

const emptyForm = { name: "", email: "", phone: "", service: "", message: "" };
const inputClass =
  "w-full rounded-xl border border-line bg-slate-50 px-4 py-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20";

const validate = (v) => {
  const errs = {};
  if (!v.name.trim()) errs.name = "Please enter your name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errs.email = "Enter a valid email";
  if (v.message.trim().length < 10) errs.message = "Message should be at least 10 characters";
  return errs;
};

const ContactForm = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((s) => s.contact.status);
  const error = useAppSelector((s) => s.contact.error);
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
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
          <FeatureCheck className="h-8 w-8 text-emerald-600" strokeWidth={2.5} />
        </div>
        <h3 className="font-disp text-2xl font-bold">Thanks, there!</h3>
        <p className="mt-3 text-white/60">
          Your message has been received. We&apos;ll reply to within one business day.
        </p>
        <button onClick={handleReset} className="btn-ghost mt-8 !py-2.5 text-sm">Send another message</button>
      </div>
    );
  }

  const fieldError = (n) => (touched[n] && errors[n] ? errors[n] : null);

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input type="text" name="name" placeholder="Your name *" value={formData.name} onChange={handleChange} onBlur={handleBlur} className={`${inputClass} ${fieldError("name") ? "!border-red-500/60" : ""}`} />
          {fieldError("name") && <p className="mt-1 text-xs text-red-400">{fieldError("name")}</p>}
        </div>
        <div>
          <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} onBlur={handleBlur} className={`${inputClass} ${fieldError("email") ? "!border-red-500/60" : ""}`} />
          {fieldError("email") && <p className="mt-1 text-xs text-red-400">{fieldError("email")}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input type="tel" name="phone" placeholder="Phone (optional)" value={formData.phone} onChange={handleChange} onBlur={handleBlur} className={inputClass} />
        <select name="service" value={formData.service} onChange={handleChange} onBlur={handleBlur} className={`${inputClass} ${formData.service ? "" : "text-slate-400"}`}>
          <option value="" disabled className="bg-white text-ink">Select a service</option>
          {["Web Development", "Mobile Apps", "Cloud & DevOps", "AI & Automation", "UI/UX Design", "IT Consulting", "Others"].map((s) => (
            <option key={s} className="bg-white text-ink">{s}</option>
          ))}
        </select>
      </div>

      <div>
        <textarea name="message" placeholder="Project brief *" rows={4} value={formData.message} onChange={handleChange} onBlur={handleBlur} className={`${inputClass} resize-none ${fieldError("message") ? "!border-red-500/60" : ""}`} />
        {fieldError("message") && <p className="mt-1 text-xs text-red-400">{fieldError("message")}</p>}
      </div>

      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error} — please try again.</p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary mt-2 w-full !py-3.5 disabled:cursor-not-allowed disabled:opacity-60">
        {status === "sending" ? (<><Loader size="sm" /> Sending...</>) : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
