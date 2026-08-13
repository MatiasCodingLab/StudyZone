import type { ProgressData, QuizDirection, RegionProgress, SessionSummary } from '../types';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';

export const PROGRESS_SCHEMA_VERSION = 2;

export const QUIZ_DIRECTIONS: QuizDirection[] = ['state-to-capital', 'capital-to-state'];

export function createDefaultProgress(): ProgressData {
  return {
    schemaVersion: PROGRESS_SCHEMA_VERSION,
    regions: {},
    recentMissedStateIds: { 'state-to-capital': [], 'capital-to-state': [] },
  };
}

export function emptyRegionProgress(): RegionProgress {
  return {
    sessionsCount: 0,
    lastPracticed: null,
    attemptsTotal: 0,
    correctFirstTryTotal: 0,
    withinTargetTotal: 0,
    timedAttemptsTotal: 0,
    bestSessionAccuracy: null,
    missedCounts: {},
    lastSummary: null,
  };
}

export function loadProgress(): ProgressData {
  const progress = loadJSON<unknown>(STORAGE_KEYS.progress, createDefaultProgress);
  return migrateProgress(progress);
}

export function saveProgress(progress: ProgressData): void {
  saveJSON(STORAGE_KEYS.progress, progress);
}

export function recordSessionSummary(progress: ProgressData, summary: SessionSummary): ProgressData {
  const regionProgress = progress.regions[summary.regionId] ?? createDirectionProgress();
  const existing = regionProgress[summary.direction] ?? emptyRegionProgress();
  const accuracy = summary.totalStates > 0 ? summary.firstTryCount / summary.totalStates : 0;

  const missedCounts = { ...existing.missedCounts };
  summary.missed.forEach((m) => {
    missedCounts[m.stateId] = (missedCounts[m.stateId] ?? 0) + 1;
  });

  const updatedRegion: RegionProgress = {
    sessionsCount: existing.sessionsCount + 1,
    lastPracticed: summary.timestamp,
    attemptsTotal: existing.attemptsTotal + summary.totalAttempts,
    correctFirstTryTotal: existing.correctFirstTryTotal + summary.firstTryCount,
    withinTargetTotal: existing.withinTargetTotal + summary.withinTargetCount,
    timedAttemptsTotal: existing.timedAttemptsTotal + summary.timedAttemptsCount,
    bestSessionAccuracy: existing.bestSessionAccuracy === null ? accuracy : Math.max(existing.bestSessionAccuracy, accuracy),
    missedCounts,
    lastSummary: summary,
  };

  const recentMissedStateIds = Array.from(
    new Set([
      ...summary.missed.map((m) => m.stateId),
      ...(progress.recentMissedStateIds[summary.direction] ?? []),
    ]),
  ).slice(0, 20);

  return {
    ...progress,
    regions: {
      ...progress.regions,
      [summary.regionId]: { ...regionProgress, [summary.direction]: updatedRegion },
    },
    recentMissedStateIds: { ...progress.recentMissedStateIds, [summary.direction]: recentMissedStateIds },
  };
}

function createDirectionProgress(): Record<QuizDirection, RegionProgress> {
  return { 'state-to-capital': emptyRegionProgress(), 'capital-to-state': emptyRegionProgress() };
}

function isRegionProgress(value: unknown): value is RegionProgress {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Partial<RegionProgress>;
  return typeof v.missedCounts === 'object' && typeof v.sessionsCount === 'number';
}

export function migrateProgress(value: unknown): ProgressData {
  if (typeof value !== 'object' || value === null) return createDefaultProgress();
  const raw = value as Partial<ProgressData> & { regions?: Record<string, unknown>; recentMissedStateIds?: unknown };
  const regions: ProgressData['regions'] = {};

  Object.entries(raw.regions ?? {}).forEach(([regionId, regionValue]) => {
    if (isRegionProgress(regionValue)) {
      regions[regionId] = { 'state-to-capital': regionValue, 'capital-to-state': emptyRegionProgress() };
      return;
    }
    if (typeof regionValue === 'object' && regionValue !== null) {
      const directions = regionValue as Partial<Record<QuizDirection, RegionProgress>>;
      regions[regionId] = {
        'state-to-capital': directions['state-to-capital'] ?? emptyRegionProgress(),
        'capital-to-state': directions['capital-to-state'] ?? emptyRegionProgress(),
      };
    }
  });

  const rawMisses = raw.recentMissedStateIds;
  const recentMissedStateIds = Array.isArray(rawMisses)
    ? { 'state-to-capital': rawMisses.filter((id): id is string => typeof id === 'string'), 'capital-to-state': [] }
    : {
        'state-to-capital': Array.isArray((rawMisses as Record<string, unknown> | undefined)?.['state-to-capital'])
          ? ((rawMisses as Record<string, string[]>)['state-to-capital'] ?? [])
          : [],
        'capital-to-state': Array.isArray((rawMisses as Record<string, unknown> | undefined)?.['capital-to-state'])
          ? ((rawMisses as Record<string, string[]>)['capital-to-state'] ?? [])
          : [],
      };

  return { schemaVersion: PROGRESS_SCHEMA_VERSION, regions, recentMissedStateIds };
}
