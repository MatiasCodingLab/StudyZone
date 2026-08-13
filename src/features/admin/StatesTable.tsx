import { useState } from 'react';
import { useAppState } from '../../state/AppStateContext';
import { slugify } from '../../data/defaultStates';

export function StatesTable() {
  const { config, updateConfig, resetToDefault } = useAppState();
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [filterRegion, setFilterRegion] = useState<string>('all');

  const regions = config.regions;
  const rows = config.states.filter((s) => filterRegion === 'all' || s.regionId === filterRegion);

  function updateState(id: string, patch: Partial<(typeof config.states)[number]>) {
    updateConfig((prev) => ({
      ...prev,
      states: prev.states.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));
  }

  function deleteState(id: string) {
    updateConfig((prev) => ({ ...prev, states: prev.states.filter((s) => s.id !== id) }));
  }

  function addCustomState() {
    updateConfig((prev) => {
      const baseName = 'New State';
      let candidate = slugify(baseName);
      let n = 1;
      const existingIds = new Set(prev.states.map((s) => s.id));
      while (existingIds.has(candidate)) {
        n += 1;
        candidate = `${slugify(baseName)}-${n}`;
      }
      const defaultRegionId = prev.regions[0]?.id ?? '';
      return {
        ...prev,
        states: [
          ...prev.states,
          { id: candidate, state: baseName, capital: 'New Capital', regionId: defaultRegionId, enabled: true, custom: true },
        ],
      };
    });
  }

  return (
    <div className="stack" style={{ gap: 16 }}>
      <div className="spread row-wrap">
        <div className="row-wrap">
          <label className="muted" htmlFor="region-filter">
            Filter by region:
          </label>
          <select id="region-filter" value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)}>
            <option value="all">All regions</option>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <div className="row-wrap">
          <button type="button" className="btn btn-secondary" onClick={addCustomState}>
            + Add Custom State
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => setConfirmingReset(true)}>
            Restore Defaults
          </button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Capital</th>
              <th>Practice Region</th>
              <th>Enabled</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id}>
                <td>
                  <input value={s.state} onChange={(e) => updateState(s.id, { state: e.target.value })} />
                </td>
                <td>
                  <input value={s.capital} onChange={(e) => updateState(s.id, { capital: e.target.value })} />
                </td>
                <td>
                  <select value={s.regionId} onChange={(e) => updateState(s.id, { regionId: e.target.value })}>
                    {regions.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={s.enabled}
                    onChange={(e) => updateState(s.id, { enabled: e.target.checked })}
                    style={{ width: 20, height: 20 }}
                  />
                </td>
                <td>
                  {s.custom && (
                    <button type="button" className="btn btn-ghost" onClick={() => deleteState(s.id)}>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {confirmingReset && (
        <div className="modal-overlay" onClick={() => setConfirmingReset(false)}>
          <div className="modal-card stack" onClick={(e) => e.stopPropagation()}>
            <h3>Restore default states &amp; regions?</h3>
            <p className="muted">
              This replaces all states, capitals, and region assignments with the original defaults. Custom entries will be
              removed. This cannot be undone.
            </p>
            <div className="row-wrap">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  resetToDefault();
                  setConfirmingReset(false);
                }}
              >
                Yes, restore defaults
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setConfirmingReset(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
