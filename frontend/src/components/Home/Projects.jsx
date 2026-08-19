import { projects } from "../../data/dummyData";
import Reveal from "../common/Reveal";

const accentBars = ["bg-brand-orange", "bg-ink", "bg-brand-orange", "bg-ink", "bg-brand-orange", "bg-ink"];

const Projects = () => {
  const [featured, ...rest] = projects;

  return (
    <section className="py-24">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="pill-eyebrow mb-4">
            <span className="pill-dot" />
            Selected work
          </p>
          <h2 className="font-disp text-3xl font-bold md:text-4xl">Products we&apos;ve shipped</h2>
          <p className="mt-4 text-slate-600">Real outcomes across fintech, healthcare, retail and logistics.</p>
        </Reveal>

        {featured && (
          <Reveal className="mt-12">
            <article className="group relative overflow-hidden rounded-3xl border border-line bg-ink p-8 text-slate-50 md:p-12">
              <div className="pointer-events-none absolute inset-0 bg-brand-orange/15" />
              <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                <div>
                  <span className="inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-brand-orange">
                    {featured.category}
                  </span>
                  <h3 className="mt-4 font-disp text-3xl font-bold md:text-4xl">{featured.title}</h3>
                  <p className="mt-4 max-w-2xl text-slate-300">{featured.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  {featured.tech.map((t) => (
                    <span key={t} className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        )}

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <article className="group flex h-full overflow-hidden rounded-2xl border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className={`w-1.5 shrink-0 ${accentBars[i % accentBars.length]}`} />
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-cyan">{p.category}</span>
                  <h3 className="mt-2 font-disp text-lg font-bold group-hover:text-brand-orange">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-slate-600">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
