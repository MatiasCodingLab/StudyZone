import { useState } from 'react';
import { useAppState } from '../../state/AppStateContext';
import { slugify } from '../../data/defaultStates';

export function RegionsEditor() {
  const { config, updateConfig } = useAppState();
  const [newRegionName, setNewRegionName] = useState('');
  const regions = [...config.regions].sort((a, b) => a.order - b.order);

  function renameRegion(id: string, name: string) {
    updateConfig((prev) => ({ ...prev, regions: prev.regions.map((r) => (r.id === id ? { ...r, name } : r)) }));
  }

  function toggleEnabled(id: string, enabled: boolean) {
    updateConfig((prev) => ({ ...prev, regions: prev.regions.map((r) => (r.id === id ? { ...r, enabled } : r)) }));
  }

  function moveRegion(id: string, direction: -1 | 1) {
    updateConfig((prev) => {
      const sorted = [...prev.regions].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex((r) => r.id === id);
      const swapIndex = index + direction;
      if (swapIndex < 0 || swapIndex >= sorted.length) return prev;
      const a = sorted[index];
      const b = sorted[swapIndex];
      const newOrderA = b.order;
      const newOrderB = a.order;
      return {
        ...prev,
        regions: prev.regions.map((r) => {
          if (r.id === a.id) return { ...r, order: newOrderA };
          if (r.id === b.id) return { ...r, order: newOrderB };
          return r;
        }),
      };
    });
  }

  function deleteRegion(id: string) {
    updateConfig((prev) => ({ ...prev, regions: prev.regions.filter((r) => r.id !== id) }));
  }

  function addRegion() {
    const name = newRegionName.trim();
    if (!name) return;
    updateConfig((prev) => {
      let candidate = slugify(name);
      let n = 1;
      const existing = new Set(prev.regions.map((r) => r.id));
      while (existing.has(candidate)) {
        n += 1;
        candidate = `${slugify(name)}-${n}`;
      }
      const maxOrder = prev.regions.reduce((m, r) => Math.max(m, r.order), -1);
      return { ...prev, regions: [...prev.regions, { id: candidate, name, enabled: true, order: maxOrder + 1, custom: true }] };
    });
    setNewRegionName('');
  }

  function moveState(stateId: string, regionId: string) {
    updateConfig((prev) => ({ ...prev, states: prev.states.map((s) => (s.id === stateId ? { ...s, regionId } : s)) }));
  }

  return (
    <div className="stack" style={{ gap: 24 }}>
      <div className="card stack" style={{ gap: 12 }}>
        <h3>Regions</h3>
        {regions.map((r, idx) => {
          const stateCount = config.states.filter((s) => s.regionId === r.id).length;
          return (
            <div className="row-wrap" key={r.id} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 10 }}>
              <input value={r.name} onChange={(e) => renameRegion(r.id, e.target.value)} style={{ flex: 1, minWidth: 160 }} />
              <span className="muted">{stateCount} states</span>
              <label className="row" style={{ gap: 6 }}>
                <input type="checkbox" checked={r.enabled} onChange={(e) => toggleEnabled(r.id, e.target.checked)} />
                Enabled
              </label>
              <button type="button" className="btn btn-ghost" disabled={idx === 0} onClick={() => moveRegion(r.id, -1)}>
                ↑
              </button>
              <button type="button" className="btn btn-ghost" disabled={idx === regions.length - 1} onClick={() => moveRegion(r.id, 1)}>
                ↓
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                disabled={stateCount > 0}
                title={stateCount > 0 ? 'Move its states to another region first' : 'Delete region'}
                onClick={() => deleteRegion(r.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
        <div className="row-wrap">
          <input
            placeholder="New region name"
            value={newRegionName}
            onChange={(e) => setNewRegionName(e.target.value)}
            style={{ flex: 1, minWidth: 160 }}
          />
          <button type="button" className="btn btn-secondary" onClick={addRegion}>
            + Add Region
          </button>
        </div>
      </div>

      <div className="stack" style={{ gap: 16 }}>
        <h3>Assign States to Regions</h3>
        <p className="muted">Move any state to a different Practice Region using the dropdown next to it.</p>
        {regions.map((r) => {
          const statesInRegion = config.states.filter((s) => s.regionId === r.id);
          return (
            <div className="card stack" key={r.id} style={{ gap: 8 }}>
              <strong>
                {r.name} ({statesInRegion.length})
              </strong>
              <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
                {statesInRegion.map((s) => (
                  <div key={s.id} className="row-wrap" style={{ justifyContent: 'space-between' }}>
                    <span>{s.state}</span>
                    <select value={s.regionId} onChange={(e) => moveState(s.id, e.target.value)}>
                      {regions.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
                {statesInRegion.length === 0 && <span className="muted">No states assigned yet.</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
