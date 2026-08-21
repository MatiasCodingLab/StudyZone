// Lightweight developer checks for reading-comprehension question banks.
// These catch the most common way a question becomes guessable without
// reading the passage: the correct choice being a length or specificity
// outlier compared to its distractors. Intended to be asserted against in a
// test (see mainIdeaQuestions.test.ts), not shown to students at runtime.

import type { ReadingQuizQuestion } from '../../../types';

export interface QuestionQualityIssue {
  questionId: string;
  message: string;
}

/** A choice this short stands out as an obvious guess regardless of content. */
const MIN_REASONABLE_WORDS = 5;
/** How much longer/shorter the correct choice may be before it becomes a "tell". */
const LENGTH_RATIO_THRESHOLD = 1.6;
const LENGTH_DIFF_THRESHOLD = 3;

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Flags a single question if its correct choice can be guessed from length or
 * specificity alone, or if the choice set is malformed.
 */
export function checkQuestionQuality(question: ReadingQuizQuestion): QuestionQualityIssue[] {
  const issues: QuestionQualityIssue[] = [];
  const addIssue = (message: string) => issues.push({ questionId: question.id, message });

  if (question.choices.length !== 4) {
    addIssue(`Expected 4 choices, found ${question.choices.length}.`);
  }

  const mainIdeaChoices = question.choices.filter((choice) => choice.type === 'main-idea');
  if (mainIdeaChoices.length !== 1) {
    addIssue(`Expected exactly 1 'main-idea' choice, found ${mainIdeaChoices.length}.`);
  }

  const correct = question.choices.find((choice) => choice.id === question.correctChoiceId);
  if (!correct) {
    addIssue('correctChoiceId does not match any choice id.');
    return issues;
  }
  if (correct.type !== 'main-idea') {
    addIssue(`correctChoiceId points to a '${correct.type}' choice instead of 'main-idea'.`);
  }

  const wordCounts = question.choices.map((choice) => ({ id: choice.id, words: wordCount(choice.text) }));
  wordCounts.forEach(({ id, words }) => {
    if (words < MIN_REASONABLE_WORDS) {
      addIssue(`Choice '${id}' is only ${words} word(s) long, which stands out as an easy guess.`);
    }
  });

  const correctWords = wordCount(correct.text);
  const otherWords = wordCounts.filter((c) => c.id !== correct.id).map((c) => c.words);
  const shortestOther = Math.min(...otherWords);
  const longestOther = Math.max(...otherWords);

  const isDramaticallyLonger = correctWords > shortestOther * LENGTH_RATIO_THRESHOLD && correctWords >= longestOther + LENGTH_DIFF_THRESHOLD;
  if (isDramaticallyLonger) {
    addIssue(
      `Correct choice is significantly longer (${correctWords} words) than every distractor (longest distractor is ${longestOther} words). ` +
        'The answer should not be guessable just because it is the longest, most detailed choice.',
    );
  }

  const isDramaticallyShorter = correctWords * LENGTH_RATIO_THRESHOLD < shortestOther;
  if (isDramaticallyShorter) {
    addIssue(`Correct choice is unusually short (${correctWords} words) compared to every distractor (shortest distractor is ${shortestOther} words).`);
  }

  return issues;
}

/** Runs {@link checkQuestionQuality} across a whole bank of questions. */
export function checkQuestionBankQuality(bank: ReadingQuizQuestion[]): QuestionQualityIssue[] {
  return bank.flatMap((question) => checkQuestionQuality(question));
}
