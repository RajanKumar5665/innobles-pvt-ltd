import { testimonials } from "../../data/dummyData";
import Reveal from "../common/Reveal";

const Testimonials = () => {
  return (
    <section className="bg-white py-24">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="pill-eyebrow mb-4 justify-center">
            <span className="pill-dot" />
            TESTIMONIALS
          </p>
          <h2 className="font-disp text-3xl font-bold md:text-4xl">What our clients say</h2>
          <p className="mt-4 text-slate-600 md:text-lg">
            Real feedback from clients who trusted Innobles to build and grow their digital products.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="card flex h-full flex-col p-6">
                <div className="flex items-center gap-1 text-brand-yellow">
                  {[...Array(5)].map((_, idx) => (
                    <svg
                      key={idx}
                      className={`h-4 w-4 ${idx < t.rating ? "fill-current" : "fill-slate-200 text-slate-200"}`}
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gradient font-disp text-xs font-bold text-white">
                    {t.avatar}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="truncate text-xs text-slate-500">{t.role}, {t.company}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
