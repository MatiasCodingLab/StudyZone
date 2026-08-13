import { createContext, useContext, type ReactNode } from 'react';
import { useAdminConfig } from '../hooks/useAdminConfig';
import { usePreferences } from '../hooks/usePreferences';
import { useProgress } from '../hooks/useProgress';

type AdminConfigApi = ReturnType<typeof useAdminConfig>;
type PreferencesApi = ReturnType<typeof usePreferences>;
type ProgressApi = ReturnType<typeof useProgress>;

interface AppStateValue extends AdminConfigApi, PreferencesApi, ProgressApi {}

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const configApi = useAdminConfig();
  const preferencesApi = usePreferences();
  const progressApi = useProgress();

  const value: AppStateValue = { ...configApi, ...preferencesApi, ...progressApi };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
