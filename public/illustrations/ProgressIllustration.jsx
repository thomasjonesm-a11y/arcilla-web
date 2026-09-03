// Progress — ascending bar chart
// 12 bars, generally rising left to right. Stroke uses currentColor.
const BARS = [
  { x: 0.899902, y: 210.373, h: 88.0274 },
  { x: 30.4136, y: 199.777, h: 98.6233 },
  { x: 59.9277, y: 167.174, h: 131.226 },
  { x: 89.4414, y: 153.318, h: 145.082 },
  { x: 118.956, y: 127.236, h: 171.164 },
  { x: 148.469, y: 94.6328, h: 203.767 },
  { x: 177.983, y: 102.783, h: 195.616 },
  { x: 207.497, y: 94.6328, h: 203.767 },
  { x: 237.011, y: 62.03, h: 236.37 },
  { x: 266.525, y: 59.5847, h: 238.815 },
  { x: 296.039, y: 33.5027, h: 264.897 },
  { x: 325.553, y: 0.899902, h: 297.5 },
];

export default function ProgressIllustration({
  className,
  stroke = "currentColor",
  ...props
}) {
  return (
    <svg
      viewBox="0 0 342 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Ascending bar chart representing progress over time"
      {...props}
    >
      {BARS.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={b.y}
          width={15.3472}
          height={b.h}
          rx={2}
          stroke={stroke}
          strokeWidth={1.8}
        />
      ))}
    </svg>
  );
}
