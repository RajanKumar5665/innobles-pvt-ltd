// Builds a windowed list of page numbers (e.g. ‹ 1 2 3 4 … 8 ›).
const getPageItems = (current, total) => {
  if (total <= 4) return Array.from({ length: total }, (_, i) => i + 1);
  const windowSize = 4;
  const start = Math.max(1, Math.min(current, total - windowSize + 1));
  const pages = Array.from({ length: windowSize }, (_, i) => start + i);
  const items = [];
  if (pages[0] > 1) {
    items.push(1);
    if (pages[0] > 2) items.push("…");
  }
  items.push(...pages);
  if (pages[pages.length - 1] < total) {
    if (pages[pages.length - 1] < total - 1) items.push("…");
    items.push(total);
  }
  return items;
};

import { ChevronLeft, ChevronRight } from "lucide-react";

// Pagination with ‹/› arrows and numbered pill buttons. Active page is orange.
const BlogPagination = ({ current = 1, total = 1, onChange }) => {
  const items = getPageItems(current, total);
  const goPrev = () => onChange?.(Math.max(1, current - 1));
  const goNext = () => onChange?.(Math.min(total, current + 1));

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Blog pagination">
      <button
        type="button"
        className="blog-pagination-btn"
        onClick={goPrev}
        disabled={current <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={14} aria-hidden="true" />
      </button>

      {items.map((item, index) =>
        item === "…" ? (
          <span key={`ellipsis-${index}`} className="px-1 text-[#94A3B8]" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={`blog-pagination-btn ${item === current ? "is-active" : ""}`}
            onClick={() => onChange?.(item)}
            aria-current={item === current ? "page" : undefined}
            aria-label={`Page ${item}`}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        className="blog-pagination-btn"
        onClick={goNext}
        disabled={current >= total}
        aria-label="Next page"
      >
        <ChevronRight size={14} aria-hidden="true" />
      </button>
    </nav>
  );
};

export default BlogPagination;