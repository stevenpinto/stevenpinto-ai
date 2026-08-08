const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const themeLabel = themeToggle ? themeToggle.querySelector('.theme-toggle-label') : null;
const root = document.documentElement;

function getPreferredTheme() {
  const saved = localStorage.getItem('sp-theme');
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  if (themeToggle) {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
    themeToggle.setAttribute('title', `Switch to ${nextTheme} mode`);
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  }
  if (themeLabel) {
    themeLabel.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  }
}

applyTheme(getPreferredTheme());

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('sp-theme', nextTheme);
    applyTheme(nextTheme);
  });
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function openAskSteve() {
  const widget = document.querySelector('steve-ai-widget');
  const toggle = widget && widget.shadowRoot
    ? widget.shadowRoot.querySelector('.steve-ai-toggle')
    : null;

  if (toggle) {
    toggle.click();
  }
}

const openChatbot = document.getElementById('openChatbot');
if (openChatbot) {
  openChatbot.addEventListener('click', openAskSteve);
}

document.querySelectorAll('[data-open-chat]').forEach((button) => {
  button.addEventListener('click', openAskSteve);
});
