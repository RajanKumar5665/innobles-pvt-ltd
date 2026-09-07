import { useEffect, useRef } from "react";

// Scroll-triggered image reveal using a clip-path "wipe".
// Wraps its children and reveals them (top-down wipe) as they enter the
// viewport. Uses the same IntersectionObserver pattern as `useReveal` (reliable
// across the site) and adds an `image-reveal--in` class that triggers the CSS
// transition. Reduced-motion users are handled entirely by CSS (always visible).
const ImageReveal = ({ className = "", children, ...rest }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Safe fallback for very old browsers / SSR.
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("image-reveal--in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("image-reveal--in");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);

    // Safety net: never leave the image permanently hidden. If the observer
    // hasn't fired shortly after mount (e.g. layout not settled yet), reveal it.
    const fallback = window.setTimeout(() => {
      el.classList.add("image-reveal--in");
      observer.disconnect();
    }, 3000);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={`image-reveal ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default ImageReveal;