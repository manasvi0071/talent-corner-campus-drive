import React, { useState, useEffect } from 'react';
import { getCorporates, createCorporate } from '../api';

const AVATAR_COLORS = [
  { bg: '#E1F5EE', color: '#085041' },
  { bg: '#EEEDFE', color: '#3C3489' },
  { bg: '#FAEEDA', color: '#633806' },
  { bg: '#FAECE7', color: '#4A1B0C' },
  { bg: '#EAF3DE', color: '#173404' },
];

const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

export default function Corporates() {
  const [corporates,  setCorporates]  = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [showModal,   setShowModal]   = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [newCorp,     setNewCorp]     = useState({
    company: '', industry: '', contact_email: '', contact_phone: '', status: 'Active',
  });

  useEffect(() => {
    getCorporates()
      .then(data => setCorporates(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDownloadReport = async (id, name) => {
    try {
      const res  = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/corporates/${id}/report`);
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = `${name}-report.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Download failed: ' + err.message);
    }
  };

  const handleCreateCorporate = async () => {
    if (!newCorp.company) return;
    setSubmitting(true);
    try {
      const created = await createCorporate(newCorp);
      setCorporates(prev => [...prev, created]);
      setShowModal(false);
      setNewCorp({ company: '', industry: '', contact_email: '', contact_phone: '', status: 'Active' });
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="page"><p>Loading corporates…</p></div>;
  if (error)   return <div className="page"><p style={{ color: '#D85A30' }}>Error: {error}</p></div>;

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Corporate partners</div>
        <div className="page-sub">Manage subscriptions, assigned events, and hospitality arrangements.</div>
      </div>

      {/* Stats */}
      <div className="metrics" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="metric-card">
          <div className="metric-label">Active partners</div>
          <div className="metric-val">{corporates.filter(c => c.status === 'Active').length}</div>
          <div className="metric-badge badge-green">Live from DB</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Total offers via TC</div>
          <div className="metric-val">{corporates.reduce((sum, c) => sum + (c.hires_total || 0), 0)}</div>
          <div className="metric-badge badge-purple">This season</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Total corporates</div>
          <div className="metric-val">{corporates.length}</div>
          <div className="metric-badge badge-amber">All time</div>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr>
              <th style={{ padding: '12px 16px' }}>Company</th>
              <th>Industry</th>
              <th>Contact</th>
              <th>Hires</th>
              <th>Status</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {corporates.length === 0 ? (
              <tr><td colSpan={6} className="empty">No corporate partners yet.</td></tr>
            ) : (
              corporates.map((c, i) => {
                const av = AVATAR_COLORS[i % AVATAR_COLORS.length];
                return (
                  <tr key={c.id}>
                    <td style={{ paddingLeft: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="avatar" style={{ background: av.bg, color: av.color }}>
                          {getInitials(c.company)}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500 }}>{c.company}</div>
                          <div style={{ fontSize: 11, color: '#888' }}>{c.contact_email || '—'}</div>
                        </div>
                      </div>
                    </td>
                    <td>{c.industry || '—'}</td>
                    <td>{c.contact_phone || '—'}</td>
                    <td>{c.hires_total || 0}</td>
                    <td>
                      <span className={`tag ${c.status === 'Active' ? 'tag-green' : c.status === 'Prospect' ? 'tag-amber' : 'tag-coral'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm" onClick={() => handleDownloadReport(c.id, c.company)}>
                        <i className="ti ti-file-download" /> PDF
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add corporate partner
        </button>
      </div>

      {/* Add Corporate Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: 420, margin: 0 }}>
            <div className="card-title" style={{ marginBottom: 16 }}>Add corporate partner</div>
            <div className="form-group">
              <label className="form-label">Company name *</label>
              <input className="form-input" placeholder="e.g. Infosys BPM"
                value={newCorp.company} onChange={e => setNewCorp(p => ({ ...p, company: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Industry</label>
              <input className="form-input" placeholder="e.g. IT Services"
                value={newCorp.industry} onChange={e => setNewCorp(p => ({ ...p, industry: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Contact email</label>
              <input className="form-input" type="email" placeholder="e.g. hr@infosys.com"
                value={newCorp.contact_email} onChange={e => setNewCorp(p => ({ ...p, contact_email: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Contact phone</label>
              <input className="form-input" placeholder="e.g. 9876543210"
                value={newCorp.contact_phone} onChange={e => setNewCorp(p => ({ ...p, contact_phone: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select" value={newCorp.status}
                onChange={e => setNewCorp(p => ({ ...p, status: e.target.value }))}>
                <option>Active</option>
                <option>Inactive</option>
                <option>Prospect</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
              <button className="btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleCreateCorporate} disabled={submitting}>
                {submitting ? 'Adding…' : 'Add partner'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}