import { useRef, useState } from 'react';
import { useAppState } from '../../state/AppStateContext';
import { buildConfigExport, buildFullBackup, parseConfigExport, parseFullBackup } from '../../storage/backup';
import type { AdminConfigData, FullBackup } from '../../types';

function downloadJSON(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function BackupPanel() {
  const { config, replaceConfig, preferences, replacePreferences, progress, replaceProgress } = useAppState();
  const [pastedText, setPastedText] = useState('');
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [pendingConfig, setPendingConfig] = useState<AdminConfigData | null>(null);
  const [pendingBackup, setPendingBackup] = useState<FullBackup | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const backupFileInputRef = useRef<HTMLInputElement | null>(null);

  function handleImportConfigText(text: string) {
    const result = parseConfigExport(text);
    if (!result.ok || !result.data) {
      setMessage({ type: 'error', text: result.error ?? 'Could not import that file.' });
      return;
    }
    setPendingConfig(result.data.config);
  }

  function handleImportBackupText(text: string) {
    const result = parseFullBackup(text);
    if (!result.ok || !result.data) {
      setMessage({ type: 'error', text: result.error ?? 'Could not import that file.' });
      return;
    }
    setPendingBackup(result.data);
  }

  function readFileThen(file: File, cb: (text: string) => void) {
    const reader = new FileReader();
    reader.onload = () => cb(String(reader.result ?? ''));
    reader.readAsText(file);
  }

  return (
    <div className="stack" style={{ gap: 20 }}>
      {message && (
        <div className={`feedback-banner ${message.type === 'error' ? 'is-wrong' : 'is-correct'}`}>{message.text}</div>
      )}

      <div className="card stack" style={{ gap: 12 }}>
        <h3>Export</h3>
        <p className="muted">
          <strong>Export Configuration</strong> saves states, capitals, and regions - great for moving learning content to
          another computer.
        </p>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => downloadJSON('capitals-quest-config.json', buildConfigExport(config))}
        >
          Export Configuration
        </button>
        <p className="muted">
          <strong>Export Full Backup</strong> also includes the student's profile, progress, and settings.
        </p>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => downloadJSON('capitals-quest-full-backup.json', buildFullBackup(config, preferences, progress))}
        >
          Export Full Backup
        </button>
      </div>

      <div className="card stack" style={{ gap: 12 }}>
        <h3>Import</h3>
        <div className="row-wrap">
          <button type="button" className="btn btn-secondary" onClick={() => fileInputRef.current?.click()}>
            Import Configuration (file)
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) readFileThen(file, handleImportConfigText);
              e.target.value = '';
            }}
          />
          <button type="button" className="btn btn-secondary" onClick={() => backupFileInputRef.current?.click()}>
            Import Full Backup (file)
          </button>
          <input
            ref={backupFileInputRef}
            type="file"
            accept="application/json"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) readFileThen(file, handleImportBackupText);
              e.target.value = '';
            }}
          />
        </div>
        <label className="stack" style={{ gap: 6 }}>
          <span className="muted">Or paste configuration / full backup JSON here:</span>
          <textarea
            rows={6}
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            style={{ borderRadius: 12, border: '1px solid var(--color-border)', padding: 10, fontFamily: 'monospace' }}
          />
        </label>
        <div className="row-wrap">
          <button type="button" className="btn btn-secondary" onClick={() => handleImportConfigText(pastedText)}>
            Import as Configuration
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => handleImportBackupText(pastedText)}>
            Import as Full Backup
          </button>
        </div>
      </div>

      {pendingConfig && (
        <div className="modal-overlay" onClick={() => setPendingConfig(null)}>
          <div className="modal-card stack" onClick={(e) => e.stopPropagation()}>
            <h3>Replace current configuration?</h3>
            <p className="muted">
              This will overwrite states, capitals, and regions with the imported file ({pendingConfig.states.length} states).
              Progress and profile are not affected.
            </p>
            <div className="row-wrap">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  replaceConfig(pendingConfig);
                  setPendingConfig(null);
                  setMessage({ type: 'success', text: 'Configuration imported successfully.' });
                }}
              >
                Yes, replace configuration
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setPendingConfig(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {pendingBackup && (
        <div className="modal-overlay" onClick={() => setPendingBackup(null)}>
          <div className="modal-card stack" onClick={(e) => e.stopPropagation()}>
            <h3>Restore full backup?</h3>
            <p className="muted">
              This will overwrite states, capitals, regions, profile, settings, and progress with the imported backup. This
              cannot be undone.
            </p>
            <div className="row-wrap">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  replaceConfig(pendingBackup.config);
                  replacePreferences(pendingBackup.preferences);
                  replaceProgress(pendingBackup.progress);
                  setPendingBackup(null);
                  setMessage({ type: 'success', text: 'Full backup restored successfully.' });
                }}
              >
                Yes, restore full backup
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setPendingBackup(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
