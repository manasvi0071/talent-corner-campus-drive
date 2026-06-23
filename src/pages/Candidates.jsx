import React, { useState } from 'react';

// ─── BACKEND TEAM: replace with GET /api/candidates?city=&status=&profile=&search= ──
const MOCK_CANDIDATES = [
  { id: 1, initials: 'AR', bg: '#EEEDFE', color: '#3C3489', name: 'Ananya Rao',   email: 'ananya@email.com', college: 'Symbiosis, Pune',   profile: 'Fresher',    profileTag: 'tag-purple', city: 'Pune',      score: 82,  scoreColor: '#3B6D11', status: 'Shortlisted', statusTag: 'tag-green' },
  { id: 2, initials: 'RK', bg: '#E1F5EE', color: '#085041', name: 'Rohit Kumar',  email: 'rohit@email.com',  college: 'Christ Univ, Blr',  profile: 'Intern',     profileTag: 'tag-amber', city: 'Bangalore', score: 76,  scoreColor: '#3B6D11', status: 'Screened',    statusTag: 'tag-purple' },
  { id: 3, initials: 'SP', bg: '#FAEEDA', color: '#633806', name: 'Sneha Patil',  email: 'sneha@email.com',  college: 'DAVV, Indore',      profile: 'Fresher',    profileTag: 'tag-purple', city: 'Indore',    score: 68,  scoreColor: '#BA7517', status: 'Offered',     statusTag: 'tag-green' },
  { id: 4, initials: 'VN', bg: '#FAECE7', color: '#4A1B0C', name: 'Varun Nair',   email: 'varun@email.com',  college: 'BBAU, Lucknow',     profile: 'Experienced',profileTag: 'tag-coral', city: 'Lucknow',   score: 90,  scoreColor: '#3B6D11', status: 'Interviewed', statusTag: 'tag-amber' },
  { id: 5, initials: 'MJ', bg: '#EAF3DE', color: '#173404', name: 'Meera Joshi',  email: 'meera@email.com',  college: 'BITS, Hyderabad',   profile: 'Alumni',     profileTag: 'tag-coral', city: 'Hyderabad', score: null,scoreColor: '',        status: 'B2B Lead',    statusTag: 'tag-green' },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Candidates() {
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [profileFilter, setProfileFilter] = useState('');

  // Client-side filtering (backend team: move this to API query params)
  const filtered = MOCK_CANDIDATES.filter(c => {
    const matchSearch = !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.college.toLowerCase().includes(search.toLowerCase());
    const matchCity   = !cityFilter   || c.city === cityFilter;
    const matchStatus = !statusFilter || c.status === statusFilter;
    const matchProfile= !profileFilter|| c.profile === profileFilter;
    return matchSearch && matchCity && matchStatus && matchProfile;
  });

  // ─── BACKEND TEAM: call POST /api/candidates/export to download CSV ───────
  const handleExport = () => {
    alert('Backend team: wire this to POST /api/candidates/export');
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
            placeholder="Search by name, college, or skill..."
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
          <option>Shortlisted</option>
          <option>Screened</option>
          <option>Offered</option>
          <option>Interviewed</option>
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
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="empty">No candidates match your filters.</td>
              </tr>
            ) : (
              filtered.map(c => (
                <tr key={c.id}>
                  <td style={{ paddingLeft: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="avatar" style={{ background: c.bg, color: c.color }}>{c.initials}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: '#888' }}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.college}</td>
                  <td><span className={`tag ${c.profileTag}`}>{c.profile}</span></td>
                  <td>{c.city}</td>
                  <td>
                    {c.score != null
                      ? <span style={{ fontWeight: 600, color: c.scoreColor }}>{c.score}/100</span>
                      : '–'}
                  </td>
                  <td><span className={`tag ${c.statusTag}`}>{c.status}</span></td>
                  <td>
                    {/* ─── BACKEND TEAM: navigate to /candidates/:id detail page ─── */}
                    <button className="btn btn-sm" onClick={() => alert(`Open candidate ID: ${c.id}`)}>
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: '#888', textAlign: 'right' }}>
        Showing {filtered.length} of {MOCK_CANDIDATES.length} candidates
      </div>
    </div>
  );
}
