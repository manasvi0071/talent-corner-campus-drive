import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Candidates from './pages/Candidates';
import Events from './pages/Events';
import Register from './pages/Register';
import Corporates from './pages/Corporates';
import Login from './pages/Login';
import CityChecklist from './pages/CityChecklist';
import './styles/global.css';

const PAGES = {
  dashboard: <Dashboard />,
  candidates: <Candidates />,
  events: <Events />,
  register: <Register />,
  corporates: <Corporates />,
  checklist: <CityChecklist />,
};

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [loggedIn, setLoggedIn] = useState(false);

  // Dummy admin information
  const admin = {
    name: 'Admin',
    email: 'admin@talentcorner.com',
  };

  // Logout function
  const handleLogout = () => {
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <>
      <Navbar
        activePage={page}
        onNavigate={setPage}
        onLogout={handleLogout}
        admin={admin}
      />

      <main>
        {PAGES[page] ?? (
          <div
            style={{
              padding: 48,
              textAlign: 'center',
              color: '#888',
            }}
          >
            Page not found.
          </div>
        )}
      </main>
    </>
  );
}