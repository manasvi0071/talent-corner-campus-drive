import React, { useState, useEffect } from 'react';
import { getCandidates, updateCandidateStatus } from '../api';

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [search, setSearch]         = useState('');
  const [cityFilter, setCityFilter]         = useState('');
  const [statusFilter, setStatusFilter]     = useState('');
  const [profileFilter, setProfileFilter]   = useState('');

  const fetchCandidates = () => {
    setLoading(true);
    getCandidates({ search, city: cityFilter, status: statusFilter, profile: profileFilter })
      .then(data => setCandidates(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCandidates(); }, [search, cityFilter, statusFilter, profileFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateCandidateStatus(id, newStatus);
      fetchCandidates();
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Candidate database</div>
        <div className="page-sub">All registered candidates across drives.</div>
      </div>

      {/* Filter bar */}
      <div className="filter-bar">
        <div className="search-wrap">
          <i className="ti ti-search" />
          <input
            type="text"
            className="search-box"
            placeholder="Search by name, college..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="form-select" style={{ width: 130 }} value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
          <option value="">All cities</option>
          <option>Pune</option><option>Bangalore</option>
          <option>Hyderabad</option><option>Indore</option><option>Lucknow</option>
        </select>
        <select className="form-select" style={{ width: 130 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All status</option>
          <option>Shortlisted</option><option>Screened</option>
          <option>Offered</option><option>Interviewed</option>
        </select>
        <select className="form-select" style={{ width: 140 }} value={profileFilter} onChange={e => setProfileFilter(e.target.value)}>
          <option value="">All profiles</option>
          <option>Intern</option><option>Fresher</option>
          <option>Experienced</option><option>Alumni</option>
        </select>
      </div>

      {/* Table */}
      {loading && <div className="empty">Loading candidates...</div>}
      {error   && <div className="empty" style={{ color: '#D85A30' }}>Error: {error}</div>}
      {!loading && !error && (
        <div className="card" style={{ padding: 0 }}>
          <table className="table">
            <thead>
              <tr>
                <th style={{ padding: '12px 16px' }}>Candidate</th>
                <th>College</th><th>Profile</th>
                <th>City</th><th>Score</th>
                <th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {candidates.length === 0 ? (
                <tr><td colSpan={7} className="empty">No candidates found.</td></tr>
              ) : candidates.map(c => (
                <tr key={c.id}>
                  <td style={{ paddingLeft: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="avatar" style={{ background: '#EEEDFE', color: '#3C3489' }}>
                        {c.name?.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: '#888' }}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.college}</td>
                  <td><span className="tag tag-purple">{c.profile}</span></td>
                  <td>{c.city}</td>
                  <td>{c.score ?? '–'}</td>
                  <td><span className="tag tag-green">{c.status}</span></td>
                  <td>
                    <select
                      className="form-select"
                      style={{ width: 130, fontSize: 12 }}
                      value={c.status}
                      onChange={e => handleStatusChange(c.id, e.target.value)}
                    >
                      <option>Registered</option>
                      <option>Screened</option>
                      <option>Shortlisted</option>
                      <option>Interviewed</option>
                      <option>Offered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div style={{ marginTop: 10, fontSize: 12, color: '#888', textAlign: 'right' }}>
        {candidates.length} candidates shown
      </div>
    </div>
  );
}