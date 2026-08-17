import { Link } from "react-router-dom";
import Seo from "../components/seo/Seo";
import SectionHeading from "../components/common/SectionHeading";
import Reveal from "../components/common/Reveal";
import CTA from "../components/home/CTA";
import { stats, team, values } from "../data/dummyData";

const About = () => {
  return (
    <>
      <Seo title="About Us" description="Meet Innobles — the team behind fast, reliable and scalable software for growing businesses." path="/about" />

      {/* Page hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 hero-glow" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="container-x relative py-20 text-center md:py-28">
          <p className="eyebrow mb-4 justify-center">About Innobles</p>
          <h1 className="mx-auto max-w-3xl font-disp text-4xl font-bold leading-tight md:text-5xl">
            Small team, <span className="text-gradient">big outcomes.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-white/60 md:text-lg">
            We're Innobles — a product-minded software studio helping startups and enterprises ship faster with
            web, mobile, cloud and AI.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/services" className="btn-primary">Our Services</Link>
            <Link to="/contact" className="btn-ghost">Work With Us</Link>
          </div>
        </div>

        {/* Stats */}
        <div className="container-x grid grid-cols-2 gap-8 border-t border-white/10 py-10 text-center md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-disp text-3xl font-bold text-primary md:text-4xl">{s.number}</p>
              <p className="mt-1 text-sm text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="container-x grid items-center gap-10 py-20 lg:grid-cols-2">
        <Reveal variant="left">
          <p className="eyebrow mb-4">Our story</p>
          <h2 className="font-disp text-3xl font-bold leading-tight md:text-4xl">
            We started with a simple belief: software should <span className="text-primary">work for people</span>, not the other way around.
          </h2>
        </Reveal>
        <Reveal variant="right">
          <div className="space-y-4 text-white/60">
            <p>
              Innobles was founded to fix a common frustration — projects that drag on, budgets that balloon, and
              software that nobody enjoys using. We built a studio around the opposite: small senior teams, weekly
              demos, and honest communication.
            </p>
            <p>
              Today we design, build and scale products for clients across fintech, healthcare, retail, logistics and
              education — from first wireframe to millions of users.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section className="border-t border-white/10 bg-white/[0.015] py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Values" title="What we stand for" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <div className="card h-full p-6 text-center hover:border-primary/60">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-3xl">
                    {v.icon}
                  </div>
                  <h3 className="font-disp font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container-x py-20">
        <SectionHeading eyebrow="Team" title="The people behind the work" align="center" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 90}>
              <div className="card p-6 text-center hover:border-primary/60">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-disp text-xl font-bold">
                  {m.avatar}
                </div>
                <h3 className="font-disp font-bold">{m.name}</h3>
                <p className="mt-1 text-sm text-white/50">{m.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
};

export default About;

