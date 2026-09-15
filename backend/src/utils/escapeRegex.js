// Escapes regex metacharacters so user search input is matched literally
// when interpolated into a Mongo $regex (prevents regex injection / odd
// matching but deliberately also makes searching for "a+b" or "a.b" work).
export const escapeRegex = (value) =>
  String(value ?? "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default escapeRegex;