import React, { useState } from 'react';

// ─── BACKEND TEAM: replace with GET /api/events ───────────────────────────
const MOCK_EVENTS = [
  {
    id: 1,
    name: 'Pune Mega-Drive',
    venue: 'Symbiosis Intl.',
    dates: 'Jul 14–16, 2025',
    status: 'Active',
    registered: 487,
    shortlisted: 142,
    corporates: 8,
    schedule: [
      { day: 'Day 1', bg: '#EEEDFE', color: '#3C3489', desc: 'Pre-placement talks & aptitude screening' },
      { day: 'Day 2', bg: '#E1F5EE', color: '#085041', desc: 'GD round + Technical interviews' },
      { day: 'Day 3', bg: '#FAEEDA', color: '#633806', desc: 'Personal interviews + Spot offers' },
    ],
    note: null,
  },
  {
    id: 2,
    name: 'Bangalore Drive',
    venue: 'Christ University',
    dates: 'Jul 22–24, 2025',
    status: 'Active',
    registered: 612,
    shortlisted: null,
    corporates: 11,
    schedule: null,
    note: 'Screening test scheduled 3 days before event. Corporate kits being prepared. Hotel block: Taj Yeshwantpur.',
  },
];

const MOCK_ASSIGNMENTS = [
  { company: 'Infosys BPM',  industry: 'IT Services', profiles: 'Analyst, Developer', openings: 25, buddy: 'Kavita M.', status: 'Confirmed',    statusTag: 'tag-green' },
  { company: 'Bajaj Finserv',industry: 'BFSI',        profiles: 'Sales, Ops',         openings: 40, buddy: 'Arjun S.',  status: 'Confirmed',    statusTag: 'tag-green' },
  { company: 'Wipro',        industry: 'IT Services', profiles: 'Fresher Dev',         openings: 30, buddy: 'Pooja R.', status: 'Kit pending',  statusTag: 'tag-amber' },
  { company: 'ICICI Bank',   industry: 'Banking',     profiles: 'RO, SO',              openings: 50, buddy: 'Rahul T.', status: 'Confirmed',    statusTag: 'tag-green' },
  { company: 'Marico',       industry: 'FMCG',        profiles: 'MT, Intern',          openings: 15, buddy: '–',        status: 'Needs buddy',  statusTag: 'tag-coral' },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(MOCK_EVENTS[0].id);

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Event management</div>
        <div className="page-sub">Manage each 3-day drive, its venue, colleges, and corporate assignments.</div>
      </div>

      {/* Event Cards */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
        {MOCK_EVENTS.map(ev => (
          <div
            key={ev.id}
            className="card"
            style={{
              flex: 1,
              cursor: 'pointer',
              border: selectedEvent === ev.id ? '2px solid #7F77DD' : '0.5px solid #e5e5e5',
            }}
            onClick={() => setSelectedEvent(ev.id)}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{ev.name}</div>
                <div style={{ fontSize: 12, color: '#888' }}>{ev.dates} · {ev.venue}</div>
              </div>
              <span className="tag tag-purple">{ev.status}</span>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {[
                { label: 'Registered',  val: ev.registered },
                { label: 'Shortlisted', val: ev.shortlisted ?? '–' },
                { label: 'Corporates',  val: ev.corporates },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center', padding: 8, background: '#f5f5f7', borderRadius: 8 }}>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: '#888' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Schedule or note */}
            {ev.schedule && (
              <>
                <div className="divider" />
                <div style={{ fontSize: 12, fontWeight: 500, color: '#888', marginBottom: 6 }}>Day-wise schedule</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {ev.schedule.map(d => (
                    <div key={d.day} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                      <span style={{ background: d.bg, color: d.color, padding: '2px 6px', borderRadius: 4, fontWeight: 500, minWidth: 40, textAlign: 'center' }}>{d.day}</span>
                      <span style={{ color: '#888' }}>{d.desc}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            {ev.note && (
              <>
                <div className="divider" />
                <div style={{ fontSize: 12, color: '#888' }}>{ev.note}</div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Corporate Assignments Table */}
      <div className="card">
        <div className="card-title">
          Corporate assignments — {MOCK_EVENTS.find(e => e.id === selectedEvent)?.name}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Industry</th>
              <th>Profiles hiring for</th>
              <th>Openings</th>
              <th>Event Buddy</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ASSIGNMENTS.map((a, i) => (
              <tr key={i}>
                <td><strong>{a.company}</strong></td>
                <td>{a.industry}</td>
                <td>{a.profiles}</td>
                <td>{a.openings}</td>
                <td>{a.buddy}</td>
                <td><span className={`tag ${a.statusTag}`}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
        {/* ─── BACKEND TEAM: POST /api/events to create a new event ─── */}
        <button className="btn btn-primary" onClick={() => alert('Backend team: open New Event modal / form')}>
          + Add event
        </button>
      </div>
    </div>
  );
}
