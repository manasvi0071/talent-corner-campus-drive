const express  = require('express');
const router   = express.Router();
const supabase = require('../config/db');

// GET /api/events
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST /api/events
router.post('/', async (req, res) => {
  const { data, error } = await supabase
    .from('events')
    .insert(req.body)
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// PATCH /api/events/:id
router.patch('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('events')
    .update(req.body)
    .eq('id', req.params.id)
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;