import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";

/**
 * Filter card — SEARCH / DEPARTMENT / LOCATION / JOB TYPE + Filter Jobs button.
 * Form submit applies the drafted filters (button click or Enter key).
 */
const CareerFilters = ({ value, options, onChange, onSubmit }) => {
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

  return (
    <form onSubmit={onSubmit}>
      <div className="career-filter-card">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="career-label" htmlFor="career-search">Search</label>
            <div className="relative">
              <Search
                size={15}
                className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-career-light flex-shrink-0 w-4"
                aria-hidden="true"
              />
              <input
                id="career-search"
                type="text"
                value={value.search}
                onChange={(e) => onChange("search", e.target.value)}
                placeholder="Search job titles"
                className="career-field pl-10"
              />
            </div>
          </div>

          {renderSelect("department", "Department")}
          {renderSelect("location", "Location")}
          {renderSelect("type", "Job Type")}
        </div>

        <button type="submit" className="career-btn-orange w-full flex items-center justify-center">
          Filter Jobs
          <SlidersHorizontal size={15} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
};

export default CareerFilters;