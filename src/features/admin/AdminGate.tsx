import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHoldToConfirm } from '../../hooks/useHoldToConfirm';
import { AdminScreen } from './AdminScreen';

const HOLD_MS = 2000;

export function AdminGate() {
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const { progress, start, stop } = useHoldToConfirm(HOLD_MS, () => setUnlocked(true));

  if (unlocked) return <AdminScreen />;

  return (
    <div className="stack text-center" style={{ gap: 20, paddingTop: 40, maxWidth: 420, margin: '0 auto' }}>
      <h1>Parent / Admin Area</h1>
      <p className="muted">This area is for parents to change settings, regions, and states. Press and hold the button for 2 seconds to continue.</p>

      <button
        type="button"
        className="btn btn-primary btn-large"
        style={{ position: 'relative', overflow: 'hidden' }}
        onMouseDown={start}
        onMouseUp={stop}
        onMouseLeave={stop}
        onTouchStart={start}
        onTouchEnd={stop}
      >
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.35)',
            width: `${progress * 100}%`,
            transition: progress === 0 ? 'width 0.15s ease' : 'none',
          }}
        />
        <span style={{ position: 'relative' }}>Hold for Parent / Admin</span>
      </button>

      <button type="button" className="btn btn-ghost" onClick={() => setShowFallback(true)}>
        Can't hold the button? Tap here instead
      </button>

      <button type="button" className="btn btn-ghost" onClick={() => navigate('/')}>
        Back to Home
      </button>

      {showFallback && (
        <div className="modal-overlay" onClick={() => setShowFallback(false)}>
          <div className="modal-card stack" onClick={(e) => e.stopPropagation()}>
            <h3>Enter Parent / Admin Area?</h3>
            <p className="muted">This unlocks settings for practice regions, states, and capitals.</p>
            <div className="row-wrap">
              <button type="button" className="btn btn-primary" onClick={() => setUnlocked(true)}>
                Yes, continue
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setShowFallback(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
