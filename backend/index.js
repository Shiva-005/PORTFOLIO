const express = require('express');
const cors = require('cors');
require('dotenv').config();

const contactRoutes = require('./routes/contactRoutes');
const gfgRoutes = require('./routes/gfgRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/contact', contactRoutes);       // POST /contact/contactme
app.use('/gfg', gfgRoutes);               // GET /gfg/:username

// Start Server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
