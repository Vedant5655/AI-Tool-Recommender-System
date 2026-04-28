// components/modal.js
export function openModal(tool) {
  // Ensure we don't have multiple modals
  let existingModal = document.getElementById('tool-modal');
  if (existingModal) {
    existingModal.remove();
  }

  const prosList = tool.pros.map(pro => `<li>${pro}</li>`).join('');
  const consList = tool.cons.map(con => `<li>${con}</li>`).join('');

  const modalHtml = `
    <div id="tool-modal" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title-${tool.id}">
      <div class="modal-container glass-card">
        <div class="modal-header">
          <div>
            <h2 id="modal-title-${tool.id}" style="font-size: 32px;">${tool.logo_emoji} ${tool.name}</h2>
            <p style="color: var(--color-text-muted); margin-top: 4px;">${tool.tagline}</p>
          </div>
          <button class="modal-close-btn" aria-label="Close modal">
            <i data-lucide="x"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <p class="modal-description">${tool.description}</p>
          
          <div class="modal-grid-2">
            <div>
              <h4 class="modal-list-title">Pros</h4>
              <ul class="modal-list pros">
                ${prosList}
              </ul>
            </div>
            <div>
              <h4 class="modal-list-title">Cons</h4>
              <ul class="modal-list cons">
                ${consList}
              </ul>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <div>
            <span style="display:block; font-size:12px; color:var(--color-text-muted);">Pricing</span>
            <strong>${tool.pricing}</strong> (${tool.starting_price})
          </div>
          <a href="${tool.website_url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary glass-card--chromatic">
            Visit Tool <i data-lucide="external-link" style="width:16px;height:16px;"></i>
          </a>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  if (window.lucide) window.lucide.createIcons();

  const modalBackdrop = document.getElementById('tool-modal');
  const closeBtn = modalBackdrop.querySelector('.modal-close-btn');

  // Open animation
  requestAnimationFrame(() => {
    modalBackdrop.classList.add('active');
  });

  // Close Logic
  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    setTimeout(() => modalBackdrop.remove(), 300);
  };

  closeBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    // Only close if clicked outside container
    if (e.target === modalBackdrop) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', function escListener(e) {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escListener);
    }
  });
}
