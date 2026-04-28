// PRD 13.2 router.js
import { renderHero } from './components/hero-section.js';
import { renderQuiz } from './components/quiz-section.js';
import { renderResults } from './components/results-page.js';
import { renderBrowse } from './components/browse-page.js';
import { renderAbout } from './components/about-page.js';

export function initRouter(appElement) {
  const navigate = () => {
    const hash = window.location.hash || '#/';
    appElement.innerHTML = ''; // clear current view
    
    // Smooth transition
    appElement.classList.remove('fade-in');
    void appElement.offsetWidth; // trigger reflow
    appElement.classList.add('fade-in');

    switch (hash) {
      case '#/':
        renderHero(appElement);
        break;
      case '#quiz':
        renderQuiz(appElement);
        break;
      case '#results':
        renderResults(appElement);
        break;
      case '#browse':
        renderBrowse(appElement);
        break;
      case '#about':
        renderAbout(appElement);
        break;
      default:
        renderHero(appElement);
        break;
    }
  };

  window.addEventListener('hashchange', navigate);
  // Initial load
  navigate();
}
