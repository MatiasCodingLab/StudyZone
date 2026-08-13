import { useCallback, useRef, useState } from 'react';

/** Powers a "hold for N seconds" gesture used to enter Parent/Admin mode. */
export function useHoldToConfirm(durationMs: number, onConfirm: () => void) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  const stop = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setProgress(0);
  }, []);

  const start = useCallback(() => {
    startRef.current = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min(1, elapsed / durationMs);
      setProgress(pct);
      if (pct >= 1) {
        stop();
        onConfirm();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [durationMs, onConfirm, stop]);

  return { progress, start, stop };
}
