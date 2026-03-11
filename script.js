// Set dark mode as default for that "Aesthetic" look
document.body.setAttribute('data-theme', 'dark');

// Message Reveal Implementation
const openBtn = document.getElementById('openBtn');
const secretMessage = document.getElementById('secretMessage');

openBtn.addEventListener('click', () => {
    // Elegant transition
    openBtn.style.opacity = '0';
    openBtn.style.pointerEvents = 'none';
    
    setTimeout(() => {
        openBtn.classList.add('hidden');
        secretMessage.classList.remove('hidden');
        secretMessage.classList.add('show-message');
        
        // Launch subtle festive confetti
        launchMinimalConfetti();
    }, 300);
});

function launchMinimalConfetti() {
    const end = Date.now() + (2 * 1000); 
    const colors = ['#c5a059', '#e9c46a', '#ffffff'];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.7 },
            colors: colors,
            scalar: 0.7
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.7 },
            colors: colors,
            scalar: 0.7
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}
