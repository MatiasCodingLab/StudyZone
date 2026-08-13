import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatesTable } from './StatesTable';
import { RegionsEditor } from './RegionsEditor';
import { BackupPanel } from './BackupPanel';
import { ProgressDashboard } from './ProgressDashboard';
import { SettingsPanel } from './SettingsPanel';

type Tab = 'states' | 'regions' | 'settings' | 'backup' | 'progress';

const TABS: { id: Tab; label: string }[] = [
  { id: 'states', label: 'States & Capitals' },
  { id: 'regions', label: 'Practice Regions' },
  { id: 'settings', label: 'Profile & Settings' },
  { id: 'backup', label: 'Import / Export' },
  { id: 'progress', label: 'Progress Dashboard' },
];

export function AdminScreen() {
  const [tab, setTab] = useState<Tab>('states');
  const navigate = useNavigate();

  return (
    <div className="admin-shell" style={{ paddingTop: 12 }}>
      <div className="spread">
        <div>
          <span className="eyebrow">Parent / Admin</span>
          <h1>Game Settings</h1>
        </div>
        <button type="button" className="btn btn-ghost" onClick={() => navigate('/')}>
          Exit to Home
        </button>
      </div>

      <div className="admin-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`admin-tab ${tab === t.id ? 'is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'states' && <StatesTable />}
      {tab === 'regions' && <RegionsEditor />}
      {tab === 'settings' && <SettingsPanel />}
      {tab === 'backup' && <BackupPanel />}
      {tab === 'progress' && <ProgressDashboard />}
    </div>
  );
}
