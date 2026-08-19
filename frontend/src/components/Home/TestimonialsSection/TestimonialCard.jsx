import { Quote, Star } from "lucide-react";

/**
 * A single testimonial card: circular quote icon, quote text, orange star
 * rating and customer info (initials avatar + name + role).
 * Equal height is handled by the parent track (`h-full` + flex column).
 */
const TestimonialCard = ({ testimonial }) => {
  const { quote, name, role, initials, accent } = testimonial;

  return (
    <figure className="relative flex h-full flex-col rounded-[22px] border border-line bg-white p-6 shadow-[0_2px_10px_-6px_rgba(26,35,50,0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-orange/25 hover:shadow-[0_24px_48px_-24px_rgba(26,35,50,0.28)] sm:p-7">
      {/* Quote icon */}
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${accent.quoteBg} ${accent.quoteText}`}
        aria-hidden="true"
      >
        <Quote className="h-6 w-6" fill="currentColor" strokeWidth={0} />
      </span>

      <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-slate-600">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Star rating */}
      <div
        className="mt-5 flex items-center gap-1 text-brand-orange"
        role="img"
        aria-label="Rated 5 out of 5 stars"
      >
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="h-[18px] w-[18px]"
            fill="currentColor"
            strokeWidth={0}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Customer info */}
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line/80 pt-5">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${accent.avatarBg} font-disp text-sm font-bold text-slate-50 shadow-sm`}
          aria-hidden="true"
        >
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate font-disp text-sm font-bold text-ink">{name}</p>
          <p className="mt-0.5 truncate text-xs text-slate-500">{role}</p>
        </div>
      </figcaption>
    </figure>
  );
};

export default TestimonialCard;
