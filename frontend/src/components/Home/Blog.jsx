import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useBlogs } from "../../hooks/useBlogs";
import Reveal from "../common/Reveal";
import Loader from "../common/Loader";

const Blog = () => {
  const { list, status } = useBlogs();
  const [featured, ...rest] = list;

  return (
    <section className="py-24">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="pill-eyebrow mb-4">
              <span className="pill-dot" />
              Insights
            </p>
            <h2 className="font-disp text-3xl font-bold md:text-4xl">From the blog</h2>
          </Reveal>
          <Reveal>
            <Link to="/blog" className="btn-ghost !py-2.5 text-sm">
              All articles <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        {status === "loading" && (
          <div className="mt-12">
            <Loader className="!h-24" />
          </div>
        )}

        {status === "success" && featured && (
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <article className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line bg-ink p-8 text-slate-50 md:p-10">
                <div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-brand-orange/15 px-3 py-1 font-semibold text-brand-orange">
                      {featured.tag}
                    </span>
                    <span className="text-slate-400">{featured.date}</span>
                  </div>
                  <h3 className="mt-5 font-disp text-2xl font-bold leading-snug md:text-3xl group-hover:text-brand-orange">
                    {featured.title}
                  </h3>
                  <p className="mt-4 text-slate-300">{featured.excerpt}</p>
                </div>
                <p className="mt-8 text-sm text-brand-orange">{featured.readTime} · Read →</p>
              </article>
            </Reveal>

            <div className="flex flex-col gap-4">
              {rest.slice(0, 2).map((b, i) => (
                <Reveal key={b.id} delay={i * 100}>
                  <article className="group flex flex-1 flex-col rounded-2xl border border-line bg-white p-6 transition-all hover:border-brand-orange/30 hover:shadow-md">
                    <span className="text-xs font-semibold text-brand-orange">{b.tag}</span>
                    <h3 className="mt-2 font-disp text-lg font-bold group-hover:text-brand-orange">{b.title}</h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm text-slate-600">{b.excerpt}</p>
                    <p className="mt-4 text-xs text-slate-400">{b.readTime}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
