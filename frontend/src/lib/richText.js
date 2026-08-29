// Small helpers for rendering rich-text (HTML) content on the public site.
// Admin content is stored as HTML, so these turn it into plain text or safe HTML.

const isBrowser = typeof document !== "undefined";

// Removes all HTML tags and returns clean plain text.
export const stripHtml = (html = "") => {
  if (!html) return "";
  if (!isBrowser) {
    // SSR fallback: drop tags with a basic regex.
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }
  const node = document.createElement("div");
  node.innerHTML = html;
  return (node.textContent || node.innerText || "").replace(/\s+/g, " ").trim();
};

// True when the rich text has no visible text or image.
export const isRichContentEmpty = (html = "") => {
  if (!html) return true;
  if (!isBrowser) return !html.trim();
  const node = document.createElement("div");
  node.innerHTML = html;
  return !node.textContent.trim() && !node.querySelector("img");
};

// True when the value actually contains HTML markup.
export const looksLikeHtml = (value = "") =>
  typeof value === "string" && /<[a-z][\s\S]*>/i.test(value);

// Prepares a value for dangerouslySetInnerHTML. Plain text is wrapped in <p> tags.
export const toRenderableHtml = (value = "") => {
  const v = String(value || "").trim();
  if (!v) return "";
  if (looksLikeHtml(v)) return v;
  // Plain text → split on blank lines into paragraphs, keep single newlines.
  return v
    .split(/\n{2,}/)
    .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
    .join("");
};