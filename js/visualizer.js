// === MOOD VISUALIZER ===
// Creates animated backgrounds based on mood

const canvas = document.getElementById('moodCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let animationId = null;
let currentMood = null;

// Resize canvas to full screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Particle class
class Particle {
    constructor(x, y, config) {
        this.x = x;
        this.y = y;
        this.config = config;
        this.vx = (Math.random() - 0.5) * config.speed;
        this.vy = (Math.random() - 0.5) * config.speed;
        this.size = Math.random() * config.maxSize + config.minSize;
        this.life = 1;
        this.decay = config.decay || 0.001;
        this.color = config.color;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        
        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
    
    draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Animation configurations for different moods
const moodConfigs = {
    anxious: {
        particleCount: 100,
        speed: 3,
        minSize: 2,
        maxSize: 5,
        decay: 0.003,
        color: '#FF6B6B',
        backgroundColor: 'rgba(10, 10, 10, 0.1)'
    },
    happy: {
        particleCount: 80,
        speed: 2,
        minSize: 3,
        maxSize: 8,
        decay: 0.002,
        color: '#FFD93D',
        backgroundColor: 'rgba(10, 10, 10, 0.1)'
    },
    sad: {
        particleCount: 60,
        speed: 0.5,
        minSize: 2,
        maxSize: 4,
        decay: 0.001,
        color: '#6C5CE7',
        backgroundColor: 'rgba(10, 10, 10, 0.1)'
    },
    energetic: {
        particleCount: 150,
        speed: 5,
        minSize: 3,
        maxSize: 7,
        decay: 0.005,
        color: '#00D9FF',
        backgroundColor: 'rgba(10, 10, 10, 0.1)'
    },
    chill: {
        particleCount: 50,
        speed: 0.8,
        minSize: 4,
        maxSize: 10,
        decay: 0.0005,
        color: '#4ECDC4',
        backgroundColor: 'rgba(10, 10, 10, 0.05)'
    },
    melancholic: {
        particleCount: 70,
        speed: 1,
        minSize: 2,
        maxSize: 5,
        decay: 0.002,
        color: '#A29BFE',
        backgroundColor: 'rgba(10, 10, 10, 0.1)'
    },
    excited: {
        particleCount: 120,
        speed: 4,
        minSize: 2,
        maxSize: 6,
        decay: 0.004,
        color: '#FD79A8',
        backgroundColor: 'rgba(10, 10, 10, 0.1)'
    },
    calm: {
        particleCount: 40,
        speed: 0.5,
        minSize: 5,
        maxSize: 12,
        decay: 0.0003,
        color: '#74B9FF',
        backgroundColor: 'rgba(10, 10, 10, 0.05)'
    },
    stressed: {
        particleCount: 110,
        speed: 3.5,
        minSize: 2,
        maxSize: 4,
        decay: 0.004,
        color: '#FF7675',
        backgroundColor: 'rgba(10, 10, 10, 0.1)'
    }
};

// Initialize particles
function initParticles(config) {
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
        particles.push(
            new Particle(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                config
            )
        );
    }
}

// Animation loop
function animate(config) {
    // Semi-transparent background for trail effect
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        
        // Respawn dead particles
        if (particle.life <= 0) {
            particles[index] = new Particle(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                config
            );
        }
    });
    
    // Continue animation
    animationId = requestAnimationFrame(() => animate(config));
}

// Start mood animation (called from app.js)
function startMoodAnimation(moodData) {
    // Stop existing animation
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    // Get config for this mood (default to chill if mood not found)
    const config = moodConfigs[moodData.mood] || moodConfigs.chill;
    
    // Override colors if provided
    if (moodData.colors && moodData.colors.primary) {
        config.color = moodData.colors.primary;
    }
    
    // Initialize and start
    currentMood = moodData.mood;
    initParticles(config);
    animate(config);
}

// Initialize
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Start with default calm animation
const defaultConfig = moodConfigs.chill;
initParticles(defaultConfig);
animate(defaultConfig);

console.log('Visualizer ready! 🎨');
