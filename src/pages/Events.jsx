import React, { useState, useEffect } from 'react';
import { getEvents, createEvent } from '../api';

export default function Events() {
  const [events, setEvents]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [selectedId, setSelectedId]   = useState(null);
  const [showForm, setShowForm]       = useState(false);
  const [newEvent, setNewEvent]       = useState({ name: '', venue: '', dates: '', city: '' });

  useEffect(() => {
    getEvents()
      .then(data => { setEvents(data); if (data.length > 0) setSelectedId(data[0].id); })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async () => {
    try {
      await createEvent(newEvent);
      setShowForm(false);
      setNewEvent({ name: '', venue: '', dates: '', city: '' });
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      alert('Failed: ' + err.message);
    }
  };

  if (loading) return <div className="page"><p>Loading events...</p></div>;
  if (error)   return <div className="page"><p style={{ color: '#D85A30' }}>Error: {error}</p></div>;

  const selected = events.find(e => e.id === selectedId);

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Event management</div>
        <div className="page-sub">Manage each 3-day drive and corporate assignments.</div>
      </div>

      {/* Event Cards */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
        {events.length === 0 && <div className="empty">No events yet. Add one below!</div>}
        {events.map(ev => (
          <div
            key={ev.id}
            className="card"
            style={{
              flex: '1 1 280px', cursor: 'pointer',
              border: selectedId === ev.id ? '2px solid #7F77DD' : '0.5px solid #e5e5e5',
            }}
            onClick={() => setSelectedId(ev.id)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{ev.name}</div>
                <div style={{ fontSize: 12, color: '#888' }}>{ev.dates} · {ev.venue}</div>
              </div>
              <span className="tag tag-purple">{ev.status || 'Active'}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {[
                { label: 'Registered',  val: ev.registered ?? 0 },
                { label: 'Shortlisted', val: ev.shortlisted ?? '–' },
                { label: 'Corporates',  val: ev.corporates ?? 0 },
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

      {/* Assignments for selected event */}
      {selected && (
        <div className="card">
          <div className="card-title">
            Corporate assignments — {selected.name}
          </div>
          {(!selected.assignments || selected.assignments.length === 0) ? (
            <div className="empty">No corporate assignments yet for this event.</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Company</th><th>Profiles</th>
                  <th>Openings</th><th>Buddy</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {selected.assignments.map((a, i) => (
                  <tr key={i}>
                    <td><strong>{a.company}</strong></td>
                    <td>{a.profiles}</td>
                    <td>{a.openings}</td>
                    <td>{a.buddy || '–'}</td>
                    <td><span className="tag tag-green">{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Add Event Form */}
      {showForm && (
        <div className="card" style={{ marginTop: 14 }}>
          <div className="card-title">New event</div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Event name</label>
              <input className="form-input" placeholder="e.g. Pune Mega-Drive"
                value={newEvent.name} onChange={e => setNewEvent({ ...newEvent, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Venue</label>
              <input className="form-input" placeholder="e.g. Symbiosis University"
                value={newEvent.venue} onChange={e => setNewEvent({ ...newEvent, venue: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Dates</label>
              <input className="form-input" placeholder="e.g. Jul 14–16, 2025"
                value={newEvent.dates} onChange={e => setNewEvent({ ...newEvent, dates: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <select className="form-select" value={newEvent.city} onChange={e => setNewEvent({ ...newEvent, city: e.target.value })}>
                <option value="">Select city</option>
                <option>Pune</option><option>Bangalore</option>
                <option>Hyderabad</option><option>Indore</option><option>Lucknow</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary" onClick={handleCreate}>Save event</button>
            <button className="btn" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Add event</button>
      </div>
    </div>
  );
}