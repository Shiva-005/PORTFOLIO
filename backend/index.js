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


app.get('/interviewbit/profile/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(`https://www.interviewbit.com/profile/${username}`);

        // Wait for stats to load
        await page.waitForSelector('.profile-stats', { timeout: 5000 });

        const stats = await page.evaluate(() => {
            return {
                problemsSolved: document.querySelector('.problems-solved')?.innerText || '0',
                universityRank: document.querySelector('.university-rank')?.innerText || 'N/A',
                codingScore: document.querySelector('.coding-score')?.innerText || '0'
            };
        });

        await browser.close();
        res.json({ data: stats });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            data: {
                problemsSolved: '0',
                universityRank: 'N/A',
                codingScore: '0'
            }
        });
    }
});


app.listen(8000, () => console.log('Server running on port 8000'));
