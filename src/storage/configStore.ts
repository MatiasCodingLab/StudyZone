import type { AdminConfigData } from '../types';
import { createDefaultConfig, CONFIG_SCHEMA_VERSION } from '../data/defaultStates';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';

function isValidConfig(value: unknown): value is AdminConfigData {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Partial<AdminConfigData>;
  return Array.isArray(v.states) && Array.isArray(v.regions) && typeof v.settings === 'object' && typeof v.schemaVersion === 'number';
}

export function loadConfig(): AdminConfigData {
  const config = loadJSON<AdminConfigData>(STORAGE_KEYS.config, createDefaultConfig, isValidConfig);
  if (config.schemaVersion !== CONFIG_SCHEMA_VERSION) {
    return { ...config, schemaVersion: CONFIG_SCHEMA_VERSION };
  }
  return config;
}

export function saveConfig(config: AdminConfigData): void {
  saveJSON(STORAGE_KEYS.config, config);
}

export { isValidConfig };
