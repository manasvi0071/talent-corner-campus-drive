import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Candidates from './pages/Candidates';
import Events from './pages/Events';
import Register from './pages/Register';
import Corporates from './pages/Corporates';
import './styles/global.css';

// ─── Page map — add new pages here ───────────────────────────────────────────
const PAGES = {
  dashboard:  <Dashboard />,
  candidates: <Candidates />,
  events:     <Events />,
  register:   <Register />,
  corporates: <Corporates />,
};

export default function App() {
  const [page, setPage] = useState('dashboard');

  return (
    <>
      <Navbar activePage={page} onNavigate={setPage} />
      <main>
        {PAGES[page] ?? <div style={{ padding: 48, textAlign: 'center', color: '#888' }}>Page not found.</div>}
      </main>
    </>
  );
}
