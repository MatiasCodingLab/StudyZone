import { useNavigate } from 'react-router-dom';
import { useReadingSkillProgress } from '../../../hooks/useReadingSkillProgress';
import { QUIZ_MODES } from '../shared/quizModes';
import type { QuizModeId } from '../../../types';

const MAIN_IDEA_MODULE_ID = 'main-idea';

export function MainIdeaHome() {
  const navigate = useNavigate();
  const { skillProgress } = useReadingSkillProgress(MAIN_IDEA_MODULE_ID);

  const accuracy =
    skillProgress.attemptedCount > 0 ? Math.round((skillProgress.correctCount / skillProgress.attemptedCount) * 100) : null;

  function startQuiz(modeId: QuizModeId) {
    navigate('/language-arts/main-idea/quiz', { state: { modeId } });
  }

  return (
    <div className="stack" style={{ gap: 24, paddingTop: 12 }}>
      <div className="stack" style={{ gap: 4 }}>
        <button type="button" className="btn btn-ghost" style={{ alignSelf: 'flex-start' }} onClick={() => navigate('/language-arts')}>
          &larr; Language Arts
        </button>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>
          <span aria-hidden="true">💡</span> Main Idea
        </h1>
        <p className="muted">Learn to tell the main idea apart from true-but-small details.</p>
      </div>

      {accuracy !== null && (
        <div className="card stack" style={{ gap: 8 }}>
          <div className="spread">
            <span className="muted">Overall Accuracy</span>
            <strong>{accuracy}%</strong>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${accuracy}%` }} />
          </div>
          <p className="muted" style={{ margin: 0 }}>
            {skillProgress.correctCount} correct out of {skillProgress.attemptedCount} questions attempted.
          </p>
        </div>
      )}

      <div className="card stack" style={{ gap: 12 }}>
        <h3 style={{ margin: 0 }}>Learn</h3>
        <p className="muted" style={{ margin: 0 }}>
          A short, visual guide to spotting the main idea before you practice.
        </p>
        <button type="button" className="btn btn-primary btn-large" onClick={() => navigate('/language-arts/main-idea/learn')}>
          Start the Guide
        </button>
      </div>

      <div className="card stack" style={{ gap: 14 }}>
        <h3 style={{ margin: 0 }}>Practice Quiz</h3>
        <p className="muted" style={{ margin: 0 }}>
          Read a short passage and pick the answer that best explains what it's mostly about.
        </p>
        <div className="grid-cards">
          {Object.values(QUIZ_MODES).map((mode) => (
            <div key={mode.id} className="region-card" style={{ cursor: 'default' }}>
              <span className="region-card__name">{mode.label}</span>
              <span className="region-card__count">{mode.description}</span>
              <button type="button" className="btn btn-secondary btn-block" style={{ marginTop: 8 }} onClick={() => startQuiz(mode.id)}>
                Start
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
