import { RotateCcw, SearchX } from "lucide-react";

// Shown when no job matches the active search / filters.
const EmptyJobsState = ({ onClear }) => (
  <div className="mt-10 rounded-[18px] border border-dashed border-career-border bg-white px-6 py-16 text-center">
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-career-orange-light">
      <SearchX size={24} className="text-career-orange" aria-hidden="true" />
    </div>
    <h3 className="mt-5 text-xl font-bold text-career-black">No positions found</h3>
    <p className="mx-auto mt-2 max-w-xs text-sm text-career-gray">
      Try adjusting your search or filters to find more opportunities.
    </p>
    <button type="button" onClick={onClear} className="career-apply-btn mt-6">
      <RotateCcw size={14} aria-hidden="true" />
      Clear Filters
    </button>
  </div>
);

export default EmptyJobsState;