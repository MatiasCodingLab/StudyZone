import { describe, expect, it } from 'vitest';
import { MAIN_IDEA_QUESTIONS } from './mainIdeaQuestions';
import { checkQuestionBankQuality } from '../shared/questionQuality';

describe('MAIN_IDEA_QUESTIONS', () => {
  it('has unique question ids', () => {
    const ids = MAIN_IDEA_QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has no quality issues that would let students guess without reading', () => {
    const issues = checkQuestionBankQuality(MAIN_IDEA_QUESTIONS);
    expect(issues).toEqual([]);
  });

  it('covers all three difficulty levels', () => {
    const difficulties = new Set(MAIN_IDEA_QUESTIONS.map((q) => q.difficulty));
    expect(difficulties).toEqual(new Set(['easy', 'grade-level', 'challenge']));
  });
});
