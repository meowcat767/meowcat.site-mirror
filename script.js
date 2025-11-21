// ============================================
// Particle Animation System
// ============================================

const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  let animationId = null;
  
  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.3 + 0.1;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Wrap around edges
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
      ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Initialize particles
  function init() {
    particlesArray = [];
    const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }
  }
  
  // Connect nearby particles
  function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a + 1; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x;
        const dy = particlesArray[a].y - particlesArray[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const opacity = (1 - distance / 150) * 0.15;
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let particle of particlesArray) {
      particle.update();
      particle.draw();
    }
    
    connectParticles();
    animationId = requestAnimationFrame(animate);
  }
  
  // Start animation
  init();
  animate();
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });
}

// ============================================
// Clock and Facts - Initialize when DOM is ready
// ============================================

(function() {
  'use strict';
  
  // Wait for DOM to be fully loaded
  function initClockAndFacts() {
    // ============================================
    // Clock
    // ============================================
    
    const clockElement = document.getElementById('clockTime');
    
    if (clockElement) {
      function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
      }
      
      // Update immediately
      updateClock();
      // Then update every second
      setInterval(updateClock, 1000);
    }
    
    // ============================================
    // Random Facts
    // ============================================
    
    const facts = [
      "Cats sleep 70% of their lives",
      "A group of cats is called a clowder",
      "Cats can rotate their ears 180°",
      "A cat's purr vibrates at 25-150 Hz",
      "Cats have 32 muscles in each ear",
      "A cat can jump 6x its length",
      "Cats spend 30-50% of awake time grooming",
      "A cat's nose print is unique",
      "Java is better than Python",
      "I am a knockoff Hitori Gotoh"
    ];
    
    const factElement = document.getElementById('randomFact');
    
    if (factElement) {
      // Set initial fact immediately
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      factElement.textContent = randomFact;
      factElement.style.transition = 'opacity 0.3s ease';
      factElement.style.opacity = '1';
      
      // Update fact every 10 seconds
      setInterval(function() {
        const newFact = facts[Math.floor(Math.random() * facts.length)];
        factElement.style.opacity = '0';
        setTimeout(function() {
          factElement.textContent = newFact;
          factElement.style.opacity = '1';
        }, 300);
      }, 10000);
    }
  }
  
  // Run when DOM is ready with retry mechanism
  let retryCount = 0;
  const maxRetries = 50; // 5 seconds max wait time
  
  function tryInit() {
    const clockElement = document.getElementById('clockTime');
    const factElement = document.getElementById('randomFact');
    
    if (clockElement && factElement) {
      initClockAndFacts();
    } else if (retryCount < maxRetries) {
      // Elements not found yet, try again after a short delay
      retryCount++;
      setTimeout(tryInit, 100);
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit);
  } else {
    // DOM is already loaded, try immediately
    tryInit();
  }
})();

// ============================================
// DOM Content Loaded - Other functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // ============================================
  // Intersection Observer for Animations
  // ============================================
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all cards
  document.querySelectorAll('.stat-card, .link-card').forEach(card => {
    observer.observe(card);
  });
});
