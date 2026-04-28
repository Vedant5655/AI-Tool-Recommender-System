// components/tool-card.js
export function renderToolCard(tool) {
  // PRD 9.8 Category Badge Colour Map (via CSS vars)
  const categoryClassMap = {
    'Writing & Content': 'badge-writing',
    'Image & Design': 'badge-design',
    'Code & Dev': 'badge-code',
    'Data & Analytics': 'badge-data',
    'Productivity & Automation': 'badge-productivity',
    'Video & Audio': 'badge-video',
    'Research & Knowledge': 'badge-research',
    'Marketing & SEO': 'badge-marketing',
    'Customer Support': 'badge-support',
    'Finance & Business': 'badge-finance'
  };

  const badgeVar = categoryClassMap[tool.category] || 'badge-research';
  
  // Calculate match bar (only shown if matchScore exists)
  let matchHtml = '';
  if (tool.matchScore !== undefined) {
    let matchColourClass = 'match-good';
    let matchLabel = 'Good Match';
    if (tool.matchScore >= 85) { matchColourClass = 'match-perfect'; matchLabel = 'Perfect Fit'; }
    else if (tool.matchScore >= 65) { matchColourClass = 'match-great'; matchLabel = 'Great Fit'; }
    else if (tool.matchScore < 45) { matchColourClass = 'match-partial'; matchLabel = 'Partial Match'; }

    matchHtml = `
      <div class="match-bar-container" role="meter" aria-valuenow="${tool.matchScore}" aria-valuemin="0" aria-valuemax="100" aria-label="Match score: ${tool.matchScore}%">
        <div class="match-bar-header">
          <span class="${matchColourClass}">${matchLabel}</span>
          <span>${tool.matchScore}%</span>
        </div>
        <div class="match-bar-track">
          <div class="match-bar-fill" style="width: ${tool.matchScore}%"></div>
        </div>
      </div>
    `;
  }

  return `
    <article class="tool-card glass-card interactive" tabindex="0" data-id="${tool.id}" aria-label="${tool.name} - ${tool.category}">
      <div class="tool-card-header">
        <div class="tool-logo-emoji" aria-hidden="true">${tool.logo_emoji || '🤖'}</div>
        <div class="tool-title-wrapper">
          <h3 class="tool-name">${tool.name}</h3>
          <p class="tool-tagline">${tool.tagline}</p>
        </div>
      </div>
      
      <div class="tool-meta">
        <span class="badge" style="background: rgba(var(--${badgeVar}-rgb), 0.2); color: var(--${badgeVar}); border: 1px solid rgba(var(--${badgeVar}-rgb), 0.4);">${tool.category}</span>
        <span class="badge badge-pricing">${tool.pricing}</span>
      </div>

      <div class="tool-card-footer">
        ${matchHtml}
      </div>
    </article>
  `;
}
