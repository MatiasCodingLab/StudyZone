import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppState } from '../../state/AppStateContext';
import { getAllEnabledStates, getEnabledStatesForRegion } from '../../game/selectors';
import { resolveRegionTimer } from '../../storage/preferencesStore';

const TIMER_OPTIONS: { value: number | 'none'; big: string; label: string }[] = [
  { value: 'none', big: 'No Timer', label: 'Untimed' },
  { value: 10, big: '10 sec', label: 'Learn' },
  { value: 8, big: '8 sec', label: 'Practice' },
  { value: 5, big: '5 sec', label: 'Quick Recall' },
  { value: 4, big: '4 sec', label: 'Fast Recall' },
  { value: 3, big: '3 sec', label: 'Speed Challenge' },
];

export function PracticeSetupScreen() {
  const { regionId = '' } = useParams();
  const navigate = useNavigate();
  const { config, preferences, setRegionTimer, progress } = useAppState();

  const isAll = regionId === 'all';
  const region = config.regions.find((r) => r.id === regionId);
  const states = isAll ? getAllEnabledStates(config) : getEnabledStatesForRegion(config, regionId);
  const regionName = isAll ? 'All Regions Challenge' : region?.name ?? 'Practice';

  const resolved = useMemo(() => resolveRegionTimer(preferences, regionId), [preferences, regionId]);
  const [selection, setSelection] = useState<number | 'none' | 'custom'>(() => {
    if (resolved.timerSeconds === null) return 'none';
    const isPreset = TIMER_OPTIONS.some((opt) => opt.value === resolved.timerSeconds);
    return isPreset ? resolved.timerSeconds : 'custom';
  });
  const [customValue, setCustomValue] = useState<string>(() =>
    resolved.timerSeconds && !TIMER_OPTIONS.some((opt) => opt.value === resolved.timerSeconds) ? String(resolved.timerSeconds) : '6',
  );
  const [customError, setCustomError] = useState<string | null>(null);
  const [strict, setStrict] = useState(resolved.strict);

  const regionProgress = progress.regions[regionId];
  const enabledIds = new Set(states.map((s) => s.id));
  const missedStateIds = regionProgress
    ? Object.keys(regionProgress.missedCounts).filter((id) => regionProgress.missedCounts[id] > 0 && enabledIds.has(id))
    : [];
  const hasPreviousMisses = missedStateIds.length > 0;

  function getTimerSecondsValue(): number | null {
    if (selection === 'none') return null;
    if (selection === 'custom') {
      const parsed = Number(customValue);
      return Number.isFinite(parsed) ? parsed : null;
    }
    return selection;
  }

  function validateCustom(value: string): boolean {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || !Number.isInteger(parsed) || parsed < 1 || parsed > 30) {
      setCustomError('Please enter a whole number between 1 and 30 seconds.');
      return false;
    }
    setCustomError(null);
    return true;
  }

  function persistAndGo(mode: 'normal' | 'missed') {
    if (selection === 'custom' && !validateCustom(customValue)) return;
    const timerSeconds = getTimerSecondsValue();
    setRegionTimer(regionId, timerSeconds, strict);
    navigate(`/practice/${regionId}/play`, { state: { timerSeconds, strict, mode } });
  }

  if (states.length === 0) {
    return (
      <div className="card text-center">
        <h2>No states are enabled for {regionName} yet.</h2>
        <p className="muted">Ask a parent to enable some states in the Admin area.</p>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
          Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="stack" style={{ gap: 24, paddingTop: 12 }}>
      <div>
        <span className="eyebrow">Practice Setup</span>
        <h1>{regionName}</h1>
        <p className="muted">{states.length} states</p>
      </div>

      <div className="card stack" style={{ gap: 14 }}>
        <h3>Recall Timer</h3>
        <div className="timer-choice-grid">
          {TIMER_OPTIONS.map((opt) => (
            <button
              key={String(opt.value)}
              type="button"
              className={`timer-choice ${selection === opt.value ? 'is-selected' : ''}`}
              onClick={() => setSelection(opt.value)}
            >
              <span className="timer-choice__value">{opt.big}</span>
              <span className="timer-choice__label">{opt.label}</span>
            </button>
          ))}
          <button
            type="button"
            className={`timer-choice ${selection === 'custom' ? 'is-selected' : ''}`}
            onClick={() => setSelection('custom')}
          >
            <span className="timer-choice__value">Custom</span>
            <span className="timer-choice__label">Pick your own</span>
          </button>
        </div>

        {selection === 'custom' && (
          <div className="row-wrap">
            <label htmlFor="custom-timer" className="muted">
              Seconds (1–30):
            </label>
            <input
              id="custom-timer"
              className="input-large"
              style={{ maxWidth: 120 }}
              type="number"
              min={1}
              max={30}
              value={customValue}
              onChange={(e) => {
                setCustomValue(e.target.value);
                if (customError) validateCustom(e.target.value);
              }}
              onBlur={(e) => validateCustom(e.target.value)}
            />
            {customError && <span style={{ color: 'var(--color-danger)', fontWeight: 600 }}>{customError}</span>}
          </div>
        )}

        <div className="toggle-row">
          <div>
            <strong>Strict Timer</strong>
            <p className="muted" style={{ margin: '4px 0 0' }}>
              When on, running out of time counts as missed automatically. Great for speed practice later on.
            </p>
          </div>
          <label className="switch">
            <input type="checkbox" checked={strict} onChange={(e) => setStrict(e.target.checked)} />
            <span className="switch-track" />
          </label>
        </div>
      </div>

      <div className="stack" style={{ gap: 12 }}>
        <button type="button" className="btn btn-primary btn-large" onClick={() => persistAndGo('normal')}>
          Start Practice
        </button>
        {hasPreviousMisses && (
          <button type="button" className="btn btn-secondary btn-large" onClick={() => persistAndGo('missed')}>
            Practice Previous Misses ({missedStateIds.length})
          </button>
        )}
        <button type="button" className="btn btn-ghost" onClick={() => navigate('/')}>
          Choose Another Region
        </button>
      </div>
    </div>
  );
}
