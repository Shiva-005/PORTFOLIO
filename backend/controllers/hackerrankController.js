const puppeteer = require('puppeteer');

exports.getHackerRankProfile = async (req, res) => {
    const { username } = req.params;
    const url = `https://www.hackerrank.com/${username}`;

    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2" });

        const data = await page.evaluate(() => {
            const stats = {};
            const solvedEl = document.querySelector(".problem-solving-card .track-score");
            stats.problemsSolved = solvedEl ? solvedEl.innerText : null;

            const rankEl = document.querySelector(".profile-rank");
            stats.rank = rankEl ? rankEl.innerText : null;

            const starsEl = document.querySelector(".profile-stars");
            stats.stars = starsEl ? starsEl.innerText : null;

            return stats;
        });

        await browser.close();
        res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch HackerRank stats" });
    }
};
