import React, { useState } from 'react';
import './Navbar.css';

const tabs = [
  { id: 'dashboard',  label: 'Dashboard',  icon: 'ti-layout-dashboard' },
  { id: 'candidates', label: 'Candidates', icon: 'ti-users' },
  { id: 'events',     label: 'Events',     icon: 'ti-calendar-event' },
  { id: 'register',   label: 'Register',   icon: 'ti-user-plus' },
  { id: 'corporates', label: 'Corporates', icon: 'ti-building' },
];

export default function Navbar({ activePage, onNavigate, onLogout, admin }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <div className="nav-dot" />
        <span>Talent Corner</span>
        <span className="nav-logo-sub"> · Campus Drive</span>
      </div>

      {/* Page Tabs */}
      <div className="nav-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activePage === tab.id ? 'active' : ''}`}
            onClick={() => onNavigate(tab.id)}
          >
            <i className={`ti ${tab.icon}`} aria-hidden="true" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Right side */}
      <div className="nav-right">
        <button className="btn" onClick={() => onNavigate('register')}>
          <i className="ti ti-qrcode" aria-hidden="true" />
          QR Register
        </button>
        <button className="btn btn-primary" onClick={() => onNavigate('events')}>
          + New Event
        </button>

        {/* Avatar + Logout dropdown */}
        <div style={{ position: 'relative' }}>
          <div
            className="nav-avatar"
            title={admin?.name}
            onClick={() => setShowMenu(p => !p)}
            style={{ cursor: 'pointer' }}
          >
            {admin?.name?.charAt(0) || 'A'}
          </div>

          {showMenu && (
            <div style={{
              position: 'absolute', right: 0, top: 44, background: '#fff',
              border: '0.5px solid #e5e5e5', borderRadius: 10, padding: 8,
              minWidth: 160, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 100,
            }}>
              <div style={{ padding: '6px 12px', fontSize: 13, fontWeight: 500, color: '#3C3489' }}>
                {admin?.name}
              </div>
              <div style={{ padding: '4px 12px', fontSize: 11, color: '#888', marginBottom: 6 }}>
                {admin?.email}
              </div>
              <hr style={{ margin: '4px 0', border: 'none', borderTop: '0.5px solid #e5e5e5' }} />
              <button
                onClick={() => { setShowMenu(false); onLogout(); }}
                style={{
                  width: '100%', textAlign: 'left', padding: '6px 12px',
                  fontSize: 13, color: '#D85A30', background: 'none',
                  border: 'none', cursor: 'pointer', borderRadius: 6,
                }}
              >
                <i className="ti ti-logout" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}