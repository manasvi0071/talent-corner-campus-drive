require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth',       require('./routes/auth'));
app.use('/api/dashboard',  require('./routes/dashboard'));
app.use('/api/candidates', require('./routes/candidates'));
app.use('/api/events',     require('./routes/events'));
app.use('/api/corporates', require('./routes/corporates'));
app.use('/api/register',   require('./routes/register'));
app.use('/api/jobs', require('./routes/jobs'));
app.get('/', (req, res) => res.json({ status: 'Talent Corner API running ✅' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));