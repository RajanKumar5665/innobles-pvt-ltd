import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Target } from "lucide-react";
import Seo from "../components/seo/Seo";
import SectionHeading from "../components/common/SectionHeading";
import Reveal from "../components/common/Reveal";
import StaggerGroup, { StaggerItem } from "../components/common/StaggerGroup";
import StatCounter from "../components/about/StatCounter";
import { useAbout } from "../hooks/useAbout";

const AboutSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-72 w-full bg-slate-200/60" />
    <div className="container-x py-20">
      <div className="mx-auto h-6 w-40 rounded bg-slate-200" />
      <div className="mx-auto mt-4 h-10 w-3/4 max-w-2xl rounded bg-slate-200" />
    </div>
  </div>
);

const AboutError = () => (
  <section className="container-x py-24 text-center">
    <h1 className="font-disp text-3xl font-bold text-slate-900">
      Oops — could not load this page
    </h1>
    <p className="mx-auto mt-3 max-w-md text-slate-600">
      We had trouble fetching the About Us content. Please try again in a
      moment.
    </p>
    <Link to="/" className="btn-primary mt-8 inline-flex">
      Back to Home
    </Link>
  </section>
);

const About = () => {
  const { data, status } = useAbout();

  if (status === "loading") return <AboutSkeleton />;
  if (status === "error") return <AboutError />;

  const stats = Array.isArray(data?.statistics)
    ? data.statistics.filter((s) => s.active !== false)
    : [];
  const locations = Array.isArray(data?.locations) ? data.locations : [];

  return (
    <>
      <Seo
        title="About Us"
        description="Meet Innobles — the team behind fast, reliable and scalable software for growing businesses."
        path="/about"
        image="/innobles_logo.png"
      />

      {/* Page hero — STATIC */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 hero-glow" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="container-x relative py-20 text-center md:py-28">
          <p className="eyebrow mb-4 justify-center">About Innobles</p>
          <h1 className="mx-auto max-w-3xl font-disp text-4xl font-bold leading-tight md:text-5xl">
            Trusted teams. <span className="text-gradient">Public</span>{" "}
            outcomes.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-white/60 md:text-lg">
            We're Innobles a software product and engineering company building
            the digital platforms that government departments, PSUs and
            institutions run on.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/services" className="btn-primary">
              Our Services
            </Link>
          </div>
        </div>

        {/* Stats — hidden entirely when none are configured. Numbers count up
            and the row fades in for a live feel. */}
        {stats.length > 0 && (
          <StaggerGroup className="container-x grid grid-cols-2 gap-8 border-t border-white/10 py-10 text-center md:grid-cols-4">
            {stats.map((s) => (
              <StaggerItem key={s._id}>
                <StatCounter
                  value={s.value}
                  className="font-disp text-3xl font-bold text-primary md:text-4xl"
                />
                <p className="mt-1 text-sm text-white/50">{s.label}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>

      {/* Story — STATIC. Leading image + "Our story" copy + highlighted mission panel */}
      <section className="container-x py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Story image with floating stat badge */}
          <Reveal variant="left" className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-line bg-slate-50 shadow-md">
              <picture>
                <source srcSet="/story-banner.webp" type="image/webp" />
                <img
                  src="/story-banner.jpg"
                  alt="Innobles — digital platforms for public systems across India"
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="h-80 w-full object-cover md:h-[420px]"
                />
              </picture>
            </div>

            {/* Floating stat badge (uses the first live statistic when present) */}
            <div className="absolute -bottom-5 right-5 flex items-center gap-2.5 rounded-xl border border-line bg-white px-4 py-2.5 shadow-md">
              <span className="font-disp text-xl font-bold text-brand-orange">
                {stats[0]?.value || "37+"}
              </span>
              <span className="text-xs font-semibold leading-tight text-slate-600">
                {(stats[0]?.label || "Software Products").split(" ")[0]}
              </span>
            </div>
          </Reveal>

          {/* Our story + mission copy */}
          <div className="min-w-0">
            <Reveal variant="right">
              <p className="eyebrow mb-4">Our story</p>
              <h2 className="font-disp text-3xl font-bold leading-tight md:text-4xl">
                We started with a simple belief: public systems deserve software
                built with care.
              </h2>
            </Reveal>

            <Reveal variant="right" delay={100}>
              <p className="mt-5 text-slate-600 leading-relaxed md:text-lg">
                The "In" in Innobles is India. We build for the processes this
                country actually runs on — tax collection, fund disbursement, land
                records, tenders, files moving between desks — and for the
                departments, PSUs and institutions that run them. Run and operated
                by industry veterans and dynamic young leaders, we deliver
                elegant, data-driven platforms that help organisations perform
                more effectively and reach better outcomes. Over 8 years we've
                grown a portfolio of 37 products spanning collections,
                disbursements, treasury, procurement and governance — deployed
                live across India, and integrated with the banking system: payment
                gateways, electronic bank guarantees and Aadhaar-based
                verification.
              </p>
            </Reveal>

            <Reveal variant="right" delay={180}>
              <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-ink p-6 md:p-8">
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-orange">
                  <Target size={15} aria-hidden="true" /> Our mission
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
                  To be a socially responsible organisation with focus on people —
                  one that inspires its team to deliver outstanding technology
                  intervention and helps our clients complete their digital
                  transformation.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

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
            <div
              className={`mt-12 grid gap-6 ${
                locations.length === 1
                  ? "mx-auto max-w-xl grid-cols-1"
                  : locations.length === 2
                    ? "mx-auto max-w-4xl grid-cols-1 sm:grid-cols-2"
                    : locations.length === 3
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {locations.map((loc, i) => (
                <Reveal key={loc._id} delay={i * 90} className="h-full">
                  <article className="card flex h-full flex-col overflow-hidden hover:border-brand-orange/40">
                    {loc.image?.url ? (
                      <img
                        src={loc.image.url}
                        alt={loc.city}
                        className="h-40 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-40 w-full items-center justify-center bg-light-surface">
                        <MapPin
                          className="h-10 w-10 text-slate-300"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2">
                        <MapPin
                          className="h-4 w-4 shrink-0 text-brand-orange"
                          aria-hidden="true"
                        />
                        <h3 className="font-disp text-lg font-bold">
                          {loc.city}
                        </h3>
                      </div>
                      {loc.country && (
                        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-cyan">
                          {loc.country}
                        </p>
                      )}
                      {loc.description && (
                        <p className="mt-3 text-sm leading-relaxed text-white/60">
                          {loc.description}
                        </p>
                      )}
                      {loc.address && (
                        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                          {loc.address}
                        </p>
                      )}
                      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-xs text-muted">
                        {loc.phone && (
                          <a
                            href={`tel:${loc.phone.replace(/\s/g, "")}`}
                            className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-orange"
                          >
                            <Phone
                              className="h-3.5 w-3.5 text-brand-cyan"
                              aria-hidden="true"
                            />
                            {loc.phone}
                          </a>
                        )}
                        {loc.email && (
                          <a
                            href={`mailto:${loc.email}`}
                            className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-orange"
                          >
                            <Mail
                              className="h-3.5 w-3.5 text-brand-orange"
                              aria-hidden="true"
                            />
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
                          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />{" "}
                          View on map
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
