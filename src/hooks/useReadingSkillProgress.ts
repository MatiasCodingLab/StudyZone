import { useCallback, useState } from 'react';
import type { ReadingSkillProgress } from '../types';
import { loadSkillProgress, recordQuizResult, type QuizResultAttempt } from '../storage/readingSkillsStore';

/** Local progress for a single Language Arts reading-skill module (e.g. 'main-idea'). */
export function useReadingSkillProgress(moduleId: string) {
  const [skillProgress, setSkillProgress] = useState<ReadingSkillProgress>(() => loadSkillProgress(moduleId));

  const recordQuiz = useCallback(
    (attempts: QuizResultAttempt[]) => {
      const updated = recordQuizResult(moduleId, attempts);
      setSkillProgress(updated);
      return updated;
    },
    [moduleId],
  );

  return { skillProgress, recordQuiz };
}
