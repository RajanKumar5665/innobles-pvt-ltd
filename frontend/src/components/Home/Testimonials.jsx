import { testimonials } from "../../data/dummyData";
import Reveal from "../common/Reveal";

const Testimonials = () => {
  const [featured, ...others] = testimonials;

  return (
    <section className="overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="pill-eyebrow mb-4 justify-center">
            <span className="pill-dot" />
            Testimonials
          </p>
          <h2 className="font-disp text-3xl font-bold md:text-4xl">Loved by teams who ship</h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr_1fr] lg:items-center">
          {others[0] && (
            <Reveal delay={100} className="hidden lg:block">
              <figure className="rotate-[-2deg] rounded-2xl border border-line bg-white p-6 shadow-md">
                <p className="text-sm leading-relaxed text-slate-600">&ldquo;{others[0].quote}&rdquo;</p>
                <figcaption className="mt-4 text-sm font-semibold">{others[0].name}</figcaption>
              </figure>
            </Reveal>
          )}

          {featured && (
            <Reveal>
              <figure className="relative rounded-3xl border border-brand-cyan/20 bg-white p-8 shadow-xl md:p-10">
                <span className="font-disp text-6xl leading-none text-brand-yellow/50">&ldquo;</span>
                <blockquote className="mt-2 text-lg leading-relaxed text-slate-700 md:text-xl">
                  {featured.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient font-disp text-sm font-bold text-white">
                    {featured.avatar}
                  </span>
                  <div>
                    <p className="font-disp font-bold">{featured.name}</p>
                    <p className="text-sm text-slate-500">{featured.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          )}

          {others[1] && (
            <Reveal delay={200} className="hidden lg:block">
              <figure className="rotate-[2deg] rounded-2xl border border-line bg-white p-6 shadow-md">
                <p className="text-sm leading-relaxed text-slate-600">&ldquo;{others[1].quote}&rdquo;</p>
                <figcaption className="mt-4 text-sm font-semibold">{others[1].name}</figcaption>
              </figure>
            </Reveal>
          )}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3 lg:hidden">
          {others.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-line bg-white p-5">
              <p className="text-sm text-slate-600">&ldquo;{t.quote}&rdquo;</p>
              <figcaption className="mt-3 text-sm font-semibold">{t.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
