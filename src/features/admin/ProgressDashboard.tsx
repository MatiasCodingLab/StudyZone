import { useAppState } from '../../state/AppStateContext';
import { getEnabledStatesForRegion, findStateById } from '../../game/selectors';
import type { QuizDirection } from '../../types';
import { quizDirectionLabel } from '../../game/quizDirection';

const DIRECTIONS: QuizDirection[] = ['state-to-capital', 'capital-to-state'];

function formatDate(ts: number | null): string {
  if (!ts) return 'Not practiced yet';
  return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export function ProgressDashboard() {
  const { config, progress, preferences } = useAppState();
  const regions = [...config.regions].sort((a, b) => a.order - b.order);

  return (
    <div className="stack" style={{ gap: 20 }}>
      <h3>{preferences.profile.name} — Practice Overview</h3>

      {regions.map((region) => {
        const totalStates = getEnabledStatesForRegion(config, region.id).length;

        return (
          <div className="card stack" key={region.id} style={{ gap: 10 }}>
            <div className="spread">
              <strong>{region.name.toUpperCase()}</strong>
              <span className="muted">{totalStates} states</span>
            </div>

            {DIRECTIONS.map((direction) => {
              const regionProgress = progress.regions[region.id]?.[direction];
              const firstTryAccuracy = regionProgress && regionProgress.sessionsCount > 0
                ? Math.round((regionProgress.correctFirstTryTotal / (regionProgress.sessionsCount * Math.max(totalStates, 1))) * 100)
                : null;
              const topMisses = regionProgress
                ? Object.entries(regionProgress.missedCounts).filter(([, count]) => count > 0).sort((a, b) => b[1] - a[1]).slice(0, 5)
                : [];

              return <div className="direction-progress" key={direction}>
                <strong>{quizDirectionLabel(direction)}</strong>
                {!regionProgress || regionProgress.sessionsCount === 0 ? (
                  <p className="muted">Not practiced yet.</p>
                ) : (
                  <>
                <div className="row-wrap">
                  <span className="pill">Sessions: {regionProgress.sessionsCount}</span>
                  {firstTryAccuracy !== null && <span className="pill">First Try: {firstTryAccuracy}%</span>}
                  {regionProgress.timedAttemptsTotal > 0 && (
                    <span className="pill">
                      Within Target: {regionProgress.withinTargetTotal} / {regionProgress.timedAttemptsTotal}
                    </span>
                  )}
                  {regionProgress.bestSessionAccuracy !== null && (
                    <span className="pill pill-success">Best Score: {Math.round(regionProgress.bestSessionAccuracy * 100)}%</span>
                  )}
                </div>
                <p className="muted" style={{ margin: 0 }}>
                  Most recent practice: {formatDate(regionProgress.lastPracticed)}
                </p>
                {topMisses.length > 0 && (
                  <div>
                    <strong style={{ fontSize: '0.9rem' }}>Needs Practice</strong>
                    <div className="stack" style={{ gap: 4, marginTop: 6 }}>
                      {topMisses.map(([stateId, count]) => {
                        const state = findStateById(config, stateId);
                        if (!state) return null;
                        return (
                          <div key={stateId} className="row" style={{ fontSize: '0.9rem' }}>
                            <span>
                              {state.state} → {state.capital}
                            </span>
                            <span className="muted">
                              (missed {count} time{count === 1 ? '' : 's'})
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                  </>
                )}
              </div>;
            })}
          </div>
        );
      })}
    </div>
  );
}
