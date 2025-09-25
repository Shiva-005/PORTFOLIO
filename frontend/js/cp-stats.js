class CPStats {
    constructor() {
        this.leetcodeUsername = 'hello_to_shiva';
        this.gfgUsername = 'tomarsh3rre/';
        this.hackerrankUsername = 'tomarshiva403';
    }

    async getLeetCodeStats() {
        try {
            const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${this.leetcodeUsername}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching LeetCode stats:', error);
            return null;
        }
    }

    async getGFGStats() {
        try {
            const response = await fetch(`https://geeksforgeeks-api.vercel.app/${this.gfgUsername}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching GFG stats:', error);
            return null;
        }
    }

    async getHackerRankStats() {
        try {
            const response = await fetch(`https://hackerrank-api.vercel.app/${this.hackerrankUsername}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching HackerRank stats:', error);
            return null;
        }
    }

    async updateDashboard() {
        const leetcodeStats = await this.getLeetCodeStats();
        const gfgStats = await this.getGFGStats();
        const hackerrankStats = await this.getHackerRankStats();

        // Update LeetCode stats
        if (leetcodeStats) {
            document.querySelector('.leetcode .problems-solved').textContent = leetcodeStats.totalSolved;
            document.querySelector('.leetcode .ranking').textContent = leetcodeStats.ranking;
            document.querySelector('.leetcode .acceptance-rate').textContent = `${leetcodeStats.acceptanceRate}%`;
            document.querySelector('.leetcode .progress').style.width = `${leetcodeStats.totalSolved / 2500 * 100}%`;
        }

        // Update GFG stats
        if (gfgStats) {
            document.querySelector('.gfg .problems-solved').textContent = gfgStats.totalProblemsSolved;
            document.querySelector('.gfg .coding-score').textContent = gfgStats.codingScore;
            document.querySelector('.gfg .institute-rank').textContent = gfgStats.instituteRank;
            document.querySelector('.gfg .progress').style.width = `${gfgStats.codingScore / 1000 * 100}%`;
        }

        // Update HackerRank stats
        if (gfgStats) {
            document.querySelector('.gfg .problems-solved').textContent = gfgStats.totalProblemsSolved;
            document.querySelector('.gfg .coding-score').textContent = gfgStats.codingScore;
            document.querySelector('.gfg .institute-rank').textContent = gfgStats.instituteRank;
            document.querySelector('.gfg .progress').style.width = `${gfgStats.codingScore / 1000 * 100}%`;
        }

        // Update monthly solving graph
        this.updateSolvingGraph();
    }

    async updateSolvingGraph() {
        const ctx = document.getElementById('problemSolvingGraph').getContext('2d');
        const data = await this.getMonthlySolvingData();

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Problems Solved',
                    data: data.values,
                    borderColor: '#eb9412',
                    backgroundColor: 'rgba(235, 148, 18, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#aaa8a6'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#aaa8a6'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#aaa8a6'
                        }
                    }
                }
            }
        });
    }
}

