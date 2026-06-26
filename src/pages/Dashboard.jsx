import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../api';

const MOCK_PIPELINE = [
  { step: 1, label: 'Registered',  color: '#7F77DD', bg: '#EEEDFE', textColor: '#3C3489' },
  { step: 2, label: 'Screened',    color: '#1D9E75', bg: '#E1F5EE', textColor: '#085041' },
  { step: 3, label: 'Shortlisted', color: '#BA7517', bg: '#FAEEDA', textColor: '#633806' },
  { step: 4, label: 'Interviewed', color: '#D85A30', bg: '#FAECE7', textColor: '#4A1B0C' },
  { step: 5, label: 'Offered',     color: '#639922', bg: '#EAF3DE', textColor: '#173404' },
];

const MOCK_CITIES = [
  { city: 'Pune',      reg: 487, short: 142,  status: 'Active',    tag: 'tag-purple' },
  { city: 'Bangalore', reg: 612, short: 198,  status: 'Active',    tag: 'tag-purple' },
  { city: 'Hyderabad', reg: 541, short: 176,  status: 'Completed', tag: 'tag-green'  },
  { city: 'Indore',    reg: 334, short: '–',  status: 'Planning',  tag: 'tag-amber'  },
  { city: 'Lucknow',   reg: 220, short: '–',  status: 'Early',     tag: 'tag-gray'   },
];

export default function Dashboard() {
  const [stats,    setStats]    = useState({ registered: 0, shortlisted: 0, offered: 0, partners: 0 });
  const [events,   setEvents]   = useState([]);
  const [b2bleads, setB2bleads] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    getDashboardStats()
      .then(data => {
        setStats(data.stats);
        setEvents(data.events     || []);
        setB2bleads(data.b2bleads || []);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page"><p>Loading dashboard…</p></div>;
  if (error)   return <div className="page"><p style={{ color: '#D85A30' }}>Error: {error}</p></div>;

  return (
    <div className="page">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div>
          <h2>Talent Corner Mega-Drive 2025</h2>
          <p>Pan-India Pool Campus Initiative · 6 cities · 3-day drive</p>
        </div>
        <div className="hero-stat">
          <div className="big">{stats.registered?.toLocaleString()}</div>
          <div className="small">total registrations this season</div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="metrics">
        <div className="metric-card">
          <div className="metric-label">Registered candidates</div>
          <div className="metric-val">{stats.registered?.toLocaleString()}</div>
          <div className="metric-badge badge-green">Live from DB</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Shortlisted</div>
          <div className="metric-val">{stats.shortlisted?.toLocaleString()}</div>
          <div className="metric-badge badge-purple">
            {stats.registered ? Math.round((stats.shortlisted / stats.registered) * 100) : 0}% rate
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Offers made</div>
          <div className="metric-val">{stats.offered?.toLocaleString()}</div>
          <div className="metric-badge badge-green">
            {stats.shortlisted ? Math.round((stats.offered / stats.shortlisted) * 100) : 0}% conversion
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Corporate partners</div>
          <div className="metric-val">{stats.partners}</div>
          <div className="metric-badge badge-amber">Active</div>
        </div>
      </div>

      {/* Pipeline + Events */}
      <div className="grid-2">
        <div className="card">
          <div className="card-title">
            Recruitment pipeline
            <i className="ti ti-filter" style={{ fontSize: 16, color: '#888' }} />
          </div>
          <div className="pipeline">
            {MOCK_PIPELINE.map(item => (
              <div className="pipe-step" key={item.step}>
                <div className="pipe-left">
                  <div className="pipe-num" style={{ background: item.bg, color: item.textColor }}>
                    {item.step}
                  </div>
                  <div className="pipe-name">{item.label}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="progress-bar" style={{ width: 80 }}>
                    <div className="progress-fill" style={{ width: `${stats[item.label.toLowerCase()] ? Math.round((stats[item.label.toLowerCase()] / stats.registered) * 100) : 0}%`, background: item.color }} />
                  </div>
                  <div className="pipe-count" style={{ color: item.color }}>
                    {stats[item.label.toLowerCase()]?.toLocaleString() ?? '—'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">
            Upcoming events
            <i className="ti ti-calendar" style={{ fontSize: 16, color: '#888' }} />
          </div>
          <div className="event-list">
            {events.length === 0 && <p style={{ color: '#888' }}>No events yet.</p>}
            {events.map(ev => (
              <div className="event-item" key={ev.id}>
                <div className="event-dot" style={{ background: '#7F77DD' }} />
                <div className="event-info">
                  <div className="event-name">{ev.name}</div>
                  <div className="event-meta">{ev.venue} · {ev.registered} registered</div>
                </div>
                <div className="event-right">
                  <div className="event-date">{ev.dates}</div>
                  <div className="tag tag-purple" style={{ marginTop: 2 }}>{ev.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cities + B2B */}
      <div className="grid-2">
        <div className="card">
          <div className="card-title">
            City-wise registrations
            <i className="ti ti-map-pin" style={{ fontSize: 16, color: '#888' }} />
          </div>
          <table className="table">
            <thead>
              <tr><th>City</th><th>Registered</th><th>Shortlisted</th><th>Status</th></tr>
            </thead>
            <tbody>
              {MOCK_CITIES.map(c => (
                <tr key={c.city}>
                  <td>{c.city}</td>
                  <td>{c.reg}</td>
                  <td>{c.short}</td>
                  <td><span className={`tag ${c.tag}`}>{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-title">
            B2B leads captured
            <i className="ti ti-briefcase" style={{ fontSize: 16, color: '#888' }} />
          </div>
          <div className="timeline">
            {b2bleads.length === 0 && <p style={{ color: '#888' }}>No B2B leads yet.</p>}
            {b2bleads.map((item, i) => (
              <div className="tl-item" key={item.id}>
                <div className="tl-line-wrap">
                  <div className="tl-dot" style={{ background: '#7F77DD' }} />
                  {i < b2bleads.length - 1 && <div className="tl-line" />}
                </div>
                <div className="tl-content">
                  <div className="tl-title">{item.name} — {item.company}</div>
                  <div className="tl-sub">{item.type} · {item.source}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}