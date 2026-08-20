import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../state/AppStateContext';
import { Panda } from '../../components/mascot/Panda';

interface Subject {
  id: string;
  path: string;
  icon: string;
  name: string;
  description: string;
  comingSoon?: boolean;
}

const SUBJECTS: Subject[] = [
  {
    id: 'social-studies',
    path: '/social-studies',
    icon: '🌎',
    name: 'Social Studies',
    description: 'States, capitals, and more!',
  },
  {
    id: 'language-arts',
    path: '/language-arts',
    icon: '📚',
    name: 'Language Arts',
    description: 'Reading and writing practice.',
    comingSoon: true,
  },
];

export function StudyGuideHome() {
  const { preferences } = useAppState();
  const navigate = useNavigate();
  const studentName = preferences.profile.name || 'friend';

  return (
    <div className="stack" style={{ gap: 28, paddingTop: 20 }}>
      <div className="text-center stack" style={{ gap: 6 }}>
        <Panda mood="idle" size={130} />
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>Hi {studentName}! Welcome to your 4th Grade Study Guide.</h1>
        <p className="muted">Pick a subject below to start learning.</p>
      </div>

      <div className="grid-cards">
        {SUBJECTS.map((subject) => (
          <button
            key={subject.id}
            type="button"
            className="region-card"
            onClick={() => navigate(subject.path)}
          >
            <span className="region-card__name">
              <span aria-hidden="true">{subject.icon}</span> {subject.name}
            </span>
            <span className="region-card__count">{subject.description}</span>
            <span className="region-card__cta">{subject.comingSoon ? '[ Take a look ]' : '[ Explore ]'}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
