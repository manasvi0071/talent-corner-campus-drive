import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../api';

const PIPELINE_META = [
  { key: 'registered',  label: 'Registered',  step: 1, color: '#7F77DD', bg: '#EEEDFE', textColor: '#3C3489' },
  { key: 'screened',    label: 'Screened',     step: 2, color: '#1D9E75', bg: '#E1F5EE', textColor: '#085041' },
  { key: 'shortlisted', label: 'Shortlisted',  step: 3, color: '#BA7517', bg: '#FAEEDA', textColor: '#633806' },
  { key: 'interviewed', label: 'Interviewed',  step: 4, color: '#D85A30', bg: '#FAECE7', textColor: '#4A1B0C' },
  { key: 'offered',     label: 'Offered',      step: 5, color: '#639922', bg: '#EAF3DE', textColor: '#173404' },
];

const MOCK_CITIES = [
  { city: 'Pune',      reg: 487, short: 142, status: 'Active',    tag: 'tag-purple' },
  { city: 'Bangalore', reg: 612, short: 198, status: 'Active',    tag: 'tag-purple' },
  { city: 'Hyderabad', reg: 541, short: 176, status: 'Completed', tag: 'tag-green'  },
  { city: 'Indore',    reg: 334, short: '–', status: 'Planning',  tag: 'tag-amber'  },
  { city: 'Lucknow',   reg: 220, short: '–', status: 'Early',     tag: 'tag-gray'   },
];

export default function Dashboard() {
  const [stats,    setStats]    = useState({
    registered: 0, screened: 0, shortlisted: 0,
    interviewed: 0, offered: 0, partners: 0,
  });
  const [events,   setEvents]   = useState([]);
  const [b2bleads, setB2bleads] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    getDashboardStats()
      .then(data => {
        setStats(data.stats   || data);
        setEvents(data.events     || []);
        setB2bleads(data.b2bleads || []);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="page">
      <div style={{ textAlign: 'center', padding: 60, color: '#888' }}>
        Loading dashboard...
      </div>
    </div>
  );

  if (error) return (
    <div className="page">
      <div style={{ textAlign: 'center', padding: 60, color: '#D85A30' }}>
        Error loading dashboard: {error}
      </div>
    </div>
  );

  const safeNum = (val) => Number(val) || 0;

  return (
    <div className="page">

      {/* Hero Banner */}
      <div className="hero-banner">
        <div>
          <h2>Talent Corner Mega-Drive 2025</h2>
          <p>Pan-India Pool Campus Initiative · 6 cities · 3-day drive</p>
        </div>
        <div className="hero-stat">
          <div className="big">{safeNum(stats.registered).toLocaleString()}</div>
          <div className="small">total registrations this season</div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="metrics">
        <div className="metric-card">
          <div className="metric-label">Registered candidates</div>
          <div className="metric-val">{safeNum(stats.registered).toLocaleString()}</div>
          <div className="metric-badge badge-green">Live from DB</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Shortlisted</div>
          <div className="metric-val">{safeNum(stats.shortlisted).toLocaleString()}</div>
          <div className="metric-badge badge-purple">
            {safeNum(stats.registered)
              ? Math.round((safeNum(stats.shortlisted) / safeNum(stats.registered)) * 100)
              : 0}% rate
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Offers made</div>
          <div className="metric-val">{safeNum(stats.offered).toLocaleString()}</div>
          <div className="metric-badge badge-green">
            {safeNum(stats.shortlisted)
              ? Math.round((safeNum(stats.offered) / safeNum(stats.shortlisted)) * 100)
              : 0}% conversion
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Corporate partners</div>
          <div className="metric-val">{safeNum(stats.partners)}</div>
          <div className="metric-badge badge-amber">Active</div>
        </div>
      </div>

      {/* Pipeline + Events */}
      <div className="grid-2">

        {/* Recruitment Pipeline */}
        <div className="card">
          <div className="card-title">
            Recruitment pipeline
            <i className="ti ti-filter" style={{ fontSize: 16, color: '#888' }} />
          </div>
          <div className="pipeline">
            {PIPELINE_META.map(item => {
              const count = safeNum(stats[item.key]);
              const base  = safeNum(stats.registered);
              const pct   = base ? Math.round((count / base) * 100) : 0;
              return (
                <div className="pipe-step" key={item.step}>
                  <div className="pipe-left">
                    <div className="pipe-num" style={{ background: item.bg, color: item.textColor }}>
                      {item.step}
                    </div>
                    <div className="pipe-name">{item.label}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="progress-bar" style={{ width: 80 }}>
                      <div className="progress-fill"
                        style={{ width: `${pct}%`, background: item.color }} />
                    </div>
                    <div className="pipe-count" style={{ color: item.color, minWidth: 32 }}>
                      {count.toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card">
          <div className="card-title">
            Upcoming events
            <i className="ti ti-calendar" style={{ fontSize: 16, color: '#888' }} />
          </div>
          <div className="event-list">
            {events.length === 0 ? (
              <div className="empty">No events yet.</div>
            ) : events.map(ev => (
              <div className="event-item" key={ev.id}>
                <div className="event-dot" style={{ background: '#7F77DD' }} />
                <div className="event-info">
                  <div className="event-name">{ev.name}</div>
                  <div className="event-meta">{ev.venue} · {ev.registered ?? 0} registered</div>
                </div>
                <div className="event-right">
                  <div className="event-date">{ev.dates}</div>
                  <div className="tag tag-purple" style={{ marginTop: 2 }}>{ev.status || 'Active'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Cities + B2B */}
      <div className="grid-2">

        {/* City Table */}
        <div className="card">
          <div className="card-title">
            City-wise registrations
            <i className="ti ti-map-pin" style={{ fontSize: 16, color: '#888' }} />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>City</th>
                <th>Registered</th>
                <th>Shortlisted</th>
                <th>Status</th>
              </tr>
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

        {/* B2B Leads */}
        <div className="card">
          <div className="card-title">
            B2B leads captured
            <i className="ti ti-briefcase" style={{ fontSize: 16, color: '#888' }} />
          </div>
          <div className="timeline">
            {b2bleads.length === 0 ? (
              <div className="empty">No B2B leads yet.</div>
            ) : b2bleads.map((item, i) => (
              <div className="tl-item" key={item.id || i}>
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