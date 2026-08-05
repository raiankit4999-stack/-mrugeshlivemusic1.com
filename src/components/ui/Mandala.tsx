const RAY_COUNT = 24;
const PETAL_COUNT = 12;

export default function Mandala({ className }: { className?: string }) {
  const rays = Array.from({ length: RAY_COUNT });
  const petals = Array.from({ length: PETAL_COUNT });

  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden>
      <g opacity="0.4">
        <circle cx="200" cy="200" r="192" fill="none" stroke="var(--gold)" strokeWidth="1" />
        <circle cx="200" cy="200" r="164" fill="none" stroke="var(--maroon)" strokeWidth="1" />
        <circle cx="200" cy="200" r="136" fill="none" stroke="var(--gold)" strokeWidth="1" />
        {rays.map((_, i) => {
          const angle = (i * 360) / RAY_COUNT;
          return (
            <line
              key={i}
              x1="200"
              y1="8"
              x2="200"
              y2="30"
              stroke={i % 2 === 0 ? "var(--gold)" : "var(--maroon)"}
              strokeWidth="1.5"
              transform={`rotate(${angle} 200 200)`}
            />
          );
        })}
        {petals.map((_, i) => {
          const angle = (i * 360) / PETAL_COUNT;
          return (
            <ellipse
              key={i}
              cx="200"
              cy="72"
              rx="10"
              ry="26"
              fill="none"
              stroke="var(--maroon-soft)"
              strokeWidth="1"
              transform={`rotate(${angle} 200 200)`}
            />
          );
        })}
      </g>
    </svg>
  );
}
