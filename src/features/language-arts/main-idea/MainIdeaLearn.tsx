import { useNavigate } from 'react-router-dom';

export function MainIdeaLearn() {
  const navigate = useNavigate();

  return (
    <div className="stack" style={{ gap: 22, paddingTop: 12 }}>
      <div className="stack" style={{ gap: 4 }}>
        <button
          type="button"
          className="btn btn-ghost"
          style={{ alignSelf: 'flex-start' }}
          onClick={() => navigate('/language-arts/main-idea')}
        >
          &larr; Main Idea
        </button>
        <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)' }}>
          <span aria-hidden="true">📖</span> What Is a Main Idea?
        </h1>
      </div>

      <div className="card stack" style={{ gap: 10 }}>
        <span className="eyebrow">Topic vs. Main Idea</span>
        <p style={{ margin: 0 }}>
          The <strong>topic</strong> is what the passage is about in just a word or two &mdash; like "bees" or "the Pony Express."
        </p>
        <p style={{ margin: 0 }}>
          The <strong>main idea</strong> is the whole point the author wants you to understand about that topic &mdash; a full sentence,
          not just a word.
        </p>
      </div>

      <div className="card stack" style={{ gap: 10 }}>
        <span className="eyebrow">Main Idea vs. Supporting Detail</span>
        <p style={{ margin: 0 }}>
          A <strong>supporting detail</strong> is a fact from the passage that backs up the main idea. It can be 100% true and still be
          the <em>wrong answer</em> to "what is this mostly about?" &mdash; because it only covers one small piece of the passage.
        </p>
      </div>

      <div className="card stack" style={{ gap: 14 }}>
        <span className="eyebrow">Too Small &bull; Just Right &bull; Too Big</span>
        <div className="grid-cards">
          <div className="region-card" style={{ cursor: 'default' }}>
            <span className="region-card__name">🔍 Too Small</span>
            <span className="region-card__count">A true detail, but it only covers part of the passage.</span>
          </div>
          <div className="region-card" style={{ cursor: 'default', borderTop: '4px solid var(--color-primary)' }}>
            <span className="region-card__name">✅ Just Right</span>
            <span className="region-card__count">Explains what most of the passage is about.</span>
          </div>
          <div className="region-card" style={{ cursor: 'default' }}>
            <span className="region-card__name">🌍 Too Big</span>
            <span className="region-card__count">A claim bigger than what the passage actually supports.</span>
          </div>
        </div>
      </div>

      <div className="card stack" style={{ gap: 12 }}>
        <span className="eyebrow">Two Strategies</span>
        <div className="stack" style={{ gap: 10 }}>
          <div>
            <strong>Does it cover MOST of the text?</strong>
            <p className="muted" style={{ margin: '4px 0 0' }}>
              Ask yourself: does this answer explain most of the passage, or just one paragraph or event?
            </p>
          </div>
          <div>
            <strong>2&ndash;3 Details Test</strong>
            <p className="muted" style={{ margin: '4px 0 0' }}>
              A strong main idea is usually backed up by two or three details from different parts of the passage &mdash; not just one.
            </p>
          </div>
        </div>
      </div>

      <div className="card text-center stack" style={{ gap: 8 }}>
        <span className="eyebrow">Try This Sentence</span>
        <p style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
          "This passage is mostly about ______, and the author wants me to understand that ______."
        </p>
        <p className="muted" style={{ margin: 0 }}>
          If you can't fill in that second blank using most of the passage, the answer is probably too small or too big.
        </p>
      </div>

      <button type="button" className="btn btn-primary btn-large" onClick={() => navigate('/language-arts/main-idea')}>
        I'm Ready to Practice
      </button>
    </div>
  );
}
