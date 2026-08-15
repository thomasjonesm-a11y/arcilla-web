// Four skills orbit — Reading / Writing / Listening / Speaking
// around two crossing ellipses. Labels glow on hover.
//
// This is the rebuilt, interactive version (from v5PH...svg). The original
// baked the label text into vector paths; here the labels are real <text> in a
// monospace face, which is lighter and editable. Hover glow is scoped CSS so it
// won't leak into the rest of the page.
//
// Colors match the source: labels fill #04000A with a #FFF (dimmed) stroke,
// orbit lines #6E6A64. Hover brightens the stroke to full white + drop-shadow.

const ORBITS = [
  "M420.041 83.697c87.167 22.966 162.239 58.249 213.151 96.708 25.457 19.231 44.852 39.241 56.705 58.881 11.853 19.639 16.144 38.872 11.475 56.591s-17.879 32.341-37.87 43.59c-19.992 11.25-46.729 19.105-78.357 23.295-63.253 8.38-145.964 2.09-233.13-20.876-87.167-22.967-162.239-58.249-213.151-96.709-25.457-19.23-44.852-39.24-56.705-58.881-11.853-19.639-16.144-38.871-11.476-56.591 4.67-17.72 17.88-32.34 37.871-43.59s46.729-19.104 78.357-23.294c63.253-8.38 145.964-2.09 233.13 20.876Z",
  "M429.739 376.843c-78.254 25.599-153.738 34.52-212.508 28.268-58.822-6.257-100.688-27.679-112.093-62.544s9.706-76.889 53.457-116.701c43.714-39.776 109.876-77.191 188.13-102.79 78.255-25.6 153.739-34.52 212.509-28.269 58.822 6.257 100.688 27.679 112.093 62.544 11.406 34.866-9.706 76.889-53.457 116.701-43.714 39.776-109.876 77.192-188.131 102.791Z",
];

// x/y are the rect's top-left in the 756x471 viewBox; text is centered in it.
const SKILLS = [
  { label: "Reading", x: 13.5, y: 90.5 },
  { label: "Writing", x: 592.5, y: 133.5 },
  { label: "Speaking", x: 606.5, y: 293.5 },
  { label: "Listening", x: 30.5, y: 326.5 },
];

const RECT_W = 149;
const RECT_H = 36;

export default function SkillsDiagram({ className, ...props }) {
  return (
    <svg
      viewBox="-5 -5 766 481"
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Reading, writing, listening and speaking orbiting a shared center"
      {...props}
    >
      <style>{`
        .arcilla-skill-rect {
          cursor: pointer;
          transition: filter .25s ease, stroke .25s ease;
          stroke: #FFF;
          stroke-opacity: .55;
        }
        .arcilla-skill:hover .arcilla-skill-rect {
          stroke-opacity: 1;
          filter: drop-shadow(0 0 6px rgba(255,255,255,.9))
                  drop-shadow(0 0 12px rgba(255,255,255,.5));
        }
        .arcilla-skill-label {
          font-family: ui-monospace, "SF Mono", Menlo, Monaco, "Cascadia Mono",
            "Roboto Mono", monospace;
          font-size: 12px;
          fill: #FFF;
          user-select: none;
          pointer-events: none;
        }
      `}</style>

      {/* orbit ellipses */}
      {ORBITS.map((d, i) => (
        <path key={i} d={d} stroke="#6E6A64" strokeWidth={1} />
      ))}

      {/* skill labels */}
      {SKILLS.map((s) => (
        <g className="arcilla-skill" key={s.label}>
          <rect
            className="arcilla-skill-rect"
            x={s.x}
            y={s.y}
            width={RECT_W}
            height={RECT_H}
            rx={7.5}
            fill="#04000A"
          />
          <text
            className="arcilla-skill-label"
            x={s.x + RECT_W / 2}
            y={s.y + RECT_H / 2}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {s.label}
          </text>
        </g>
      ))}

      <text
        x="378"
        y="228"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#ECE7DF"
        style={{
          fontFamily:
            'var(--font-noto-sans, ui-sans-serif), system-ui, sans-serif',
          fontSize: "16px",
          fontWeight: 300,
          letterSpacing: "0",
        }}
      >
        <tspan x="378" dy="-12">
          We focus on all four
        </tspan>
        <tspan x="378" dy="24">
          core language skills
        </tspan>
      </text>
    </svg>
  );
}
