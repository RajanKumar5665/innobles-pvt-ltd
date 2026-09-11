import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { optimizeCloudinaryUrl } from "../../lib/imageUrl";

// Shows the service banner served as an auto-compressed, correctly sized
// Cloudinary derivative. If the image is missing or broken, shows a neutral
// placeholder instead of a broken-image icon.
const ServiceBanner = ({
  src,
  alt = "",
  className = "",
  width = 800,
  height = 450,
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
      height={height}
      loading={priority === "high" ? "eager" : "lazy"}
      decoding="async"
      className={className}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
};

export default ServiceBanner;