class CPStats {
    constructor() {
        this.leetcodeUsername = 'hello_to_shiva';
        this.gfgUsername = 'tomarsh3rre';
    }

    // ---------- LeetCode ----------
    async getLeetCodeStats() {
        try {
            const response = await fetch(
                `https://leetcode-stats-api.herokuapp.com/${this.leetcodeUsername}`
            );
            if (!response.ok) throw new Error('LeetCode API error');
            return await response.json();
        } catch (error) {
            console.error('Error fetching LeetCode stats:', error);
            return null;
        }
    }

    // ---------- GeeksForGeeks ----------
    async getGFGStats() {
        try {
            // IMPORTANT: relative path (works on Render + localhost)
            const response = await fetch(`/gfg/${this.gfgUsername}`);
            if (!response.ok) throw new Error('GFG API error');
            return await response.json();
        } catch (error) {
            console.error('Error fetching GFG stats:', error);
            return null;
        }
    }

    // ---------- Update UI ----------
    async updateDashboard() {
        const [leetcodeStats, gfgStats] = await Promise.all([
            this.getLeetCodeStats(),
            this.getGFGStats()
        ]);

        // LeetCode UI
        if (leetcodeStats) {
            document.querySelector('.leetcode .problems-solved').textContent =
                leetcodeStats.totalSolved ?? '—';

            document.querySelector('.leetcode .ranking').textContent =
                leetcodeStats.ranking ?? '—';

            document.querySelector('.leetcode .acceptance-rate').textContent =
                leetcodeStats.acceptanceRate
                    ? `${leetcodeStats.acceptanceRate}%`
                    : '—';

            const lcProgress =
                Math.min((leetcodeStats.totalSolved / 2500) * 100, 100);

            document.querySelector('.leetcode .progress').style.width =
                `${lcProgress}%`;
        }

        // GFG UI
        if (gfgStats?.data) {
            document.querySelector('.gfg .problems-solved').textContent =
                gfgStats.data.total_problems_solved ?? '—';

            document.querySelector('.gfg .coding-score').textContent =
                gfgStats.data.score ?? '—';

            document.querySelector('.gfg .institute-rank').textContent =
                gfgStats.data.institute_rank ?? '—';

            const gfgProgress =
                Math.min((gfgStats.data.score / 1000) * 100, 100);

            document.querySelector('.gfg .progress').style.width =
                `${gfgProgress}%`;
        }
    }
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
    const cpStats = new CPStats();
    cpStats.updateDashboard();
});
