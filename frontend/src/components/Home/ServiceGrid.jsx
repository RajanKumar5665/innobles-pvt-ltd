import { Link } from "react-router-dom";
import { useServices } from "../../hooks/useServices";
import Reveal from "../common/Reveal";
import Loader from "../common/Loader";
import Icon from "../common/Icon";

const spans = ["lg:col-span-2 lg:row-span-2", "", "", "", "lg:col-span-2", ""];

const ServiceGrid = () => {
  const { list, status } = useServices();

  return (
    <section className="bg-slate-50 py-24">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="pill-eyebrow mb-4">
              <span className="pill-dot" />
              What we do
            </p>
            <h2 className="max-w-xl font-disp text-3xl font-bold md:text-4xl">
              Six capabilities. <span className="text-gradient">One accountable team.</span>
            </h2>
          </Reveal>
          <Reveal>
            <Link to="/services" className="btn-ghost !py-2.5 text-sm">
              All services →
            </Link>
          </Reveal>
        </div>

        {status === "loading" && (
          <div className="mt-12">
            <Loader className="!h-24" size="lg" />
          </div>
        )}

        {status === "success" && (
          <div className="mt-12 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s, i) => (
              <Reveal key={s.id} delay={i * 70} className={spans[i]}>
                <article
                  className={`group flex h-full flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-lg ${
                    i === 0
                      ? "border-brand-orange/25 bg-gradient-to-br from-brand-orange/10 via-white to-brand-yellow/10"
                      : i === 4
                        ? "border-brand-cyan/25 bg-gradient-to-br from-brand-cyan/10 to-white"
                        : "border-line bg-white"
                  }`}
                >
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-md transition-transform group-hover:scale-105">
                    <Icon icon={s.icon} className="h-7 w-7" strokeWidth={1.8} />
                  </div>
                  <h3 className={`font-disp font-bold ${i === 0 ? "text-2xl" : "text-lg"}`}>{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                  {i === 0 && (
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {s.features.slice(0, 4).map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                          <span className="text-brand-cyan">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
            Something went wrong while loading services. Please refresh.
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceGrid;
