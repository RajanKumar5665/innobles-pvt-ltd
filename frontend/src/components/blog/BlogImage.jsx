import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

/**
 * Blog image that renders the backend-provided URL. When there is no
 * usable image (empty / missing / broken URL) it shows a clean, neutral
 * placeholder (matching the shared card surface) instead of falling back to a
 * hard-coded stock photo, so cards never display dummy imagery.
 */
const BlogImage = ({ src, alt = "", className = "", ...rest }) => {
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

export default BlogImage;