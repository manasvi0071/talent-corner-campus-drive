import React from 'react';
import './Navbar.css';

// ─── BACKEND TEAM: replace this with real auth (user info from your API) ───────
const mockUser = { name: 'Kavita M.', role: 'Admin' };

const tabs = [
  { id: 'dashboard',  label: 'Dashboard',  icon: 'ti-layout-dashboard' },
  { id: 'candidates', label: 'Candidates', icon: 'ti-users' },
  { id: 'events',     label: 'Events',     icon: 'ti-calendar-event' },
  { id: 'register',   label: 'Register',   icon: 'ti-user-plus' },
  { id: 'corporates', label: 'Corporates', icon: 'ti-building' },
];

export default function Navbar({ activePage, onNavigate }) {
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

      {/* Right side actions */}
      <div className="nav-right">
        <button className="btn" onClick={() => onNavigate('register')}>
          <i className="ti ti-qrcode" aria-hidden="true" />
          QR Register
        </button>
        <button className="btn btn-primary" onClick={() => onNavigate('events')}>
          + New Event
        </button>
        {/* ─── BACKEND TEAM: swap with real user avatar/menu ─── */}
        <div className="nav-avatar" title={mockUser.name}>
          {mockUser.name.charAt(0)}
        </div>
      </div>
    </nav>
  );
}
