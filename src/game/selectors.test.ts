import { describe, expect, it } from 'vitest';
import { createDefaultConfig } from '../data/defaultStates';
import { getAllEnabledStates, getEnabledStatesForRegion, getRegionsWithCounts } from './selectors';

describe('selectors', () => {
  it('computes region counts dynamically from state assignments', () => {
    const config = createDefaultConfig();
    const west = getRegionsWithCounts(config).find((r) => r.region.id === 'west');
    expect(west?.stateCount).toBe(11);
  });

  it('updates region counts when a state is reassigned to another region', () => {
    const config = createDefaultConfig();
    const colorado = config.states.find((s) => s.id === 'colorado')!;
    colorado.regionId = 'southwest';
    const counts = getRegionsWithCounts(config);
    expect(counts.find((r) => r.region.id === 'west')?.stateCount).toBe(10);
    expect(counts.find((r) => r.region.id === 'southwest')?.stateCount).toBe(5);
  });

  it('excludes disabled states from practice', () => {
    const config = createDefaultConfig();
    const california = config.states.find((s) => s.id === 'california')!;
    california.enabled = false;
    const westStates = getEnabledStatesForRegion(config, 'west');
    expect(westStates.find((s) => s.id === 'california')).toBeUndefined();
    expect(westStates.length).toBe(10);
  });

  it('renaming a region does not break its state assignments', () => {
    const config = createDefaultConfig();
    const west = config.regions.find((r) => r.id === 'west')!;
    west.name = 'Western States';
    const westStates = getEnabledStatesForRegion(config, 'west');
    expect(westStates.length).toBe(11);
  });

  it('All Regions combines every enabled state across enabled regions', () => {
    const config = createDefaultConfig();
    config.regions.find((r) => r.id === 'southwest')!.enabled = false;
    const all = getAllEnabledStates(config);
    expect(all.length).toBe(46); // 50 - 4 southwest states
    expect(all.some((s) => s.regionId === 'southwest')).toBe(false);
  });
});
