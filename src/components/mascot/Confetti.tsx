import './Confetti.css';

const COLORS = ['#f97316', '#facc15', '#22c55e', '#3b82f6', '#ec4899', '#a855f7'];

interface ConfettiProps {
  pieces?: number;
}

/** Lightweight CSS-only confetti burst - no external assets or libraries. */
export function Confetti({ pieces = 40 }: ConfettiProps) {
  const items = Array.from({ length: pieces }, (_, i) => i);
  return (
    <div className="confetti" aria-hidden="true">
      {items.map((i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.4;
        const duration = 2.2 + Math.random() * 1.4;
        const color = COLORS[i % COLORS.length];
        const rotate = Math.random() * 360;
        return (
          <span
            key={i}
            className="confetti__piece"
            style={{
              left: `${left}%`,
              backgroundColor: color,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              transform: `rotate(${rotate}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}
