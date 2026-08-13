import { useCallback, useState } from 'react';
import type { ProgressData, SessionSummary } from '../types';
import { loadProgress, recordSessionSummary, saveProgress } from '../storage/progressStore';

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(() => loadProgress());

  const addSessionSummary = useCallback((summary: SessionSummary) => {
    setProgress((prev) => {
      const next = recordSessionSummary(prev, summary);
      saveProgress(next);
      return next;
    });
  }, []);

  const replaceProgress = useCallback((next: ProgressData) => {
    saveProgress(next);
    setProgress(next);
  }, []);

  return { progress, addSessionSummary, replaceProgress };
}
