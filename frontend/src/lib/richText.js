/**
 * Small rich-text helpers for the public frontend.
 *
 * Admin description/content fields are authored in the TipTap rich-text editor
 * and therefore stored as HTML. These helpers let public cards and meta tags
 * render plain-text summaries, and let detail pages render the stored HTML
 * safely / correctly.
 */

const isBrowser = typeof document !== "undefined";

/** Strip all HTML tags and return a clean plain-text string. */
export const stripHtml = (html = "") => {
  if (!html) return "";
  if (!isBrowser) {
    // SSR-safe fallback: drop tags via a crude but adequate approach.
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }
  const node = document.createElement("div");
  node.innerHTML = html;
  return (node.textContent || node.innerText || "").replace(/\s+/g, " ").trim();
};

/** A rich-text value counts as "empty" when it has no visible text or image. */
export const isRichContentEmpty = (html = "") => {
  if (!html) return true;
  if (!isBrowser) return !html.trim();
  const node = document.createElement("div");
  node.innerHTML = html;
  return !node.textContent.trim() && !node.querySelector("img");
};

/** True when the stored value actually contains markup (i.e. rich text). */
export const looksLikeHtml = (value = "") =>
  typeof value === "string" && /<[a-z][\s\S]*>/i.test(value);

/**
 * Normalize a stored value so it can be rendered via `dangerouslySetInnerHTML`.
 * If the value is plain text (older records) it is wrapped in <p> paragraph
 * tags so it still displays with clean spacing.
 */
export const toRenderableHtml = (value = "") => {
  const v = String(value || "").trim();
  if (!v) return "";
  if (looksLikeHtml(v)) return v;
  // Plain text → split on blank lines into paragraphs, preserve single newlines.
  return v
    .split(/\n{2,}/)
    .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
    .join("");
};