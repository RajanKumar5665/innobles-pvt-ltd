import { Users } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";

// Initials avatar (e.g. "Rahul Verma" -> "RV") used as a fallback.
const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || "")
    .join("");

// Team member card: avatar, name, role, description and optional LinkedIn CTA.
const TeamCard = ({ member }) => (
  <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-6 pt-9 text-center shadow-[0_1px_2px_rgba(23,32,51,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-orange/40 hover:shadow-[0_24px_48px_-24px_rgba(23,32,51,0.3)]">
    {/* Soft gradient halo behind the avatar */}
    <div
      className="pointer-events-none absolute -top-14 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-orange/15 to-transparent blur-2xl transition-colors duration-300 group-hover:from-brand-orange/30"
      aria-hidden="true"
    />

    {/* Avatar with gradient ring */}
    <div className="relative mx-auto">
      {member.image?.url ? (
        <div className="relative rounded-full bg-gradient-to-br from-brand-orange via-brand-orange/60 to-brand-cyan/20 p-[3px] shadow-md">
          <img
            src={member.image.url}
            alt={member.name}
            className="h-24 w-24 rounded-full border-4 border-white object-cover"
          />
        </div>
      ) : (
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark p-[3px] shadow-md">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-white font-disp text-2xl font-bold text-primary">
            {getInitials(member.name) || "?"}
          </div>
        </div>
      )}
    </div>

    <h3 className="relative mt-5 font-disp text-lg font-bold text-ink">{member.name}</h3>
    {member.role && (
      <p className="relative mt-2 inline-flex items-center self-center rounded-full bg-brand-orange/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-orange">
        {member.role}
      </p>
    )}

    {member.description && (
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted">{member.description}</p>
    )}

    {/* Footer — LinkedIn CTA (or placeholder when absent) */}
    <div className="relative mt-6 flex items-center justify-center border-t border-line pt-5">
      {member.linkedin ? (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-light-surface px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-brand-orange hover:bg-brand-orange hover:text-white"
        >
          <FaLinkedinIn className="h-3.5 w-3.5" aria-hidden="true" /> LinkedIn
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
          <Users className="h-3.5 w-3.5 text-brand-orange" aria-hidden="true" /> Team member
        </span>
      )}
    </div>
  </article>
);

export default TeamCard;