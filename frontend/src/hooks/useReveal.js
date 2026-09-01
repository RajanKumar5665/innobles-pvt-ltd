import { useEffect, useRef } from "react";

// Adds the "revealed" class when the element scrolls into view.
// This triggers the CSS fade/translate animation.
export const useReveal = (options = {}) => {
  const ref = useRef(null);
  // Keep the latest options in a ref so the observer is not torn down and
  // re-created on every render when callers pass a fresh object literal.
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Safe fallback for very old browsers / SSR.
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("revealed");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("revealed");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px", ...optionsRef.current }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
};
