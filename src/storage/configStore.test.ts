import { beforeEach, describe, expect, it } from 'vitest';
import { createDefaultConfig } from '../data/defaultStates';
import { loadConfig, saveConfig } from './configStore';
import { buildConfigExport, buildFullBackup, parseConfigExport, parseFullBackup } from './backup';
import { loadPreferences } from './preferencesStore';
import { loadProgress } from './progressStore';
import { STORAGE_KEYS } from '../utils/storage';

describe('configStore', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('falls back to defaults when localStorage contains corrupted JSON', () => {
    window.localStorage.setItem(STORAGE_KEYS.config, '{ this is not valid json');
    const config = loadConfig();
    expect(config.states.length).toBe(50);
  });

  it('falls back to defaults when localStorage contains an unrelated shape', () => {
    window.localStorage.setItem(STORAGE_KEYS.config, JSON.stringify({ foo: 'bar' }));
    const config = loadConfig();
    expect(config.states.length).toBe(50);
  });

  it('persists and reloads a saved configuration', () => {
    const config = createDefaultConfig();
    config.states[0].enabled = false;
    saveConfig(config);
    const reloaded = loadConfig();
    expect(reloaded.states[0].enabled).toBe(false);
  });
});

describe('backup import/export', () => {
  it('round-trips a configuration export', () => {
    const config = createDefaultConfig();
    const exported = buildConfigExport(config);
    const parsed = parseConfigExport(JSON.stringify(exported));
    expect(parsed.ok).toBe(true);
    expect(parsed.data?.config.states.length).toBe(50);
  });

  it('round-trips a full backup including progress and preferences', () => {
    const config = createDefaultConfig();
    const prefs = loadPreferences();
    const progress = loadProgress();
    const backup = buildFullBackup(config, prefs, progress);
    const parsed = parseFullBackup(JSON.stringify(backup));
    expect(parsed.ok).toBe(true);
    expect(parsed.data?.preferences.profile.name).toBe('Matias');
  });

  it('rejects invalid JSON with a useful error message', () => {
    const result = parseConfigExport('not json at all {');
    expect(result.ok).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it('rejects a JSON file that is not a recognized export', () => {
    const result = parseConfigExport(JSON.stringify({ hello: 'world' }));
    expect(result.ok).toBe(false);
  });
});
