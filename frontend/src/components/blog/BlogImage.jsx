import { useState } from "react";

/**
 * Blog image that renders the backend-provided URL. When there is no
 * usable image (empty / missing / broken URL) it shows a neutral
 * placeholder block (matching the card background) instead of falling
 * back to a hard-coded stock photo, so cards never display dummy imagery.
 */
const BlogImage = ({ src, alt = "", className = "", ...rest }) => {
  const [failed, setFailed] = useState(false);
  const validSrc = src && !failed;

  if (!validSrc) {
    return (
      <div
        className={`bg-[#F8FAFC] ${className}`}
        role="img"
        aria-label={alt || undefined}
        {...rest}
      />
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