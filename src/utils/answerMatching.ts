// Typed-answer matching: case/space/punctuation-insensitive, with optional
// tolerance for very minor spelling errors (small Levenshtein distance).

export function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[.,'’"!?]/g, '')
    .replace(/\s+/g, ' ');
}

export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const prev = new Array<number>(b.length + 1);
  const curr = new Array<number>(b.length + 1);

  for (let j = 0; j <= b.length; j += 1) prev[j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= b.length; j += 1) prev[j] = curr[j];
  }
  return prev[b.length];
}

/** Fuzzy-match threshold: proportionally stricter for short words so we never
 * accept a genuinely different, similarly-sized city name. */
function fuzzyThreshold(length: number): number {
  if (length <= 4) return 0;
  if (length <= 7) return 1;
  if (length <= 11) return 2;
  return 3;
}

export interface AnswerCheckResult {
  correct: boolean;
  wasFuzzyMatch: boolean;
}

export function checkAnswer(input: string, correctCapital: string, fuzzyEnabled: boolean): AnswerCheckResult {
  const normInput = normalizeAnswer(input);
  const normCorrect = normalizeAnswer(correctCapital);

  if (normInput.length === 0) {
    return { correct: false, wasFuzzyMatch: false };
  }
  if (normInput === normCorrect) {
    return { correct: true, wasFuzzyMatch: false };
  }
  if (!fuzzyEnabled) {
    return { correct: false, wasFuzzyMatch: false };
  }

  const distance = levenshteinDistance(normInput, normCorrect);
  const threshold = fuzzyThreshold(normCorrect.length);
  if (distance > 0 && distance <= threshold) {
    return { correct: true, wasFuzzyMatch: true };
  }
  return { correct: false, wasFuzzyMatch: false };
}
