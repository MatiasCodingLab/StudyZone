import { Link, useNavigate } from 'react-router-dom';

export function SocialStudiesHome() {
  const navigate = useNavigate();

  return (
    <div className="stack" style={{ gap: 24, paddingTop: 20 }}>
      <div className="stack" style={{ gap: 4 }}>
        <Link to="/" className="btn btn-ghost" style={{ alignSelf: 'flex-start' }}>
          ← Main Study Guide
        </Link>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>
          <span aria-hidden="true">🌎</span> Social Studies
        </h1>
        <p className="muted">Choose a topic below to practice.</p>
      </div>

      <div className="grid-cards">
        <div className="region-card" style={{ cursor: 'default' }}>
          <span className="region-card__name">States &amp; Capitals</span>
          <span className="region-card__count">Learn every U.S. state and its capital city, region by region.</span>
          <button
            type="button"
            className="btn btn-primary btn-block"
            style={{ marginTop: 8 }}
            onClick={() => navigate('/social-studies/states-capitals')}
          >
            Start Practicing
          </button>
        </div>
      </div>
    </div>
  );
}
