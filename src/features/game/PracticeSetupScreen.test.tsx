import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppStateProvider } from '../../state/AppStateContext';
import { PracticeSetupScreen } from './PracticeSetupScreen';

function renderSetup() {
  return render(
    <MemoryRouter initialEntries={['/practice/west']}>
      <AppStateProvider>
        <Routes>
          <Route path="/practice/:regionId" element={<PracticeSetupScreen />} />
        </Routes>
      </AppStateProvider>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

describe('PracticeSetupScreen custom timer', () => {
  it('defaults to 8 seconds the first time', () => {
    renderSetup();
    expect(screen.getByText('8 sec').closest('button')).toHaveClass('is-selected');
  });

  it('rejects an out-of-range custom timer value', () => {
    renderSetup();
    fireEvent.click(screen.getByText('Custom').closest('button')!);
    const input = screen.getByLabelText(/seconds/i);
    fireEvent.change(input, { target: { value: '99' } });
    fireEvent.blur(input);
    expect(screen.getByText(/between 1 and 30 seconds/i)).toBeInTheDocument();
  });

  it('accepts a valid custom timer value and starts practice', () => {
    renderSetup();
    fireEvent.click(screen.getByText('Custom').closest('button')!);
    const input = screen.getByLabelText(/seconds/i);
    fireEvent.change(input, { target: { value: '12' } });
    fireEvent.blur(input);
    expect(screen.queryByText(/between 1 and 30 seconds/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Start Practice' }));
  });
});
