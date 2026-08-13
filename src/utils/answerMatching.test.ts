import { describe, expect, it } from 'vitest';
import { checkAnswer } from './answerMatching';

describe('checkAnswer', () => {
  it('is case-insensitive', () => {
    expect(checkAnswer('SACRAMENTO', 'Sacramento', false).correct).toBe(true);
  });

  it('ignores leading/trailing spaces', () => {
    expect(checkAnswer('  Sacramento  ', 'Sacramento', false).correct).toBe(true);
  });

  it('handles multi-word capitals regardless of case', () => {
    expect(checkAnswer('salt lake city', 'Salt Lake City', false).correct).toBe(true);
    expect(checkAnswer('SALT LAKE CITY', 'Salt Lake City', false).correct).toBe(true);
  });

  it('tolerates harmless punctuation', () => {
    expect(checkAnswer('St. Paul', 'Saint Paul', false).correct).toBe(false); // not a spelling issue, different words
    expect(checkAnswer('Sacramento.', 'Sacramento', false).correct).toBe(true);
  });

  it('rejects incorrect answers when fuzzy matching is off', () => {
    expect(checkAnswer('Sacramnto', 'Sacramento', false).correct).toBe(false);
  });

  it('accepts a minor typo when fuzzy matching is enabled', () => {
    const result = checkAnswer('Sacramnto', 'Sacramento', true);
    expect(result.correct).toBe(true);
    expect(result.wasFuzzyMatch).toBe(true);
  });

  it('does not accept a clearly different city through fuzzy matching', () => {
    expect(checkAnswer('Los Angeles', 'Sacramento', true).correct).toBe(false);
    expect(checkAnswer('Denver', 'Sacramento', true).correct).toBe(false);
  });

  it('rejects empty input', () => {
    expect(checkAnswer('', 'Sacramento', true).correct).toBe(false);
  });
});
