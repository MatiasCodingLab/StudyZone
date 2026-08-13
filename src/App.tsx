import { HashRouter, Route, Routes } from 'react-router-dom';
import { AppStateProvider } from './state/AppStateContext';
import { AppShell } from './components/layout/AppShell';
import { HomeScreen } from './features/home/HomeScreen';
import { PracticeSetupScreen } from './features/game/PracticeSetupScreen';
import { QuizScreen } from './features/game/QuizScreen';
import { AdminGate } from './features/admin/AdminGate';

function App() {
  return (
    <AppStateProvider>
      <HashRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/practice/:regionId" element={<PracticeSetupScreen />} />
            <Route path="/practice/:regionId/play" element={<QuizScreen />} />
            <Route path="/admin" element={<AdminGate />} />
          </Routes>
        </AppShell>
      </HashRouter>
    </AppStateProvider>
  );
}

export default App;
