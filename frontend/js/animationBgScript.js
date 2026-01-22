const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 1920;
canvas.height = 1080;

// Animation variables
let particles = [];

class Particle {
    constructor(x, y, size, color, velocity) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Bounce off edges
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.velocity.x *= -1;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.velocity.y *= -1;
        }

        this.draw();
    }
}

function initParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
        const size = Math.random() * 5 + 2;
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        const color = `hsl(${Math.random() * 360}, 70%, 50%)`;
        const velocity = {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2,
        };
        particles.push(new Particle(x, y, size, color, velocity));
    }
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => particle.update());

    requestAnimationFrame(animate);
}

// Initialize particles and start animation
initParticles(100);
animate();