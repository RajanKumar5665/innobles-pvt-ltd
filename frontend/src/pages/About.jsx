import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import Seo from "../components/seo/Seo";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import Reveal from "../components/common/Reveal";
import StaggerGroup, { StaggerItem } from "../components/common/StaggerGroup";
import ImageReveal from "../components/common/ImageReveal";
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
          <div
            key={i}
            className="h-56 rounded-2xl border border-slate-100 bg-slate-100"
          />
        ))}
      </div>
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

const AnimatedStat = ({ value }) => {
  const raw = String(value ?? "");
  const match = raw.match(/(\d+(?:\.\d+)?)/);
  const target = match ? Number(match[1]) : null;
  const prefix = match ? raw.slice(0, match.index) : "";
  const suffix = match ? raw.slice(match.index + match[0].length) : "";
  const [current, setCurrent] = useState(0);

  // Respect the user's reduced-motion preference (MotionConfig + OS setting).
  const reducesMotion = useReducedMotion();

  // Only count up once the stat scrolls into view.
  // NOTE: useInView(ref, options) — first arg is the ref, returns a boolean.
  const statRef = useRef(null);
  const inView = useInView(statRef, { amount: 0.3, once: true });

  useEffect(() => {
    // Reduced motion / non-numeric / not-yet-visible: skip the count-up.
    if (!inView || target === null || reducesMotion) return undefined;

    let frame;
    const started = performance.now();
    const duration = 1200;
    const tick = (now) => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCurrent(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, reducesMotion]);

  if (target === null) return raw;
  const shown = reducesMotion ? target : current;
  const formatted = Number.isInteger(target)
    ? Math.round(shown)
    : shown.toFixed(1);
  return (
    <span ref={statRef} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

const TeamCarousel = ({ team }) => {
  const hasCarousel = team.length > 3;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reducesMotion = useReducedMotion();

  useEffect(() => {
    if (!hasCarousel) return undefined;
    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % team.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [team.length, hasCarousel]);

  const showPrevious = () => {
    setDirection(-1);
    setActiveIndex((current) => (current - 1 + team.length) % team.length);
  };

  const showNext = () => {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % team.length);
  };

  const visibleMembers = hasCarousel
    ? Array.from({ length: 3 }, (_, offset) => team[(activeIndex + offset) % team.length])
    : team;

  return (
    <div className="mt-12">
      <div className={`mx-auto flex items-center gap-3 sm:gap-5 ${hasCarousel ? "max-w-7xl" : "max-w-5xl"}`}>
        {hasCarousel && (
          <button type="button" onClick={showPrevious} aria-label="Previous team group" className="team-carousel-control">
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
        <div className="min-w-0 flex-1" aria-live="polite">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              initial={reducesMotion ? { opacity: 0 } : { opacity: 0, x: direction * 44 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reducesMotion ? { opacity: 0 } : { opacity: 0, x: direction * -44 }}
              transition={{ duration: reducesMotion ? 0.15 : 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-6 md:grid-cols-3"
            >
              {visibleMembers.map((member, index) => (
                <Reveal key={member._id} delay={index * 60} className="h-full">
                  <TeamCard member={member} />
                </Reveal>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        {hasCarousel && (
          <button type="button" onClick={showNext} aria-label="Next team group" className="team-carousel-control">
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};

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
        description="Meet Innobles, the team behind fast, reliable and scalable software for growing businesses."
        path="/about"
        image="/innobles_logo.png"
      />

      <PageHero
        eyebrow="About Innobles"
        title="Trusted teams."
        highlight="Public"
        afterHighlight="outcomes."
        description="We're Innobles, a software product and engineering company building the digital platforms that government departments, PSUs and institutions run on."
      >
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/services" className="btn-accent">
            Our Services
          </Link>
        </div>
        {stats.length > 0 && (
          <StaggerGroup className="relative mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 border-t border-line pt-10 text-center md:grid-cols-4 md:gap-8">
            {stats.map((s) => (
              <StaggerItem key={s._id} className="stat-card">
                <p className="font-disp text-3xl font-bold text-primary md:text-4xl">
                  <AnimatedStat value={s.value} />
                </p>
                <p className="mt-1 text-sm text-slate-500">{s.label}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </PageHero>

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
          <div>
            <div className="mb-7 overflow-hidden rounded-3xl border border-line">
              <img
                src="our_story_banner_img.png"
                alt="Innobles team collaborating around a table"
                loading="lazy"
                className="h-64 w-full object-cover md:h-72"
              />
            </div>
            <div className="space-y-4 text-slate-600">
            <p>
              The "In" in Innobles is India. We build for the processes this
              country actually runs on: tax collection, fund disbursement, land
              records, tenders, files moving between desks, and for the
              departments, PSUs and institutions that run them. Run and operated
              by industry veterans and dynamic young leaders, we deliver
              elegant, data-driven platforms that help organisations perform
              more effectively and reach better outcomes. Over 8 years we've
              grown a portfolio of 37 products spanning collections,
              disbursements, treasury, procurement and governance, deployed
              live across India, and integrated with the banking system: payment
              gateways, electronic bank guarantees and Aadhaar-based
              verification.
            </p>
            <blockquote className="border-l-4 border-brand-orange bg-orange-500/10 p-4 sm:rounded-r-lg rounded-l-sm text-[15px] leading-relaxed">
              <span className="text-xs font-bold uppercase tracking-widest text-[#172B3A]">Our mission</span>
              <p className="mt-2 text-slate-700">
                Our mission is to be a socially responsible organisation with
                focus on people, one that inspires its team to deliver
                outstanding technology intervention and helps our clients complete
                their digital transformation.
              </p>
            </blockquote>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="container-x py-20">
          <SectionHeading eyebrow="Team" title="The people behind the work" align="center" eyebrowClassName="about-eyebrow" />
          <TeamCarousel team={team} />
        </section>
      )}
      {/* Locations */}
      {locations.length > 0 && (
        <section className="border-t border-line bg-light-surface py-20">
          <div className="container-x">
            <SectionHeading
              eyebrow="Our Locations"
              title="Where we are"
              align="center"
              eyebrowClassName="about-eyebrow"
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
                      <ImageReveal className="h-40">
                        <img
                          src={loc.image.url}
                          alt={loc.city}
                          className="h-40 w-full object-cover"
                        />
                      </ImageReveal>
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
                          className="h-4 w-4 shrink-0 text-[#172B3A]"
                          aria-hidden="true"
                        />
                        <h3 className="font-disp text-lg font-bold">
                          {loc.city}
                        </h3>
                      </div>
                      {loc.country && (
                        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F0703F]">
                          {loc.country}
                        </p>
                      )}
                      {loc.description && (
                        <p className="mt-3 text-sm leading-relaxed text-slate-500">
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
                            className="inline-flex items-center gap-1.5 text-[#334155] transition-colors hover:text-[#F0703F]"
                          >
                            <Phone
                              className="h-3.5 w-3.5 text-[#172B3A]"
                              aria-hidden="true"
                            />
                            {loc.phone}
                          </a>
                        )}
                        {loc.email && (
                          <a
                            href={`mailto:${loc.email}`}
                            className="inline-flex items-center gap-1.5 text-[#334155] transition-colors hover:text-[#F0703F]"
                          >
                            <Mail
                              className="h-3.5 w-3.5 text-[#172B3A]"
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
                          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#172B3A] transition-colors hover:text-[#F0703F]"
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
