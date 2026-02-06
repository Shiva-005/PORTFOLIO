const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const contactRoutes = require('./routes/contactRoutes');
const gfgRoutes = require('./routes/gfgRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/contact', contactRoutes);
app.use('/gfg', gfgRoutes);

// ✅ Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
