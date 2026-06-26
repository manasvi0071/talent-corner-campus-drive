import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Candidates from './pages/Candidates';
import Events from './pages/Events';
import Register from './pages/Register';
import Corporates from './pages/Corporates';
import Login from './pages/Login';
import './styles/global.css';

const PAGES = {
  dashboard:  <Dashboard />,
  candidates: <Candidates />,
  events:     <Events />,
  register:   <Register />,
  corporates: <Corporates />,
};

export default function App() {
  const [page,  setPage]  = useState('dashboard');
  const [admin, setAdmin] = useState(null);

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('tc_token');
    const saved = localStorage.getItem('tc_admin');
    if (token && saved) {
      setAdmin(JSON.parse(saved));
    }
  }, []);

  const handleLogin = (adminData) => {
    setAdmin(adminData);
  };

  const handleLogout = () => {
    localStorage.removeItem('tc_token');
    localStorage.removeItem('tc_admin');
    setAdmin(null);
  };

  // Show login page if not logged in
  if (!admin) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      <Navbar activePage={page} onNavigate={setPage} onLogout={handleLogout} admin={admin} />
      <main>
        {PAGES[page] ?? <div style={{ padding: 48, textAlign: 'center', color: '#888' }}>Page not found.</div>}
      </main>
    </>
  );
}