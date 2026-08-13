import type { AdminConfigData, Region, StateEntry } from '../types';

export interface RegionWithCount {
  region: Region;
  stateCount: number;
}

export function getSortedEnabledRegions(config: AdminConfigData): Region[] {
  return config.regions
    .filter((r) => r.enabled)
    .slice()
    .sort((a, b) => a.order - b.order);
}

export function getEnabledStatesForRegion(config: AdminConfigData, regionId: string): StateEntry[] {
  return config.states.filter((s) => s.enabled && s.regionId === regionId);
}

export function getRegionsWithCounts(config: AdminConfigData): RegionWithCount[] {
  return getSortedEnabledRegions(config).map((region) => ({
    region,
    stateCount: getEnabledStatesForRegion(config, region.id).length,
  }));
}

export function getAllEnabledStates(config: AdminConfigData): StateEntry[] {
  const enabledRegionIds = new Set(config.regions.filter((r) => r.enabled).map((r) => r.id));
  return config.states.filter((s) => s.enabled && enabledRegionIds.has(s.regionId));
}

export function findStateById(config: AdminConfigData, stateId: string): StateEntry | undefined {
  return config.states.find((s) => s.id === stateId);
}
