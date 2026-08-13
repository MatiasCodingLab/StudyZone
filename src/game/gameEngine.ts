// Pure, framework-agnostic game engine implementing the core learning rule:
//   Correct  -> state leaves the round (mastered).
//   Wrong/Skip -> state re-enters the pool, but not immediately; whenever
//                 possible at least 2 other states are asked first.
// Kept dependency-free and side-effect-free so it is easy to unit test.

import type { QuizDirection } from '../types';

export type AnswerOutcome = 'correct' | 'wrong' | 'skip';

export interface AttemptRecord {
  outcome: AnswerOutcome;
  responseTimeMs: number;
  withinTarget: boolean | null;
}

export interface GameEngineState {
  direction: QuizDirection;
  /** Ids still queued to be asked (may include ids returning from a miss). */
  queue: string[];
  /** Ids the student has answered correctly this session. */
  masteredIds: string[];
  /** Id currently on screen, or null if none drawn yet / round finished. */
  currentId: string | null;
  /** Every attempt made, per state id, in chronological order. */
  attempts: Record<string, AttemptRecord[]>;
  /** Consecutive correct answers (resets on wrong/skip). */
  streak: number;
  /** Highest streak reached this session. */
  bestStreak: number;
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function createSession(
  stateIds: string[],
  directionOrShuffle: QuizDirection | (<T>(items: T[]) => T[]) = 'state-to-capital',
  shuffleFn: <T>(items: T[]) => T[] = shuffle,
): GameEngineState {
  const direction = typeof directionOrShuffle === 'function' ? 'state-to-capital' : directionOrShuffle;
  const activeShuffle = typeof directionOrShuffle === 'function' ? directionOrShuffle : shuffleFn;
  const queue = activeShuffle(stateIds);
  const [currentId, ...rest] = queue;
  return {
    direction,
    queue: rest,
    masteredIds: [],
    currentId: currentId ?? null,
    attempts: {},
    streak: 0,
    bestStreak: 0,
  };
}

/** Re-insert a missed/skipped state so it reappears after ~2 other states. */
function reinsertAfterGap(queue: string[], stateId: string): string[] {
  const gap = Math.min(queue.length, 2);
  const next = [...queue];
  next.splice(gap, 0, stateId);
  return next;
}

export function recordAnswer(session: GameEngineState, outcome: AnswerOutcome, responseTimeMs: number, withinTarget: boolean | null): GameEngineState {
  const stateId = session.currentId;
  if (!stateId) return session;

  const priorAttempts = session.attempts[stateId] ?? [];
  const attempts: Record<string, AttemptRecord[]> = {
    ...session.attempts,
    [stateId]: [...priorAttempts, { outcome, responseTimeMs, withinTarget }],
  };

  if (outcome === 'correct') {
    const streak = session.streak + 1;
    return {
      ...session,
      attempts,
      masteredIds: [...session.masteredIds, stateId],
      currentId: null,
      streak,
      bestStreak: Math.max(session.bestStreak, streak),
    };
  }

  return {
    ...session,
    attempts,
    queue: reinsertAfterGap(session.queue, stateId),
    currentId: null,
    streak: 0,
  };
}

/** Draw the next state into `currentId` if one isn't already active. */
export function drawNext(session: GameEngineState): GameEngineState {
  if (session.currentId) return session;
  if (session.queue.length === 0) return session;
  const [next, ...rest] = session.queue;
  return { ...session, currentId: next, queue: rest };
}

export function isSessionComplete(session: GameEngineState, totalStates: number): boolean {
  return session.currentId === null && session.queue.length === 0 && session.masteredIds.length === totalStates;
}

export interface StateStats {
  attemptsCount: number;
  firstTryCorrect: boolean;
  timedAttemptsCount: number;
  withinTargetCount: number;
}

export function computeStateStats(session: GameEngineState, stateId: string): StateStats {
  const list = session.attempts[stateId] ?? [];
  const timed = list.filter((a) => a.withinTarget !== null);
  return {
    attemptsCount: list.length,
    firstTryCorrect: list.length === 1 && list[0].outcome === 'correct',
    timedAttemptsCount: timed.length,
    withinTargetCount: timed.filter((a) => a.withinTarget).length,
  };
}
