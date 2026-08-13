import { useEffect, useRef, useState } from 'react';
import './Panda.css';

export type PandaMood = 'idle' | 'thinking' | 'excited' | 'celebrating' | 'supportive' | 'shrug';

const MOOD_MOUTHS: Record<PandaMood, string> = {
  idle: 'M 90 128 Q 100 136 110 128',
  thinking: 'M 92 130 Q 100 127 108 130',
  excited: 'M 86 126 Q 100 144 114 126 Q 100 138 86 126',
  celebrating: 'M 84 124 Q 100 148 116 124 Q 100 140 84 124',
  supportive: 'M 90 130 Q 100 135 110 130',
  shrug: 'M 92 130 L 108 130',
};

interface PandaProps {
  mood: PandaMood;
  size?: number;
  animationsEnabled?: boolean;
  interactive?: boolean;
  onInteract?: () => void;
  bounceKey?: number;
}

/** Original SVG panda mascot. Interactions never steal focus or affect the
 * running game - see the mousedown preventDefault below. */
export function Panda({ mood, size = 170, animationsEnabled = true, interactive = true, onInteract, bounceKey }: PandaProps) {
  const [tapping, setTapping] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (bounceKey === undefined) return;
    setTapping(true);
    const id = window.setTimeout(() => setTapping(false), 700);
    return () => window.clearTimeout(id);
  }, [bounceKey]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleActivate = () => {
    if (!interactive) return;
    setTapping(true);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setTapping(false), 700);
    onInteract?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleActivate();
    }
  };

  const classes = [
    'panda',
    `panda--${mood}`,
    animationsEnabled ? 'panda--animated' : 'panda--static',
    tapping && animationsEnabled ? 'panda--tap' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const mouthPath = MOOD_MOUTHS[mood];

  return (
    <div
      className={classes}
      style={{ width: size, height: size }}
      role={interactive ? 'button' : 'img'}
      aria-label="Panda mascot"
      tabIndex={interactive ? 0 : -1}
      onMouseDown={handleMouseDown}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
    >
      <svg viewBox="0 0 200 220" className="panda__svg" aria-hidden="true">
        <ellipse className="panda__shadow" cx="100" cy="208" rx="55" ry="8" />

        <g className="panda__body">
          <ellipse cx="100" cy="175" rx="52" ry="38" fill="#2b2b33" />
          <ellipse cx="100" cy="178" rx="40" ry="30" fill="#ffffff" />
        </g>

        <g className="panda__arm panda__arm--left">
          <ellipse cx="52" cy="168" rx="14" ry="22" fill="#2b2b33" />
        </g>
        <g className="panda__arm panda__arm--right">
          <ellipse cx="148" cy="168" rx="14" ry="22" fill="#2b2b33" />
        </g>

        <g className="panda__head">
          <ellipse className="panda__ear panda__ear--left" cx="62" cy="48" rx="22" ry="22" fill="#2b2b33" />
          <ellipse className="panda__ear panda__ear--right" cx="138" cy="48" rx="22" ry="22" fill="#2b2b33" />

          <ellipse cx="100" cy="100" rx="66" ry="60" fill="#ffffff" />

          <ellipse className="panda__patch panda__patch--left" cx="70" cy="98" rx="20" ry="26" fill="#2b2b33" />
          <ellipse className="panda__patch panda__patch--right" cx="130" cy="98" rx="20" ry="26" fill="#2b2b33" />

          <g className="panda__eye panda__eye--left">
            <circle cx="70" cy="100" r="8.5" fill="#ffffff" className="panda__eyeball" />
            <circle cx="71" cy="101" r="5" fill="#2b2b33" className="panda__pupil" />
            <circle cx="73" cy="98" r="1.6" fill="#ffffff" />
          </g>
          <g className="panda__eye panda__eye--right">
            <circle cx="130" cy="100" r="8.5" fill="#ffffff" className="panda__eyeball" />
            <circle cx="129" cy="101" r="5" fill="#2b2b33" className="panda__pupil" />
            <circle cx="132" cy="98" r="1.6" fill="#ffffff" />
          </g>

          <ellipse className="panda__blush panda__blush--left" cx="55" cy="120" rx="9" ry="5" fill="#ffb4c6" opacity="0.7" />
          <ellipse className="panda__blush panda__blush--right" cx="145" cy="120" rx="9" ry="5" fill="#ffb4c6" opacity="0.7" />

          <ellipse cx="100" cy="112" rx="8" ry="6" fill="#2b2b33" />

          <path className="panda__mouth" d={mouthPath} stroke="#2b2b33" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  );
}
