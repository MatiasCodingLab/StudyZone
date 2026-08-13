import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppStateProvider } from '../../state/AppStateContext';
import { QuizScreen } from './QuizScreen';

function renderQuiz(state: { timerSeconds: number | null; strict: boolean; mode: 'normal' | 'missed' }) {
  return render(
    <MemoryRouter initialEntries={[{ pathname: '/practice/west/play', state }]}>
      <AppStateProvider>
        <Routes>
          <Route path="/practice/:regionId/play" element={<QuizScreen />} />
        </Routes>
      </AppStateProvider>
    </MemoryRouter>,
  );
}

function renderQuizDirection(direction: 'state-to-capital' | 'capital-to-state') {
  return render(
    <MemoryRouter initialEntries={[{ pathname: '/practice/west/play', state: { timerSeconds: null, strict: false, mode: 'normal', direction } }]}>
      <AppStateProvider>
        <Routes>
          <Route path="/practice/:regionId/play" element={<QuizScreen />} />
        </Routes>
      </AppStateProvider>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

describe('QuizScreen parent controls', () => {
  it('renders the Capital to State question and expects a state answer', () => {
    renderQuizDirection('capital-to-state');
    expect(screen.getByText(/Capital → State/)).toBeInTheDocument();
    expect(screen.getByText('Which state is this the capital of?')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type the state...')).toBeInTheDocument();
  });

  it('renders the State to Capital question and expects a capital answer', () => {
    renderQuizDirection('state-to-capital');
    expect(screen.getByText(/State → Capital/)).toBeInTheDocument();
    expect(screen.getByText('What is the capital?')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type the capital...')).toBeInTheDocument();
  });

  it('supports Skip and Mark Correct in Capital to State mode', () => {
    renderQuizDirection('capital-to-state');
    fireEvent.click(screen.getByRole('button', { name: 'Mark Missed' }));
    expect(screen.getByText("You'll see this one again!")).toBeInTheDocument();
  });

  it('supports parent Mark Correct in Capital to State mode', () => {
    renderQuizDirection('capital-to-state');
    fireEvent.click(screen.getByRole('button', { name: 'Mark Correct' }));
    expect(screen.getByText('Correct!')).toBeInTheDocument();
  });

  it('Mark Correct behaves exactly like a correct answer', () => {
    renderQuiz({ timerSeconds: null, strict: false, mode: 'normal' });
    expect(screen.getByText('0 / 11 mastered')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Mark Correct' }));
    expect(screen.getByText('Correct!')).toBeInTheDocument();
  });

  it('Mark Missed behaves exactly like Skip', () => {
    renderQuiz({ timerSeconds: null, strict: false, mode: 'normal' });
    fireEvent.click(screen.getByRole('button', { name: 'Mark Missed' }));
    expect(screen.getByText("You'll see this one again!")).toBeInTheDocument();
  });
});

describe('QuizScreen timer behavior', () => {
  it('does not auto-fail when the timer expires in normal (non-strict) mode', () => {
    vi.useFakeTimers();
    renderQuiz({ timerSeconds: 1, strict: false, mode: 'normal' });
    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(screen.getByText('Time!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type the capital...')).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('automatically counts the state as missed when the timer expires in Strict Mode', () => {
    vi.useFakeTimers();
    renderQuiz({ timerSeconds: 1, strict: true, mode: 'normal' });
    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(screen.getByText(/see this one again/i)).toBeInTheDocument();
    vi.useRealTimers();
  });
});
