import React, { useState, useEffect } from 'react';
import { getCandidates, updateCandidateStatus, exportCandidatesCSV } from '../api';

const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

const AVATAR_COLORS = [
  { bg: '#EEEDFE', color: '#3C3489' },
  { bg: '#E1F5EE', color: '#085041' },
  { bg: '#FAEEDA', color: '#633806' },
  { bg: '#FAECE7', color: '#4A1B0C' },
  { bg: '#EAF3DE', color: '#173404' },
];

const STATUS_TAGS = {
  Registered:  'tag-purple',
  Screened:    'tag-purple',
  Shortlisted: 'tag-green',
  Interviewed: 'tag-amber',
  Offered:     'tag-green',
  Placed:      'tag-green',
  Rejected:    'tag-coral',
  'B2B Lead':  'tag-green',
};

export default function Candidates() {
  const [candidates,     setCandidates]     = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [error,          setError]          = useState(null);
  const [search,         setSearch]         = useState('');
  const [cityFilter,     setCityFilter]     = useState('');
  const [statusFilter,   setStatusFilter]   = useState('');
  const [profileFilter,  setProfileFilter]  = useState('');

  const fetchCandidates = () => {
    setLoading(true);
    getCandidates({ search, city: cityFilter, status: statusFilter, profile: profileFilter })
      .then(data => setCandidates(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCandidates(); }, [search, cityFilter, statusFilter, profileFilter]);

  const handleExport = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/candidates/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search, city: cityFilter, status: statusFilter, profile: profileFilter }),
      });
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = 'candidates.csv';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Export failed: ' + err.message);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateCandidateStatus(id, status);
      fetchCandidates();
    } catch (err) {
      alert('Update failed: ' + err.message);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Candidate database</div>
        <div className="page-sub">All registered candidates across drives. Filter, shortlist, and track status.</div>
      </div>

      {/* Filter bar */}
      <div className="filter-bar">
        <div className="search-wrap">
          <i className="ti ti-search" aria-hidden="true" />
          <input
            type="text"
            className="search-box"
            placeholder="Search by name, college, or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <select className="form-select" style={{ width: 130 }} value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
          <option value="">All cities</option>
          <option>Pune</option>
          <option>Bangalore</option>
          <option>Hyderabad</option>
          <option>Indore</option>
          <option>Lucknow</option>
        </select>

        <select className="form-select" style={{ width: 130 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All status</option>
          <option>Registered</option>
          <option>Screened</option>
          <option>Shortlisted</option>
          <option>Interviewed</option>
          <option>Offered</option>
          <option>Placed</option>
          <option>Rejected</option>
          <option>B2B Lead</option>
        </select>

        <select className="form-select" style={{ width: 140 }} value={profileFilter} onChange={e => setProfileFilter(e.target.value)}>
          <option value="">All profiles</option>
          <option>Intern</option>
          <option>Fresher</option>
          <option>Experienced</option>
          <option>Alumni</option>
        </select>

        <button className="btn btn-primary" onClick={handleExport}>Export list</button>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr style={{ borderBottom: '0.5px solid #e5e5e5' }}>
              <th style={{ padding: '12px 16px' }}>Candidate</th>
              <th>College</th>
              <th>Profile</th>
              <th>City</th>
              <th>Score</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="empty">Loading candidates…</td></tr>
            ) : error ? (
              <tr><td colSpan={7} className="empty" style={{ color: '#D85A30' }}>Error: {error}</td></tr>
            ) : candidates.length === 0 ? (
              <tr><td colSpan={7} className="empty">No candidates found.</td></tr>
            ) : (
              candidates.map((c, i) => {
                const av = AVATAR_COLORS[i % AVATAR_COLORS.length];
                return (
                  <tr key={c.id}>
                    <td style={{ paddingLeft: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="avatar" style={{ background: av.bg, color: av.color }}>
                          {getInitials(c.name)}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div>
                          <div style={{ fontSize: 11, color: '#888' }}>{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{c.college || '—'}</td>
                    <td><span className="tag tag-purple">{c.profile || '—'}</span></td>
                    <td>{c.city || '—'}</td>
                    <td>
                      {c.score != null
                        ? <span style={{ fontWeight: 600, color: '#3B6D11' }}>{c.score}/100</span>
                        : '–'}
                    </td>
                    <td>
                      <select
                        className="form-select"
                        style={{ width: 130, fontSize: 12 }}
                        value={c.status}
                        onChange={e => handleStatusChange(c.id, e.target.value)}
                      >
                        {Object.keys(STATUS_TAGS).map(s => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <span className={`tag ${STATUS_TAGS[c.status] || 'tag-purple'}`}>{c.status}</span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: '#888', textAlign: 'right' }}>
        Showing {candidates.length} candidates
      </div>
    </div>
  );
}