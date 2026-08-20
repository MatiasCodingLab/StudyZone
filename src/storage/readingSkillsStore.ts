// Local, per-device progress tracking for Language Arts reading-skill
// modules (Main Idea today; Inference, Context Clues, etc. later). Keyed by
// module id so each module gets its own independent progress record while
// sharing the same storage/schema plumbing.

import type { ReadingDistractorType, ReadingSkillProgress } from '../types';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';

export const READING_SKILL_SCHEMA_VERSION = 1;

const RECENT_QUESTION_HISTORY_LIMIT = 15;

type ReadingSkillsData = Record<string, ReadingSkillProgress>;

export function createDefaultSkillProgress(): ReadingSkillProgress {
  return {
    schemaVersion: READING_SKILL_SCHEMA_VERSION,
    attemptedCount: 0,
    correctCount: 0,
    recentQuestionIds: [],
    mistakeTypeCounts: {},
  };
}

function isValidSkillsData(value: unknown): value is ReadingSkillsData {
  return typeof value === 'object' && value !== null;
}

function loadAllSkillsProgress(): ReadingSkillsData {
  return loadJSON<ReadingSkillsData>(STORAGE_KEYS.readingSkills, () => ({}), isValidSkillsData);
}

function saveAllSkillsProgress(data: ReadingSkillsData): void {
  saveJSON(STORAGE_KEYS.readingSkills, data);
}

export function loadSkillProgress(moduleId: string): ReadingSkillProgress {
  const all = loadAllSkillsProgress();
  return all[moduleId] ?? createDefaultSkillProgress();
}

export interface QuizResultAttempt {
  questionId: string;
  correct: boolean;
  choiceType: ReadingDistractorType;
}

/** Fold a completed quiz session's attempts into a module's stored progress. */
export function recordQuizResult(moduleId: string, attempts: QuizResultAttempt[]): ReadingSkillProgress {
  const all = loadAllSkillsProgress();
  const existing = all[moduleId] ?? createDefaultSkillProgress();

  const mistakeTypeCounts = { ...existing.mistakeTypeCounts };
  attempts.forEach((attempt) => {
    if (!attempt.correct) {
      mistakeTypeCounts[attempt.choiceType] = (mistakeTypeCounts[attempt.choiceType] ?? 0) + 1;
    }
  });

  const recentQuestionIds = Array.from(
    new Set([...attempts.map((a) => a.questionId), ...existing.recentQuestionIds]),
  ).slice(0, RECENT_QUESTION_HISTORY_LIMIT);

  const updated: ReadingSkillProgress = {
    schemaVersion: READING_SKILL_SCHEMA_VERSION,
    attemptedCount: existing.attemptedCount + attempts.length,
    correctCount: existing.correctCount + attempts.filter((a) => a.correct).length,
    recentQuestionIds,
    mistakeTypeCounts,
  };

  saveAllSkillsProgress({ ...all, [moduleId]: updated });
  return updated;
}
