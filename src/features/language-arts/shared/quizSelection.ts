// Pure, framework-agnostic helpers for picking a randomized, non-repeating
// set of reading-comprehension questions for a quiz session. Shared by any
// Language Arts module (Main Idea today; Inference, Context Clues, etc. later).

import type { QuizModeId, ReadingQuizQuestion } from '../../../types';
import { QUIZ_MODES } from './quizModes';

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Selects `questionCount` unique questions for the given mode. Prefers
 * questions matching the mode's difficulty list, and prefers questions the
 * student hasn't seen recently. Falls back to repeats only if the bank is
 * too small to fill the quiz otherwise.
 */
export function selectQuizQuestions(
  bank: ReadingQuizQuestion[],
  modeId: QuizModeId,
  recentQuestionIds: string[] = [],
): ReadingQuizQuestion[] {
  const mode = QUIZ_MODES[modeId];
  const eligible = bank.filter((q) => mode.difficulties.includes(q.difficulty));
  const pool = eligible.length >= mode.questionCount ? eligible : bank;

  const recentSet = new Set(recentQuestionIds);
  const fresh = shuffle(pool.filter((q) => !recentSet.has(q.id)));
  const seen = shuffle(pool.filter((q) => recentSet.has(q.id)));

  const ordered = [...fresh, ...seen];
  return ordered.slice(0, Math.min(mode.questionCount, ordered.length));
}

export { shuffle };
