/**
 * Convert a string into an SEO-friendly URL slug.
 * e.g. "Designing Scalable Systems!" -> "designing-scalable-systems"
 */
const slugify = (text = "") =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "untitled";

/**
 * Return a slug guaranteed to be unique in the given model by appending
 * numeric suffixes (-2, -3, ...) when necessary.
 */
const uniqueSlug = async (Model, base, excludeId = null) => {
  const root = slugify(base);
  let candidate = root;
  let suffix = 2;

  while (true) {
    const query = { slug: candidate };
    if (excludeId) query._id = { $ne: excludeId };
    const existing = await Model.findOne(query).select("_id").lean();
    if (!existing) return candidate;
    candidate = `${root}-${suffix}`;
    suffix += 1;
  }
};

export { slugify, uniqueSlug };
