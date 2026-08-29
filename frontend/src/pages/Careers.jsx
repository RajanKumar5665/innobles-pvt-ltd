import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import Seo from "../components/seo/Seo";
import CareersHero from "../components/careers/CareersHero";
import CareerFilters from "../components/careers/CareerFilters";
import JobCard from "../components/careers/JobCard";
import JobPagination from "../components/careers/JobPagination";
import EmptyJobsState from "../components/careers/EmptyJobsState";
import ApplicationModal from "../components/careers/ApplicationModal";
import { useCareers } from "../hooks/useCareers";

const JOBS_PER_PAGE = 3;

const departments = [
  "All Departments",
  "Engineering",
  "Design",
  "Platform",
  "Product",
  "Operations",
  "Marketing",
  "Human Resources",
  "Sales & Pre-Sales",
];

const locations = [
  "All Locations",
  "Remote - Global",
  "Remote - APAC",
  "Bengaluru, India",
  "Delhi, India",
  "Gurugram, India",
  "Kolkata, India",
  "Mumbai, India",
];

const types = ["All Types", "Full-time", "Part-time", "Internship", "Contract"];

const sortOptions = [
  { value: "newest", label: "newest" },
  { value: "oldest", label: "oldest" },
  { value: "az", label: "A-Z" },
  { value: "za", label: "Z-A" },
];

const DEFAULT_FILTERS = {
  department: "All Departments",
  location: "All Locations",
  type: "All Types",
};

const Careers = () => {
  const { list, status: apiStatus } = useCareers();
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState(DEFAULT_FILTERS);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [applyJob, setApplyJob] = useState(null);

  const handleChange = (key, value) => {
    if (key === "search") {
      setQuery(value);
      setPage(1);
      return;
    }
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    setFilters(draft);
    setPage(1);
  };

  const clearFilters = () => {
    setQuery("");
    setDraft(DEFAULT_FILTERS);
    setFilters(DEFAULT_FILTERS);
    setSortBy("newest");
    setPage(1);
  };

  const filtered = useMemo(() => {
    let jobs = [...list];
    const q = query.trim().toLowerCase();
    if (q) jobs = jobs.filter((job) => job.title.toLowerCase().includes(q));
    if (filters.department !== "All Departments") {
      jobs = jobs.filter((job) => job.department === filters.department);
    }
    if (filters.location !== "All Locations") {
      jobs = jobs.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.type !== "All Types") {
      const typeMap = { "Full-time": "full-time", "Part-time": "part-time", Internship: "internship", Contract: "contract" };
      jobs = jobs.filter((job) => job.type === (typeMap[filters.type] || filters.type.toLowerCase()));
    }

    switch (sortBy) {
      case "az":
        jobs.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        jobs.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        jobs.sort((a, b) => (b.postedDays || 0) - (a.postedDays || 0));
        break;
    }
    return jobs;
  }, [query, filters, sortBy, list]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / JOBS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageJobs = filtered.slice((safePage - 1) * JOBS_PER_PAGE, safePage * JOBS_PER_PAGE);

  return (
    <>
      <Seo
        title="Careers"
        description="Join Innobles — explore open roles across engineering, design, product and operations. Filter, sort and apply today."
        path="/careers"
      />

      <CareersHero />

      {/* Filter card */}
      <section className="career-container">
        <CareerFilters
          value={{ search: query, ...draft }}
          options={{ department: departments, location: locations, type: types }}
          onChange={handleChange}
          onSubmit={handleApply}
          onClear={clearFilters}
        />
      </section>

      {/* Open positions */}
      <section className="career-container py-12 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-career-black md:text-3xl">Open Positions</h2>
            <p className="mt-1.5 text-sm text-career-gray">
              {apiStatus === "loading" ? "Loading roles..." : `${filtered.length} roles available`}
            </p>
          </div>

          <label className="career-sort-pill">
            <SlidersHorizontal size={13} className="text-career-orange" aria-hidden="true" />
            <span>Sorted by</span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
              aria-label="Sort jobs"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {apiStatus === "loading" && (
          <div className="mt-8 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-career-orange border-t-transparent" />
          </div>
        )}

        {apiStatus === "error" && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Failed to load careers. Please refresh.
          </div>
        )}

        {apiStatus === "success" && (
          <>
            {filtered.length === 0 ? (
              <EmptyJobsState onClear={clearFilters} />
            ) : (
              <>
                <div className="mt-8 flex flex-col gap-5">
                  {pageJobs.map((job) => (
                    <JobCard key={job.id} job={job} onApply={setApplyJob} />
                  ))}
                </div>
                <JobPagination current={safePage} total={totalPages} onChange={setPage} />
              </>
            )}
          </>
        )}
      </section>

      <ApplicationModal job={applyJob} onClose={() => setApplyJob(null)} />
    </>
  );
};

export default Careers;
