import { useState } from 'react';
import { useAppState } from '../../state/AppStateContext';
import { Panda } from '../../components/mascot/Panda';

/** First-run screen: asks for the student's name before anything else is
 * shown. That name then personalizes the rest of the experience. */
export function WelcomeScreen() {
  const { updatePreferences } = useAppState();
  const [name, setName] = useState('');
  const [touched, setTouched] = useState(false);

  const trimmed = name.trim();
  const isValid = trimmed.length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    updatePreferences((prev) => ({ ...prev, profile: { ...prev.profile, name: trimmed } }));
  }

  return (
    <div className="stack text-center" style={{ gap: 22, paddingTop: 40, maxWidth: 440, margin: '0 auto' }}>
      <Panda mood="idle" size={140} />
      <div>
        <h1>Welcome to Your 4th Grade Study Guide!</h1>
        <p className="muted">What's your name? We'll use it to cheer you on while you practice.</p>
      </div>

      <form className="card stack" style={{ gap: 14 }} onSubmit={handleSubmit}>
        <label className="stack" style={{ gap: 6, textAlign: 'left' }}>
          <span className="muted">Your name</span>
          <input
            className="input-large"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name..."
            autoFocus
            autoComplete="off"
          />
          {touched && !isValid && (
            <span style={{ color: 'var(--color-danger)', fontWeight: 600 }}>Please enter a name to continue.</span>
          )}
        </label>
        <button type="submit" className="btn btn-primary btn-large">
          Let's Play!
        </button>
      </form>

      <p className="muted" style={{ fontSize: '0.85rem' }}>
        A parent can change this anytime in Parent / Admin → Profile &amp; Settings.
      </p>
    </div>
  );
}
