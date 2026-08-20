import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { QuizModeId, ReadingDistractorType, ReadingQuizQuestion } from '../../../types';
import { MAIN_IDEA_QUESTIONS } from './mainIdeaQuestions';
import { selectQuizQuestions, shuffle } from '../shared/quizSelection';
import { QUIZ_MODES } from '../shared/quizModes';
import { useReadingSkillProgress } from '../../../hooks/useReadingSkillProgress';
import type { QuizResultAttempt } from '../../../storage/readingSkillsStore';

const MAIN_IDEA_MODULE_ID = 'main-idea';

type Phase = 'asking' | 'feedback' | 'results';

const FEEDBACK_LABELS: Record<ReadingDistractorType, string> = {
  'main-idea': 'Main Idea! ✅',
  'supporting-detail': 'True, but Too Small 🔍',
  'too-broad': 'Too Broad 🌍',
  unsupported: 'Not Supported ❓',
};

const MISTAKE_TYPE_LABELS: Record<ReadingDistractorType, string> = {
  'main-idea': 'main idea',
  'supporting-detail': 'a true supporting detail instead of the main idea',
  'too-broad': 'an answer that was too broad',
  unsupported: 'an answer the passage didn\u2019t actually support',
};

export function MainIdeaQuiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const modeId: QuizModeId = (location.state as { modeId?: QuizModeId } | null)?.modeId ?? 'practice';
  const { skillProgress, recordQuiz } = useReadingSkillProgress(MAIN_IDEA_MODULE_ID);

  const [questions, setQuestions] = useState<ReadingQuizQuestion[]>(() =>
    selectQuizQuestions(MAIN_IDEA_QUESTIONS, modeId, skillProgress.recentQuestionIds),
  );
  const [choiceOrder, setChoiceOrder] = useState<string[][]>(() => questions.map((q) => shuffle(q.choices.map((c) => c.id))));
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('asking');
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<QuizResultAttempt[]>([]);

  const currentQuestion = questions[index];
  const mode = QUIZ_MODES[modeId];

  const orderedChoices = useMemo(() => {
    if (!currentQuestion) return [];
    const order = choiceOrder[index] ?? [];
    return order.map((choiceId) => currentQuestion.choices.find((c) => c.id === choiceId)!).filter(Boolean);
  }, [currentQuestion, choiceOrder, index]);

  const selectedChoice = currentQuestion?.choices.find((c) => c.id === selectedChoiceId) ?? null;

  function handleSelect(choiceId: string) {
    if (phase !== 'asking' || !currentQuestion) return;
    const choice = currentQuestion.choices.find((c) => c.id === choiceId);
    if (!choice) return;
    setSelectedChoiceId(choiceId);
    setPhase('feedback');
    setAttempts((prev) => [
      ...prev,
      { questionId: currentQuestion.id, correct: choiceId === currentQuestion.correctChoiceId, choiceType: choice.type },
    ]);
  }

  function handleNext() {
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
      setSelectedChoiceId(null);
      setPhase('asking');
    } else {
      recordQuiz(attempts);
      setPhase('results');
    }
  }

  function startFresh(reusePool: boolean) {
    const nextQuestions = reusePool
      ? questions
      : selectQuizQuestions(MAIN_IDEA_QUESTIONS, modeId, [...attempts.map((a) => a.questionId), ...skillProgress.recentQuestionIds]);
    setQuestions(nextQuestions);
    setChoiceOrder(nextQuestions.map((q) => shuffle(q.choices.map((c) => c.id))));
    setIndex(0);
    setSelectedChoiceId(null);
    setAttempts([]);
    setPhase('asking');
  }

  if (!currentQuestion && phase !== 'results') {
    return (
      <div className="card text-center">
        <h2>No questions are available yet.</h2>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/language-arts/main-idea')}>
          Back to Main Idea
        </button>
      </div>
    );
  }

  if (phase === 'results') {
    const correctCount = attempts.filter((a) => a.correct).length;
    const total = attempts.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    const mistakeCounts: Partial<Record<ReadingDistractorType, number>> = {};
    attempts
      .filter((a) => !a.correct)
      .forEach((a) => {
        mistakeCounts[a.choiceType] = (mistakeCounts[a.choiceType] ?? 0) + 1;
      });
    const topMistakeEntry = Object.entries(mistakeCounts).sort((a, b) => b[1] - a[1])[0] as
      | [ReadingDistractorType, number]
      | undefined;

    const encouragement =
      percentage === 100
        ? 'Perfect score! You really know how to spot the main idea.'
        : percentage >= 80
          ? 'Great job! You\u2019re getting really good at this.'
          : percentage >= 50
            ? 'Nice work! Keep practicing and it will click even more.'
            : 'Good try! Review the guide and give it another shot.';

    return (
      <div className="stack text-center" style={{ gap: 20, paddingTop: 12, maxWidth: 560, margin: '0 auto' }}>
        <div>
          <h1>Quiz Complete!</h1>
          <p className="muted">{encouragement}</p>
        </div>

        <div className="card stack" style={{ gap: 10, textAlign: 'left' }}>
          <div className="spread">
            <span>Score</span>
            <strong>
              {correctCount} / {total}
            </strong>
          </div>
          <div className="spread">
            <span>Percentage</span>
            <strong>{percentage}%</strong>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${percentage}%` }} />
          </div>
          {topMistakeEntry && (
            <p className="muted" style={{ margin: 0 }}>
              Most common mistake: choosing {MISTAKE_TYPE_LABELS[topMistakeEntry[0]]}.
            </p>
          )}
        </div>

        <div className="stack" style={{ gap: 10 }}>
          <button type="button" className="btn btn-primary btn-large" onClick={() => startFresh(true)}>
            Try Again
          </button>
          <button type="button" className="btn btn-secondary btn-large" onClick={() => startFresh(false)}>
            New Questions
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => navigate('/language-arts/main-idea')}>
            Back to Main Idea
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="stack" style={{ gap: 20, paddingTop: 12, maxWidth: 720, margin: '0 auto' }}>
      <div className="spread">
        <button type="button" className="btn btn-ghost" onClick={() => navigate('/language-arts/main-idea')}>
          &larr; Main Idea
        </button>
        <span className="muted">
          {mode.label} &bull; Question {index + 1} of {questions.length}
        </span>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${(index / questions.length) * 100}%` }} />
      </div>

      <div className="card stack" style={{ gap: 14 }}>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, margin: 0 }}>{currentQuestion.passage}</p>
      </div>

      <div className="card stack" style={{ gap: 14 }}>
        <h3 style={{ margin: 0 }}>{currentQuestion.question}</h3>
        <div className="stack" style={{ gap: 10 }}>
          {orderedChoices.map((choice) => {
            const isSelected = choice.id === selectedChoiceId;
            const isCorrectChoice = choice.id === currentQuestion.correctChoiceId;
            let stateClass = '';
            if (phase === 'feedback') {
              if (isCorrectChoice) stateClass = 'is-correct';
              else if (isSelected) stateClass = 'is-incorrect';
            }
            return (
              <button
                key={choice.id}
                type="button"
                className={`direction-choice quiz-choice ${isSelected ? 'is-selected' : ''} ${stateClass}`}
                disabled={phase === 'feedback'}
                onClick={() => handleSelect(choice.id)}
              >
                <strong>{choice.text}</strong>
              </button>
            );
          })}
        </div>

        {phase === 'feedback' && selectedChoice && (
          <div className={`card quiz-feedback ${selectedChoice.type === 'main-idea' ? 'quiz-feedback--correct' : 'quiz-feedback--incorrect'}`}>
            <strong>{FEEDBACK_LABELS[selectedChoice.type]}</strong>
            <p style={{ margin: '6px 0 0' }}>{selectedChoice.feedback}</p>
          </div>
        )}
      </div>

      {phase === 'feedback' && (
        <button type="button" className="btn btn-primary btn-large" onClick={handleNext}>
          {index + 1 < questions.length ? 'Next Question' : 'See Results'}
        </button>
      )}
    </div>
  );
}
