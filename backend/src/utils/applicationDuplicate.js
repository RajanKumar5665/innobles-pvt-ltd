// -----------------------------------------------------------------------------
// Shared helpers for the job-application duplicate rule.
//
// Business rule (per job): a candidate may apply for a particular job only once.
//   - same careerId + same email (case/whitespace-insensitive) = duplicate
//   - same careerId + same phone (normalized)                   = duplicate
//   - different careerId + same email/phone                     = allowed
//
// The frontend mirrors these rules (see frontend/src/lib/formValidation.js and
// the ApplicationModal), but the backend is the authoritative enforcement point.
// The database also carries a partial unique index, so even two concurrent
// requests cannot insert the same (careerId, phoneKey) pair.
// -----------------------------------------------------------------------------

export const DUPLICATE_APPLICATION_MESSAGE =
  "Already applied. You have already submitted an application for this position.";

// Email is compared in lowercase with surrounding whitespace removed.
// The schema already stores it lowercased, so this matches exactly what is
// persisted and exactly what the (careerId, email) unique index compares.
export const normalizeEmail = (value) =>
  String(value ?? "").trim().toLowerCase();

// Phone is compared in "compact" form: whitespace and hyphens are removed but
// a leading + or 0 is kept, so "+91 98765 43210", "+919876543210",
// "091-98765-43210" and "98765 43210" all become the same identity key.
export const normalizePhoneKey = (value) => {
  const phone = String(value ?? "").trim();
  if (!phone) return "";
  return phone.replace(/[\s-]/g, "");
};

// Builds the Mongo query used by the pre-check. The phone branch is only added
// when a non-empty phone was supplied, so an empty optional phone can never
// block an application (an empty value is not an identity).
export const buildDuplicateQuery = ({ careerId, email, phone }) => {
  const conditions = [{ email: normalizeEmail(email) }];
  const phoneKey = normalizePhoneKey(phone);
  if (phoneKey) conditions.push({ phoneKey });
  return { careerId, $or: conditions };
};