import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { STORAGE_KEYS } from './utils/storage';

beforeEach(() => {
  window.localStorage.clear();
});

describe('App onboarding gate', () => {
  it('asks for a name before showing the Home screen', () => {
    render(<App />);
    expect(screen.getByText('Welcome to Capitals Quest!')).toBeInTheDocument();
  });

  it('personalizes the Home screen once a name is set', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Type your name...'), { target: { value: 'Jamie' } });
    fireEvent.click(screen.getByRole('button', { name: "Let's Play!" }));
    expect(screen.getByText(/Hi Jamie! Welcome to your 4th Grade Study Guide\./)).toBeInTheDocument();
  });

  it('skips onboarding for a name already stored from a previous session', () => {
    const prefs = {
      schemaVersion: 1,
      profile: { name: 'Riley', mascotId: 'panda' },
      regionTimerSettings: {},
      lastTimerSeconds: 8,
      lastStrict: false,
    };
    window.localStorage.setItem(STORAGE_KEYS.preferences, JSON.stringify(prefs));
    render(<App />);
    expect(screen.getByText(/Hi Riley! Welcome to your 4th Grade Study Guide\./)).toBeInTheDocument();
  });
});
