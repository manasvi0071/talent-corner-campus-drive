import React, { useState, useEffect } from 'react';
import { getEvents, createEvent } from '../api';

const MOCK_ASSIGNMENTS = [
  { company: 'Infosys BPM',   industry: 'IT Services', profiles: 'Analyst, Developer', openings: 25, buddy: 'Kavita M.', status: 'Confirmed',   statusTag: 'tag-green' },
  { company: 'Bajaj Finserv', industry: 'BFSI',        profiles: 'Sales, Ops',         openings: 40, buddy: 'Arjun S.',  status: 'Confirmed',   statusTag: 'tag-green' },
  { company: 'Wipro',         industry: 'IT Services', profiles: 'Fresher Dev',         openings: 30, buddy: 'Pooja R.', status: 'Kit pending', statusTag: 'tag-amber' },
  { company: 'ICICI Bank',    industry: 'Banking',     profiles: 'RO, SO',              openings: 50, buddy: 'Rahul T.', status: 'Confirmed',   statusTag: 'tag-green' },
  { company: 'Marico',        industry: 'FMCG',        profiles: 'MT, Intern',          openings: 15, buddy: '–',        status: 'Needs buddy', statusTag: 'tag-coral' },
];

export default function Events() {
  const [events,        setEvents]        = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal,     setShowModal]     = useState(false);
  const [submitting,    setSubmitting]    = useState(false);
  const [newEvent,      setNewEvent]      = useState({ name: '', venue: '', dates: '', city: '', status: 'Upcoming' });

  useEffect(() => {
    getEvents()
      .then(data => {
        setEvents(data);
        if (data.length > 0) setSelectedEvent(data[0].id);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleCreateEvent = async () => {
    if (!newEvent.name) return;
    setSubmitting(true);
    try {
      const created = await createEvent(newEvent);
      setEvents(prev => [created, ...prev]);
      setSelectedEvent(created.id);
      setShowModal(false);
      setNewEvent({ name: '', venue: '', dates: '', city: '', status: 'Upcoming' });
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const selected = events.find(e => e.id === selectedEvent);

  if (loading) return <div className="page"><p>Loading events…</p></div>;
  if (error)   return <div className="page"><p style={{ color: '#D85A30' }}>Error: {error}</p></div>;

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Event management</div>
        <div className="page-sub">Manage each 3-day drive, its venue, colleges, and corporate assignments.</div>
      </div>

      {/* Event Cards */}
      {events.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 40, color: '#888' }}>
          No events yet. Click "+ Add event" to create one.
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
          {events.map(ev => (
            <div
              key={ev.id}
              className="card"
              style={{
                flex: 1, minWidth: 260, cursor: 'pointer',
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {[
                  { label: 'Registered',  val: ev.registered  ?? 0 },
                  { label: 'Shortlisted', val: ev.shortlisted ?? '–' },
                  { label: 'City',        val: ev.city        ?? '–' },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: 'center', padding: 8, background: '#f5f5f7', borderRadius: 8 }}>
                    <div style={{ fontSize: 18, fontWeight: 600 }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: '#888' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Corporate Assignments Table */}
      <div className="card">
        <div className="card-title">
          Corporate assignments — {selected?.name || 'select an event'}
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
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add event</button>
      </div>

      {/* Add Event Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: 420, margin: 0 }}>
            <div className="card-title" style={{ marginBottom: 16 }}>Create new event</div>
            <div className="form-group">
              <label className="form-label">Event name *</label>
              <input className="form-input" placeholder="e.g. Pune Mega-Drive"
                value={newEvent.name} onChange={e => setNewEvent(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Venue</label>
              <input className="form-input" placeholder="e.g. Symbiosis Intl. University"
                value={newEvent.venue} onChange={e => setNewEvent(p => ({ ...p, venue: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Dates</label>
              <input className="form-input" placeholder="e.g. Jul 14–16, 2025"
                value={newEvent.dates} onChange={e => setNewEvent(p => ({ ...p, dates: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <input className="form-input" placeholder="e.g. Pune"
                value={newEvent.city} onChange={e => setNewEvent(p => ({ ...p, city: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select" value={newEvent.status}
                onChange={e => setNewEvent(p => ({ ...p, status: e.target.value }))}>
                <option>Upcoming</option>
                <option>Ongoing</option>
                <option>Completed</option>
                <option>Planning</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
              <button className="btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleCreateEvent} disabled={submitting}>
                {submitting ? 'Creating…' : 'Create event'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}