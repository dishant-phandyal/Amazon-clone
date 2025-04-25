const canvas = document.getElementById('particleCanvas');

const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 180; // Adjust for more or fewer particles

canvas.width = width;
canvas.height = height;

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    init();
});

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 0; // Random horizontal speed
        this.speedY = Math.random() * 1; // Random vertical speed
        this.alpha = Math.random() * 0.7 + 0.3; // Initial opacity
        this.alphaDecrement = Math.random() * -5; // How quickly they fade
        this.color = Math.random() < 0.5 ? 'rgba(255, 0, 0,' : 'rgba(255, 255, 255,'; // Random red or white
    }
    draw() {
        ctx.fillStyle = `${this.color} ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.alphaDecrement;

        // Make particles reappear on the opposite side when they go off-screen
        if (this.x < 0 - this.size) this.x = width + this.size;
        if (this.x > width + this.size) this.x = 0 - this.size;
        if (this.y < 0 - this.size) this.y = height + this.size;
        if (this.y > height + this.size) this.y = 0 - this.size;

        if (this.alpha <= 0) {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 5 + 1;
            this.alpha = Math.random() * 0.7 + 0.3;
            this.color = Math.random() < 0.5 ? 'rgba(255, 0, 0,' : 'rgba(255, 255, 255,'; // Reset to random color
        }

        this.draw();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    particlesArray.forEach(particle => particle.update());
    requestAnimationFrame(animate);
}

init();
animate();