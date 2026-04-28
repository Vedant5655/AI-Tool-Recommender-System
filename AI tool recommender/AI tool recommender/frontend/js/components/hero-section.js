// components/hero-section.js
export function renderHero(container) {
  const html = `
    <section class="hero-section fade-in">
      <div class="hero-content">
        <h1>Discover Your Perfect<br/>AI Stack in <span style="color:var(--color-accent-violet)">90 Seconds</span></h1>
        <p class="hero-subtitle">Stop guessing what tools to use. Take our guided quiz and instantly get a personalised stack of AI tools ranked by relevance to your role, budget, and workflow.</p>
        <a href="#quiz" class="btn btn-primary glass-card--chromatic" style="padding: 16px 32px; font-size: 18px;">
          Find My AI Stack <i data-lucide="arrow-right"></i>
        </a>
        <div class="hero-stats glass-card">
          <div class="stat-item"><i data-lucide="layers"></i> 80+ Premium Tools</div>
          <div class="stat-item"><i data-lucide="zap"></i> 10 Categories</div>
          <div class="stat-item"><i data-lucide="refresh-cw"></i> Updated Weekly</div>
        </div>
      </div>
    </section>
  `;
  container.innerHTML = html;
  
  if (window.lucide) {
    window.lucide.createIcons();
  }
}
