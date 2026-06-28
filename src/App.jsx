import React, { useState } from 'react';
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
  const [page, setPage] = useState('dashboard');
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <>
      <Navbar activePage={page} onNavigate={setPage} />
      <main>
        {PAGES[page]}
      </main>
    </>
  );
}