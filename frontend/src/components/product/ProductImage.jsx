import { memo, useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { buildResponsiveImage } from "../../lib/cloudinary";

const PLACEHOLDER_CLASS = "relative flex items-center justify-center bg-slate-100";
const ICON_CLASS = "h-8 w-8 text-slate-400";

// Shows the product image. If it is missing or broken, shows a neutral
// placeholder instead of a broken-image icon. Cloudinary sources are served
// responsively (f_auto/q_auto + width srcset) so cards download only what the
// viewport actually needs — much cheaper than the original full-size file.
const ProductImage = memo(
  ({ src, alt = "", className = "", sizes, priority = false, ...rest }) => {
    const [failed, setFailed] = useState(false);
    const validSrc = src && !failed;

    if (!validSrc) {
      return (
        <div
          className={`${PLACEHOLDER_CLASS} ${className}`}
          role="img"
          aria-label={alt || undefined}
          {...rest}
        >
          <ImageIcon className={ICON_CLASS} strokeWidth={1.5} aria-hidden="true" />
        </div>
      );
    }

    const { src: optimizedSrc, srcSet } = buildResponsiveImage(src);

    return (
      <img
        src={optimizedSrc}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        decoding="async"
        className={className}
        onError={() => setFailed(true)}
        {...rest}
      />
    );
  },
);

// Keep the component name visible in React DevTools.
ProductImage.displayName = "ProductImage";

export default ProductImage;