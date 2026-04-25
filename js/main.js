// Theme toggle — persists via localStorage, defaults to light
const root = document.documentElement;
const tBtn = document.getElementById('theme-toggle');

const saved = localStorage.getItem('sp-theme') || 'light';
if (saved === 'dark') {
  root.setAttribute('data-theme', 'dark');
  if (tBtn) tBtn.textContent = 'Light';
}

if (tBtn) {
  tBtn.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      tBtn.textContent = 'Dark';
      localStorage.setItem('sp-theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      tBtn.textContent = 'Light';
      localStorage.setItem('sp-theme', 'dark');
    }
  });
}

// Open Ask Steve widget
function openAskSteve() {
  const widget = document.querySelector('steve-ai-widget');
  if (widget && widget.shadowRoot) {
    const toggle = widget.shadowRoot.querySelector('.steve-ai-toggle');
    if (toggle) toggle.click();
  }
}

const openBtn = document.getElementById('openChatbot');
if (openBtn) openBtn.addEventListener('click', openAskSteve);

document.querySelectorAll('.asksteve-chip').forEach(chip => {
  chip.addEventListener('click', openAskSteve);
});

// Mobile nav toggle (retained for lab article pages)
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('is-open'));
}
