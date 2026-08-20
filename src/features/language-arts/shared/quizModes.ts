import type { QuizModeId, ReadingQuestionDifficulty } from '../../../types';

export interface QuizModeConfig {
  id: QuizModeId;
  label: string;
  description: string;
  questionCount: number;
  /** Difficulties this mode draws from, in priority order. */
  difficulties: ReadingQuestionDifficulty[];
}

export const QUIZ_MODES: Record<QuizModeId, QuizModeConfig> = {
  quick: {
    id: 'quick',
    label: 'Quick Practice',
    description: '5 questions',
    questionCount: 5,
    difficulties: ['easy', 'grade-level'],
  },
  practice: {
    id: 'practice',
    label: 'Practice',
    description: '10 questions',
    questionCount: 10,
    difficulties: ['easy', 'grade-level', 'challenge'],
  },
  challenge: {
    id: 'challenge',
    label: 'Challenge',
    description: '10 harder questions',
    questionCount: 10,
    difficulties: ['challenge', 'grade-level'],
  },
};
