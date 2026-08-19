import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Build a compact page-item list with ellipses for large page counts.
 */
const getPageItems = (current, total) => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const items = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) items.push("…");
  for (let page = start; page <= end; page++) items.push(page);
  if (end < total - 1) items.push("…");
  items.push(total);
  return items;
};

/**
 * Pagination — Previous / numbered pages / Next. Orange circle for the active page.
 */
const JobPagination = ({ current, total, onChange }) => {
  const items = getPageItems(current, total);
  const goPrev = () => onChange(Math.max(1, current - 1));
  const goNext = () => onChange(Math.min(total, current + 1));

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <button type="button" className="career-page-btn" onClick={goPrev} disabled={current === 1}>
        <ChevronLeft size={15} aria-hidden="true" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {items.map((item, index) =>
        item === "…" ? (
          <span key={`ellipsis-${index}`} className="px-0.5 text-career-light" aria-hidden="true">…</span>
        ) : (
          <button
            key={item}
            type="button"
            className={`career-page-btn ${item === current ? "is-active" : ""}`}
            onClick={() => onChange(item)}
            aria-current={item === current ? "page" : undefined}
          >
            {item}
          </button>
        )
      )}

      <button type="button" className="career-page-btn" onClick={goNext} disabled={current === total}>
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={15} aria-hidden="true" />
      </button>
    </nav>
  );
};

export default JobPagination;