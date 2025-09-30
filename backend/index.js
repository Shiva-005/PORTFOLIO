const express = require('express');
const axios = require('axios');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
app.use(cors());

app.get('/gfg/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const response = await axios.get(
            `https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=${username}`
        );
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch' });
    }
});


app.listen(8000, () => console.log('Server running on port 8000'));
