import { useEffect, useRef, useState } from "react";

// Splits a stat value like "37+", "8", "24/7" into a countable number and a
// static suffix ("+", "", "/7"). Non-numeric values ("N/A") are faded in
// as plain text — no counting.
const parseValue = (value = "") => {
  const text = String(value).trim();
  const match = text.match(/^(\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return { text, numeric: false };
  return {
    numeric: true,
    num: parseFloat(match[1].replace(",", ".")),
    suffix: match[2] || "",
  };
};

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

// Respect the user's "reduce motion" accessibility setting.
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)")?.matches;

// Animated counter — counts up from 0 the first time the number scrolls into
// view via a single requestAnimationFrame loop.
//
// IMPORTANT: the loop's start time is kept in a ref, and the effect depends
// ONLY on primitive values (not the re-created `parsed` object). If a fresh
// object were in the dependency array, the effect would tear down and restart
// the animation on every render (frame) triggered by setDisplay — leaving the
// number stuck at "0".
const StatCounter = ({ value = "", className = "" }) => {
  const ref = useRef(null);
  const startTimeRef = useRef(null);
  const parsed = parseValue(value);
  const needsCount = parsed.numeric;
  const finalText = needsCount ? `${parsed.num}${parsed.suffix}` : parsed.text;
  const [display, setDisplay] = useState(needsCount ? "0" : parsed.text);
  const [started, setStarted] = useState(false);

  // Arm the count-up the first time the number becomes visible.
  useEffect(() => {
    if (!needsCount) return;
    const el = ref.current;
    if (!el) return;

    // Old browsers / SSR / reduced motion: show the final number immediately.
    if (typeof IntersectionObserver === "undefined" || prefersReducedMotion()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(finalText);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.disconnect();
            setStarted(true);
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [needsCount, finalText]);

  // Run the counting animation exactly once.
  useEffect(() => {
    if (!started || !needsCount) return;

    if (typeof requestAnimationFrame === "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(finalText);
      return;
    }

    const num = parsed.num;
    const hasDecimal = num % 1 !== 0;
    const duration = 1100;
    let raf = 0;

    const tick = (now) => {
      if (startTimeRef.current === null) startTimeRef.current = now;
      const progress = Math.min(1, (now - startTimeRef.current) / duration);
      const next = num * easeOutCubic(progress);
      setDisplay((hasDecimal ? next.toFixed(1) : String(Math.round(next))) + parsed.suffix);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(finalText);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, needsCount, parsed.num, parsed.suffix, finalText]);

  return (
    <span ref={ref} className={className}>
      {needsCount ? display : parsed.text}
    </span>
  );
};

export default StatCounter;