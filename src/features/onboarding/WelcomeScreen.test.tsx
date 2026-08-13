import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { AppStateProvider } from '../../state/AppStateContext';
import { WelcomeScreen } from './WelcomeScreen';
import { STORAGE_KEYS } from '../../utils/storage';

beforeEach(() => {
  window.localStorage.clear();
});

describe('WelcomeScreen', () => {
  it('requires a name before continuing', () => {
    render(
      <AppStateProvider>
        <WelcomeScreen />
      </AppStateProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: "Let's Play!" }));
    expect(screen.getByText(/please enter a name/i)).toBeInTheDocument();
  });

  it('saves the entered name so it can personalize the rest of the experience', () => {
    render(
      <AppStateProvider>
        <WelcomeScreen />
      </AppStateProvider>,
    );
    fireEvent.change(screen.getByPlaceholderText('Type your name...'), { target: { value: '  Alex  ' } });
    fireEvent.click(screen.getByRole('button', { name: "Let's Play!" }));
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEYS.preferences)!);
    expect(stored.profile.name).toBe('Alex');
  });
});
