import { describe, expect, it } from 'vitest';
import { getQuizPrompt, oppositeQuizDirection } from './quizDirection';
import type { StateEntry } from '../types';

const california: StateEntry = {
  id: 'california',
  state: 'California',
  capital: 'Sacramento',
  regionId: 'west',
  enabled: true,
};

describe('quiz directions', () => {
  it('builds a State to Capital question and expected answer', () => {
    const prompt = getQuizPrompt(california, 'state-to-capital');
    expect(prompt.displayQuestion).toBe('California');
    expect(prompt.question).toBe('What is the capital?');
    expect(prompt.expectedAnswer).toBe('Sacramento');
    expect(prompt.inputPlaceholder).toBe('Type the capital...');
    expect(prompt.displayAnswer).toBe('California → Sacramento');
  });

  it('builds a Capital to State question and expected answer', () => {
    const prompt = getQuizPrompt(california, 'capital-to-state');
    expect(prompt.displayQuestion).toBe('Sacramento');
    expect(prompt.question).toBe('Which state is this the capital of?');
    expect(prompt.expectedAnswer).toBe('California');
    expect(prompt.inputPlaceholder).toBe('Type the state...');
    expect(prompt.displayAnswer).toBe('Sacramento → California');
  });

  it('switches to the opposite direction', () => {
    expect(oppositeQuizDirection('state-to-capital')).toBe('capital-to-state');
    expect(oppositeQuizDirection('capital-to-state')).toBe('state-to-capital');
  });
});
