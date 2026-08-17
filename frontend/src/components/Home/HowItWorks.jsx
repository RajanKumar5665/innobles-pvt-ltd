import { process } from "../../data/dummyData";
import Reveal from "../common/Reveal";

const stepColors = ["border-brand-orange bg-brand-orange/10 text-brand-orange", "border-brand-yellow bg-brand-yellow/15 text-amber-600", "border-brand-cyan bg-brand-cyan/10 text-brand-cyan", "border-brand-orange bg-brand-orange/10 text-brand-orange"];

const HowItWorks = () => {
  return (
    <section className="py-24">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="pill-eyebrow mb-4 justify-center">
            <span className="pill-dot" />
            How we work
          </p>
          <h2 className="font-disp text-3xl font-bold md:text-4xl">From idea to launch — without the chaos</h2>
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-cyan lg:block" />

          <div className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 100}>
                <div className="relative text-center lg:text-left">
                  <div className={`relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-2 font-disp text-lg font-bold lg:mx-0 ${stepColors[i]}`}>
                    {p.step}
                  </div>
                  <h3 className="mt-6 font-disp text-xl font-bold">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
