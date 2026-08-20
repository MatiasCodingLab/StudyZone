import { Link, useNavigate } from 'react-router-dom';

export function LanguageArtsScreen() {
  const navigate = useNavigate();

  return (
    <div className="stack" style={{ gap: 24, paddingTop: 20 }}>
      <Link to="/" className="btn btn-ghost" style={{ alignSelf: 'flex-start' }}>
        ← Main Study Guide
      </Link>
      <div className="stack" style={{ gap: 4 }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>
          <span aria-hidden="true">📚</span> Language Arts
        </h1>
        <p className="muted">Choose a topic below to practice.</p>
      </div>

      <div className="grid-cards">
        <div className="region-card" style={{ cursor: 'default' }}>
          <span className="region-card__name">💡 Main Idea</span>
          <span className="region-card__count">Learn to spot the main idea and tell it apart from supporting details.</span>
          <button
            type="button"
            className="btn btn-primary btn-block"
            style={{ marginTop: 8 }}
            onClick={() => navigate('/language-arts/main-idea')}
          >
            Start Practicing
          </button>
        </div>
      </div>
    </div>
  );
}

