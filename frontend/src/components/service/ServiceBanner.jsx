import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

/**
 * Service banner image that renders the backend-provided `bannerImage` URL.
 *
 * - Renders a landscape `object-cover` image so crops stay consistent.
 * - If the URL is missing / empty / fails to load it shows a clean, neutral
 *   placeholder (matching the card surface) instead of a broken-image icon —
 *   it never shows a hard-coded stock image.
 * - Parent must supply sizing (e.g. `h-full w-full object-cover`) via className.
 */
const ServiceBanner = ({ src, alt = "", className = "", ...rest }) => {
  const [failed, setFailed] = useState(false);
  const validSrc = src && !failed;

  if (!validSrc) {
    return (
      <div
        className={`relative flex items-center justify-center bg-slate-100 ${className}`}
        role="img"
        aria-label={alt || undefined}
        {...rest}
      >
        <ImageIcon className="h-8 w-8 text-slate-400" strokeWidth={1.5} aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
};

export default ServiceBanner;