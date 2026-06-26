const express    = require('express');
const router     = express.Router();
const supabase   = require('../config/db');

// GET /api/dashboard/stats
router.get('/stats', async (req, res) => {
  const [
    { count: registered },
    { count: shortlisted },
    { count: offered },
    { count: partners },
  ] = await Promise.all([
    supabase.from('candidates').select('*', { count: 'exact', head: true }),
    supabase.from('candidates').select('*', { count: 'exact', head: true }).eq('status', 'Shortlisted'),
    supabase.from('candidates').select('*', { count: 'exact', head: true }).eq('status', 'Offered'),
    supabase.from('corporates').select('*', { count: 'exact', head: true }).eq('status', 'Active'),
  ]);

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4);

  const { data: b2bleads } = await supabase
    .from('b2bleads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4);

  res.json({ stats: { registered, shortlisted, offered, partners }, events, b2bleads });
});

module.exports = router;