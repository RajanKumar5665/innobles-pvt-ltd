import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";

/**
 * Vertical job card with department badge, meta row, description and Apply button.
 */
const JobCard = ({ job }) => (
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

    <div className="mt-5">
      <a
        href={`mailto:careers@innobles.in?subject=${encodeURIComponent(`Application — ${job.title}`)}`}
        className="career-apply-btn"
      >
        Apply Now
        <ArrowRight size={15} className="career-arrow" aria-hidden="true" />
      </a>
    </div>
  </article>
);

export default JobCard;