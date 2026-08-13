import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../state/AppStateContext';
import { getRegionsWithCounts, getAllEnabledStates } from '../../game/selectors';
import { Panda } from '../../components/mascot/Panda';

export function HomeScreen() {
  const { config, preferences } = useAppState();
  const navigate = useNavigate();

  const regionsWithCounts = useMemo(() => getRegionsWithCounts(config), [config]);
  const allStatesCount = useMemo(() => getAllEnabledStates(config).length, [config]);
  const studentName = preferences.profile.name || 'friend';

  return (
    <div className="stack" style={{ gap: 28, paddingTop: 20 }}>
      <div className="text-center stack" style={{ gap: 6 }}>
        <Panda mood="idle" size={130} />
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>Hi {studentName}! What do you want to practice today?</h1>
        <p className="muted">Pick a region below to start practicing capitals.</p>
      </div>

      <div className="grid-cards">
        {regionsWithCounts.map(({ region, stateCount }) => (
          <button
            key={region.id}
            type="button"
            className="region-card"
            disabled={stateCount === 0}
            onClick={() => navigate(`/practice/${region.id}`)}
          >
            <span className="region-card__name">{region.name.toUpperCase()}</span>
            <span className="region-card__count">
              {stateCount} {stateCount === 1 ? 'state' : 'states'}
            </span>
            <span className="region-card__cta">{stateCount === 0 ? 'No states yet' : '[ Practice ]'}</span>
          </button>
        ))}

        {config.settings.allRegionsChallengeEnabled ? (
          <button
            type="button"
            className="region-card"
            disabled={allStatesCount === 0}
            onClick={() => navigate('/practice/all')}
          >
            <span className="region-card__name">ALL REGIONS CHALLENGE</span>
            <span className="region-card__count">
              {allStatesCount} {allStatesCount === 1 ? 'state' : 'states'}
            </span>
            <span className="region-card__cta">{allStatesCount === 0 ? 'No states yet' : '[ Practice ]'}</span>
          </button>
        ) : (
          <div className="region-card" style={{ cursor: 'default', opacity: 0.7 }}>
            <span className="region-card__name">ALL REGIONS CHALLENGE</span>
            <span className="region-card__count">Coming Soon</span>
          </div>
        )}
      </div>
    </div>
  );
}
