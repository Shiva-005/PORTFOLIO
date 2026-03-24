// CPStats.js

// ✅ Dynamically set BASE_URL for local and production
const BASE_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:8000/api" // local backend
        : "/api";                     // production backend (same domain)

export default class CPStats {
    constructor() {
        this.leetcodeUsername = 'hello_to_shiva';
        this.gfgUsername = 'tomarsh3rre';
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
        } catch {
            return null;
        }
    }

    async getGFGStats() {
        try {
            const res = await fetch(`${BASE_URL}/gfg/${this.gfgUsername}`);
            if (!res.ok) throw new Error();
            const data = await res.json();
            return data.data;
        } catch {
            return null;
        }
    }

    setLoading() {
        const selectors = [
            '.leetcode .problems-solved',
            '.leetcode .ranking',
            '.leetcode .acceptance-rate',
            '.gfg .problems-solved',
            '.gfg .coding-score',
            '.gfg .institute-rank'
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
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
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

    async updateDashboard() {
        this.setLoading();

        const [lc, gfg] = await Promise.all([
            this.getLeetCodeStats(),
            this.getGFGStats()
        ]);

        // LeetCode
        if (lc && !this.isInvalid(lc.totalSolved) && !this.isInvalid(lc.globalRanking)) {
            this.clearLoading('.leetcode span');
            this.safeSet('.leetcode .problems-solved', lc.totalSolved);
            this.safeSet('.leetcode .ranking', lc.globalRanking);
            this.safeSet('.leetcode .acceptance-rate', lc.contestRating ?? '—');

            const progress = Math.min((lc.totalSolved / 2500) * 100, 100);
            this.safeWidth('.leetcode .progress', `${progress}%`);
            this.safeSet('.leetcode .progress-label', `${Math.floor(progress)}%`);
        } else {
            this.setError('.leetcode', this.leetcodeUsername);
        }

        // GFG
        if (gfg && !this.isInvalid(gfg.total_problems_solved) && !this.isInvalid(gfg.score)) {
            this.clearLoading('.gfg span');
            this.safeSet('.gfg .problems-solved', gfg.total_problems_solved);
            this.safeSet('.gfg .coding-score', gfg.score);
            this.safeSet('.gfg .institute-rank', gfg.institute_rank ?? '—');

            const progress = Math.min((gfg.score / 1000) * 100, 100);
            this.safeWidth('.gfg .progress', `${progress}%`);
            this.safeSet('.gfg .progress-label', `${Math.floor(progress)}%`);
        } else {
            this.setError('.gfg', this.gfgUsername);
        }
    }
}