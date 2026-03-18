/* ==========================================
   Steven Pinto — Main JS
   Scroll reveals, theme toggle, mobile nav,
   hero grid animation
   ========================================== */

(function () {
  'use strict';

  // --- Scroll Reveal ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings slightly
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  // Add stagger delays to sibling reveals
  document.querySelectorAll('.projects-grid .reveal, .articles-grid .reveal, .interests-grid .reveal, .contact-grid .reveal').forEach((el, i) => {
    el.dataset.delay = i * 80;
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  // --- Theme Toggle ---
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Check saved preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  }

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // --- Mobile Nav ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });

  // --- Nav background on scroll ---
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // --- Hero Grid Canvas Animation ---
  const canvas = document.getElementById('gridCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, dots;
    let mouse = { x: -1000, y: -1000 };
    let animationId;

    function resize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initDots();
    }

    function initDots() {
      dots = [];
      const spacing = 40;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * spacing,
            y: j * spacing,
            baseX: i * spacing,
            baseY: j * spacing,
            size: 1.2,
          });
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      const isDark = html.getAttribute('data-theme') === 'dark';
      const dotColor = isDark ? 'rgba(96, 165, 250, ' : 'rgba(59, 130, 246, ';

      dots.forEach((dot) => {
        const dx = mouse.x - dot.baseX;
        const dy = mouse.y - dot.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 0.5;
          dot.x = dot.baseX + dx * force * 0.15;
          dot.y = dot.baseY + dy * force * 0.15;
          dot.size = 1.2 + (1 - dist / maxDist) * 2;
        } else {
          dot.x += (dot.baseX - dot.x) * 0.08;
          dot.y += (dot.baseY - dot.y) * 0.08;
          dot.size += (1.2 - dot.size) * 0.08;
        }

        const opacity = dist < maxDist ? 0.15 + (1 - dist / maxDist) * 0.6 : 0.12;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dotColor + opacity + ')';
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    }

    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    window.addEventListener('resize', resize);
    resize();
    draw();
  }

  // --- Chat bubble tooltip ---
  function showChatBubble() {
    const widget = document.querySelector('steve-ai-widget');
    if (!widget || !widget.shadowRoot) {
      setTimeout(showChatBubble, 500);
      return;
    }

    const toggle = widget.shadowRoot.querySelector('.steve-ai-toggle');
    if (!toggle) return;

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble-tooltip';
    bubble.innerHTML = `<span>Hey! Ask me anything about Steve's experience & projects</span><button class="chat-bubble-close">&times;</button>`;
    bubble.style.cssText = `
      position: fixed;
      bottom: 92px;
      right: 24px;
      background: var(--accent, #60a5fa);
      color: #fff;
      padding: 12px 16px;
      border-radius: 12px 12px 4px 12px;
      font-size: 0.88rem;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      max-width: 260px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.3);
      z-index: 999;
      display: flex;
      align-items: center;
      gap: 8px;
      animation: bubbleIn 0.4s ease;
      cursor: pointer;
    `;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes bubbleIn {
        from { opacity: 0; transform: translateY(10px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .chat-bubble-tooltip:hover { filter: brightness(1.1); }
      .chat-bubble-close {
        background: none; border: none; color: rgba(255,255,255,0.7);
        font-size: 1.1rem; cursor: pointer; padding: 0 0 0 4px; line-height: 1;
      }
      .chat-bubble-close:hover { color: #fff; }
    `;
    document.head.appendChild(style);
    document.body.appendChild(bubble);

    // Click bubble to open chat
    bubble.querySelector('span').addEventListener('click', () => {
      toggle.click();
      bubble.remove();
    });

    // Close button
    bubble.querySelector('.chat-bubble-close').addEventListener('click', (e) => {
      e.stopPropagation();
      bubble.remove();
    });

    // Auto-dismiss after 8 seconds
    setTimeout(() => {
      if (bubble.parentElement) {
        bubble.style.transition = 'opacity 0.3s ease';
        bubble.style.opacity = '0';
        setTimeout(() => bubble.remove(), 300);
      }
    }, 8000);
  }

  // Show bubble after 3 seconds
  setTimeout(showChatBubble, 3000);

  // --- Open chatbot button ---
  const openChatBtn = document.getElementById('openChatbot');
  if (openChatBtn) {
    openChatBtn.addEventListener('click', () => {
      const widget = document.querySelector('steve-ai-widget');
      if (widget && widget.shadowRoot) {
        const toggle = widget.shadowRoot.querySelector('.steve-ai-toggle');
        if (toggle) toggle.click();
      }
    });
  }

  // --- Active nav link highlight ---
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinksAll.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
})();
