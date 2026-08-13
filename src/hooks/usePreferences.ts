import { useCallback, useState } from 'react';
import type { PreferencesData } from '../types';
import { loadPreferences, savePreferences } from '../storage/preferencesStore';

export function usePreferences() {
  const [preferences, setPreferences] = useState<PreferencesData>(() => loadPreferences());

  const updatePreferences = useCallback((updater: (prev: PreferencesData) => PreferencesData) => {
    setPreferences((prev) => {
      const next = updater(prev);
      savePreferences(next);
      return next;
    });
  }, []);

  const setRegionTimer = useCallback(
    (regionId: string, timerSeconds: number | null, strict: boolean) => {
      updatePreferences((prev) => ({
        ...prev,
        regionTimerSettings: { ...prev.regionTimerSettings, [regionId]: { timerSeconds, strict } },
        lastTimerSeconds: timerSeconds,
        lastStrict: strict,
      }));
    },
    [updatePreferences],
  );

  const replacePreferences = useCallback((next: PreferencesData) => {
    savePreferences(next);
    setPreferences(next);
  }, []);

  return { preferences, updatePreferences, setRegionTimer, replacePreferences };
}
