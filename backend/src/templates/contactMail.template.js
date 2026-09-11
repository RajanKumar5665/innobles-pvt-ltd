export const contactMailTemplate = ({ name, email, phone, subject, message }) => `
  <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
    <h2 style="color:#172B3A;">New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name || "-"}</p>
    <p><strong>Email:</strong> ${email || "-"}</p>
    ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
    ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p style="background:#F8FAFC; padding:12px; border-radius:8px;">${message || "-"}</p>
  </div>
`;