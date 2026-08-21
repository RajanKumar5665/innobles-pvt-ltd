import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeader from "../common/SectionHeader";
import StaggerGroup, { StaggerItem } from "../common/StaggerGroup";
import Reveal from "../common/Reveal";

const CARD_LIMIT = 3;

/**
 * Shared skeleton card — mirrors the `.content-card` surface exactly, so the
 * loading state matches the real Service / Product / Blog cards (same radius,
 * border, shadow, 16:9 image band and content rhythm).
 */
const CardSkeleton = () => (
  <div className="content-card h-full">
    <div className="aspect-[16/9] w-full shrink-0 animate-pulse bg-slate-200" />
    <div className="flex flex-1 flex-col gap-2.5 p-6">
      <div className="h-3.5 w-1/3 rounded bg-slate-200" />
      <div className="h-4 w-full rounded bg-slate-200" />
      <div className="h-3.5 w-4/5 rounded bg-slate-200" />
      <div className="h-3.5 w-full rounded bg-slate-200" />
      <div className="mt-auto pt-5">
        <div className="h-6 w-24 rounded bg-slate-200" />
      </div>
    </div>
  </div>
);

/**
 * One reusable showcase section for the homepage Services / Products / Blog
 * previews.
 *
 * All three sections render through this exact shell so they share the same:
 *   - section padding & container (`container-x`)
 *   - CENTERED header (eyebrow → heading → description via `SectionHeader`)
 *   - staggered 3-column card grid (`StaggerGroup` / `StaggerItem`)
 *   - loading skeleton, error and empty states
 *   - centered "View All" CTA (`btn-ghost` + arrow, revealed on scroll)
 *
 * Data fetching stays in each section component — this only receives the
 * already-fetched list/status and a `renderCard` function for the grid items.
 */
const ContentShowcase = ({
  sectionClassName = "bg-white",
  eyebrow,
  title,
  subtitle,
  list,
  status,
  errorMessage,
  emptyMessage,
  renderCard,
  cta, // { to, label } — optional centered "View All" button
}) => {
  const visible = (list || []).slice(0, CARD_LIMIT);

  return (
    <section className={`${sectionClassName} py-16 md:py-20`}>
      <div className="container-x">
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} align="center" />

        {/* Loading: skeleton cards */}
        {status === "loading" && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: CARD_LIMIT }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
            {errorMessage}
          </div>
        )}

        {/* Empty */}
        {status === "success" && visible.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-200 bg-white py-12 text-center">
            <p className="text-slate-500">{emptyMessage}</p>
          </div>
        )}

        {/* Success: cards + centered CTA */}
        {status === "success" && visible.length > 0 && (
          <>
            <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((item) => (
                <StaggerItem key={item.id} className="h-full">
                  {renderCard(item)}
                </StaggerItem>
              ))}
            </StaggerGroup>

            {cta ? (
              <Reveal delay={CARD_LIMIT * 90 + 40}>
                <div className="mt-12 flex justify-center">
                  <Link
                    to={cta.to}
                    className="btn-ghost inline-flex items-center gap-2 !py-2.5 text-sm"
                  >
                    {cta.label}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
};

export default ContentShowcase;