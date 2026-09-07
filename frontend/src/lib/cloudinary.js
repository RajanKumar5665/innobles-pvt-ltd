// -----------------------------------------------------------------------------
// Cloudinary responsive-image helpers.
//
// Product/blog/service images are stored as Cloudinary delivery URLs of the
// form https://res.cloudinary.com/<cloud>/image/upload/<public-path>.
// We inject `f_auto,q_auto` (automatic next-gen format + quality) and a width
// `srcset` so the browser downloads only the size it actually needs instead of
// the original full-size file. Any URL that is not a Cloudinary URL is passed
// through untouched, so local previews and plain links keep working.
// -----------------------------------------------------------------------------

const CLOUDINARY_URL_RE =
  /^(https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.+)$/;

// Candidate delivery widths for the `srcset` (320px to 1600px).
const SRC_SET_WIDTHS = [320, 480, 640, 960, 1280, 1600];

// Tiny memo so repeated identical sources (common across a grid) don't rebuild
// the same strings on every render.
const cache = new Map();

// Return { src, srcSet } for a Cloudinary URL, or { src, srcSet: undefined }
// for any other source (local previews, plain links) so callers can drop the
// srcSet attribute.
export const buildResponsiveImage = (url) => {
  if (!url) return { src: "", srcSet: undefined };

  const cached = cache.get(url);
  if (cached) return cached;

  const match = url.match(CLOUDINARY_URL_RE);
  if (!match) {
    const result = { src: url, srcSet: undefined };
    cache.set(url, result);
    return result;
  }

  const [, base, rest] = match;
  const result = {
    src: `${base}f_auto,q_auto/${rest}`,
    srcSet: SRC_SET_WIDTHS.map((w) => `${base}w_${w},f_auto,q_auto/${rest} ${w}w`).join(", "),
  };
  cache.set(url, result);
  return result;
};