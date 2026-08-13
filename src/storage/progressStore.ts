import type { ProgressData, RegionProgress, SessionSummary } from '../types';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';

export const PROGRESS_SCHEMA_VERSION = 1;

export function createDefaultProgress(): ProgressData {
  return { schemaVersion: PROGRESS_SCHEMA_VERSION, regions: {}, recentMissedStateIds: [] };
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

function isValidProgress(value: unknown): value is ProgressData {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Partial<ProgressData>;
  return typeof v.regions === 'object' && typeof v.schemaVersion === 'number';
}

export function loadProgress(): ProgressData {
  const progress = loadJSON<ProgressData>(STORAGE_KEYS.progress, createDefaultProgress, isValidProgress);
  if (progress.schemaVersion !== PROGRESS_SCHEMA_VERSION) {
    return { ...progress, schemaVersion: PROGRESS_SCHEMA_VERSION };
  }
  return progress;
}

export function saveProgress(progress: ProgressData): void {
  saveJSON(STORAGE_KEYS.progress, progress);
}

export function recordSessionSummary(progress: ProgressData, summary: SessionSummary): ProgressData {
  const existing = progress.regions[summary.regionId] ?? emptyRegionProgress();
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
    new Set([...summary.missed.map((m) => m.stateId), ...progress.recentMissedStateIds]),
  ).slice(0, 20);

  return {
    ...progress,
    regions: { ...progress.regions, [summary.regionId]: updatedRegion },
    recentMissedStateIds,
  };
}
