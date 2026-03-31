const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const contactRoutes = require('./routes/contactRoutes');
const leetcodeRoutes = require('./routes/leetcodeRoutes');


const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/contact', contactRoutes);
app.use('/api/leetcode', leetcodeRoutes);

app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(notFound);
app.use(errorHandler);

module.exports = app;