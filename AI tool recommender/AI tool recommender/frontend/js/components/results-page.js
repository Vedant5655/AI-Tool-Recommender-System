// components/results-page.js
import { store } from '../store.js';
import { getRecommendations } from '../matcher.js';
import { renderToolCard } from './tool-card.js';
import { openModal } from './modal.js';

export function renderResults(container) {
  // Check if we have user profile fully filled, otherwise redirect to quiz
  if (!store.userProfile.role || store.tools.length === 0) {
    window.location.hash = '#quiz';
    return;
  }

  // Calculate Matches
  store.results = getRecommendations(store.tools, store.userProfile, 10);

  const bestMatchRole = store.userProfile.role;
  
  container.innerHTML = `
    <section class="container fade-in" style="margin-top: 64px; margin-bottom: 64px;">
      <div style="margin-bottom: 48px; text-align: center;">
        <h2 style="font-size: 40px; margin-bottom: 16px;">Your <span style="color:var(--color-accent-violet)">AI Stack</span> is Ready</h2>
        <p style="color:var(--color-text-muted); font-size: 18px; max-width: 600px; margin: 0 auto;">
          We analyzed ${store.tools.length} tools. Here are the top matches for a ${bestMatchRole} focused on ${store.userProfile.useCase} with a ${store.userProfile.budget} budget.
        </p>
        <div style="margin-top: 24px; display: flex; gap: 16px; justify-content: center;">
          <button class="btn btn-secondary glass-card" id="btn-retake">Start Over</button>
          <a href="#browse" class="btn btn-text">Browse Full Catalog →</a>
        </div>
      </div>

      <div class="filters-bar" id="results-filters">
        <span style="color:var(--color-text-muted); margin-right: 12px;">Filter Categories:</span>
        <button class="filter-pill active" data-cat="All">All</button>
        <!-- Dinamically injected categories based on results -->
      </div>

      <div class="tools-grid" id="results-grid"></div>
    </section>
  `;

  // Retake button
  container.querySelector('#btn-retake').addEventListener('click', () => {
    store.resetProfile();
    window.location.hash = '#quiz';
  });

  const grid = container.querySelector('#results-grid');
  const renderCards = (tools) => {
    grid.innerHTML = tools.length > 0
      ? tools.map(t => renderToolCard(t)).join('')
      : '<p style="text-align:center;width:100%;color:var(--color-text-muted);">No exact filters matched.</p>';
    
    // Attach modal events
    const cards = grid.querySelectorAll('.tool-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const toolId = card.getAttribute('data-id');
        const tool = store.results.find(t => t.id === toolId);
        if (tool) openModal(tool);
      });
      // Accessibility check
      card.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') card.click();
      });
    });

    // Add staggered delay to match bar filling for visual wow factor
    requestAnimationFrame(() => {
      const fills = grid.querySelectorAll('.match-bar-fill');
      fills.forEach((fill, idx) => {
        const w = fill.style.width;
        fill.style.width = '0%';
        setTimeout(() => { fill.style.width = w; }, 100 + (idx * 100));
      });
    });
  };

  // Generate category filters dynamically based on current results
  const cats = new Set(store.results.map(t => t.category));
  const filterBar = container.querySelector('#results-filters');
  cats.forEach(cat => {
    filterBar.insertAdjacentHTML('beforeend', `<button class="filter-pill" data-cat="${cat}">${cat}</button>`);
  });

  filterBar.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-pill')) {
      container.querySelectorAll('#results-filters .filter-pill').forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      const cat = e.target.getAttribute('data-cat');
      if (cat === 'All') {
        renderCards(store.results);
      } else {
        renderCards(store.results.filter(t => t.category === cat));
      }
    }
  });

  renderCards(store.results);
}
