import type { SessionSummary } from '../../types';
import { Panda } from '../../components/mascot/Panda';
import { Confetti } from '../../components/mascot/Confetti';

interface EndOfRegionSummaryProps {
  summary: SessionSummary;
  onPracticeAgain: () => void;
  onPracticeMissed: () => void;
  onChooseAnother: () => void;
  onAllRegions?: () => void;
  showConfetti: boolean;
  celebrationsEnabled: boolean;
  studentName: string;
}

export function EndOfRegionSummary({
  summary,
  onPracticeAgain,
  onPracticeMissed,
  onChooseAnother,
  onAllRegions,
  showConfetti,
  celebrationsEnabled,
  studentName,
}: EndOfRegionSummaryProps) {
  return (
    <div className="stack text-center" style={{ gap: 20, paddingTop: 12, maxWidth: 620, margin: '0 auto' }}>
      {showConfetti && <Confetti />}
      <Panda mood="celebrating" size={150} animationsEnabled={celebrationsEnabled} interactive={false} />
      <div>
        <h1>{summary.regionName} Complete!</h1>
        <p className="muted">Awesome job, {studentName}! You mastered the {summary.regionName}!</p>
      </div>

      <div className="card stack" style={{ gap: 10, textAlign: 'left' }}>
        <div className="spread">
          <span>States Mastered</span>
          <strong>{summary.totalStates}</strong>
        </div>
        <div className="spread">
          <span>First Try</span>
          <strong>{summary.firstTryCount}</strong>
        </div>
        <div className="spread">
          <span>Needed Extra Practice</span>
          <strong>{summary.neededExtraPracticeCount}</strong>
        </div>
        {summary.timedAttemptsCount > 0 && (
          <div className="spread">
            <span>Within Target Time</span>
            <strong>
              {summary.withinTargetCount} / {summary.timedAttemptsCount}
            </strong>
          </div>
        )}
        <div className="spread">
          <span>Total Attempts</span>
          <strong>{summary.totalAttempts}</strong>
        </div>
      </div>

      {summary.missed.length > 0 && (
        <div className="card stack" style={{ gap: 8, textAlign: 'left' }}>
          <h3 style={{ margin: 0 }}>Needed Extra Practice</h3>
          {summary.missed.map((m) => (
            <div key={m.stateId} className="row">
              <span>{m.state}</span>
              <span className="muted">→</span>
              <span>{m.capital}</span>
            </div>
          ))}
        </div>
      )}

      <div className="stack" style={{ gap: 10 }}>
        <button type="button" className="btn btn-primary btn-large" onClick={onPracticeAgain}>
          Practice This Region Again
        </button>
        {summary.missed.length > 0 && (
          <button type="button" className="btn btn-secondary btn-large" onClick={onPracticeMissed}>
            Practice Missed States
          </button>
        )}
        <button type="button" className="btn btn-ghost" onClick={onChooseAnother}>
          Choose Another Region
        </button>
        {onAllRegions && (
          <button type="button" className="btn btn-ghost" onClick={onAllRegions}>
            All Regions Challenge
          </button>
        )}
      </div>
    </div>
  );
}
