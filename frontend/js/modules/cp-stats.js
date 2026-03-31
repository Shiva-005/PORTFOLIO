const BASE_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:8000/api"
        : "https://portfolio-iwxb.onrender.com/api";

export default class CPStats {
    constructor() {
        this.leetcodeUsername = 'hello_to_shiva';
        this.leetcodeChart = null;
        this.analyticsChart = null;
    }

    safeSet(selector, value) {
        const el = document.querySelector(selector);
        if (el) el.textContent = value;
    }

    safeWidth(selector, value) {
        const el = document.querySelector(selector);
        if (el) el.style.width = value;
    }

    isInvalid(value) {
        return (
            value === null ||
            value === undefined ||
            value === "N/A" ||
            value === "" ||
            value === "null"
        );
    }

    async getLeetCodeStats() {
        try {
            const res = await fetch(`${BASE_URL}/leetcode/${this.leetcodeUsername}`);
            if (!res.ok) throw new Error();
            const data = await res.json();
            return data.data;
        } catch (err) {
            console.error("Fetch Error:", err);
            return null;
        }
    }

    setLoading() {
        const selectors = [
            '.leetcode .problems-solved',
            '.leetcode .ranking',
            '.leetcode .contest-rating',
        ];

        selectors.forEach(sel => {
            const el = document.querySelector(sel);
            if (!el) return;
            el.textContent = "";
            el.classList.add("skeleton");
            el.style.display = "inline-block";
            el.style.width = "60px";
            el.style.height = "14px";
        });

        document.querySelectorAll('.progress').forEach(bar => {
            bar.style.width = "30%";
            bar.style.opacity = "0.5";
        });
    }

    clearLoading(selector) {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.remove("skeleton");
            el.style.width = "";
            el.style.height = "";
        });
    }

    setError(selector, username) {
        const card = document.querySelector(selector);
        if (!card) return;

        const stats = card.querySelector('.stats');
        const progressWrap = card.querySelector('.progress-bar-wrap');

        if (!stats) return;

        stats.innerHTML = `
        <div class="stat-item">
            <span class="label">Username</span>
            <span style="font-family:'DM Mono',monospace;font-size:0.8rem;color:var(--cyan)">
                ${username}
            </span>
        </div>
        <div class="stat-item">
            <span class="label">Profile</span>
            <span style="color:#00e564;font-size:0.8rem">
                ● Active
            </span>
        </div>
        `;

        if (progressWrap) {
            progressWrap.style.opacity = "0.3";
            progressWrap.style.pointerEvents = "none";
        }
    }

    renderLeetCodeChart(lc) {
        const ctx = document.getElementById("leetcodeChart");
        if (!ctx) return;

        if (this.leetcodeChart) this.leetcodeChart.destroy();

        this.leetcodeChart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["Easy", "Medium", "Hard"],
                datasets: [{
                    data: [
                        lc.easySolved,
                        lc.mediumSolved,
                        lc.hardSolved
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: "#aaa",
                            font: { size: 10 }
                        }
                    }
                }
            }
        });
    }

    renderAnalyticsChart(lc) {
        const ctx = document.getElementById("analyticsChart");
        if (!ctx) return;

        if (this.analyticsChart) this.analyticsChart.destroy();

        this.analyticsChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Solved", "Remaining"],
                datasets: [{
                    data: [
                        lc.totalSolved,
                        Math.max(2500 - lc.totalSolved, 0)
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        ticks: { color: "#888" }
                    },
                    y: {
                        ticks: { color: "#888" }
                    }
                }
            }
        });
    }

    async updateDashboard() {
        this.setLoading();

        const lc = await this.getLeetCodeStats();

        if (lc && !this.isInvalid(lc.totalSolved) && !this.isInvalid(lc.globalRanking)) {

            this.clearLoading('.leetcode span');
            this.safeSet('.leetcode .problems-solved', lc.totalSolved);
            this.safeSet('.leetcode .ranking', lc.globalRanking);
            this.safeSet('.leetcode .contest-rating', lc.contestRating ?? '—');


            const progress = Math.min((lc.totalSolved / 2500) * 100, 100);
            this.safeWidth('.leetcode .progress', `${progress}%`);
            this.safeSet('.leetcode .progress-label', `${Math.floor(progress)}%`);


            this.renderLeetCodeChart(lc);
            this.renderAnalyticsChart(lc);

        } else {
            this.setError('.leetcode', this.leetcodeUsername);
        }
    }

    init() {
        this.updateDashboard();
    }
}