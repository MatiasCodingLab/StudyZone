// Single source of truth for the 50 U.S. states, their capitals, and default
// Practice Region assignments. Admin edits are layered on top of this at
// runtime and persisted to localStorage - this file is never mutated.
import type { AdminConfigData, Region, StateEntry } from '../types';

export const DEFAULT_REGIONS: Region[] = [
  { id: 'northeast', name: 'Northeast', enabled: true, order: 0 },
  { id: 'southeast', name: 'Southeast', enabled: true, order: 1 },
  { id: 'midwest', name: 'Midwest', enabled: true, order: 2 },
  { id: 'southwest', name: 'Southwest', enabled: true, order: 3 },
  { id: 'west', name: 'West', enabled: true, order: 4 },
];

interface RawState {
  state: string;
  capital: string;
  regionId: string;
}

const RAW_STATES: RawState[] = [
  { state: 'Connecticut', capital: 'Hartford', regionId: 'northeast' },
  { state: 'Delaware', capital: 'Dover', regionId: 'northeast' },
  { state: 'Maine', capital: 'Augusta', regionId: 'northeast' },
  { state: 'Maryland', capital: 'Annapolis', regionId: 'northeast' },
  { state: 'Massachusetts', capital: 'Boston', regionId: 'northeast' },
  { state: 'New Hampshire', capital: 'Concord', regionId: 'northeast' },
  { state: 'New Jersey', capital: 'Trenton', regionId: 'northeast' },
  { state: 'New York', capital: 'Albany', regionId: 'northeast' },
  { state: 'Pennsylvania', capital: 'Harrisburg', regionId: 'northeast' },
  { state: 'Rhode Island', capital: 'Providence', regionId: 'northeast' },
  { state: 'Vermont', capital: 'Montpelier', regionId: 'northeast' },

  { state: 'Alabama', capital: 'Montgomery', regionId: 'southeast' },
  { state: 'Arkansas', capital: 'Little Rock', regionId: 'southeast' },
  { state: 'Florida', capital: 'Tallahassee', regionId: 'southeast' },
  { state: 'Georgia', capital: 'Atlanta', regionId: 'southeast' },
  { state: 'Kentucky', capital: 'Frankfort', regionId: 'southeast' },
  { state: 'Louisiana', capital: 'Baton Rouge', regionId: 'southeast' },
  { state: 'Mississippi', capital: 'Jackson', regionId: 'southeast' },
  { state: 'North Carolina', capital: 'Raleigh', regionId: 'southeast' },
  { state: 'South Carolina', capital: 'Columbia', regionId: 'southeast' },
  { state: 'Tennessee', capital: 'Nashville', regionId: 'southeast' },
  { state: 'Virginia', capital: 'Richmond', regionId: 'southeast' },
  { state: 'West Virginia', capital: 'Charleston', regionId: 'southeast' },

  { state: 'Illinois', capital: 'Springfield', regionId: 'midwest' },
  { state: 'Indiana', capital: 'Indianapolis', regionId: 'midwest' },
  { state: 'Iowa', capital: 'Des Moines', regionId: 'midwest' },
  { state: 'Kansas', capital: 'Topeka', regionId: 'midwest' },
  { state: 'Michigan', capital: 'Lansing', regionId: 'midwest' },
  { state: 'Minnesota', capital: 'Saint Paul', regionId: 'midwest' },
  { state: 'Missouri', capital: 'Jefferson City', regionId: 'midwest' },
  { state: 'Nebraska', capital: 'Lincoln', regionId: 'midwest' },
  { state: 'North Dakota', capital: 'Bismarck', regionId: 'midwest' },
  { state: 'Ohio', capital: 'Columbus', regionId: 'midwest' },
  { state: 'South Dakota', capital: 'Pierre', regionId: 'midwest' },
  { state: 'Wisconsin', capital: 'Madison', regionId: 'midwest' },

  { state: 'Arizona', capital: 'Phoenix', regionId: 'southwest' },
  { state: 'New Mexico', capital: 'Santa Fe', regionId: 'southwest' },
  { state: 'Oklahoma', capital: 'Oklahoma City', regionId: 'southwest' },
  { state: 'Texas', capital: 'Austin', regionId: 'southwest' },

  { state: 'Alaska', capital: 'Juneau', regionId: 'west' },
  { state: 'California', capital: 'Sacramento', regionId: 'west' },
  { state: 'Colorado', capital: 'Denver', regionId: 'west' },
  { state: 'Hawaii', capital: 'Honolulu', regionId: 'west' },
  { state: 'Idaho', capital: 'Boise', regionId: 'west' },
  { state: 'Montana', capital: 'Helena', regionId: 'west' },
  { state: 'Nevada', capital: 'Carson City', regionId: 'west' },
  { state: 'Oregon', capital: 'Salem', regionId: 'west' },
  { state: 'Utah', capital: 'Salt Lake City', regionId: 'west' },
  { state: 'Washington', capital: 'Olympia', regionId: 'west' },
  { state: 'Wyoming', capital: 'Cheyenne', regionId: 'west' },
];

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const DEFAULT_STATES: StateEntry[] = RAW_STATES.map((raw) => ({
  id: slugify(raw.state),
  state: raw.state,
  capital: raw.capital,
  regionId: raw.regionId,
  enabled: true,
}));

export const DEFAULT_SETTINGS = {
  fuzzyMatchingEnabled: true,
  allRegionsChallengeEnabled: true,
  showPanda: true,
  pandaAnimations: true,
  pandaSounds: false,
  celebrationAnimations: true,
  confetti: true,
};

export const CONFIG_SCHEMA_VERSION = 1;

export function createDefaultConfig(): AdminConfigData {
  return {
    schemaVersion: CONFIG_SCHEMA_VERSION,
    states: DEFAULT_STATES.map((s) => ({ ...s })),
    regions: DEFAULT_REGIONS.map((r) => ({ ...r })),
    settings: { ...DEFAULT_SETTINGS },
  };
}
