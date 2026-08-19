/**
 * A single technology card in the dense grid: brand icon on top, name below.
 * Equal height is guaranteed by the parent grid (`auto-rows-fr` + this card's
 * fixed height) so every card stays identical. Hover lifts the card slightly,
 * strengthens the shadow, warms the border and scales the icon (all disabled
 * under `prefers-reduced-motion` — see index.css).
 */
const TechnologyCard = ({ name, icon: Icon, color, index = 0 }) => (
  <figure
    className="tech-card tech-card-in group/tech flex h-28 flex-col items-center justify-center gap-2.5 rounded-xl border border-line bg-white px-2 py-3 shadow-[0_1px_3px_-2px_rgba(26,35,50,0.08)] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-brand-orange/40 hover:shadow-[0_16px_32px_-18px_rgba(26,35,50,0.25)] md:h-[116px]"
    style={{ animationDelay: `${index * 60}ms` }}
  >
    <span
      className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 ring-1 ring-line/70 transition-transform duration-300 ease-out group-hover/tech:scale-105"
      aria-hidden="true"
    >
      <Icon style={{ color }} className="h-9 w-9" />
    </span>
    <figcaption className="text-center text-[13px] font-semibold leading-tight text-slate-700 md:text-sm">
      {name}
    </figcaption>
  </figure>
);

export default TechnologyCard;
