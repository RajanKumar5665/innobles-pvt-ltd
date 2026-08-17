import { useEffect } from "react";
import ContactForm from "../forms/ContactForm";

const ContactModal = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
      <button type="button" className="absolute inset-0 bg-ink/50 backdrop-blur-sm" aria-label="Close contact form" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg animate-fade-up rounded-2xl border border-line bg-white p-6 shadow-2xl md:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-ink"
          aria-label="Close"
        >
          ×
        </button>
        <h2 id="contact-modal-title" className="mb-6 pr-8 font-disp text-xl font-bold text-ink">
          Send us a message
        </h2>
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactModal;
