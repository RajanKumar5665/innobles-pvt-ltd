import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { FaLinkedinIn, FaFacebook, FaSquareXTwitter } from "react-icons/fa6";

// Social share strip — LinkedIn, Facebook, Twitter (X) or copy link.
const BlogShare = ({ url, title, className = "" }) => {
  const shareUrl = url || window.location.href;
  const shareTitle = title || document.title;
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently ignore — the copy button is a convenience.
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);

  const shareLinks = [
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: FaLinkedinIn,
      color: "linkedin",
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: FaFacebook,
      color: "facebook",
    },
    {
      name: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      Icon: FaSquareXTwitter,
      color: "twitter",
    },
  ];

  return (
    <section
      className={`blog-share ${className}`}
      aria-label="Share this blog"
    >
      <span className="blog-share-label">Share this article</span>

      <div className="blog-share-buttons">
        {shareLinks.map(({ name, href, Icon, color }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${name}`}
            className={`blog-share-btn blog-share-${color}`}
          >
            <Icon size={18} aria-hidden="true" />
          </a>
        ))}

        <button
          type="button"
          onClick={copyLink}
          aria-label={copied ? "Link copied" : "Copy link"}
          className="blog-share-btn blog-share-copy"
        >
          {copied ? (
            <Check size={16} aria-hidden="true" />
          ) : (
            <Copy size={16} aria-hidden="true" />
          )}
        </button>
      </div>
    </section>
  );
};

export default BlogShare;
