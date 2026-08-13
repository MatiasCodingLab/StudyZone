import { useAppState } from '../../state/AppStateContext';

function ToggleRow({ label, description, checked, onChange }: { label: string; description?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="toggle-row">
      <div>
        <strong>{label}</strong>
        {description && (
          <p className="muted" style={{ margin: '4px 0 0' }}>
            {description}
          </p>
        )}
      </div>
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className="switch-track" />
      </label>
    </div>
  );
}

export function SettingsPanel() {
  const { config, updateConfig, preferences, updatePreferences } = useAppState();

  function setSetting<K extends keyof typeof config.settings>(key: K, value: (typeof config.settings)[K]) {
    updateConfig((prev) => ({ ...prev, settings: { ...prev.settings, [key]: value } }));
  }

  return (
    <div className="stack" style={{ gap: 20 }}>
      <div className="card stack" style={{ gap: 14 }}>
        <h3>Student Profile</h3>
        <label className="stack" style={{ gap: 6 }}>
          <span className="muted">Student name</span>
          <input
            className="input-large"
            value={preferences.profile.name}
            onChange={(e) =>
              updatePreferences((prev) => ({ ...prev, profile: { ...prev.profile, name: e.target.value } }))
            }
          />
        </label>
      </div>

      <div className="card stack" style={{ gap: 14 }}>
        <h3>Gameplay</h3>
        <ToggleRow
          label="Tolerant Spelling (Fuzzy Matching)"
          description="Accept very minor typos, like 'Sacramnto' for 'Sacramento'."
          checked={config.settings.fuzzyMatchingEnabled}
          onChange={(v) => setSetting('fuzzyMatchingEnabled', v)}
        />
        <ToggleRow
          label="All Regions Challenge"
          description="Lets Matias combine every enabled region into one big challenge."
          checked={config.settings.allRegionsChallengeEnabled}
          onChange={(v) => setSetting('allRegionsChallengeEnabled', v)}
        />
      </div>

      <div className="card stack" style={{ gap: 14 }}>
        <h3>Panda Mascot</h3>
        <ToggleRow label="Show Panda" checked={config.settings.showPanda} onChange={(v) => setSetting('showPanda', v)} />
        <ToggleRow
          label="Panda Animations"
          checked={config.settings.pandaAnimations}
          onChange={(v) => setSetting('pandaAnimations', v)}
        />
        <ToggleRow label="Panda Sounds" checked={config.settings.pandaSounds} onChange={(v) => setSetting('pandaSounds', v)} />
        <ToggleRow
          label="Celebration Animations"
          checked={config.settings.celebrationAnimations}
          onChange={(v) => setSetting('celebrationAnimations', v)}
        />
        <ToggleRow label="Confetti" checked={config.settings.confetti} onChange={(v) => setSetting('confetti', v)} />
      </div>
    </div>
  );
}
