import React, { useState } from 'react';
import { registerCandidate } from '../api';

const STEPS = ['Basic info', 'Academic', 'Preferences', 'Resume', 'Confirm'];

const CITIES    = ['Pune', 'Bangalore', 'Hyderabad', 'Indore', 'Lucknow'];
const PROFILES  = ['Software Dev', 'Sales & Mktg', 'Finance', 'Operations', 'HR', 'Data Analytics'];
const EMP_TYPES = ['Fresher / Full-time', 'Internship', 'Both'];
const WORK_MODES = ['Work from Office', 'Work from Home', 'Hybrid'];
const SALARY_RANGES = [
  'Below ₹2 LPA',
  '₹2 – ₹4 LPA',
  '₹4 – ₹6 LPA',
  '₹6 – ₹8 LPA',
  '₹8 – ₹12 LPA',
  '₹12 – ₹18 LPA',
  'Above ₹18 LPA',
];
const GRAD_YEARS = ['2020','2021','2022','2023','2024','2025 (current)','2026','2027','2028','2029','2030'];

export default function Register() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    college: '', degree: '', gradYear: '2025 (current)', type: 'Student',
    cities: ['Pune'], profiles: ['Software Dev'], empType: 'Fresher / Full-time',
    workMode: 'Work from Office', salaryRange: '₹2 – ₹4 LPA',
    relocate: 'Yes', resumeUrl: '',
    b2bInterest: false, franchiseInterest: false,
  });

  const set = (field, val) => setForm(prev => ({ ...prev, [field]: val }));

  const toggleArray = (field, val) => {
    setForm(prev => {
      const arr = prev[field];
      return { ...prev, [field]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] };
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await registerCandidate(form);
      setSubmitted(true);
    } catch (err) {
      alert('Registration failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="page">
        <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#3C3489', marginBottom: 8 }}>
            Registration Successful!
          </div>
          <div style={{ fontSize: 14, color: '#888', marginBottom: 24 }}>
            Thank you {form.name}! We'll contact you on {form.email} with next steps.
          </div>
          <button className="btn btn-primary" onClick={() => { setSubmitted(false); setStep(1); setForm({ name:'',email:'',phone:'',college:'',degree:'',gradYear:'2025 (current)',type:'Student',cities:['Pune'],profiles:['Software Dev'],empType:'Fresher / Full-time',workMode:'Work from Office',salaryRange:'₹2 – ₹4 LPA',relocate:'Yes',resumeUrl:'',b2bInterest:false,franchiseInterest:false }); }}>
            Register another candidate
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Candidate registration</div>
        <div className="page-sub">Step-by-step registration for the campus drive</div>
      </div>

      {/* Stepper */}
      <div className="step-bar">
        {STEPS.map((label, i) => {
          const num = i + 1;
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

      {/* STEP 1 — Basic Info */}
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
              <label className="form-label">Phone number *</label>
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

      {/* STEP 2 — Academic */}
      {step === 2 && (
        <div className="grid-2">
          <div className="card">
            <div className="card-title" style={{ marginBottom: 16 }}>Academic details</div>
            <div className="form-group">
              <label className="form-label">College / University *</label>
              <input className="form-input" type="text" placeholder="e.g. Symbiosis International University"
                value={form.college} onChange={e => set('college', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Degree & stream *</label>
              <input className="form-input" type="text" placeholder="e.g. B.Tech Computer Science"
                value={form.degree} onChange={e => set('degree', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Year of graduation *</label>
              <select className="form-select" value={form.gradYear} onChange={e => set('gradYear', e.target.value)}>
                {GRAD_YEARS.map(y => <option key={y}>{y}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">I am a</label>
              <div className="radio-group">
                {['Student', 'Alumni'].map(t => (
                  <label className="radio-opt" key={t}>
                    <input type="radio" name="type" checked={form.type === t} onChange={() => set('type', t)} />
                    {t}
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
                      <input type="radio" name="emp" checked={form.empType === t} onChange={() => set('empType', t)} />
                      {t}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-title">Additional questions</div>
              <div className="form-group">
                <label className="form-label">Is your company looking for recruitment partners? <span style={{ color: '#888' }}>(alumni)</span></label>
                <div className="radio-group">
                  {['Yes, connect me', 'No'].map(opt => (
                    <label className="radio-opt" key={opt}>
                      <input type="radio" name="b2b"
                        checked={(opt === 'Yes, connect me') === form.b2bInterest}
                        onChange={() => set('b2bInterest', opt === 'Yes, connect me')} />
                      {opt}
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
                        onChange={() => set('franchiseInterest', opt === 'Yes, tell me more')} />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3 — Preferences */}
      {step === 3 && (
        <div className="grid-2">
          <div className="card">
            <div className="card-title" style={{ marginBottom: 16 }}>Salary & work preferences</div>
            <div className="form-group">
              <label className="form-label">Expected salary range</label>
              <div className="chip-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                {SALARY_RANGES.map(s => (
                  <div key={s} className={`chip ${form.salaryRange === s ? 'selected' : ''}`}
                    onClick={() => set('salaryRange', s)}>{s}</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="card">
              <div className="card-title">Work mode preference</div>
              <div className="radio-group" style={{ flexDirection: 'column', gap: 10 }}>
                {WORK_MODES.map(m => (
                  <label className="radio-opt" key={m}>
                    <input type="radio" name="workMode" checked={form.workMode === m} onChange={() => set('workMode', m)} />
                    {m}
                  </label>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="card-title">Willing to relocate?</div>
              <div className="radio-group">
                {['Yes', 'No', 'Maybe'].map(r => (
                  <label className="radio-opt" key={r}>
                    <input type="radio" name="relocate" checked={form.relocate === r} onChange={() => set('relocate', r)} />
                    {r}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4 — Resume */}
      {step === 4 && (
        <div className="card" style={{ textAlign: 'center', padding: '40px 24px' }}>
          <div style={{ width: 64, height: 64, borderRadius: 12, background: '#EEEDFE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <i className="ti ti-file-upload" style={{ fontSize: 28, color: '#7F77DD' }} />
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>Upload your resume</div>
          <div style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>PDF or DOCX, max 5MB</div>
          {form.resumeUrl && (
            <div style={{ marginBottom: 16, color: '#1D9E75', fontSize: 13 }}>
              ✅ Resume uploaded successfully!
            </div>
          )}
          <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} id="resume-upload"
            onChange={e => {
              const file = e.target.files[0];
              if (file) set('resumeUrl', file.name);
            }} />
          <label htmlFor="resume-upload" className="btn btn-primary" style={{ cursor: 'pointer' }}>
            <i className="ti ti-upload" /> Choose file
          </label>
        </div>
      )}

      {/* STEP 5 — Confirm */}
      {step === 5 && (
        <div className="card">
          <div className="card-title">Review & confirm</div>
          <table className="table">
            <tbody>
              {[
                ['Name',        form.name       || '—'],
                ['Email',       form.email      || '—'],
                ['Phone',       form.phone      || '—'],
                ['College',     form.college    || '—'],
                ['Degree',      form.degree     || '—'],
                ['Graduation',  form.gradYear],
                ['Type',        form.type],
                ['Cities',      form.cities.join(', ')],
                ['Profiles',    form.profiles.join(', ')],
                ['Employment',  form.empType],
                ['Salary',      form.salaryRange],
                ['Work mode',   form.workMode],
                ['Relocate',    form.relocate],
                ['Resume',      form.resumeUrl  || 'Not uploaded'],
              ].map(([k, v]) => (
                <tr key={k}>
                  <td style={{ color: '#888', width: 140 }}>{k}</td>
                  <td style={{ fontWeight: 500 }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Navigation buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 14 }}>
        {step > 1 && (
          <button className="btn" onClick={() => setStep(s => s - 1)}>← Back</button>
        )}
        {step < STEPS.length ? (
          <button className="btn btn-primary" onClick={() => {
            if (step === 1 && (!form.name || !form.email || !form.phone)) {
              alert('Please fill in name, email and phone before continuing.');
              return;
            }
            setStep(s => s + 1);
          }}>
            Save & continue →
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : <><i className="ti ti-check" /> Submit registration</>}
          </button>
        )}
      </div>
    </div>
  );
}