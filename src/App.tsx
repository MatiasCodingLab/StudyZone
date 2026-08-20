import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AppStateProvider, useAppState } from './state/AppStateContext';
import { AppShell } from './components/layout/AppShell';
import { StudyGuideHome } from './features/home/StudyGuideHome';
import { SocialStudiesHome } from './features/social-studies/SocialStudiesHome';
import { LanguageArtsScreen } from './features/language-arts/LanguageArtsScreen';
import { MainIdeaHome } from './features/language-arts/main-idea/MainIdeaHome';
import { MainIdeaLearn } from './features/language-arts/main-idea/MainIdeaLearn';
import { MainIdeaQuiz } from './features/language-arts/main-idea/MainIdeaQuiz';
import { HomeScreen } from './features/home/HomeScreen';
import { PracticeSetupScreen } from './features/game/PracticeSetupScreen';
import { QuizScreen } from './features/game/QuizScreen';
import { AdminGate } from './features/admin/AdminGate';
import { WelcomeScreen } from './features/onboarding/WelcomeScreen';
import { AuthorPage } from './features/author/AuthorPage';

function AppRoutes() {
  const { preferences } = useAppState();
  const location = useLocation();

  // Ask for the student's name once, up front, before any practicing starts -
  // but never block access to the Parent / Admin area.
  const needsOnboarding = preferences.profile.name.trim().length === 0;
  if (needsOnboarding && !location.pathname.startsWith('/admin') && location.pathname !== '/author') {
    return <WelcomeScreen />;
  }

  return (
    <Routes>
      <Route path="/" element={<StudyGuideHome />} />
      <Route path="/social-studies" element={<SocialStudiesHome />} />
      <Route path="/social-studies/states-capitals" element={<HomeScreen />} />
      <Route path="/language-arts" element={<LanguageArtsScreen />} />
      <Route path="/language-arts/main-idea" element={<MainIdeaHome />} />
      <Route path="/language-arts/main-idea/learn" element={<MainIdeaLearn />} />
      <Route path="/language-arts/main-idea/quiz" element={<MainIdeaQuiz />} />
      <Route path="/practice/:regionId" element={<PracticeSetupScreen />} />
      <Route path="/practice/:regionId/play" element={<QuizScreen />} />
      <Route path="/admin" element={<AdminGate />} />
      <Route path="/author" element={<AuthorPage />} />
    </Routes>
  );
}

function App() {
  return (
    <AppStateProvider>
      <HashRouter>
        <AppShell>
          <AppRoutes />
        </AppShell>
      </HashRouter>
    </AppStateProvider>
  );
}

export default App;
