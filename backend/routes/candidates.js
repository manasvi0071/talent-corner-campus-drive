const express  = require('express');
const router   = express.Router();
const supabase = require('../config/db');

// GET /api/candidates?search=&city=&status=&profile=
router.get('/', async (req, res) => {
  const { search, city, status, profile } = req.query;

  let query = supabase.from('candidates').select('*').order('created_at', { ascending: false });

  if (search)  query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
  if (city)    query = query.eq('city', city);
  if (status)  query = query.eq('status', status);
  if (profile) query = query.eq('profile', profile);

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// PATCH /api/candidates/:id/status
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  const { data, error } = await supabase
    .from('candidates')
    .update({ status })
    .eq('id', req.params.id)
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST /api/candidates/export  →  CSV download
router.post('/export', async (req, res) => {
  const { data, error } = await supabase.from('candidates').select('*');
  if (error) return res.status(500).json({ error: error.message });

  const headers = ['Name', 'Email', 'Phone', 'City', 'Profile', 'Status', 'College'];
  const rows = data.map(c => [c.name, c.email, c.phone, c.city, c.profile, c.status, c.college]);
  const csv = [headers, ...rows].map(r => r.map(v => `"${v ?? ''}"`).join(',')).join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="candidates.csv"');
  res.send(csv);
});

module.exports = router;