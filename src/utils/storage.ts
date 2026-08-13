// Generic, safe localStorage read/write helpers. Every stored blob is
// versioned (schemaVersion) so future releases can migrate old data instead
// of crashing. Any corrupted/unreadable JSON silently falls back to defaults.

export const STORAGE_KEYS = {
  config: 'capitals-quest:config:v1',
  preferences: 'capitals-quest:preferences:v1',
  progress: 'capitals-quest:progress:v1',
} as const;

export function loadJSON<T>(key: string, createDefault: () => T, isValid?: (value: unknown) => value is T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return createDefault();
    const parsed = JSON.parse(raw) as unknown;
    if (isValid && !isValid(parsed)) {
      return createDefault();
    }
    if (typeof parsed !== 'object' || parsed === null) {
      return createDefault();
    }
    return parsed as T;
  } catch {
    return createDefault();
  }
}

export function saveJSON<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be unavailable (e.g. private browsing quota). Fail silently
    // so the game keeps working in-memory for the current session.
  }
}

export function removeKey(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}
