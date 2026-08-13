import type { PreferencesData } from '../types';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';

export const PREFERENCES_SCHEMA_VERSION = 1;
export const DEFAULT_TIMER_SECONDS = 8;

export function createDefaultPreferences(): PreferencesData {
  return {
    schemaVersion: PREFERENCES_SCHEMA_VERSION,
    profile: { name: '', mascotId: 'panda' },
    regionTimerSettings: {},
    lastTimerSeconds: DEFAULT_TIMER_SECONDS,
    lastStrict: false,
  };
}

function isValidPreferences(value: unknown): value is PreferencesData {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Partial<PreferencesData>;
  return typeof v.profile === 'object' && typeof v.regionTimerSettings === 'object' && typeof v.schemaVersion === 'number';
}

export function loadPreferences(): PreferencesData {
  const prefs = loadJSON<PreferencesData>(STORAGE_KEYS.preferences, createDefaultPreferences, isValidPreferences);
  if (prefs.schemaVersion !== PREFERENCES_SCHEMA_VERSION) {
    return { ...prefs, schemaVersion: PREFERENCES_SCHEMA_VERSION };
  }
  return prefs;
}

export function savePreferences(prefs: PreferencesData): void {
  saveJSON(STORAGE_KEYS.preferences, prefs);
}

/** Resolve the timer to use for a region: its own remembered value, or the
 * last globally-used value, or the first-time default of 8 seconds. */
export function resolveRegionTimer(prefs: PreferencesData, regionId: string): { timerSeconds: number | null; strict: boolean } {
  const regionSetting = prefs.regionTimerSettings[regionId];
  if (regionSetting) return regionSetting;
  return { timerSeconds: prefs.lastTimerSeconds ?? DEFAULT_TIMER_SECONDS, strict: prefs.lastStrict };
}
