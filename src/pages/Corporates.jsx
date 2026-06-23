import React from 'react';

// ─── BACKEND TEAM: replace with GET /api/corporates ──────────────────────────
const MOCK_STATS = {
  activeSubscriptions: 14,
  arr: '₹28L',
  totalOffers: 312,
  openSlots: 2,
  potentialRevenue: '₹4L',
};

const MOCK_CORPORATES = [
  { initials: 'IN', bg: '#E1F5EE', color: '#085041', name: 'Infosys BPM',   sector: 'IT Services', sub: 'Annual ₹2L',   subTag: 'tag-green', events: '4 of 4', offers: 42, renewal: 'Auto-renew', renewalTag: 'tag-green' },
  { initials: 'BF', bg: '#EEEDFE', color: '#3C3489', name: 'Bajaj Finserv', sector: 'BFSI',        sub: 'Annual ₹2.5L', subTag: 'tag-green', events: '3 of 4', offers: 55, renewal: 'Auto-renew', renewalTag: 'tag-green' },
  { initials: 'WP', bg: '#FAEEDA', color: '#633806', name: 'Wipro',         sector: 'IT Services', sub: 'Annual ₹2L',   subTag: 'tag-green', events: '2 of 4', offers: 28, renewal: 'Due Aug',    renewalTag: 'tag-amber' },
  { initials: 'IC', bg: '#FAECE7', color: '#4A1B0C', name: 'ICICI Bank',    sector: 'Banking',     sub: 'Annual ₹3L',   subTag: 'tag-green', events: '4 of 4', offers: 80, renewal: 'Auto-renew', renewalTag: 'tag-green' },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Corporates() {
  // ─── BACKEND TEAM: call GET /api/corporates/:id/report to download PDF ───
  const handleDownloadReport = (name) => {
    alert(`Backend team: download impact report PDF for ${name}`);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Corporate partners</div>
        <div className="page-sub">Manage subscriptions, assigned events, and hospitality arrangements.</div>
      </div>

      {/* Stats */}
      <div className="metrics" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="metric-card">
          <div className="metric-label">Active subscriptions</div>
          <div className="metric-val">{MOCK_STATS.activeSubscriptions}</div>
          <div className="metric-badge badge-green">{MOCK_STATS.arr} ARR</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Total offers via TC</div>
          <div className="metric-val">{MOCK_STATS.totalOffers}</div>
          <div className="metric-badge badge-purple">This season</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Open corporate slots</div>
          <div className="metric-val">{MOCK_STATS.openSlots}</div>
          <div className="metric-badge badge-amber">{MOCK_STATS.potentialRevenue} potential</div>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr>
              <th style={{ padding: '12px 16px' }}>Company</th>
              <th>Subscription</th>
              <th>Events</th>
              <th>Offers made</th>
              <th>Impact report</th>
              <th>Renewal</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_CORPORATES.map((c, i) => (
              <tr key={i}>
                <td style={{ paddingLeft: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div className="avatar" style={{ background: c.bg, color: c.color }}>{c.initials}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: '#888' }}>{c.sector}</div>
                    </div>
                  </div>
                </td>
                <td><span className={`tag ${c.subTag}`}>{c.sub}</span></td>
                <td>{c.events}</td>
                <td>{c.offers}</td>
                <td>
                  <button className="btn btn-sm" onClick={() => handleDownloadReport(c.name)}>
                    <i className="ti ti-file-download" /> PDF
                  </button>
                </td>
                <td><span className={`tag ${c.renewalTag}`}>{c.renewal}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
        {/* ─── BACKEND TEAM: open modal → POST /api/corporates ─── */}
        <button className="btn btn-primary" onClick={() => alert('Backend team: open Add Corporate modal → POST /api/corporates')}>
          + Add corporate partner
        </button>
      </div>
    </div>
  );
}
