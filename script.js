// Background Stars Generation
const starsContainer = document.getElementById('stars');
const starCount = 150;

function createStars() {
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 3 + 2;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--duration', `${duration}s`);
        
        starsContainer.appendChild(star);
    }
}

createStars();

// Message Reveal Implementation
const openBtn = document.getElementById('openBtn');
const secretMessage = document.getElementById('secretMessage');

openBtn.addEventListener('click', () => {
    // Elegant transition
    openBtn.style.opacity = '0';
    openBtn.style.transform = 'translateY(-20px) scale(0.9)';
    openBtn.style.pointerEvents = 'none';
    
    setTimeout(() => {
        openBtn.classList.add('hidden');
        secretMessage.classList.remove('hidden');
        secretMessage.classList.add('show-message');
        
        // Premium Festive Confetti
        launchPremiumConfetti();
    }, 400);
});

function launchPremiumConfetti() {
    const end = Date.now() + (4 * 1000);
    const colors = ['#d4af37', '#ffd700', '#ffffff', '#f8f9fa'];

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Smooth Card Parallax
const card = document.getElementById('card');
document.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
    
    if (window.innerWidth > 768) { // Only for desktop
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateY(-10px)`;
    }
});

// Reset card on mouse leave
document.addEventListener('mouseleave', () => {
    card.style.transform = `rotateY(0deg) rotateX(0deg) translateY(0px)`;
    card.style.transition = "all 0.5s ease";
});

document.addEventListener('mouseenter', () => {
    card.style.transition = "none";
});
