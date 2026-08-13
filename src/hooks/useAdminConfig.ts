import { useCallback, useState } from 'react';
import type { AdminConfigData } from '../types';
import { loadConfig, saveConfig } from '../storage/configStore';
import { createDefaultConfig } from '../data/defaultStates';

export function useAdminConfig() {
  const [config, setConfig] = useState<AdminConfigData>(() => loadConfig());

  const updateConfig = useCallback((updater: (prev: AdminConfigData) => AdminConfigData) => {
    setConfig((prev) => {
      const next = updater(prev);
      saveConfig(next);
      return next;
    });
  }, []);

  const replaceConfig = useCallback((next: AdminConfigData) => {
    saveConfig(next);
    setConfig(next);
  }, []);

  const resetToDefault = useCallback(() => {
    const next = createDefaultConfig();
    saveConfig(next);
    setConfig(next);
  }, []);

  return { config, updateConfig, replaceConfig, resetToDefault };
}
