import { ArrowRight, ChevronDown, RotateCcw, SlidersHorizontal } from "lucide-react";

// Filter card — Search / Department / Location / Job Type + "Filter Jobs" CTA.
// A ghost "Reset Filters" pill appears only when something is actually set.
const CAREER_DEFAULTS = {
  department: "All Departments",
  location: "All Locations",
  type: "All Types",
};

const CareerFilters = ({ value, options, onChange, onSubmit, onClear }) => {
  const renderSelect = (key, label) => (
    <div>
      <label className="career-label" htmlFor={`career-${key}`}>{label}</label>
      <div className="relative">
        <select
          id={`career-${key}`}
          className="career-field career-select"
          value={value[key]}
          onChange={(e) => onChange(key, e.target.value)}
        >
          {options[key].map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown
          size={15}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-career-light"
          aria-hidden="true"
        />
      </div>
    </div>
  );

  const hasActive =
    (value.search || "").trim() !== "" ||
    value.department !== CAREER_DEFAULTS.department ||
    value.location !== CAREER_DEFAULTS.location ||
    value.type !== CAREER_DEFAULTS.type;

  return (
    <form onSubmit={onSubmit}>
      <div className="career-filter-card">
        <div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="career-label" htmlFor="career-search">Search</label>
            <div className="relative">
              <input
                id="career-search"
                type="text"
                value={value.search}
                onChange={(e) => onChange("search", e.target.value)}
                placeholder="Search job titles"
                className="career-field pl-9"
              />
            </div>
          </div>

          {renderSelect("department", "Department")}
          {renderSelect("location", "Location")}
          {renderSelect("type", "Job Type")}
        </div>

        {/* Actions row — gradient pill CTA + contextual reset. */}
        <div className="mt-6 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
          {hasActive && (
            <button type="button" onClick={onClear} className="career-reset-btn">
              <RotateCcw size={14} aria-hidden="true" />
              <span>Reset Filters</span>
            </button>
          )}
          <button type="submit" className="career-btn-orange w-full sm:w-auto sm:min-w-[200px]">
            <SlidersHorizontal size={16} aria-hidden="true" />
            <span>Filter Jobs</span>
            <ArrowRight size={15} className="career-arrow" aria-hidden="true" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default CareerFilters;
