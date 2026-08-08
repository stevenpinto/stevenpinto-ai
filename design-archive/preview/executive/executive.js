const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

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
