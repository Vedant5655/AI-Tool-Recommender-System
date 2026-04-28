// components/browse-page.js
import { store } from '../store.js';
import { renderToolCard } from './tool-card.js';
import { openModal } from './modal.js';

export function renderBrowse(container) {
  container.innerHTML = `
    <section class="container fade-in" style="margin-top: 64px; margin-bottom: 64px;">
      <div style="margin-bottom: 48px;">
        <h2 style="font-size: 40px; margin-bottom: 16px;">Browse All Tools</h2>
        <p style="color:var(--color-text-muted); font-size: 18px;">Filter and explore our entire database of AI tools.</p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 24px; margin-bottom: 32px;">
        <div class="search-container">
          <i data-lucide="search" class="search-icon"></i>
          <input type="search" id="browse-search" class="search-input" placeholder="Search by name, tag, or category..." aria-label="Search tools">
        </div>
        
        <div class="filters-bar" id="browse-pricing-filters">
          <span style="color:var(--color-text-muted); margin-right: 12px;">Pricing:</span>
          <button class="filter-pill active" data-pricing="All">All</button>
          <button class="filter-pill" data-pricing="Free">Free / Freemium</button>
          <button class="filter-pill" data-pricing="Paid">Paid</button>
        </div>
      </div>

      <div class="tools-grid" id="browse-grid"></div>
    </section>
  `;

  if (window.lucide) window.lucide.createIcons();

  const grid = container.querySelector('#browse-grid');
  const searchInput = container.querySelector('#browse-search');
  const pricingFilters = container.querySelector('#browse-pricing-filters');

  let currentQuery = '';
  let currentPricing = 'All';

  const renderCards = () => {
    // We clone the tools so we don't modify the store directly
    let filtered = [...store.tools];

    // Filter by Pricing
    if (currentPricing === 'Free') {
      filtered = filtered.filter(t => ['Free', 'Freemium'].includes(t.pricing));
    } else if (currentPricing === 'Paid') {
      filtered = filtered.filter(t => ['Paid', 'Enterprise'].includes(t.pricing));
    }

    // Filter by Search Query
    if (currentQuery.length > 0) {
      const q = currentQuery.toLowerCase();
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.category.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    grid.innerHTML = filtered.length > 0
      ? filtered.map(t => renderToolCard(t)).join('')
      : '<p style="text-align:center;width:100%;color:var(--color-text-muted);padding:40px;">No tools found matching your criteria.</p>';
    
    // Attach modal events
    const cards = grid.querySelectorAll('.tool-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const toolId = card.getAttribute('data-id');
        const tool = store.tools.find(t => t.id === toolId);
        if (tool) openModal(tool);
      });
      card.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') card.click();
      });
    });
  };

  // Search Listener
  searchInput.addEventListener('input', (e) => {
    currentQuery = e.target.value;
    renderCards();
  });

  // Pricing Listener
  pricingFilters.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-pill')) {
      pricingFilters.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      currentPricing = e.target.getAttribute('data-pricing');
      renderCards();
    }
  });

  renderCards();
}
