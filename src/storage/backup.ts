import type { AdminConfigData, ConfigExport, FullBackup, PreferencesData, ProgressData } from '../types';
import { CONFIG_SCHEMA_VERSION } from '../data/defaultStates';
import { isValidConfig } from './configStore';
import { PREFERENCES_SCHEMA_VERSION } from './preferencesStore';
import { PROGRESS_SCHEMA_VERSION } from './progressStore';

export function buildConfigExport(config: AdminConfigData): ConfigExport {
  return { schemaVersion: CONFIG_SCHEMA_VERSION, exportedAt: Date.now(), kind: 'config', config };
}

export function buildFullBackup(config: AdminConfigData, preferences: PreferencesData, progress: ProgressData): FullBackup {
  return {
    schemaVersion: CONFIG_SCHEMA_VERSION,
    exportedAt: Date.now(),
    kind: 'full-backup',
    config,
    preferences,
    progress,
  };
}

export interface ParseResult<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

export function parseConfigExport(jsonText: string): ParseResult<ConfigExport> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    return { ok: false, error: 'That does not look like valid JSON. Please check the file or pasted text.' };
  }
  if (typeof parsed !== 'object' || parsed === null) {
    return { ok: false, error: 'The configuration file is missing expected data.' };
  }
  const v = parsed as Partial<ConfigExport>;
  if (v.kind !== 'config' || !v.config || !isValidConfig(v.config)) {
    return { ok: false, error: 'This file does not look like a Capitals Quest configuration export.' };
  }
  return { ok: true, data: v as ConfigExport };
}

export function parseFullBackup(jsonText: string): ParseResult<FullBackup> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    return { ok: false, error: 'That does not look like valid JSON. Please check the file or pasted text.' };
  }
  if (typeof parsed !== 'object' || parsed === null) {
    return { ok: false, error: 'The backup file is missing expected data.' };
  }
  const v = parsed as Partial<FullBackup>;
  if (v.kind !== 'full-backup' || !v.config || !v.preferences || !v.progress || !isValidConfig(v.config)) {
    return { ok: false, error: 'This file does not look like a Capitals Quest full backup.' };
  }
  return { ok: true, data: v as FullBackup };
}

export const SCHEMA_VERSIONS = {
  config: CONFIG_SCHEMA_VERSION,
  preferences: PREFERENCES_SCHEMA_VERSION,
  progress: PROGRESS_SCHEMA_VERSION,
};
