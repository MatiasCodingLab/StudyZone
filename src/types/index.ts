// Core domain types shared across the app.

export interface StateEntry {
  id: string;
  state: string;
  capital: string;
  regionId: string;
  enabled: boolean;
  custom?: boolean;
}

export interface Region {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
  custom?: boolean;
}

export interface GameSettings {
  fuzzyMatchingEnabled: boolean;
  allRegionsChallengeEnabled: boolean;
  showPanda: boolean;
  pandaAnimations: boolean;
  pandaSounds: boolean;
  celebrationAnimations: boolean;
  confetti: boolean;
}

export interface AdminConfigData {
  schemaVersion: number;
  states: StateEntry[];
  regions: Region[];
  settings: GameSettings;
}

export interface StudentProfile {
  name: string;
  mascotId: 'panda';
}

export type TimerChoice = 'none' | 10 | 8 | 5 | 4 | 3 | number;

export interface RegionTimerSetting {
  timerSeconds: number | null;
  strict: boolean;
}

export interface PreferencesData {
  schemaVersion: number;
  profile: StudentProfile;
  regionTimerSettings: Record<string, RegionTimerSetting>;
  lastTimerSeconds: number | null;
  lastStrict: boolean;
}

export interface MissedEntry {
  stateId: string;
  state: string;
  capital: string;
}

export interface SessionSummary {
  regionId: string;
  regionName: string;
  timestamp: number;
  totalStates: number;
  firstTryCount: number;
  neededExtraPracticeCount: number;
  withinTargetCount: number;
  timedAttemptsCount: number;
  totalAttempts: number;
  missed: MissedEntry[];
}

export interface RegionProgress {
  sessionsCount: number;
  lastPracticed: number | null;
  attemptsTotal: number;
  correctFirstTryTotal: number;
  withinTargetTotal: number;
  timedAttemptsTotal: number;
  bestSessionAccuracy: number | null;
  missedCounts: Record<string, number>;
  lastSummary: SessionSummary | null;
}

export interface ProgressData {
  schemaVersion: number;
  regions: Record<string, RegionProgress>;
  recentMissedStateIds: string[];
}

export interface FullBackup {
  schemaVersion: number;
  exportedAt: number;
  kind: 'full-backup';
  config: AdminConfigData;
  preferences: PreferencesData;
  progress: ProgressData;
}

export interface ConfigExport {
  schemaVersion: number;
  exportedAt: number;
  kind: 'config';
  config: AdminConfigData;
}
