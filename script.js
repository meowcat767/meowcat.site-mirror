// Particle Animation
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x > canvas.width || this.x < 0) {
        this.speedX = -this.speedX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.speedY = -this.speedY;
      }
    }
    
    draw() {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  function init() {
    particlesArray = [];
    const numberOfParticles = (canvas.width * canvas.height) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    
    connectParticles();
    requestAnimationFrame(animate);
  }
  
  function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x;
        const dy = particlesArray[a].y - particlesArray[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - distance / 600})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }
  
  init();
  animate();
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
  // Clock
  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const clockElement = document.getElementById('clockTime');
    if (clockElement) {
      clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
  }
  updateClock();
  setInterval(updateClock, 1000);
  
  // Random Facts
  const facts = [
    "Cats sleep 70% of their lives",
    "A group of cats is called a clowder",
    "Cats can rotate their ears 180°",
    "A cat's purr vibrates at 25-150 Hz",
    "Cats have 32 muscles in each ear",
    "A cat can jump 6x its length",
    "Cats spend 30-50% awake grooming",
    "A cat's nose print is unique",
    "I am in your walls",
    "Java is better than Python",
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "I am a knockoff Hitori Gotoh"
  ];
  
  const factElement = document.getElementById('randomFact');
  if (factElement) {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    factElement.textContent = randomFact;
    factElement.style.fontSize = '0.9rem';
  }
  
  // Surprise Button
  const surpriseBtn = document.getElementById('surpriseBtn');
  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const links = [
        'gallery.html',
        'project-directory.html',
        'https://status.meowcat.site',
        'https://git.meowcat.site',
        'https://files.meowcat.site'
      ];
      const randomLink = links[Math.floor(Math.random() * links.length)];
      
      this.innerHTML = '🎉 Surprise!';
      setTimeout(() => {
        window.location.href = randomLink;
      }, 500);
    });
  }
  
  // Sidebar functionality
  const sidebar = document.querySelector('.webring-sidebar');
  const sidebarToggleButton = document.querySelector('.floating-toggle');
  
  if (sidebarToggleButton && sidebar) {
    sidebarToggleButton.addEventListener('click', function() {
      if (sidebar.style.display === 'none') {
        sidebar.style.display = 'block';
        document.body.style.paddingLeft = '220px';
      } else {
        sidebar.style.display = 'none';
        document.body.style.paddingLeft = '20px';
      }
    });
  }

  // Chat toggle functionality
  const chatToggleButton = document.querySelector('.chat-toggle');
  const chatContainer = document.querySelector('.chat-container');
  
  if (chatToggleButton && chatContainer) {
    chatToggleButton.addEventListener('click', function() {
      chatContainer.classList.toggle('open');
      
      if (chatContainer.classList.contains('open')) {
        chatToggleButton.innerHTML = '✕';
      } else {
        chatToggleButton.innerHTML = '💬';
      }
    });
  }

  // Sound effect for link clicks - removed to fix navigation issues
  // Links now work without any JavaScript interference
  
  // Add parallax effect to cards - without interfering with links
  const cards = document.querySelectorAll('.nav-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      // Don't apply effect if hovering over a link
      if (e.target.closest('.card-link')) {
        return;
      }
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
    
    // Ensure links within cards are clickable
    const cardLinks = card.querySelectorAll('.card-link');
    cardLinks.forEach(link => {
      link.style.pointerEvents = 'auto';
      link.style.position = 'relative';
      link.style.zIndex = '10';
    });
  });
});
