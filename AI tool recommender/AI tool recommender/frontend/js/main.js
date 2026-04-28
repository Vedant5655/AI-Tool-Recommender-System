// PRD 13.2 main.js
import { fetchTools } from './data.js';
import { initRouter } from './router.js';

document.addEventListener('DOMContentLoaded', async () => {
  console.log("StackMatch AI Initializing...");
  
  // 1. Fetch data
  await fetchTools();

  // 2. Initialize Mobile Nav toggle
  const hamburger = document.querySelector('.hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.hidden = isExpanded;
    });

    // Close menu when clicking link
    mobileMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
      }
    });
  }

  // Init Lucide Icons globally for static elements
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 3. Start Router
  const appElement = document.getElementById('app');
  initRouter(appElement);
});
