import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { setError('Please enter email and password'); return; }
    setLoading(true);
    setError('');
    try {
      const res  = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Login failed'); return; }
      localStorage.setItem('tc_token', data.token);
      localStorage.setItem('tc_admin', JSON.stringify(data.admin));
      onLogin(data.admin);
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f7' }}>
      <div className="card" style={{ width: 380, margin: 0 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#3C3489' }}>Talent Corner</div>
          <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>Campus Drive Portal — Admin Login</div>
        </div>

        {/* Form */}
        <div className="form-group">
          <label className="form-label">Email address</label>
          <input className="form-input" type="email" placeholder="admin@talentcorner.com"
            value={email} onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()} />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="••••••••"
            value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()} />
        </div>

        {error && (
          <div style={{ color: '#D85A30', fontSize: 13, marginBottom: 12 }}>⚠ {error}</div>
        )}

        <button className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}
          onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in…' : 'Login →'}
        </button>

        <div style={{ textAlign: 'center', fontSize: 12, color: '#aaa', marginTop: 16 }}>
          Talent Corner HR Solutions © 2025
        </div>
      </div>
    </div>
  );
}