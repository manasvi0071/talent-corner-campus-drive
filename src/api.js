const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = async (path, options = {}) => {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'API error');
  }
  return res.json();
};

export const getDashboardStats  = () => api('/api/dashboard/stats');
export const getCandidates      = (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  return api(`/api/candidates?${params}`);
};
export const updateCandidateStatus = (id, status) =>
  api(`/api/candidates/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
export const getEvents          = () => api('/api/events');
export const createEvent        = (payload) => api('/api/events', { method: 'POST', body: JSON.stringify(payload) });
export const getCorporates      = () => api('/api/corporates');
export const createCorporate    = (payload) => api('/api/corporates', { method: 'POST', body: JSON.stringify(payload) });
export const registerCandidate  = (payload) => api('/api/register', { method: 'POST', body: JSON.stringify(payload) });