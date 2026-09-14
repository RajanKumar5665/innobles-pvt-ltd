// -----------------------------------------------------------------------------
// Shared, dependency-free form validation.
// Lives in one file so every form uses identical rules, limits and messages:
// ContactForm, the job-application modal and the admin login screen.
// Backend Joi schemas mirror these rules (see backend/src/validations).
// -----------------------------------------------------------------------------

export const LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  EMAIL_MAX: 254,
  PHONE_MAX: 15,
  MESSAGE_MIN: 10,
  MESSAGE_MAX: 1000,
  COVER_MIN: 10,
  COVER_MAX: 4000,
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 100,
  RESUME_MAX_BYTES: 8 * 1024 * 1024, // 8MB
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Normalise before checking: strip spaces/hyphens but keep a leading + or 0
// (e.g. "+91 98765 43210" -> "+919876543210").
const cleanPhone = (value) => String(value ?? "").trim().replace(/[\s-]/g, "");

// Indian mobile: optional +91/0 prefix followed by a 10-digit number starting 6-9.
const isIndianMobile = (value) => /^(\+?91|0)?[6-9]\d{9}$/.test(cleanPhone(value));

// Generic E.164 international number: a + followed by 7-14 digits.
const isInternationalPhone = (value) => /^\+\d{7,14}$/.test(cleanPhone(value));

const toString = (value) => String(value ?? "").trim();

export const validateName = (value) => {
  const name = toString(value);
  if (!name) return "Name is required";
  if (name.length < LIMITS.NAME_MIN)
    return `Name must be at least ${LIMITS.NAME_MIN} characters`;
  if (name.length > LIMITS.NAME_MAX)
    return `Name must be ${LIMITS.NAME_MAX} characters or fewer`;
  return "";
};

export const validateEmail = (value) => {
  const email = toString(value);
  if (!email) return "Email is required";
  if (email.length > LIMITS.EMAIL_MAX)
    return `Email must be ${LIMITS.EMAIL_MAX} characters or fewer`;
  if (!EMAIL_RE.test(email)) return "Enter a valid email address";
  return "";
};

// Optional field: empty passes, anything else must be a valid number.
export const validatePhone = (value) => {
  const phone = toString(value);
  if (!phone) return "";
  if (phone.length > LIMITS.PHONE_MAX)
    return `Phone number must be ${LIMITS.PHONE_MAX} digits or fewer`;
  if (isIndianMobile(phone) || isInternationalPhone(phone)) return "";
  return "Enter a valid phone number (e.g. +91 98765 43210)";
};

export const validateSubject = (value) =>
  toString(value) ? "" : "Please choose a topic";

export const validateMessage = (
  value,
  { min = LIMITS.MESSAGE_MIN, max = LIMITS.MESSAGE_MAX } = {},
) => {
  const message = toString(value);
  if (!message) return "Message is required";
  if (message.length < min)
    return `Message must be at least ${min} characters`;
  if (message.length > max)
    return `Message must be ${max} characters or fewer`;
  return "";
};

export const validatePassword = (value) => {
  const password = String(value ?? "");
  if (!password.trim()) return "Password is required"; // ← .trim() add kiya sirf iss check ke liye
  if (password.length < LIMITS.PASSWORD_MIN)
    return `Password must be at least ${LIMITS.PASSWORD_MIN} characters`;
  if (password.length > LIMITS.PASSWORD_MAX)
    return `Password must be ${LIMITS.PASSWORD_MAX} characters or fewer`;
  return "";
};

export const validateResume = (file) => {
  if (!file) return "Resume is required";
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (!allowedTypes.includes(file.type))
    return "Only PDF, DOC or DOCX files are allowed";
  if (file.size > LIMITS.RESUME_MAX_BYTES)
    return "Resume must be 8MB or smaller";
  return "";
};

// Shows a field error only once the field has been touched/blurred.
export const fieldError = (errors, touched, name) =>
  touched?.[name] && errors?.[name] ? errors[name] : "";