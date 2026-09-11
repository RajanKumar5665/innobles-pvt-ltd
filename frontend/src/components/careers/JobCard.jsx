import { useState } from "react";
import { ArrowRight, Briefcase, CalendarDays, ChevronDown, ChevronUp, Clock, ListChecks, MapPin, Target } from "lucide-react";

// Job card with department badge, meta row, description and an Apply button.
// "View Details" toggles the full responsibilities/requirements.
const formatDate = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};

const DetailList = ({ title, items, Icon }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="career-detail-block">
      <h4 className="career-detail-title">
        <Icon size={14} aria-hidden="true" />
        {title}
      </h4>
      <ul className="career-detail-list">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const JobCard = ({ job, onApply }) => {
  const [showDetails, setShowDetails] = useState(false);

  const hasDetails =
    job.experience ||
    job.closingDate ||
    (job.responsibilities && job.responsibilities.length > 0) ||
    (job.requirements && job.requirements.length > 0);

  return (
    <article className="career-job-card p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="text-xl font-bold leading-snug tracking-tight text-career-black md:text-[19px]">
              {job.title}
            </h3>
            <span className="inline-flex shrink-0 items-center rounded-full border border-career-border bg-career-soft px-2.5 py-1 text-[11px] font-semibold text-career-gray">
              {job.department}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-career-gray">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-career-orange" aria-hidden="true" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} className="text-career-orange" aria-hidden="true" />
              {job.type}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} className="text-career-orange" aria-hidden="true" />
              {job.postedLabel}
            </span>
          </div>
        </div>

        <span className="career-status shrink-0">{job.status}</span>
      </div>

      <p className="mt-4 max-w-[850px] text-sm leading-relaxed text-career-gray">{job.description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setShowDetails((v) => !v)}
          className="career-view-btn"
          aria-expanded={showDetails}
        >
          {showDetails ? <ChevronUp size={15} aria-hidden="true" /> : <ChevronDown size={15} aria-hidden="true" />}
          {showDetails ? "Hide Details" : "View Details"}
        </button>

        <button type="button" onClick={() => onApply(job)} className="career-apply-btn">
          Apply Now
          <ArrowRight size={15} className="career-arrow" aria-hidden="true" />
        </button>
      </div>

      {showDetails && (
        <div className="career-job-details">
          {(job.experience || job.closingDate) && (
            <div className="career-detail-block">
              <h4 className="career-detail-title">
                <Briefcase size={14} aria-hidden="true" />
                Key Details
              </h4>
              <div className="mt-3 flex flex-wrap gap-3">
                {job.experience && (
                  <span className="career-experience-chip">
                    <Briefcase size={13} aria-hidden="true" />
                    {job.experience} experience
                  </span>
                )}
                {job.closingDate && (
                  <span className="career-experience-chip">
                    <CalendarDays size={13} aria-hidden="true" />
                    Closes {formatDate(job.closingDate)}
                  </span>
                )}
              </div>
            </div>
          )}

          <DetailList title="Responsibilities" items={job.responsibilities} Icon={ListChecks} />
          <DetailList title="Requirements" items={job.requirements} Icon={Target} />

          {!hasDetails && (
            <p className="career-detail-block text-sm text-career-gray">
              No additional details available for this role yet.
            </p>
          )}
        </div>
      )}
    </article>
  );
};

export default JobCard;
