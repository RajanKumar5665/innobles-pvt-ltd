

export const DUPLICATE_APPLICATION_MESSAGE =
  "Already applied. You have already submitted an application for this position.";


export const normalizeEmail = (value) =>
  String(value ?? "").trim().toLowerCase();


export const normalizePhoneKey = (value) => {
  const phone = String(value ?? "").trim();
  if (!phone) return "";
  return phone.replace(/[\s-]/g, "");
};


export const buildDuplicateQuery = ({ careerId, email, phone }) => {
  const conditions = [{ email: normalizeEmail(email) }];
  const phoneKey = normalizePhoneKey(phone);
  if (phoneKey) conditions.push({ phoneKey });
  return { careerId, $or: conditions };
};