import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import Seo from "../components/seo/Seo";
import SectionHeading from "../components/common/SectionHeading";
import Reveal from "../components/common/Reveal";
import TeamCard from "../components/about/TeamCard";
import { useAbout } from "../hooks/useAbout";

const AboutSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-72 w-full bg-slate-200/60" />
    <div className="container-x py-20">
      <div className="mx-auto h-6 w-40 rounded bg-slate-200" />
      <div className="mx-auto mt-4 h-10 w-3/4 max-w-2xl rounded bg-slate-200" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-56 rounded-2xl border border-slate-100 bg-slate-100" />
        ))}
      </div>
    </div>
  </div>
);

const AboutError = () => (
  <section className="container-x py-24 text-center">
    <h1 className="font-disp text-3xl font-bold text-slate-900">Oops — could not load this page</h1>
    <p className="mx-auto mt-3 max-w-md text-slate-600">
      We had trouble fetching the About Us content. Please try again in a moment.
    </p>
    <Link to="/" className="btn-primary mt-8 inline-flex">Back to Home</Link>
  </section>
);

const About = () => {
  const { data, status } = useAbout();

  if (status === "loading") return <AboutSkeleton />;
  if (status === "error") return <AboutError />;

  const stats = Array.isArray(data?.statistics)
    ? data.statistics.filter((s) => s.active !== false)
    : [];
  const team = Array.isArray(data?.teamMembers) ? data.teamMembers : [];
  const locations = Array.isArray(data?.locations) ? data.locations : [];

  return (
    <>
      <Seo
        title="About Us"
        description="Meet Innobles — the team behind fast, reliable and scalable software for growing businesses."
        path="/about"
        image="/logo.png"
      />

      {/* Page hero — STATIC */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 hero-glow" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="container-x relative py-20 text-center md:py-28">
          <p className="eyebrow mb-4 justify-center">About Innobles</p>
          <h1 className="mx-auto max-w-3xl font-disp text-4xl font-bold leading-tight md:text-5xl">
            Trusted teams <span className="text-gradient">public</span> outcomes.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-white/60 md:text-lg">
           We're Innobles — a software product and engineering company building the digital
platforms that government departments, PSUs and institutions run on.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/services" className="btn-primary">Our Services</Link>
          </div>
        </div>

          {/* Stats — hidden entirely when none are configured */}
          {stats.length > 0 && (
            <div className="container-x grid grid-cols-2 gap-8 border-t border-white/10 py-10 text-center md:grid-cols-4">
              {stats.map((s) => (
                <div key={s._id}>
                  <p className="font-disp text-3xl font-bold text-primary md:text-4xl">{s.value}</p>
                  <p className="mt-1 text-sm text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </section>

      {/* Story — STATIC */}
      <section className="container-x grid items-center gap-10 py-20 lg:grid-cols-2">
        <Reveal variant="left">
          <p className="eyebrow mb-4">Our story</p>
          <h2 className="font-disp text-3xl font-bold leading-tight md:text-4xl">
            We started with a simple belief: public systems deserve software
built with care. <span className="text-primary"></span>
          </h2>
        </Reveal>
        <Reveal variant="right">
          <div className="space-y-4 text-white/60">
            <p>
              The "In" in Innobles is India. We build for the processes this country actually runs on —
tax collection, fund disbursement, land records, tenders, files moving between desks — and
for the departments, PSUs and institutions that run them.
Run and operated by industry veterans and dynamic young leaders, we deliver elegant,
data-driven platforms that help organisations perform more effectively and reach better
outcomes. Over 8 years we've grown a portfolio of 37 products spanning collections,
disbursements, treasury, procurement and governance — deployed live across India, and
integrated with the banking system: payment gateways, electronic bank guarantees and
Aadhaar-based verification.

            </p>
            <p>
              Our mission is to be a socially responsible organisation with focus on people — one that
inspires its team to deliver outstanding technology intervention and helps our clients
complete their digital transformation.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="container-x py-20">
          <SectionHeading eyebrow="Team" title="The people behind the work" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m._id} delay={i * 90} className="h-full">
                <TeamCard member={m} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
{/* Locations */}
      {locations.length > 0 && (
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
                <Reveal key={loc._id} delay={i * 90} className="h-full">
                  <article className="card flex h-full flex-col overflow-hidden hover:border-brand-orange/40">
                    {loc.image?.url ? (
                      <img src={loc.image.url} alt={loc.city} className="h-40 w-full object-cover" />
                    ) : (
                      <div className="flex h-40 w-full items-center justify-center bg-light-surface">
                        <MapPin className="h-10 w-10 text-slate-300" aria-hidden="true" />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0 text-brand-orange" aria-hidden="true" />
                        <h3 className="font-disp text-lg font-bold">{loc.city}</h3>
                      </div>
                      {loc.country && (
                        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-cyan">
                          {loc.country}
                        </p>
                      )}
                      {loc.description && (
                        <p className="mt-3 text-sm leading-relaxed text-white/60">{loc.description}</p>
                      )}
                      {loc.address && <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{loc.address}</p>}
                      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-xs text-muted">
                        {loc.phone && (
                          <a
                            href={`tel:${loc.phone.replace(/\s/g, "")}`}
                            className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-orange"
                          >
                            <Phone className="h-3.5 w-3.5 text-brand-cyan" aria-hidden="true" />
                            {loc.phone}
                          </a>
                        )}
                        {loc.email && (
                          <a
                            href={`mailto:${loc.email}`}
                            className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-orange"
                          >
                            <Mail className="h-3.5 w-3.5 text-brand-orange" aria-hidden="true" />
                            {loc.email}
                          </a>
                        )}
                      </div>
                      {loc.mapLink && (
                        <a
                          href={loc.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-cyan transition-colors hover:text-brand-orange"
                        >
                          <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> View on map
                        </a>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default About;