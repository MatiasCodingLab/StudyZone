import { Link } from 'react-router-dom';

export function LanguageArtsScreen() {
  return (
    <div className="stack" style={{ gap: 24, paddingTop: 20 }}>
      <Link to="/" className="btn btn-ghost" style={{ alignSelf: 'flex-start' }}>
        ← Main Study Guide
      </Link>
      <div className="card text-center stack" style={{ gap: 10 }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>
          <span aria-hidden="true">📚</span> Language Arts
        </h1>
        <p className="muted">Language Arts practice coming soon.</p>
      </div>
    </div>
  );
}
