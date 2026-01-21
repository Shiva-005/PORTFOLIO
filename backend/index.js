const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectToDatabase = require('./connection');

const contactRoutes = require('./routes/contactRoutes');
const gfgRoutes = require('./routes/gfgRoutes');
const hackerrankRoutes = require('./routes/hackerrankRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

// Routes
app.use('/contact', contactRoutes);       // POST /contact/contactme
app.use('/gfg', gfgRoutes);               // GET /gfg/:username
app.use('/hackerrank', hackerrankRoutes); // GET /hackerrank/:username

// Start Server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
