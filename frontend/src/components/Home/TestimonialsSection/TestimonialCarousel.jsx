import { useCallback, useEffect, useRef, useState } from "react";
import { useReveal } from "../../../hooks/useReveal";
import TestimonialCard from "./TestimonialCard";
import TestimonialNavigation from "./TestimonialNavigation";
import { testimonials } from "./data";

const AUTOPLAY_DELAY = 4500; // ms between automatic slides
const RESUME_DELAY = 6000; // ms after an interaction before autoplay restarts
const HOVER_RESUME_DELAY = 1600; // ms after leaving the carousel before it resumes

/** How many cards fit on screen: 3 (desktop), 2 (tablet), 1 (mobile). */
const getPerView = () => {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
};

/**
 * Responsive testimonial carousel.
 *
 * The track holds the real slides followed by clones of the first `perView`
 * slides. The visible window is shifted one card at a time with a smooth
 * transform; when the window reaches the clones it snaps back to the real
 * slides, which gives an endless loop on every breakpoint.
 *
 * Features: prev/next arrows, pagination dots, autoplay with pause-on-
 * interaction, and full `prefers-reduced-motion` support.
 */
const TestimonialCarousel = () => {
  const [perView, setPerView] = useState(() => getPerView());
  const [offset, setOffset] = useState(0);
  const [instant, setInstant] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const revealRef = useReveal();
  const perViewRef = useRef(perView);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const resumeTimer = useRef(null);
  const goNextRef = useRef(null);

  const total = testimonials.length;
  const activeDot = offset % total;
  const trackSlides = [...testimonials, ...testimonials.slice(0, perView)];

  // Respect prefers-reduced-motion: no autoplay, no smooth slide animation.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event) => setReduceMotion(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Recalculate how many cards fit when the viewport changes.
  useEffect(() => {
    const onResize = () => {
      const next = getPerView();
      if (perViewRef.current !== next) {
        perViewRef.current = next;
        offsetRef.current = 0;
        setInstant(true);
        setOffset(0);
        setPerView(next);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Pause autoplay while the tab is hidden.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  /** Jump to an absolute track offset (optionally without animation). */
  const applyOffset = useCallback((next, animate = true) => {
    offsetRef.current = next;
    setInstant(!animate);
    setOffset(next);
  }, []);

  /** Move one card forward; wraps seamlessly through the cloned slides. */
  const goNext = useCallback(() => {
    if (offsetRef.current >= total) {
      // At the clone window: snap back to the real slides, then advance.
      applyOffset(0, false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => applyOffset(1, true));
      });
    } else {
      applyOffset(offsetRef.current + 1, true);
    }
  }, [applyOffset, total]);

  /** Move one card backward; wraps seamlessly through the cloned slides. */
  const goPrev = useCallback(() => {
    if (offsetRef.current === 0) {
      applyOffset(total, false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => applyOffset(total - 1, true));
      });
    } else {
      applyOffset(offsetRef.current - 1, true);
    }
  }, [applyOffset, total]);

  /** Jump straight to a pagination dot using the shortest path. */
  const goToDot = useCallback(
    (dotIndex) => {
      const current = offsetRef.current;
      const candidates = [dotIndex, dotIndex + total];
      const best = candidates.reduce((a, b) =>
        Math.abs(b - current) < Math.abs(a - current) ? b : a
      );
      applyOffset(best, true);
    },
    [applyOffset, total]
  );

  // Keep the latest handler available to the autoplay interval without
  // re-creating the interval on every render.
  useEffect(() => {
    goNextRef.current = goNext;
  }, [goNext]);

  // Autoplay — paused after user interaction, disabled for reduced motion.
  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = setInterval(() => {
      if (!pausedRef.current) goNextRef.current();
    }, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, [reduceMotion]);

  /** Pause autoplay and schedule a resume. */
  const pauseAutoplay = (resumeIn = RESUME_DELAY) => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), resumeIn);
  };

  const handleInteraction = () => pauseAutoplay();

  return (
    <div className="relative">
      {/* Desktop / tablet: circular arrows outside the cards */}
      <TestimonialNavigation
        direction="prev"
        onClick={() => {
          handleInteraction();
          goPrev();
        }}
        className="absolute top-1/2 left-0 z-10 hidden -translate-y-1/2 md:flex md:-left-4 lg:-left-6"
      />
      <TestimonialNavigation
        direction="next"
        onClick={() => {
          handleInteraction();
          goNext();
        }}
        className="absolute top-1/2 right-0 z-10 hidden -translate-y-1/2 md:flex md:-right-4 lg:-right-6"
      />

      {/* Sliding track */}
      <div
        ref={revealRef}
        className="ts-carousel overflow-hidden"
        onPointerEnter={() => pauseAutoplay(HOVER_RESUME_DELAY)}
        onPointerLeave={() => pauseAutoplay(HOVER_RESUME_DELAY)}
        onFocus={() => pauseAutoplay(HOVER_RESUME_DELAY)}
        onBlur={() => pauseAutoplay(HOVER_RESUME_DELAY)}
      >
        <div
          className="flex will-change-transform"
          style={{
            transform: `translateX(-${(offset * 100) / perView}%)`,
            transition:
              instant || reduceMotion
                ? "none"
                : "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {trackSlides.map((testimonial, i) => (
            <div
              key={`${testimonial.id}-${i}`}
              className="ts-card-in h-full shrink-0 px-3 sm:px-3.5"
              style={{ width: `${100 / perView}%` }}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots + mobile arrows */}
      <div className="mt-8 flex items-center justify-center gap-4 md:mt-9">
        <TestimonialNavigation
          direction="prev"
          onClick={() => {
            handleInteraction();
            goPrev();
          }}
          className="md:hidden"
        />

        <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial pages">
          {testimonials.map((testimonial, i) => (
            <button
              key={testimonial.id}
              type="button"
              role="tab"
              aria-selected={activeDot === i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => {
                handleInteraction();
                goToDot(i);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeDot === i
                  ? "w-7 bg-brand-orange"
                  : "w-2.5 cursor-pointer bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        <TestimonialNavigation
          direction="next"
          onClick={() => {
            handleInteraction();
            goNext();
          }}
          className="md:hidden"
        />
      </div>
    </div>
  );
};

export default TestimonialCarousel;

