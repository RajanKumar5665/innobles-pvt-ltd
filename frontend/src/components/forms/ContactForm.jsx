import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { resetContact, selectContactStatus, selectContactError } from "../../features/contact/contactSlice";
import { submitContact } from "../../features/contact/contactThunks";
import Loader from "../common/Loader";
import FeatureCheck from "../common/FeatureCheck";
import {
  LIMITS,
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
  validateSubject,
  fieldError,
} from "../../lib/formValidation";

const emptyForm = { name: "", email: "", phone: "", subject: "", message: "" };
const inputClass =
  "w-full rounded-xl border border-line bg-slate-50 px-4 py-3 text-sm text-ink placeholder-slate-400 transition-colors focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20";

// Stable DOM ids so <label htmlFor> and aria-describedby can reference fields.
const FIELD_IDS = {
  name: "contact-name",
  email: "contact-email",
  phone: "contact-phone",
  subject: "contact-subject",
  message: "contact-message",
};

const validate = (v) => ({
  name: validateName(v.name),
  email: validateEmail(v.email),
  phone: v.phone.trim() ? validatePhone(v.phone) : "",
  subject: validateSubject(v.subject),
  message: validateMessage(v.message, {
    min: LIMITS.MESSAGE_MIN,
    max: LIMITS.MESSAGE_MAX,
  }),
});

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
    setTouched({ name: true, email: true, phone: true, subject: true, message: true });
    const hasErrors = Object.values(errs).some(Boolean);
    if (!hasErrors) dispatch(submitContact(formData));
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

  const errorClass = (name) => (fieldError(errors, touched, name) ? "!border-red-500/60" : "");
  const invalid = (name) => !!fieldError(errors, touched, name);
  const errorId = (name) => (invalid(name) ? `${FIELD_IDS[name]}-error` : undefined);

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Full Name <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            autoComplete="name"
            maxLength={LIMITS.NAME_MAX}
            required
            aria-required="true"
            aria-invalid={invalid("name")}
            aria-describedby={errorId("name")}
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputClass} ${errorClass("name")}`}
          />
          {fieldError(errors, touched, "name") && (
            <p id="contact-name-error" className="mt-1 text-xs text-red-400">{fieldError(errors, touched, "name")}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Email <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            autoComplete="email"
            maxLength={LIMITS.EMAIL_MAX}
            required
            aria-required="true"
            aria-invalid={invalid("email")}
            aria-describedby={errorId("email")}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputClass} ${errorClass("email")}`}
          />
          {fieldError(errors, touched, "email") && (
            <p id="contact-email-error" className="mt-1 text-xs text-red-400">{fieldError(errors, touched, "email")}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Phone <span className="normal-case text-slate-400">(optional)</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            placeholder="Enter your mobile number (optional)"
            autoComplete="tel"
            inputMode="tel"
            maxLength={LIMITS.PHONE_MAX}
            aria-invalid={invalid("phone")}
            aria-describedby={errorId("phone")}
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputClass} ${errorClass("phone")}`}
          />
          {fieldError(errors, touched, "phone") && (
            <p id="contact-phone-error" className="mt-1 text-xs text-red-400">{fieldError(errors, touched, "phone")}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact-subject" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Topic <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <select
            id="contact-subject"
            name="subject"
            value={formData.subject}
            required
            aria-required="true"
            aria-invalid={invalid("subject")}
            aria-describedby={errorId("subject")}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputClass} ${errorClass("subject")} ${formData.subject ? "" : "text-slate-400"}`}
          >
            <option value="" disabled className="bg-white text-ink">Select a topic</option>
            {["Product demo", "New platform / custom build", "Integration (payments, eBG, Aadhaar)", "Careers", "Other"].map((s) => (
              <option key={s} className="bg-white text-ink">{s}</option>
            ))}
          </select>
          {fieldError(errors, touched, "subject") && (
            <p id="contact-subject-error" className="mt-1 text-xs text-red-400">{fieldError(errors, touched, "subject")}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
          Message <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Describe your query in detail"
          rows={4}
          maxLength={LIMITS.MESSAGE_MAX}
          required
          aria-required="true"
          aria-invalid={invalid("message")}
          aria-describedby={errorId("message")}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${inputClass} resize-none ${errorClass("message")}`}
        />
        {fieldError(errors, touched, "message") ? (
          <p id="contact-message-error" className="mt-1 text-xs text-red-400">{fieldError(errors, touched, "message")}</p>
        ) : (
          <p className="mt-1 text-right text-[11px] text-slate-400">
            {formData.message.length}/{LIMITS.MESSAGE_MAX} · minimum {LIMITS.MESSAGE_MIN}
          </p>
        )}
      </div>

      {error && (
        <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error} — please try again.</p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary mt-2 w-full !py-3.5 disabled:cursor-not-allowed disabled:opacity-60">
        {status === "sending" ? (<><Loader size="sm" /> Sending...</>) : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
