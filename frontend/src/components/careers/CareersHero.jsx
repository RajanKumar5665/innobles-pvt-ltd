import { Sparkles } from "lucide-react";

/**
 * Careers hero: eyebrow badge + headline + description.
 */
const CareersHero = () => (
  <section className="career-container pt-12 pb-10 md:pt-16 md:pb-12">
    <span className="career-eyebrow">
      <Sparkles size={13} aria-hidden="true" />
      Careers at Innobles
    </span>
    <h1 className="mt-6 max-w-3xl text-[32px] font-extrabold leading-[1.14] tracking-tight text-career-black md:text-[46px]">
      Join Our Team, Build the <span className="text-career-orange">Future</span>
    </h1>
    <p className="mt-5 max-w-[680px] text-[15px] leading-[1.75] text-career-gray md:text-base">
      Explore open roles across engineering, design, product, and operations. Find the right opportunity, filter by
      your preferences, and apply to the role that matches your skills and ambition.
    </p>
  </section>
);

export default CareersHero;