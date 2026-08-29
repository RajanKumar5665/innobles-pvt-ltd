import { Link } from "react-router-dom";
import { ShieldCheck, Landmark, Rocket, LifeBuoy } from "lucide-react";
import Reveal from "../common/Reveal";
import FeatureCheck from "../common/FeatureCheck";

// One dark section with the "Why Innobles" proof points + the
// "Ready to start?" CTA and a "Why Innobles?" checklist.
const proofPoints = [
  {
    icon: Landmark,
    title: "Bank grade integrations",
    description:
      "Payment gateways, NeSL electronic bank guarantees, Aadhaar-based verification and secure settlement files, live in production.",
  },
  {
    icon: LifeBuoy,
    title: "Operated end-to-end",
    description:
      "We train departments, onboard users and support the platform after go-live; delivery does not end at handover.",
  },
  {
    icon: ShieldCheck,
    title: "Maker checker by design",
    description:
      "Every sensitive action passes through initiation, verification and approval, with an attributable audit trail.",
  },
  {
    icon: Rocket,
    title: "Deployed, not demoed",
    description:
      "25+ live deployments with government departments and PSUs across 7+ Indian states.",
  },
];

const whyChecklist = [
  "37 products across collections, disbursements and governance",
  "Live with departments and PSUs across India",
  "Banking and payment integrations proven in production",
  "One team from requirement to rollout and support",
];

const CTA = () => (
  <section className="relative overflow-hidden bg-ink py-20 md:py-24">
    {/* Subtle decorative glows on the dark band */}
    <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-orange/25 blur-3xl" />
    <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand-cyan/10 blur-3xl" />

    <div className="container-x">
      {/* ---- Credibility block: WHY INNOBLES ---- */}
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="pill-eyebrow mb-4 justify-center">
          <span className="pill-dot" />
          Why Innobles
        </p>
        <h2 className="font-disp text-3xl font-bold leading-tight text-slate-50 md:text-4xl">
          Built where accountability matters
        </h2>
        <p className="mt-4 text-slate-300 md:text-lg">
          Our platforms move public money and public records, so they are built to
          be audited, not just used.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {proofPoints.map((point, i) => {
          const Icon = point.icon;
          return (
            <Reveal key={point.title} delay={i * 90}>
              <div className="h-full rounded-2xl border border-slate-700/60 bg-slate-900/40 p-6 transition-colors hover:border-brand-orange/40">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange/15 text-brand-orange">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-disp text-lg font-bold leading-snug text-slate-50">
                  {point.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  {point.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* ---- CTA block: READY TO START? ---- */}
      <div className="mt-16 border-t border-slate-700/60 pt-12 md:mt-20 md:pt-14">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left: heading + sub + CTAs */}
          <Reveal className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">Ready to start?</p>
            <h2 className="mt-4 font-disp text-3xl font-bold leading-tight text-slate-50 md:text-4xl">
              Digitise the process your team runs on paper today.
            </h2>
            <p className="mt-4 text-slate-300 md:text-lg">
              Tell us what the process looks like now — we&apos;ll reply within one business day with a clear next step.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-accent">
                Get in Touch
              </Link>
              <Link
                to="/about"
                className="rounded-xl border border-slate-500/50 px-6 py-3 text-sm font-semibold text-slate-100 transition-colors hover:bg-slate-800"
              >
                About Us
              </Link>
            </div>
          </Reveal>

          {/* Right: "Why Innobles?" checklist */}
          <Reveal delay={120} className="rounded-2xl border border-slate-700/60 bg-slate-900/40 p-8 md:p-10">
            <p className="text-sm font-semibold text-brand-orange">Why Innobles?</p>
            <ul className="mt-6 space-y-4">
              {whyChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-200">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-orange text-slate-50">
                    <FeatureCheck className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default CTA;


