import React, { useState, useEffect } from 'react';
import { getCorporates, createCorporate } from '../api';

export default function Corporates() {
  const [corporates, setCorporates] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [showForm, setShowForm]     = useState(false);
  const [newCorp, setNewCorp]       = useState({ name: '', sector: '', subscription: '', renewal: '' });

  const fetchCorporates = () => {
    getCorporates()
      .then(data => setCorporates(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCorporates(); }, []);

  const handleCreate = async () => {
    try {
      await createCorporate(newCorp);
      setShowForm(false);
      setNewCorp({ name: '', sector: '', subscription: '', renewal: '' });
      fetchCorporates();
    } catch (err) {
      alert('Failed: ' + err.message);
    }
  };

  if (loading) return <div className="page"><p>Loading corporates...</p></div>;
  if (error)   return <div className="page"><p style={{ color: '#D85A30' }}>Error: {error}</p></div>;

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Corporate partners</div>
        <div className="page-sub">Manage subscriptions, events, and hospitality.</div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr>
              <th style={{ padding: '12px 16px' }}>Company</th>
              <th>Sector</th><th>Subscription</th>
              <th>Offers made</th><th>Renewal</th>
            </tr>
          </thead>
          <tbody>
            {corporates.length === 0 ? (
              <tr><td colSpan={5} className="empty">No corporate partners yet.</td></tr>
            ) : corporates.map((c, i) => (
              <tr key={i}>
                <td style={{ paddingLeft: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div className="avatar" style={{ background: '#EEEDFE', color: '#3C3489' }}>
                      {c.name?.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div>
                    </div>
                  </div>
                </td>
                <td>{c.sector}</td>
                <td><span className="tag tag-green">{c.subscription}</span></td>
                <td>{c.offers_count ?? '–'}</td>
                <td><span className="tag tag-amber">{c.renewal}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Corporate Form */}
      {showForm && (
        <div className="card" style={{ marginTop: 14 }}>
          <div className="card-title">Add corporate partner</div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Company name</label>
              <input className="form-input" placeholder="e.g. Infosys BPM"
                value={newCorp.name} onChange={e => setNewCorp({ ...newCorp, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Sector</label>
              <input className="form-input" placeholder="e.g. IT Services"
                value={newCorp.sector} onChange={e => setNewCorp({ ...newCorp, sector: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Subscription</label>
              <input className="form-input" placeholder="e.g. Annual ₹2L"
                value={newCorp.subscription} onChange={e => setNewCorp({ ...newCorp, subscription: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Renewal</label>
              <input className="form-input" placeholder="e.g. Auto-renew / Due Aug"
                value={newCorp.renewal} onChange={e => setNewCorp({ ...newCorp, renewal: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary" onClick={handleCreate}>Save</button>
            <button className="btn" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Add corporate</button>
      </div>
    </div>
  );
}