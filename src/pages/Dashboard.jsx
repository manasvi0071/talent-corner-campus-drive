import React from 'react';

// ─── BACKEND TEAM: replace all this with real API calls ──────────────────────
// Example:  useEffect(() => { fetch('/api/dashboard/stats').then(...) }, [])
const MOCK_STATS = {
  registered: 2841,
  shortlisted: 874,
  offers: 312,
  partners: 14,
};

const MOCK_PIPELINE = [
  { step: 1, label: 'Registered',  count: 2841, pct: 100, color: '#7F77DD', bg: '#EEEDFE', textColor: '#3C3489' },
  { step: 2, label: 'Screened',    count: 1989, pct: 70,  color: '#1D9E75', bg: '#E1F5EE', textColor: '#085041' },
  { step: 3, label: 'Shortlisted', count: 874,  pct: 31,  color: '#BA7517', bg: '#FAEEDA', textColor: '#633806' },
  { step: 4, label: 'Interviewed', count: 630,  pct: 22,  color: '#D85A30', bg: '#FAECE7', textColor: '#4A1B0C' },
  { step: 5, label: 'Offered',     count: 312,  pct: 11,  color: '#639922', bg: '#EAF3DE', textColor: '#173404' },
];

const MOCK_EVENTS = [
  { id: 1, name: 'Pune Mega-Drive',  venue: 'Symbiosis Intl. Univ', reg: 487, date: 'Jul 14–16', daysLabel: 'In 8 days',  dot: '#7F77DD', tagClass: 'tag-purple' },
  { id: 2, name: 'Bangalore Drive',  venue: 'Christ University',     reg: 612, date: 'Jul 22–24', daysLabel: 'In 16 days', dot: '#1D9E75', tagClass: 'tag-green' },
  { id: 3, name: 'Indore Drive',     venue: 'DAVV',                  reg: 334, date: 'Aug 5–7',   daysLabel: 'Planning',   dot: '#BA7517', tagClass: 'tag-amber' },
  { id: 4, name: 'Lucknow Drive',    venue: 'BBAU',                  reg: 220, date: 'Aug 19–21', daysLabel: 'Early',      dot: '#D85A30', tagClass: 'tag-coral' },
];

const MOCK_CITIES = [
  { city: 'Pune',      reg: 487, short: 142,  status: 'Active',    tag: 'tag-purple' },
  { city: 'Bangalore', reg: 612, short: 198,  status: 'Active',    tag: 'tag-purple' },
  { city: 'Hyderabad', reg: 541, short: 176,  status: 'Completed', tag: 'tag-green' },
  { city: 'Indore',    reg: 334, short: '–',  status: 'Planning',  tag: 'tag-amber' },
  { city: 'Lucknow',   reg: 220, short: '–',  status: 'Early',     tag: 'tag-gray' },
];

const MOCK_B2B = [
  { name: 'Meera Joshi — Infosys BPM',   sub: 'Alumni · "Company is hiring" · Hyderabad Drive', dot: '#1D9E75' },
  { name: 'Rajan Mehta — Franchise inquiry', sub: 'Interested in TC Pune franchise · Hot lead', dot: '#7F77DD' },
  { name: 'Priya Sharma — TCS MIS',      sub: 'Alumni · HR Manager · Needs 12 hires Q3',         dot: '#BA7517' },
  { name: 'Franchise inquiry — Indore',  sub: '2 inquiries from the Franchise Lounge',            dot: '#D85A30' },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  return (
    <div className="page">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div>
          <h2>Talent Corner Mega-Drive 2025</h2>
          <p>Pan-India Pool Campus Initiative · 6 cities · 3-day drive</p>
        </div>
        <div className="hero-stat">
          <div className="big">{MOCK_STATS.registered.toLocaleString()}</div>
          <div className="small">total registrations this season</div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="metrics">
        <div className="metric-card">
          <div className="metric-label">Registered candidates</div>
          <div className="metric-val">{MOCK_STATS.registered.toLocaleString()}</div>
          <div className="metric-badge badge-green">↑ 18% vs last drive</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Shortlisted</div>
          <div className="metric-val">{MOCK_STATS.shortlisted.toLocaleString()}</div>
          <div className="metric-badge badge-purple">30.8% rate</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Offers made</div>
          <div className="metric-val">{MOCK_STATS.offers.toLocaleString()}</div>
          <div className="metric-badge badge-green">35.7% conversion</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Corporate partners</div>
          <div className="metric-val">{MOCK_STATS.partners}</div>
          <div className="metric-badge badge-amber">2 seats open</div>
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
                    <div className="progress-fill" style={{ width: `${item.pct}%`, background: item.color }} />
                  </div>
                  <div className="pipe-count" style={{ color: item.color }}>{item.count.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card">
          <div className="card-title">
            Upcoming events
            <i className="ti ti-calendar" style={{ fontSize: 16, color: '#888' }} />
          </div>
          <div className="event-list">
            {MOCK_EVENTS.map(ev => (
              <div className="event-item" key={ev.id}>
                <div className="event-dot" style={{ background: ev.dot }} />
                <div className="event-info">
                  <div className="event-name">{ev.name}</div>
                  <div className="event-meta">{ev.venue} · {ev.reg} registered</div>
                </div>
                <div className="event-right">
                  <div className="event-date">{ev.date}</div>
                  <div className={`tag ${ev.tagClass}`} style={{ marginTop: 2 }}>{ev.daysLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* City Table + B2B Timeline */}
      <div className="grid-2">
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

        <div className="card">
          <div className="card-title">
            B2B leads captured
            <i className="ti ti-briefcase" style={{ fontSize: 16, color: '#888' }} />
          </div>
          <div className="timeline">
            {MOCK_B2B.map((item, i) => (
              <div className="tl-item" key={i}>
                <div className="tl-line-wrap">
                  <div className="tl-dot" style={{ background: item.dot }} />
                  {i < MOCK_B2B.length - 1 && <div className="tl-line" />}
                </div>
                <div className="tl-content">
                  <div className="tl-title">{item.name}</div>
                  <div className="tl-sub">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
