import { describe, expect, it } from 'vitest';
import { emptyRegionProgress, migrateProgress, recordSessionSummary } from './progressStore';
import type { ProgressData } from '../types';

describe('direction-separated progress', () => {
  it('migrates existing region progress to State to Capital', () => {
    const legacyRegion = emptyRegionProgress();
    legacyRegion.missedCounts.california = 2;
    const migrated = migrateProgress({
      schemaVersion: 1,
      regions: { west: legacyRegion },
      recentMissedStateIds: ['california'],
    });

    expect(migrated.regions.west['state-to-capital'].missedCounts.california).toBe(2);
    expect(migrated.regions.west['capital-to-state'].missedCounts).toEqual({});
    expect(migrated.recentMissedStateIds['state-to-capital']).toEqual(['california']);
    expect(migrated.recentMissedStateIds['capital-to-state']).toEqual([]);
  });

  it('records statistics independently for each direction', () => {
    const progress: ProgressData = migrateProgress(null);
    const base = {
      regionId: 'west',
      regionName: 'West',
      timestamp: 1,
      totalStates: 1,
      firstTryCount: 1,
      neededExtraPracticeCount: 0,
      withinTargetCount: 1,
      timedAttemptsCount: 1,
      totalAttempts: 1,
      missed: [],
    };
    const stateToCapital = recordSessionSummary(progress, { ...base, direction: 'state-to-capital' });
    const both = recordSessionSummary(stateToCapital, {
      ...base,
      direction: 'capital-to-state',
      firstTryCount: 0,
      neededExtraPracticeCount: 1,
      missed: [{ stateId: 'california', state: 'California', capital: 'Sacramento' }],
    });

    expect(both.regions.west['state-to-capital'].correctFirstTryTotal).toBe(1);
    expect(both.regions.west['capital-to-state'].correctFirstTryTotal).toBe(0);
    expect(both.regions.west['capital-to-state'].missedCounts.california).toBe(1);
  });
});
