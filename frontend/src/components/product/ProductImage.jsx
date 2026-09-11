import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { optimizeCloudinaryUrl } from "../../lib/imageUrl";

// Shows the product image. It is served as an auto-compressed, correctly
// sized Cloudinary derivative (f_auto + q_auto + width crop) so card grids
// download and render quickly. If the image is missing or broken, shows a
// neutral placeholder instead of a broken-image icon.
//
// Props:
//   width / height — pixel size of the rendered slot (2x for retina).
//   priority — "high" for above-the-fold images, otherwise lazy.
const ProductImage = ({
  src,
  alt = "",
  className = "",
  width = 800,
  height = null,
  priority = "low",
  ...rest
}) => {
  const [failed, setFailed] = useState(false);
  const validSrc = src && !failed;
  const optimizedSrc = validSrc ? optimizeCloudinaryUrl(src, { width, height }) : "";

  if (!optimizedSrc) {
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
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height || undefined}
      loading={priority === "high" ? "eager" : "lazy"}
      decoding="async"
      className={className}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
};

export default ProductImage;