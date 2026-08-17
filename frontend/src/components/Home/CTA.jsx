import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";

const CTA = () => {
  return (
    <section className="container-x pb-8">
      <Reveal>
        <div className="overflow-hidden rounded-3xl bg-ink">
          <div className="grid lg:grid-cols-2">
            <div className="relative p-10 md:p-14">
              <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-brand-orange/30 blur-3xl" />
              <p className="relative text-xs font-bold uppercase tracking-widest text-brand-yellow">Ready to start?</p>
              <h2 className="relative mt-4 font-disp text-3xl font-bold leading-tight text-white md:text-4xl">
                Turn your idea into a product people actually use.
              </h2>
              <p className="relative mt-4 max-w-md text-white/65">
                Book a free discovery call — we&apos;ll reply within one business day with a clear next step.
              </p>
              <div className="relative mt-8 flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary">
                  Get in touch
                </Link>
                <Link to="/about" className="rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                  About us
                </Link>
              </div>
            </div>

            <div className="relative border-t border-white/10 bg-white/5 p-10 md:p-14 lg:border-l lg:border-t-0">
              <p className="text-sm font-semibold text-brand-cyan">Why Innobles?</p>
              <ul className="mt-6 space-y-4">
                {[
                  "Senior team — no junior hand-offs",
                  "Weekly demos with working software",
                  "Fixed quotes after discovery call",
                  "30-day post-launch warranty",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-[10px] text-white">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default CTA;
