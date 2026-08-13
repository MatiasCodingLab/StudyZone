import { useEffect, useRef, useState } from 'react';

export interface RecallTimerState {
  remainingSeconds: number | null;
  expired: boolean;
  elapsedMs: number;
}

/**
 * Drives the visual recall countdown. Pass `durationSeconds = null` for "No
 * Timer". The timer restarts whenever `resetKey` changes (e.g. a new state).
 */
export function useRecallTimer(durationSeconds: number | null, resetKey: unknown, active: boolean): RecallTimerState {
  const [state, setState] = useState<RecallTimerState>({
    remainingSeconds: durationSeconds,
    expired: false,
    elapsedMs: 0,
  });
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    startRef.current = Date.now();
    setState({ remainingSeconds: durationSeconds, expired: false, elapsedMs: 0 });

    if (!active || durationSeconds === null) return;

    const intervalId = window.setInterval(() => {
      const elapsedMs = Date.now() - startRef.current;
      const remaining = Math.max(0, durationSeconds - Math.floor(elapsedMs / 1000));
      setState({ remainingSeconds: remaining, expired: remaining <= 0, elapsedMs });
    }, 100);

    return () => window.clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationSeconds, resetKey, active]);

  return state;
}

export function getElapsedMs(startedAt: number): number {
  return Date.now() - startedAt;
}
