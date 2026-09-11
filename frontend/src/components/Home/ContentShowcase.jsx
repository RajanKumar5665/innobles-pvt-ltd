import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeader from "../common/SectionHeader";
import StaggerGroup, { StaggerItem } from "../common/StaggerGroup";
import Reveal from "../common/Reveal";

const CARD_LIMIT = 3;

// Loading placeholder that looks like the real card.
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

// One reusable section for the home page Services / Products / Blog previews.
// Shows a heading, the cards, and a "View All" button.
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
  // Show only the first 3 items on the home page.
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