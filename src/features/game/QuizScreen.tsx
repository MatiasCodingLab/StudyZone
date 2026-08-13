import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppState } from '../../state/AppStateContext';
import { getAllEnabledStates, getEnabledStatesForRegion, findStateById } from '../../game/selectors';
import {
  createSession,
  drawNext,
  isSessionComplete,
  recordAnswer,
  type AnswerOutcome,
  type GameEngineState,
} from '../../game/gameEngine';
import { checkAnswer } from '../../utils/answerMatching';
import type { MissedEntry, SessionSummary } from '../../types';
import { useRecallTimer } from '../../hooks/useRecallTimer';
import { Panda, type PandaMood } from '../../components/mascot/Panda';
import { PANDA_TAP_MESSAGES, STREAK_MESSAGES } from '../../components/mascot/pandaMessages';
import { EndOfRegionSummary } from './EndOfRegionSummary';

interface LocationState {
  timerSeconds: number | null;
  strict: boolean;
  mode: 'normal' | 'missed';
}

type Phase = 'asking' | 'feedback' | 'complete';

interface Feedback {
  outcome: AnswerOutcome | 'timeout';
  state: string;
  capital: string;
  wasFuzzy: boolean;
}

function buildSummary(session: GameEngineState, ids: string[], config: ReturnType<typeof useAppState>['config'], regionId: string, regionName: string): SessionSummary {
  const missed: MissedEntry[] = [];
  let firstTryCount = 0;
  let neededExtraPracticeCount = 0;
  let withinTargetCount = 0;
  let timedAttemptsCount = 0;
  let totalAttempts = 0;

  ids.forEach((id) => {
    const list = session.attempts[id] ?? [];
    totalAttempts += list.length;
    const timed = list.filter((a) => a.withinTarget !== null);
    timedAttemptsCount += timed.length;
    withinTargetCount += timed.filter((a) => a.withinTarget).length;
    if (list.length === 1 && list[0].outcome === 'correct') {
      firstTryCount += 1;
    } else {
      neededExtraPracticeCount += 1;
    }
    if (list.length > 1) {
      const state = findStateById(config, id);
      if (state) missed.push({ stateId: id, state: state.state, capital: state.capital });
    }
  });

  return {
    regionId,
    regionName,
    timestamp: Date.now(),
    totalStates: ids.length,
    firstTryCount,
    neededExtraPracticeCount,
    withinTargetCount,
    timedAttemptsCount,
    totalAttempts,
    missed,
  };
}

export function QuizScreen() {
  const { regionId = '' } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { config, preferences, progress, addSessionSummary } = useAppState();

  const locationState = location.state as LocationState | null;
  const isAll = regionId === 'all';
  const region = config.regions.find((r) => r.id === regionId);
  const regionName = isAll ? 'All Regions' : region?.name ?? 'Practice';

  const allRegionStates = isAll ? getAllEnabledStates(config) : getEnabledStatesForRegion(config, regionId);

  const stateIds = useMemo(() => {
    if (locationState?.mode === 'missed') {
      const regionProgress = progress.regions[regionId];
      const enabledIds = new Set(allRegionStates.map((s) => s.id));
      const missedIds = regionProgress
        ? Object.keys(regionProgress.missedCounts).filter((id) => regionProgress.missedCounts[id] > 0 && enabledIds.has(id))
        : [];
      return missedIds.length > 0 ? missedIds : allRegionStates.map((s) => s.id);
    }
    return allRegionStates.map((s) => s.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const timerSeconds = locationState?.timerSeconds ?? null;
  const strict = locationState?.strict ?? false;

  const [session, setSession] = useState<GameEngineState>(() => createSession(stateIds));
  const [phase, setPhase] = useState<Phase>('asking');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [streakMessage, setStreakMessage] = useState<string | null>(null);
  const [pandaTapMessage, setPandaTapMessage] = useState<string | null>(null);
  const [pandaBounceKey, setPandaBounceKey] = useState(0);
  const [summary, setSummary] = useState<SessionSummary | null>(null);

  const responseStartedAtRef = useRef<number>(Date.now());
  const strictHandledRef = useRef<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const advanceTimeoutRef = useRef<number | null>(null);
  // Retains the last-drawn state through the brief "feedback" phase, when
  // session.currentId has already been cleared by recordAnswer().
  const lastStateRef = useRef<ReturnType<typeof findStateById>>(undefined);

  if (session.currentId) {
    const found = findStateById(config, session.currentId);
    if (found) lastStateRef.current = found;
  }
  const currentState = lastStateRef.current;
  const totalCount = stateIds.length;
  const masteredCount = session.masteredIds.length;

  const timer = useRecallTimer(timerSeconds, session.currentId, phase === 'asking');

  useEffect(() => {
    if (phase === 'asking' && session.currentId) {
      responseStartedAtRef.current = Date.now();
      strictHandledRef.current = null;
      setInputValue('');
      inputRef.current?.focus();
    }
  }, [session.currentId, phase]);

  useEffect(() => () => {
    if (advanceTimeoutRef.current) window.clearTimeout(advanceTimeoutRef.current);
  }, []);

  const advanceAfterFeedback = useCallback(
    (updatedSession: GameEngineState, delay: number) => {
      advanceTimeoutRef.current = window.setTimeout(() => {
        setFeedback(null);
        if (isSessionComplete(updatedSession, totalCount)) {
          const finalSummary = buildSummary(updatedSession, stateIds, config, regionId, regionName);
          setSummary(finalSummary);
          addSessionSummary(finalSummary);
          setPhase('complete');
          return;
        }
        const drawn = drawNext(updatedSession);
        setSession(drawn);
        setPhase('asking');
      }, delay);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [totalCount, stateIds, regionId, regionName],
  );

  const submitOutcome = useCallback(
    (outcome: AnswerOutcome, opts?: { wasFuzzy?: boolean; elapsedMsOverride?: number; timeoutLabel?: boolean }) => {
      if (phase !== 'asking' || !session.currentId) return;
      const stateEntry = findStateById(config, session.currentId);
      if (!stateEntry) return;

      const elapsedMs = opts?.elapsedMsOverride ?? Date.now() - responseStartedAtRef.current;
      const withinTarget = timerSeconds === null ? null : elapsedMs <= timerSeconds * 1000;

      setFeedback({
        outcome: opts?.timeoutLabel ? 'timeout' : outcome,
        state: stateEntry.state,
        capital: stateEntry.capital,
        wasFuzzy: opts?.wasFuzzy ?? false,
      });
      setPhase('feedback');

      if (outcome === 'correct') {
        const newStreak = session.streak + 1;
        const milestoneMessage = STREAK_MESSAGES[newStreak];
        if (milestoneMessage) {
          setStreakMessage(milestoneMessage);
          setPandaBounceKey((k) => k + 1);
          window.setTimeout(() => setStreakMessage(null), 2200);
        }
      }

      const updatedSession = recordAnswer(session, outcome, elapsedMs, withinTarget);
      setSession(updatedSession);
      advanceAfterFeedback(updatedSession, outcome === 'correct' ? 2750 : 3350);
    },
    [phase, session, config, timerSeconds, advanceAfterFeedback],
  );

  // Strict-timer auto-timeout.
  useEffect(() => {
    if (!strict || !timer.expired || phase !== 'asking' || !session.currentId) return;
    if (strictHandledRef.current === session.currentId) return;
    strictHandledRef.current = session.currentId;
    submitOutcome('wrong', { elapsedMsOverride: timerSeconds ? timerSeconds * 1000 : undefined, timeoutLabel: true });
  }, [strict, timer.expired, phase, session.currentId, submitOutcome, timerSeconds]);

  const handleSubmitTyped = () => {
    if (!currentState || inputValue.trim().length === 0) return;
    const result = checkAnswer(inputValue, currentState.capital, config.settings.fuzzyMatchingEnabled);
    submitOutcome(result.correct ? 'correct' : 'wrong', { wasFuzzy: result.wasFuzzyMatch });
  };

  const handleSkip = () => submitOutcome('skip');
  const handleMarkCorrect = () => submitOutcome('correct');
  const handleMarkMissed = () => submitOutcome('skip');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmitTyped();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleSkip();
    }
  };

  const pandaMood: PandaMood = (() => {
    if (phase === 'feedback' && feedback) {
      if (feedback.outcome === 'correct') return 'celebrating';
      if (feedback.outcome === 'skip') return 'shrug';
      return 'supportive';
    }
    if (timer.remainingSeconds !== null && timer.remainingSeconds > 0 && timer.remainingSeconds <= 2) return 'excited';
    return 'thinking';
  })();

  const handlePandaInteract = () => {
    const msg = PANDA_TAP_MESSAGES[Math.floor(Math.random() * PANDA_TAP_MESSAGES.length)];
    setPandaTapMessage(msg);
    window.setTimeout(() => setPandaTapMessage(null), 1400);
  };

  if (phase === 'complete' && summary) {
    return (
      <EndOfRegionSummary
        summary={summary}
        showConfetti={config.settings.confetti}
        celebrationsEnabled={config.settings.celebrationAnimations}
        studentName={preferences.profile.name}
        onPracticeAgain={() =>
          navigate(`/practice/${regionId}/play`, {
            replace: true,
            state: { timerSeconds, strict, mode: 'normal' },
          })
        }
        onPracticeMissed={() =>
          navigate(`/practice/${regionId}/play`, {
            replace: true,
            state: { timerSeconds, strict, mode: 'missed' },
          })
        }
        onChooseAnother={() => navigate('/')}
        onAllRegions={regionId !== 'all' ? () => navigate('/practice/all') : undefined}
      />
    );
  }

  if (!currentState) {
    return (
      <div className="card text-center">
        <p>Loading...</p>
      </div>
    );
  }

  const ringCircumference = 2 * Math.PI * 32;
  const ringFraction = timerSeconds && timer.remainingSeconds !== null ? timer.remainingSeconds / timerSeconds : 0;

  return (
    <div className="quiz-layout" style={{ paddingTop: 8 }}>
      <div className="quiz-header">
        <div>
          <span className="eyebrow">{regionName.toUpperCase()}</span>
          <div className="row-wrap" style={{ marginTop: 4 }}>
            <strong>
              {masteredCount} / {totalCount} mastered
            </strong>
            <span className="pill">Streak: {session.streak}</span>
          </div>
        </div>
        <Panda mood={pandaMood} size={92} onInteract={handlePandaInteract} bounceKey={pandaBounceKey} animationsEnabled={config.settings.pandaAnimations} />
      </div>

      {pandaTapMessage && <div className="pill text-center" style={{ alignSelf: 'center' }}>{pandaTapMessage}</div>}
      {streakMessage && (
        <div className="pill pill-success text-center" style={{ alignSelf: 'center', fontSize: '1.1rem' }}>
          {streakMessage}
        </div>
      )}

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${totalCount === 0 ? 0 : (masteredCount / totalCount) * 100}%` }} />
      </div>

      <div className="quiz-card">
        {timerSeconds !== null && phase === 'asking' && (
          <div className="timer-ring">
            <svg width="74" height="74" viewBox="0 0 74 74">
              <circle cx="37" cy="37" r="32" fill="none" stroke="var(--color-border)" strokeWidth="7" />
              <circle
                cx="37"
                cy="37"
                r="32"
                fill="none"
                stroke={ringFraction <= 0.25 ? 'var(--color-warning)' : 'var(--color-primary)'}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringCircumference * (1 - Math.max(0, ringFraction))}
              />
            </svg>
            <span className="timer-ring__value">{timer.remainingSeconds}</span>
          </div>
        )}
        {timerSeconds !== null && phase === 'asking' && timer.expired && !strict && (
          <div className="pill pill-warning">Time!</div>
        )}

        <span className="quiz-state-name">{currentState.state}</span>
        <span className="quiz-prompt">What is the capital?</span>

        {phase === 'asking' && (
          <>
            <input
              ref={inputRef}
              className="input-large"
              type="text"
              placeholder="Type the capital..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCapitalize="words"
              spellCheck={false}
            />
            <div className="row-wrap" style={{ justifyContent: 'center', width: '100%' }}>
              <button type="button" className="btn btn-primary" onClick={handleSubmitTyped}>
                Submit
              </button>
            </div>
            <button type="button" className="btn btn-warning btn-large" onClick={handleSkip}>
              I Don't Know / Skip
            </button>
          </>
        )}

        {phase === 'feedback' && feedback && (
          <div className={`feedback-banner ${feedback.outcome === 'correct' ? 'is-correct' : feedback.outcome === 'skip' ? 'is-skip' : 'is-wrong'}`}>
            {feedback.outcome === 'timeout' && <div>Time!</div>}
            <div>
              {feedback.outcome === 'correct' ? 'Correct!' : feedback.outcome === 'skip' ? 'Missed one!' : 'Not quite!'}
            </div>
            <div className={feedback.outcome === 'correct' ? undefined : 'feedback-answer'}>
              {feedback.state} → {feedback.capital}
            </div>
            {feedback.outcome !== 'correct' && <div className="muted">You'll see this one again!</div>}
          </div>
        )}
      </div>

      <div className="parent-controls">
        <span className="muted" style={{ fontSize: '0.8rem' }}>
          Parent controls:
        </span>
        <button type="button" className="btn btn-secondary" onClick={handleMarkCorrect} disabled={phase !== 'asking'}>
          Mark Correct
        </button>
        <button type="button" className="btn btn-ghost" onClick={handleMarkMissed} disabled={phase !== 'asking'}>
          Mark Missed
        </button>
      </div>
    </div>
  );
}
