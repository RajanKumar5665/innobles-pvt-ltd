import Reveal from "./Reveal";

// Section heading: eyebrow pill + title + optional subtitle.
const SectionHeading = ({ eyebrow, title, subtitle, align = "left" }) => {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const innerAlign = align === "center" ? "justify-center" : "";
  return (
    <Reveal className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p className={`pill-eyebrow mb-4 ${innerAlign}`}>
          <span className="pill-dot" />
          {eyebrow}
        </p>
      )}
      <h2 className="font-disp text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-slate-600 md:text-lg">{subtitle}</p>}
    </Reveal>
  );
};

export default SectionHeading;
