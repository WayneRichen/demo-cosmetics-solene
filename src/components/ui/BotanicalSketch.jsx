/**
 * Hand-drawn style botanical line illustrations (decorative only).
 * variant: "olive" | "chamomile" | "fern"
 */
const sketches = {
  olive: (
    <>
      <path d="M60 290C70 220 90 150 140 60" />
      {[
        [76, 240, -50], [84, 214, 40], [92, 190, -55], [101, 166, 35],
        [111, 142, -60], [121, 118, 30], [131, 94, -65], [139, 72, 20],
      ].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <path d="M0 0C10-6 32-6 44 0 32 6 10 6 0 0Z" />
          <path d="M4 0h36" opacity=".6" />
        </g>
      ))}
      <ellipse cx="103" cy="206" rx="7" ry="9.5" transform="rotate(-20 103 206)" />
      <ellipse cx="72" cy="186" rx="6.5" ry="9" transform="rotate(15 72 186)" />
    </>
  ),
  chamomile: (
    <>
      <path d="M100 290c-4-60-2-120 6-170" />
      <path d="M103 200c-20-14-36-14-50-8" />
      <path d="M102 240c18-12 34-14 48-6" />
      {[...Array(14)].map((_, i) => (
        <path
          key={i}
          transform={`rotate(${(360 / 14) * i} 106 96)`}
          d="M106 96c-4-10-4-26 0-36 4 10 4 26 0 36Z"
        />
      ))}
      <circle cx="106" cy="96" r="10" />
      <circle cx="106" cy="96" r="5" opacity=".6" />
      <path d="M52 192c-6-10-4-18 2-24M150 234c6-8 6-16 0-22" />
    </>
  ),
  fern: (
    <>
      <path d="M40 300C80 230 120 150 190 30" />
      {[...Array(11)].map((_, i) => {
        const t = i / 11;
        const x = 40 + (190 - 40) * t;
        const y = 300 - (300 - 30) * t;
        const len = 46 - i * 3;
        return (
          <g key={i}>
            <path d={`M${x} ${y}c${-len * 0.4} ${-len * 0.1} ${-len * 0.8} ${-len * 0.05} ${-len} ${len * 0.15}`} />
            <path d={`M${x} ${y}c${len * 0.5} ${len * 0.05} ${len * 0.85} ${len * 0.25} ${len} ${len * 0.5}`} />
          </g>
        );
      })}
    </>
  ),
};

export default function BotanicalSketch({ variant = 'olive', className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 310"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {sketches[variant]}
    </svg>
  );
}
