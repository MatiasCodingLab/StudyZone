import type { QuizDirection, StateEntry } from '../types';

export interface QuizPrompt {
  question: string;
  expectedAnswer: string;
  inputPlaceholder: string;
  displayQuestion: string;
  displayAnswer: string;
}

export function getQuizPrompt(entry: StateEntry, direction: QuizDirection): QuizPrompt {
  if (direction === 'capital-to-state') {
    return {
      question: 'Which state is this the capital of?',
      expectedAnswer: entry.state,
      inputPlaceholder: 'Type the state...',
      displayQuestion: entry.capital,
      displayAnswer: `${entry.capital} → ${entry.state}`,
    };
  }

  return {
    question: 'What is the capital?',
    expectedAnswer: entry.capital,
    inputPlaceholder: 'Type the capital...',
    displayQuestion: entry.state,
    displayAnswer: `${entry.state} → ${entry.capital}`,
  };
}

export function oppositeQuizDirection(direction: QuizDirection): QuizDirection {
  return direction === 'state-to-capital' ? 'capital-to-state' : 'state-to-capital';
}

export function quizDirectionLabel(direction: QuizDirection): string {
  return direction === 'state-to-capital' ? 'State → Capital' : 'Capital → State';
}