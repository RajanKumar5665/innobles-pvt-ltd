import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import FeatureCheck from "../common/FeatureCheck";

const CTA = () => {
  return (
    <section className="container-x pb-8">
      <Reveal>
        <div className="overflow-hidden rounded-3xl bg-ink">
          <div className="grid lg:grid-cols-2">
            <div className="relative p-10 md:p-14">
              <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-brand-orange/30 blur-3xl" />
              <p className="relative text-xs font-bold uppercase tracking-widest text-brand-orange">Ready to start?</p>
              <h2 className="relative mt-4 font-disp text-3xl font-bold leading-tight text-slate-50 md:text-4xl">
                Turn your idea into a product people actually use.
              </h2>
              <p className="relative mt-4 max-w-md text-slate-300">
                Book a free discovery call — we&apos;ll reply within one business day with a clear next step.
              </p>
              <div className="relative mt-8 flex flex-wrap gap-4">
                <Link to="/contact" className="btn-accent">
                  Get in touch
                </Link>
                <Link to="/about" className="rounded-xl border border-slate-500/50 px-6 py-3 text-sm font-semibold text-slate-100 transition-colors hover:bg-slate-800">
                  About us
                </Link>
              </div>
            </div>

            <div className="relative border-t border-slate-700/60 bg-slate-900/40 p-10 md:p-14 lg:border-l lg:border-t-0">
              <p className="text-sm font-semibold text-brand-orange">Why Innobles?</p>
              <ul className="mt-6 space-y-4">
                {[
                  "Senior team — no junior hand-offs",
                  "Weekly demos with working software",
                  "Fixed quotes after discovery call",
                  "30-day post-launch warranty",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-200">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange text-slate-50">
                      <FeatureCheck className="h-3 w-3" strokeWidth={3} />
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
