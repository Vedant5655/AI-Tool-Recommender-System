// components/about-page.js
export function renderAbout(container) {
  container.innerHTML = `
    <section class="container fade-in" style="margin-top: 64px; margin-bottom: 64px; max-width: 800px;">
      <div style="margin-bottom: 48px; text-align: center;">
        <h2 style="font-size: 40px; margin-bottom: 16px;">How StackMatch AI Works</h2>
        <p style="color:var(--color-text-muted); font-size: 18px;">Finding the right tools doesn't have to be overwhelming.</p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div class="glass-card interactive" style="padding: 32px; display: flex; gap: 24px; align-items: flex-start;">
          <div style="background: rgba(124, 58, 237, 0.18); color: var(--color-accent-violet); padding: 12px; border-radius: 12px;">
            <i data-lucide="crosshair" style="width: 32px; height: 32px;"></i>
          </div>
          <div>
            <h3 style="margin-bottom: 8px;">1. The Quiz</h3>
            <p style="color: var(--color-text-muted); line-height: 1.6;">We ask 5 simple questions to understand your role, primary use case, budget, output needs, and technical skill level. No personal data is collected.</p>
          </div>
        </div>

        <div class="glass-card interactive" style="padding: 32px; display: flex; gap: 24px; align-items: flex-start;">
          <div style="background: rgba(56, 189, 248, 0.18); color: var(--color-accent-cyan); padding: 12px; border-radius: 12px;">
            <i data-lucide="cpu" style="width: 32px; height: 32px;"></i>
          </div>
          <div>
            <h3 style="margin-bottom: 8px;">2. The Matching Algorithm</h3>
            <p style="color: var(--color-text-muted); line-height: 1.6;">Our client-side matching engine instantly scores our curated database of 80+ AI tools against your profile. Tools that align with your role get a heavy boost, while tools outside your budget or skill level are carefully down-ranked.</p>
          </div>
        </div>

        <div class="glass-card interactive" style="padding: 32px; display: flex; gap: 24px; align-items: flex-start;">
          <div style="background: rgba(251, 113, 133, 0.18); color: var(--color-accent-pink); padding: 12px; border-radius: 12px;">
            <i data-lucide="check-circle" style="width: 32px; height: 32px;"></i>
          </div>
          <div>
            <h3 style="margin-bottom: 8px;">3. The Results</h3>
            <p style="color: var(--color-text-muted); line-height: 1.6;">You receive a personalized, scored list of the Top 10 clearest matches for your exact workflow. We show you exactly <em>why</em> a tool matched so you can make informed decisions in seconds, not hours.</p>
          </div>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 48px;">
        <a href="#quiz" class="btn btn-primary glass-card--chromatic" style="padding: 16px 32px; font-size: 18px;">
          Find My AI Stack
        </a>
      </div>
    </section>
  `;
  if (window.lucide) window.lucide.createIcons();
}
