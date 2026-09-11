// Image URL helpers — every public image on the site is a Cloudinary asset,
// so we request a properly-sized, auto-optimised derivative instead of the
// original full-size upload. This shrinks download size dramatically and
// makes card grids / product pages render much faster.
//
// Cloudinary derives new formats on the fly by inserting transformation
// tokens right after "/image/upload/" in the asset URL, e.g.
//   .../image/upload/f_auto,q_auto:eco,w_800,c_fill/v1/sample.jpg

const CLOUDINARY_UPLOAD_MARKER = "/image/upload/";

// Cloudinary quality levels — mapped to the values Cloudinary actually
// accepts. Plain "q_auto" means "let Cloudinary pick the best quality";
// q_auto:auto is NOT a valid value and makes Cloudinary return an error
// image (HTTP 400), which is why every image used to disappear.
const QUALITY_LEVELS = {
  auto: "q_auto",
  low: "q_auto:low",
  eco: "q_auto:eco",
  good: "q_auto:good",
  best: "q_auto:best",
};

/**
 * Injects responsive Cloudinary transformations into an asset URL.
 * Non-Cloudinary URLs are returned untouched.
 *
 * @param {string} src  Original Cloudinary URL.
 * @param {object} opts
 *   - width/height: requested pixel size for the rendered slot (2x for retina).
 *   - quality: "auto" (default) | "good" | "best" | "eco" | "low".
 *   - fit: "fill" (crop, default) | "scale" (fit width, keep ratio).
 */
export const optimizeCloudinaryUrl = (
  src = "",
  { width, height, quality = "auto", fit = "fill" } = {},
) => {
  try {
    if (!src || !src.includes("res.cloudinary.com")) return src;

    const idx = src.indexOf(CLOUDINARY_UPLOAD_MARKER);
    if (idx === -1) return src;

    // Never double-transform a URL that already carries image treatments.
    const afterMarker = src.slice(idx + CLOUDINARY_UPLOAD_MARKER.length);
    const firstSegment = afterMarker.split("/")[0] || "";
    if (firstSegment.includes("w_") || firstSegment.includes("f_auto")) {
      return src;
    }

    // c_fill needs BOTH dimensions to crop; with only one dimension use
    // c_scale (fit within width, keep aspect ratio).
    const useFill = fit === "fill" && width && height;

    const parts = [
      "f_auto",
      QUALITY_LEVELS[quality] || "q_auto",
    ];
    if (width) parts.push(`w_${Math.round(width)}`);
    if (height) parts.push(`h_${Math.round(height)}`);
    if (width || height) parts.push(useFill ? "c_fill" : "c_scale");

    const transform = parts.join(",");
    const base = src.slice(0, idx + CLOUDINARY_UPLOAD_MARKER.length);
    const rest = src.slice(idx + CLOUDINARY_UPLOAD_MARKER.length);
    return `${base}${transform}/${rest}`;
  } catch {
    // A broken transformation should never take an image down — fall back
    // to the original URL if anything unexpected happens.
    return src;
  }
};

/**
 * Ready-made sizes used across the site so every caller uses the same
 * mental model (slot width ×2 gives crisp retina images).
 */
export const IMAGE_SIZES = {
  // Small 16:9 card thumbnail (~380–420px slot).
  card: { width: 800 },
  // Big product-detail hero (~700–1200px slot).
  hero: { width: 1600 },
  // Blog / content images.
  content: { width: 1200 },
};