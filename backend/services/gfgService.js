const puppeteer = require('puppeteer');

const getGfgData = async (username) => {
    const url = `https://auth.geeksforgeeks.org/user/${username}/`;

    let browser;

    try {
        browser = await puppeteer.launch({
            headless: "new"
        });

        const page = await browser.newPage();

        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 0
        });

        // ⏳ wait for content to load
        await page.waitForSelector('body');

        const data = await page.evaluate(() => {
            const text = document.body.innerText;

            const getValue = (label) => {
                const regex = new RegExp(label + "\\s*(\\d+)");
                const match = text.match(regex);
                return match ? match[1] : "N/A";
            };

            const institute =
                document.querySelector('.educationDetails_head_left--text')
                    ?.innerText || "N/A";

            return {
                problemsSolved: getValue("Problems Solved"),
                score: getValue("Coding Score"),
                rank: getValue("Rank"),
                institute
            };
        });

        await browser.close();

        return {
            username,
            ...data
        };

    } catch (error) {
        if (browser) await browser.close();
        console.error("Puppeteer Error:", error.message);
        throw new Error('Failed to fetch GFG data');
    }
};

module.exports = { getGfgData };