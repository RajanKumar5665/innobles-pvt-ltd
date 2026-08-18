/**
 * Minimal line-art illustrations for the About page "Our Locations" cards.
 *
 * Each variant is a clean, hand-authored SVG drawn in the Innobles palette
 * (ink #1A2332, brand-orange #F7941D, brand-cyan #00BCD4, soft slate #F8FAFC).
 * Kept as a component so the `locations` data array can stay serializable by
 * referencing a plain string key via the `city` prop.
 */
const Art = ({ label, children }) => (
  <svg
    viewBox="0 0 320 165"
    className="h-40 w-full"
    role="img"
    aria-label={label}
    preserveAspectRatio="xMidYMid slice"
  >
    <rect width="320" height="165" fill="#F8FAFC" />
    <g fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </g>
  </svg>
);

/* Rumi Darwaza gateway — Lucknow */
const Lucknow = () => (
  <Art label="Line-art illustration of the Rumi Darwaza gateway, Lucknow">
    <circle cx="250" cy="42" r="13" stroke="#F7941D" />
    <path d="M126 142 V84 Q126 46 160 46 Q194 46 194 84 V142" stroke="#1A2332" strokeWidth="2.5" />
    <path d="M126 70 Q112 62 98 68 L92 142" stroke="#1A2332" />
    <path d="M194 70 Q208 62 222 68 L228 142" stroke="#1A2332" />
    <path d="M160 46 V28 M160 28 166 34 M160 28 154 34" stroke="#1A2332" strokeWidth="2.5" />
    <path d="M116 84 H126 M194 84 H204" stroke="#1A2332" />
    <path d="M142 142 V96 Q142 70 160 70 Q178 70 178 96 V142" stroke="#00BCD4" strokeWidth="1.75" />
    <path d="M84 142 H236" stroke="#1A2332" strokeWidth="2.5" />
  </Art>
);

/* Gateway of India + skyline + Marine Drive — Mumbai */
const Mumbai = () => (
  <Art label="Line-art illustration of the Gateway of India and Mumbai skyline">
    <g stroke="#C3D0DA" strokeWidth="2">
      <path d="M28 142 V92 h16 v14 h14 V72 h14 V142" />
      <path d="M238 142 V80 h18 v16 h14 V60 h10 V142" />
    </g>
    <circle cx="64" cy="40" r="13" stroke="#F7941D" />
    <g stroke="#1A2332" strokeWidth="2.5">
      <path d="M132 74 Q160 36 188 74" />
      <path d="M150 142 V88 Q150 62 160 58 Q170 62 170 88 V142" />
      <path d="M137 142 V96 Q137 78 144 76 Q151 78 151 96 V142" />
      <path d="M169 142 V96 Q169 78 176 76 Q183 78 183 96 V142" />
      <path d="M120 142 H200" />
    </g>
    <path d="M160 58 V48" stroke="#1A2332" strokeWidth="2" />
    <path d="M16 152 q8 -5 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0" stroke="#00BCD4" strokeWidth="2" />
  </Art>
);

/* India Gate — Delhi */
const Delhi = () => (
  <Art label="Line-art illustration of the India Gate, Delhi">
    <g stroke="#7FC8D6" strokeWidth="2">
      <path d="M40 142 V110 M40 110 l-10 -12 M40 110 l10 -12 M40 110 l0 -16" />
      <path d="M280 142 V114 M280 114 l-9 -11 M280 114 l9 -11" />
    </g>
    <circle cx="252" cy="40" r="13" stroke="#F7941D" />
    <g stroke="#1A2332" strokeWidth="2.5">
      <path d="M128 58 V142 M192 58 V142 M128 58 H192" />
      <path d="M146 142 V104 Q146 88 160 88 Q174 88 174 104 V142" />
      <path d="M133 142 V112 Q133 102 140 102 Q147 102 147 112 V142" />
      <path d="M173 142 V112 Q173 102 180 102 Q187 102 187 112 V142" />
      <path d="M128 58 V46 M192 58 V46" />
      <path d="M152 58 Q160 44 168 58" />
      <path d="M160 44 V30 M160 30 H182" />
    </g>
    <path d="M96 142 H224" stroke="#1A2332" strokeWidth="2.5" />
  </Art>
);

/* Dubai skyline with the Burj Khalifa — UAE */
const UAE = () => (
  <Art label="Line-art illustration of the Dubai skyline and Burj Khalifa">
    <path d="M246 30 a12 12 0 1 0 4 20 a9 9 0 1 1 -4 -20" stroke="#F7941D" strokeWidth="2" />
    <g stroke="#1A2332" strokeWidth="2">
      <path d="M40 142 V86 h16 v14 h12 V64 h12 V142" />
      <path d="M96 142 V100 h14 v16 h10 V82 h10 V142" />
      <path d="M204 142 V102 h12 v18 h12 V72 h10 V142" />
      <path d="M252 142 V92 h14 v12 h12 V70 h12 V142" />
    </g>
    <g stroke="#1A2332" strokeWidth="2.5">
      <path d="M160 30 V142" />
      <path d="M150 52 h20 M146 66 h28 M140 82 h40 M132 98 h56" />
    </g>
    <path d="M24 142 H296" stroke="#1A2332" strokeWidth="2.5" />
  </Art>
);

const VARIANTS = { lucknow: Lucknow, mumbai: Mumbai, delhi: Delhi, uae: UAE };

/**
 * Renders a line-art illustration by string key.
 * Falls back silently (no image) if the key is unknown so there are no
 * broken images or runtime errors.
 */
const LocationIllustration = ({ city }) => {
  const Tag = VARIANTS[city];
  return Tag ? <Tag /> : null;
};

export default LocationIllustration;
