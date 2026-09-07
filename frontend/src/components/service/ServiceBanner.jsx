import { memo, useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { buildResponsiveImage } from "../../lib/cloudinary";

// Shows the service banner image with a neutral placeholder fallback.
// Cloudinary sources are served responsively (f_auto/q_auto + width srcset).
const ServiceBanner = memo(
  ({ src, alt = "", className = "", sizes, priority = false, ...rest }) => {
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
ServiceBanner.displayName = "ServiceBanner";

export default ServiceBanner;