const express  = require('express');
const router   = express.Router();
const supabase = require('../config/db');
const multer   = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:          'talent-corner/resumes',
    resource_type:   'raw',
    allowed_formats: ['pdf', 'doc', 'docx'],
  },
});

const upload = multer({ storage });

// POST /api/register
router.post('/', async (req, res) => {
  const { email } = req.body;

  // Check if already registered
  const { data: existing } = await supabase
    .from('candidates')
    .select('id')
    .eq('email', email)
    .single();

  if (existing) return res.status(400).json({ error: 'Email already registered' });

  const { data, error } = await supabase
    .from('candidates')
    .insert(req.body)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ message: 'Registration successful!', candidate: data });
});

// POST /api/register/upload/resume
router.post('/upload/resume', upload.single('resume'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ resumeUrl: req.file.path });
});

module.exports = router;