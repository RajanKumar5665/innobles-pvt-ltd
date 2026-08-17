import { useState } from "react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80";

/**
 * Blog image with a graceful fallback so a missing / broken URL
 * never leaves a white gap in a card.
 */
const BlogImage = ({ src, alt = "", ...rest }) => {
  const [source, setSource] = useState(src || FALLBACK_IMAGE);

  return (
    <img
      src={source}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (source !== FALLBACK_IMAGE) setSource(FALLBACK_IMAGE);
      }}
      {...rest}
    />
  );
};

export default BlogImage;