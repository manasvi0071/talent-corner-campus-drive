import React, { useState } from 'react';
import { registerCandidate } from '../api';

const STEPS    = ['Basic info', 'Academic', 'Preferences', 'Resume', 'Confirm'];
const CITIES   = ['Pune', 'Bangalore', 'Hyderabad', 'Indore', 'Lucknow'];
const PROFILES = ['Software Dev', 'Sales & Mktg', 'Finance', 'Operations', 'HR', 'Data Analytics'];
const EMP_TYPES = ['Fresher / Full-time', 'Internship', 'Both'];

export default function Register() {
  const [step,       setStep]       = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success,    setSuccess]    = useState(false);
  const [apiError,   setApiError]   = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeName, setResumeName] = useState('');

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    college: '', degree: '', gradYear: '2025 (current)', type: 'Student',
    cities: ['Pune'], profiles: ['Software Dev'], empType: 'Fresher / Full-time',
    b2bInterest: false, franchiseInterest: false,
  });

  const set = (field, val) => setForm(prev => ({ ...prev, [field]: val }));

  const toggleArray = (field, val) => {
    setForm(prev => {
      const arr = prev[field];
      return { ...prev, [field]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] };
    });
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) { setResumeFile(file); setResumeName(file.name); }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      setApiError('Name and email are required.');
      return;
    }
    setSubmitting(true);
    setApiError('');
    try {
      // Map form fields to what Supabase candidates table expects
      const payload = {
        name:            form.name,
        email:           form.email,
        phone:           form.phone,
        college:         form.college,
        profile:         form.profiles[0] || '',
        city:            form.cities[0]   || '',
        status:          'Registered',
      };
      await registerCandidate(payload);
      setSuccess(true);
    } catch (err) {
      setApiError(err.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setStep(1);
    setApiError('');
    setResumeName('');
    setResumeFile(null);
    setForm({
      name: '', email: '', phone: '',
      college: '', degree: '', gradYear: '2026 (current)', type: 'Student',
      cities: ['Pune'], profiles: ['Software Dev'], empType: 'Fresher / Full-time',
      b2bInterest: false, franchiseInterest: false,
    });
  };

  // ── Success screen ──
  if (success) {
    return (
      <div className="page">
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <i className="ti ti-circle-check" style={{ fontSize: 56, color: '#1D9E75' }} />
          <h2 style={{ color: '#3C3489', marginTop: 16 }}>Registration Successful!</h2>
          <p style={{ color: '#666', marginTop: 8 }}>
            Thank you <strong>{form.name}</strong>! You're registered for the Talent Corner Campus Drive.
            We'll be in touch soon.
          </p>
          <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={resetForm}>
            Register Another Candidate
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Candidate registration</div>
        <div className="page-sub">Step-by-step registration form (also accessible via QR code at campus)</div>
      </div>

      {/* Stepper */}
      <div className="step-bar">
        {STEPS.map((label, i) => {
          const num   = i + 1;
          const state = num < step ? 'done' : num === step ? 'active-step' : 'todo';
          return (
            <React.Fragment key={label}>
              <div className="step-item">
                <div className={`step-circle ${state}`}>
                  {state === 'done'
                    ? <i className="ti ti-check" style={{ fontSize: 13 }} />
                    : num}
                </div>
                <div className={`step-label ${state === 'active-step' ? 'active' : ''}`}>{label}</div>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`step-line ${num < step ? 'done-line' : ''}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── STEP 1: Basic Info ── */}
      {step === 1 && (
        <div className="grid-2">
          <div className="card">
            <div className="card-title" style={{ marginBottom: 16 }}>Personal details</div>
            <div className="form-group">
              <label className="form-label">Full name *</label>
              <input className="form-input" type="text" placeholder="e.g. Ananya Rao"
                value={form.name} onChange={e => set('name', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Email address *</label>
              <input className="form-input" type="email" placeholder="e.g. ananya@email.com"
                value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone number</label>
              <input className="form-input" type="tel" placeholder="+91 98765 43210"
                value={form.phone} onChange={e => set('phone', e.target.value)} />
            </div>
          </div>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 120, height: 120, background: '#f5f5f7', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8, border: '1.5px dashed #d0d0d0' }}>
              <i className="ti ti-qrcode" style={{ fontSize: 40, color: '#aaa' }} />
              <div style={{ fontSize: 11, color: '#888' }}>QR scan</div>
            </div>
            <div style={{ fontSize: 12, color: '#888', textAlign: 'center' }}>Scan to pre-fill on mobile</div>
          </div>
        </div>
      )}

      {/* ── STEP 2: Academic ── */}
      {step === 2 && (
        <div className="grid-2">
          <div className="card">
            <div className="card-title" style={{ marginBottom: 16 }}>Academic & profile details</div>
            <div className="form-group">
              <label className="form-label">College / University name</label>
              <input className="form-input" type="text" placeholder="e.g. Symbiosis International University"
                value={form.college} onChange={e => set('college', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Degree & stream</label>
              <input className="form-input" type="text" placeholder="e.g. B.Tech Computer Science"
                value={form.degree} onChange={e => set('degree', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Year of graduation</label>
              <select className="form-select" value={form.gradYear} onChange={e => set('gradYear', e.target.value)}>
                <option>2026 (current)</option>
                <option>2025 (last year)</option>
                <option>2024 or earlier (alumni)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">I am a</label>
              <div className="radio-group">
                {['Student', 'Alumni'].map(t => (
                  <label className="radio-opt" key={t}>
                    <input type="radio" name="type" checked={form.type === t} onChange={() => set('type', t)} /> {t}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Preferred drive city</label>
              <div className="chip-row">
                {CITIES.map(city => (
                  <div key={city} className={`chip ${form.cities.includes(city) ? 'selected' : ''}`}
                    onClick={() => toggleArray('cities', city)}>{city}</div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="card">
              <div className="card-title">Job profile interest</div>
              <div className="chip-row">
                {PROFILES.map(p => (
                  <div key={p} className={`chip ${form.profiles.includes(p) ? 'selected' : ''}`}
                    onClick={() => toggleArray('profiles', p)}>{p}</div>
                ))}
              </div>
              <div className="divider" />
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Employment type preference</label>
                <div className="radio-group">
                  {EMP_TYPES.map(t => (
                    <label className="radio-opt" key={t}>
                      <input type="radio" name="emp" checked={form.empType === t} onChange={() => set('empType', t)} /> {t}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-title">Additional questions</div>
              <div className="form-group">
                <label className="form-label">Is your company looking for recruitment partners?</label>
                <div className="radio-group">
                  {['Yes, connect me', 'No'].map(opt => (
                    <label className="radio-opt" key={opt}>
                      <input type="radio" name="b2b"
                        checked={(opt === 'Yes, connect me') === form.b2bInterest}
                        onChange={() => set('b2bInterest', opt === 'Yes, connect me')} /> {opt}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Interested in a Talent Corner Franchise?</label>
                <div className="radio-group">
                  {['Yes, tell me more', 'Not right now'].map(opt => (
                    <label className="radio-opt" key={opt}>
                      <input type="radio" name="fran"
                        checked={(opt === 'Yes, tell me more') === form.franchiseInterest}
                        onChange={() => set('franchiseInterest', opt === 'Yes, tell me more')} /> {opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 3: Preferences ── */}
      {step === 3 && (
        <div className="card">
          <div className="card-title">Salary & role preferences</div>
          <div className="empty" style={{ padding: '48px 0' }}>
            <i className="ti ti-adjustments" style={{ fontSize: 32, color: '#ccc', display: 'block', marginBottom: 8 }} />
            Add salary range, work mode, relocation fields here as needed.
          </div>
        </div>
      )}

      {/* ── STEP 4: Resume Upload ── */}
      {step === 4 && (
        <div className="card" style={{ textAlign: 'center', padding: '40px 24px' }}>
          <div style={{ width: 64, height: 64, borderRadius: 12, background: '#EEEDFE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <i className="ti ti-file-upload" style={{ fontSize: 28, color: '#7F77DD' }} />
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>Upload your resume</div>
          <div style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>PDF or DOCX, max 5MB</div>
          <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
            id="resume-upload" onChange={handleResumeChange} />
          <label htmlFor="resume-upload" className="btn btn-primary" style={{ cursor: 'pointer' }}>
            <i className="ti ti-upload" /> Choose file
          </label>
          {resumeName && (
            <div style={{ marginTop: 12, fontSize: 13, color: '#1D9E75' }}>
              ✅ {resumeName} selected
            </div>
          )}
        </div>
      )}

      {/* ── STEP 5: Confirm ── */}
      {step === 5 && (
        <div className="card">
          <div className="card-title">Review & confirm</div>
          <table className="table">
            <tbody>
              {[
                ['Name',       form.name     || '—'],
                ['Email',      form.email    || '—'],
                ['Phone',      form.phone    || '—'],
                ['College',    form.college  || '—'],
                ['Degree',     form.degree   || '—'],
                ['Graduation', form.gradYear],
                ['Type',       form.type],
                ['Cities',     form.cities.join(', ')],
                ['Profiles',   form.profiles.join(', ')],
                ['Employment', form.empType],
                ['Resume',     resumeName    || 'Not uploaded'],
              ].map(([k, v]) => (
                <tr key={k}>
                  <td style={{ color: '#888', width: 160 }}>{k}</td>
                  <td style={{ fontWeight: 500 }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Navigation */}
      {apiError && (
        <div style={{ color: '#D85A30', marginTop: 8, fontSize: 13 }}>⚠ {apiError}</div>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 14 }}>
        {step > 1 && (
          <button className="btn" onClick={() => setStep(s => s - 1)}>← Back</button>
        )}
        {step < STEPS.length ? (
          <button className="btn btn-primary" onClick={() => setStep(s => s + 1)}>
            Save & continue →
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
            <i className="ti ti-check" /> {submitting ? 'Submitting…' : 'Submit registration'}
          </button>
        )}
      </div>
    </div>
  );
}