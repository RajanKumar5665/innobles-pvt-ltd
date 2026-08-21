import { Quote, Send } from "lucide-react";
import { useReveal } from "../../../hooks/useReveal";
import SectionHeader from "../../common/SectionHeader";
import TestimonialCarousel from "./TestimonialCarousel";

/**
 * Scoped scroll-reveal wrapper for the Testimonials section (same pattern as
 * the Technology section's TechReveal). Disabled under prefers-reduced-motion.
 */
const TsReveal = ({ children, variant = "up", delay = 0, className = "" }) => {
  const ref = useReveal();
  const cls = variant === "fade" ? "ts-reveal-fade" : "ts-reveal";
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

/**
 * Home page Testimonials section — a client-quote carousel on a premium white
 * background with subtle decorative glows.
 */
const TestimonialsSection = () => (
  <section
    id="testimonials"
    aria-labelledby="testimonials-heading"
    className="ts-section relative overflow-hidden bg-slate-50 py-20 md:py-24"
  >
    {/* Decorative background: faint glows, giant quote mark, paper-plane path */}
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* Cyan + orange radial glows */}
      <div className="absolute -left-44 top-1/3 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(23,32,51,0.08),transparent_62%)] blur-2xl" />
      <div className="absolute -right-36 top-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.10),transparent_62%)] blur-2xl" />

      {/* Large faint quotation mark on the left */}
      <Quote
        className="absolute -left-6 top-16 h-[26rem] w-[26rem] rotate-[-8deg] text-ink opacity-[0.045] lg:-left-8 lg:top-20 lg:h-[34rem] lg:w-[34rem]"
        fill="currentColor"
        strokeWidth={0}
      />

      {/* Paper-plane / dotted-curve decoration on the right */}
      <div className="absolute right-4 top-24 hidden w-[24rem] opacity-50 lg:block xl:right-10 xl:w-[27rem]">
        <svg viewBox="0 0 420 300" className="h-auto w-full" fill="none">
          <path
            d="M 18 292 C 140 286, 235 214, 342 108"
            stroke="#F59E0B"
            strokeOpacity="0.4"
            strokeWidth="2"
            strokeDasharray="0.1 10"
            strokeLinecap="round"
          />
        </svg>
        <Send
          className="absolute h-8 w-8 text-brand-orange/50"
          strokeWidth={1.7}
          style={{
            left: "calc(80.9% - 16px)",
            top: "calc(36.7% - 16px)",
            transform: "translate(-50%, -50%) rotate(-24deg)",
          }}
        />
      </div>
    </div>

    <div className="container-x relative">
      {/* Consistent section heading (matches Services + Products + Blog previews) */}
      <SectionHeader
        eyebrow="Testimonials"
        title="What our clients say about us"
        subtitle="We take pride in delivering exceptional digital solutions that help businesses grow, scale, and succeed."
        align="center"
        id="testimonials-heading"
      />

      {/* Testimonial carousel */}
      <TsReveal variant="fade" delay={220} className="mt-14 md:mt-16">
        <TestimonialCarousel />
      </TsReveal>
    </div>
  </section>
);

export default TestimonialsSection;
