import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import Seo from "../components/seo/Seo";
import SectionHeading from "../components/common/SectionHeading";
import Reveal from "../components/common/Reveal";
import LocationIllustration from "../components/about/LocationIllustration";
import { stats, team, locations } from "../data/dummyData";

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

      {/* Team */}
      <section className="container-x py-20">
        <SectionHeading eyebrow="Team" title="The people behind the work" align="center" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 90}>
              <div className="card p-6 text-center hover:border-primary/60">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary font-disp text-xl font-bold text-slate-50">
                  {m.avatar}
                </div>
                <h3 className="font-disp font-bold">{m.name}</h3>
                <p className="mt-1 text-sm text-white/50">{m.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Locations */}
      <section className="border-t border-white/10 bg-white/[0.015] py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Locations"
            title="Where we are"
            align="center"
            subtitle="We're growing our presence across key locations, connecting with clients and teams across India and the UAE."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((loc, i) => (
              <Reveal key={loc.id} delay={i * 90} className="h-full">
                <article className="card flex h-full flex-col overflow-hidden hover:border-brand-orange/40">
                  <LocationIllustration city={loc.illustration} />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0 text-brand-orange" aria-hidden="true" />
                      <h3 className="font-disp text-lg font-bold">{loc.city}</h3>
                    </div>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-cyan">
                      {loc.country}
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{loc.address}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-xs text-muted">
                      <a
                        href={`tel:${loc.phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-orange"
                      >
                        <Phone className="h-3.5 w-3.5 text-brand-cyan" aria-hidden="true" />
                        {loc.phone}
                      </a>
                      <a
                        href={`mailto:${loc.email}`}
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-orange"
                      >
                        <Mail className="h-3.5 w-3.5 text-brand-orange" aria-hidden="true" />
                        {loc.email}
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

