import CPStats from './cp-stats.js';

export default function initStats() {
    const stats = new CPStats();

    stats.updateDashboard();

    setInterval(() => {
        stats.updateDashboard();
    }, 1800000);
}