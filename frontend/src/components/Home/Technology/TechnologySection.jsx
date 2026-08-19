import { ShieldCheck, Sparkles, TrendingUp, Zap } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useReveal } from "../../../hooks/useReveal";
import { technologies } from "./data";
import TechnologyCard from "./TechnologyCard";


const TechReveal = ({ children, variant = "up", delay = 0, className = "" }) => {
  const ref = useReveal();
  const cls = variant === "fade" ? "tech-reveal-fade" : "tech-reveal";
  return (
    <div
      ref={ref}
      className={`${cls} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

const techBadge = (
  <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-ink shadow-[0_8px_20px_-12px_rgba(26,35,50,0.3)]">
    <span className="h-2.5 w-2.5 rounded-full bg-brand-orange" aria-hidden="true" />
    Our Technologies
  </span>
);

/** The four highlights in the bottom feature strip. */
const techFeatures = [
  { icon: ShieldCheck, title: "Secure", text: "We follow best practices to ensure top-notch security." },
  { icon: Zap, title: "Fast", text: "Optimized for speed and performance." },
  { icon: TrendingUp, title: "Scalable", text: "Built to grow with your business needs." },
  { icon: Sparkles, title: "Modern", text: "We use the latest tools and technologies." },
];

/**
 * "Our Technologies" section — premium modern light theme. Dense 10-column
 * technology grid (data-driven), orange/navy badges and headings, and a
 * full-width feature strip. Only this section is touched.
 */
const TechnologySection = () => {
  // `threshold: 0` + a generous rootMargin guarantees the dense tech grid (which
  // gets very tall on mobile — 2 columns x ~24 rows) still triggers the
  // IntersectionObserver. The `useReveal` options object is memoized so the
  // effect doesn't tear down/re-create the observer every render.
  const gridOptions = useMemo(() => ({ threshold: 0, rootMargin: "0px 0px -120px 0px" }), []);
  const gridRef = useReveal(gridOptions);

  // Safety net: if the IntersectionObserver ever fails to observe this grid
  // (blocked third-party iframes, SSR, or a threshold that never resolves),
  // force the `.revealed` class on after a short delay so the cards are still
  // shown instead of staying hidden forever behind the `:not(.revealed)` rule.
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    if (el.classList.contains("revealed")) return;
    const id = setTimeout(() => el.classList.add("revealed"), 800);
    return () => clearTimeout(id);
  }, [gridRef, gridOptions]);

  return (
    <section
      id="technology"
      aria-labelledby="technology-heading"
      className="tech-section relative overflow-hidden bg-white py-20 md:py-24"
    >
      {/* Decorative dotted pattern on the far left / right edges. */}
      <div
        className="tech-edge-left pointer-events-none absolute inset-y-0 left-0 hidden w-28 md:block"
        aria-hidden="true"
      />
      <div
        className="tech-edge-right pointer-events-none absolute inset-y-0 right-0 hidden w-28 md:block"
        aria-hidden="true"
      />

      <div className="container-x relative">
        {/* Top badge */}
        <TechReveal variant="fade" className="flex justify-center">
          {techBadge}
        </TechReveal>

        {/* Main heading — exactly two lines, navy then orange, balanced size */}
        <TechReveal delay={80}>
          <h2
            id="technology-heading"
            className="mx-auto mt-7 w-full max-w-[1100px] px-4 text-center font-disp text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-tight"
          >
            <span className="block text-ink">Powering digital products with</span>
            <span className="block text-accent">modern technologies</span>
          </h2>
        </TechReveal>

        {/* Subtitle */}
        <TechReveal delay={160}>
          <p className="mx-auto mt-5 max-w-2xl px-4 text-center text-base leading-relaxed text-slate-600 md:text-lg">
            We use the best tools, frameworks and platforms to build scalable, secure and
            high-performance digital solutions.
          </p>
        </TechReveal>

        {/* Dense technology grid — 2 / 3 / 4 / 5 / 10 columns, one continuous grid */}
        <div
                              ref={gridRef}
          className="tech-grid mx-auto mt-10 grid auto-rows-fr max-w-[1100px] grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10"
        >
          {technologies.map((tech, i) => (
            <TechnologyCard key={tech.name} {...tech} index={i} />
          ))}
        </div>

        {/* Bottom feature strip */}
        <TechReveal delay={120} className="mt-6">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 rounded-2xl border border-line bg-white px-6 py-8 shadow-[0_20px_50px_-30px_rgba(26,35,50,0.25)] sm:px-8 md:grid-cols-4 md:gap-0 md:divide-x md:divide-line/70 md:py-9">
              {techFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-center gap-3 px-3 text-center"
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange"
                    aria-hidden="true"
                  >
                    <feature.icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <div>
                    <h3 className="font-disp text-base font-bold text-ink md:text-lg">{feature.title}</h3>
                    <p className="mx-auto mt-1 max-w-[220px] text-sm leading-snug text-slate-600">
                      {feature.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TechReveal>
      </div>
    </section>
  );
};

export default TechnologySection;
