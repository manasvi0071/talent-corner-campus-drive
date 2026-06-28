import React, { useState } from 'react';

const INITIAL_CITIES = [
  {
    id: 1,
    city: 'Pune',
    date: 'Jul 14–16, 2025',
    hotel: 'Taj Pune',
    items: [
      { id: 1, label: 'Venue confirmed',           done: true  },
      { id: 2, label: 'Hotel block booked — Taj Pune', done: true  },
      { id: 3, label: 'Flight tickets arranged',   done: false, pending: true, pendingCount: 3 },
      { id: 4, label: 'Corporate kits prepared',   done: false },
      { id: 5, label: 'Candidate RSVP calls done', done: true  },
      { id: 6, label: 'WhatsApp group created',    done: true  },
      { id: 7, label: 'Aptitude test scheduled',   done: false },
      { id: 8, label: 'Venue walkthrough done',    done: false },
      { id: 9, label: 'Corporate shuttle booked',  done: false, pending: true, pendingCount: 2 },
      { id: 10,label: 'Spot offer zone set up',    done: false },
    ],
  },
  {
    id: 2,
    city: 'Bangalore',
    date: 'Jul 22–24, 2025',
    hotel: 'Taj Yeshwantpur',
    items: [
      { id: 1, label: 'Venue confirmed',           done: true  },
      { id: 2, label: 'Hotel block booked — Taj Yeshwantpur', done: true },
      { id: 3, label: 'Flight tickets arranged',   done: false, pending: true, pendingCount: 5 },
      { id: 4, label: 'Corporate kits prepared',   done: false },
      { id: 5, label: 'Candidate RSVP calls done', done: false },
      { id: 6, label: 'WhatsApp group created',    done: false },
      { id: 7, label: 'Aptitude test scheduled',   done: true  },
      { id: 8, label: 'Venue walkthrough done',    done: false },
      { id: 9, label: 'Corporate shuttle booked',  done: false },
      { id: 10,label: 'Spot offer zone set up',    done: false },
    ],
  },
  {
    id: 3,
    city: 'Hyderabad',
    date: 'Aug 5–7, 2025',
    hotel: 'Not booked yet',
    items: [
      { id: 1, label: 'Venue confirmed',           done: false },
      { id: 2, label: 'Hotel block booked',        done: false },
      { id: 3, label: 'Flight tickets arranged',   done: false },
      { id: 4, label: 'Corporate kits prepared',   done: false },
      { id: 5, label: 'Candidate RSVP calls done', done: false },
      { id: 6, label: 'WhatsApp group created',    done: false },
      { id: 7, label: 'Aptitude test scheduled',   done: false },
      { id: 8, label: 'Venue walkthrough done',    done: false },
      { id: 9, label: 'Corporate shuttle booked',  done: false },
      { id: 10,label: 'Spot offer zone set up',    done: false },
    ],
  },
  {
    id: 4,
    city: 'Indore',
    date: 'Aug 19–21, 2025',
    hotel: 'Not booked yet',
    items: [
      { id: 1, label: 'Venue confirmed',           done: false },
      { id: 2, label: 'Hotel block booked',        done: false },
      { id: 3, label: 'Flight tickets arranged',   done: false },
      { id: 4, label: 'Corporate kits prepared',   done: false },
      { id: 5, label: 'Candidate RSVP calls done', done: false },
      { id: 6, label: 'WhatsApp group created',    done: false },
      { id: 7, label: 'Aptitude test scheduled',   done: false },
      { id: 8, label: 'Venue walkthrough done',    done: false },
      { id: 9, label: 'Corporate shuttle booked',  done: false },
      { id: 10,label: 'Spot offer zone set up',    done: false },
    ],
  },
];

export default function CityChecklist() {
  const [cities, setCities] = useState(INITIAL_CITIES);
  const [selected, setSelected] = useState(1);

  const toggleItem = (cityId, itemId) => {
    setCities(prev => prev.map(c =>
      c.id !== cityId ? c : {
        ...c,
        items: c.items.map(item =>
          item.id !== itemId ? item : { ...item, done: !item.done }
        )
      }
    ));
  };

  const city = cities.find(c => c.id === selected);
  const done  = city.items.filter(i => i.done).length;
  const total = city.items.length;
  const pct   = Math.round((done / total) * 100);

  const getIcon = (item) => {
    if (item.done) return { icon: '✅', color: '#1D9E75' };
    if (item.pending) return { icon: '⏳', color: '#BA7517' };
    return { icon: '❌', color: '#D85A30' };
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">City-wise event checklist</div>
        <div className="page-sub">Track every preparation task for each drive city.</div>
      </div>

      {/* City selector tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        {cities.map(c => {
          const d = c.items.filter(i => i.done).length;
          const t = c.items.length;
          const p = Math.round((d / t) * 100);
          return (
            <div
              key={c.id}
              onClick={() => setSelected(c.id)}
              style={{
                flex: '1 1 180px',
                padding: '14px 16px',
                borderRadius: 12,
                cursor: 'pointer',
                border: selected === c.id ? '2px solid #7F77DD' : '0.5px solid #e5e5e5',
                background: selected === c.id ? '#EEEDFE' : 'white',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, color: selected === c.id ? '#3C3489' : '#111' }}>
                {c.city}
              </div>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 8 }}>{c.date}</div>
              <div style={{ height: 4, background: '#e5e5e5', borderRadius: 2 }}>
                <div style={{ height: '100%', width: `${p}%`, background: p === 100 ? '#1D9E75' : '#7F77DD', borderRadius: 2, transition: 'width 0.3s' }} />
              </div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>{d}/{t} done · {p}%</div>
            </div>
          );
        })}
      </div>

      {/* Selected city checklist */}
      <div className="grid-2">
        <div className="card">
          {/* Header */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#3C3489' }}>
              {city.city} Drive — {city.date}
            </div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
              🏨 {city.hotel}
            </div>
            <div style={{ marginTop: 10, height: 6, background: '#e5e5e5', borderRadius: 3 }}>
              <div style={{
                height: '100%',
                width: `${pct}%`,
                background: pct === 100 ? '#1D9E75' : '#7F77DD',
                borderRadius: 3,
                transition: 'width 0.4s',
              }} />
            </div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
              {done} of {total} tasks completed ({pct}%)
            </div>
          </div>

          <div className="divider" />

          {/* Checklist items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {city.items.map(item => {
              const { icon, color } = getIcon(item);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(city.id, item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 12px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    background: item.done ? '#f0faf6' : '#fafafa',
                    border: `0.5px solid ${item.done ? '#b8e8d4' : '#e5e5e5'}`,
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ fontSize: 16 }}>{icon}</span>
                  <span style={{
                    flex: 1,
                    fontSize: 13,
                    color: item.done ? '#085041' : '#333',
                    textDecoration: item.done ? 'line-through' : 'none',
                  }}>
                    {item.label}
                    {item.pending && !item.done && (
                      <span style={{ marginLeft: 6, fontSize: 11, color, fontWeight: 500 }}>
                        ({item.pendingCount} pending)
                      </span>
                    )}
                  </span>
                  <span style={{ fontSize: 11, color: '#aaa' }}>
                    {item.done ? 'Done ✓' : 'Tap to mark'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card">
            <div className="card-title">Overall progress</div>
            {cities.map(c => {
              const d = c.items.filter(i => i.done).length;
              const t = c.items.length;
              const p = Math.round((d / t) * 100);
              return (
                <div key={c.id} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{c.city}</span>
                    <span style={{ fontSize: 12, color: '#888' }}>{d}/{t} · {p}%</span>
                  </div>
                  <div style={{ height: 6, background: '#e5e5e5', borderRadius: 3 }}>
                    <div style={{
                      height: '100%',
                      width: `${p}%`,
                      background: p === 100 ? '#1D9E75' : p > 50 ? '#7F77DD' : '#D85A30',
                      borderRadius: 3,
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="card">
            <div className="card-title">Legend</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { icon: '✅', label: 'Done — click to undo',      color: '#1D9E75' },
                { icon: '⏳', label: 'In progress / partial',     color: '#BA7517' },
                { icon: '❌', label: 'Not started — click to mark done', color: '#D85A30' },
              ].map(l => (
                <div key={l.icon} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: l.color }}>
                  <span>{l.icon}</span>
                  <span>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-title">Quick stats — {city.city}</div>
            {[
              { label: 'Tasks done',    val: done,         color: '#1D9E75' },
              { label: 'Remaining',     val: total - done, color: '#D85A30' },
              { label: 'Completion',    val: `${pct}%`,    color: '#7F77DD' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '0.5px solid #f0f0f0' }}>
                <span style={{ fontSize: 13, color: '#666' }}>{s.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}