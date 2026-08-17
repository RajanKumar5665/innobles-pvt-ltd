import Seo from "../components/seo/Seo";
import SectionHeading from "../components/common/SectionHeading";
import Reveal from "../components/common/Reveal";
import Loader from "../components/common/Loader";
import Icon from "../components/common/Icon";
import CTA from "../components/home/CTA";
import ContactSection from "../components/home/ContactSection";
import HowItWorks from "../components/home/HowItWorks";
import { useServices } from "../hooks/useServices";

const Services = () => {
  const { list, status } = useServices();

  return (
    <>
      <Seo
        title="Services"
        description="Web development, mobile apps, cloud & DevOps, AI/automation, UI/UX design and IT consulting from Innobles."
        path="/services"
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 hero-glow" />
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="container-x relative py-20 text-center md:py-24">
          <p className="eyebrow mb-4 justify-center">Our Services</p>
          <h1 className="mx-auto max-w-3xl font-disp text-4xl font-bold leading-tight md:text-5xl">
            Everything you need to <span className="text-gradient">ship & scale</span> software
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-white/60 md:text-lg">
            Six core capabilities, one accountable team. Pick one service or let us handle the full lifecycle.
          </p>
        </div>
      </section>

      {/* Detailed services */}
      <section className="container-x py-20">
        <SectionHeading eyebrow="Capabilities" title="What we deliver" />

        {status === "loading" && <div className="mt-12"><Loader className="!h-32" size="lg" /></div>}

        {status === "success" && (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {list.map((s, i) => (
              <Reveal key={s.id} delay={(i % 2) * 90}>
                <article className="card group h-full p-7">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-accent/15 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110">
                      <Icon icon={s.icon} className="h-7 w-7 text-accent" strokeWidth={1.8} />
                    </div>
                    <h3 className="font-disp text-xl font-bold">{s.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-white/55">{s.desc}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] text-accent">
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="mt-12 rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-300">
            Something went wrong while loading services. Please refresh.
          </div>
        )}
      </section>

      <HowItWorks />
      <CTA />
      <ContactSection />
    </>
  );
};

export default Services;

