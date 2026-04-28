// components/quiz-section.js
import { store } from '../store.js';

// Role-specific output type options
const outputTypeOptions = {
  developer: [
    { id: 'code', label: 'Code', icon: '⌨️' },
    { id: 'text', label: 'Text', icon: '📄' },
    { id: 'data', label: 'Data / Analytics', icon: '📊' }
  ],
  designer: [
    { id: 'image', label: 'Images / UI', icon: '🖼️' },
    { id: 'video', label: 'Video / Animation', icon: '🎬' }
  ],
  marketer: [
    { id: 'image', label: 'Images / Graphics', icon: '🖼️' },
    { id: 'text', label: 'Text', icon: '📄' },
    { id: 'video', label: 'Video', icon: '🎬' },
    { id: 'data', label: 'Data / Analytics', icon: '📊' }
  ],
  founder: [
    { id: 'text', label: 'Text / Reports', icon: '📄' },
    { id: 'data', label: 'Data / Analytics', icon: '📊' },
    { id: 'image', label: 'Images / Charts', icon: '🖼️' }
  ],
  writer: [
    { id: 'text', label: 'Text', icon: '📄' },
    { id: 'image', label: 'Images / Illustrations', icon: '🖼️' }
  ],
  student: [
    { id: 'text', label: 'Text', icon: '📄' },
    { id: 'image', label: 'Images / Diagrams', icon: '🖼️' },
    { id: 'data', label: 'Data / Charts', icon: '📊' }
  ],
  researcher: [
    { id: 'text', label: 'Text / Literature', icon: '📄' },
    { id: 'data', label: 'Data / Analytics', icon: '📊' },
    { id: 'image', label: 'Images / Visualizations', icon: '🖼️' }
  ],
  dataScientist: [
    { id: 'data', label: 'Data / Analytics', icon: '📊' },
    { id: 'code', label: 'Code', icon: '⌨️' },
    { id: 'text', label: 'Text / Reports', icon: '📄' },
    { id: 'image', label: 'Images / Visualizations', icon: '🖼️' }
  ],
  contentCreator: [
    { id: 'video', label: 'Video', icon: '🎬' },
    { id: 'image', label: 'Images', icon: '🖼️' },
    { id: 'text', label: 'Text / Scripts', icon: '📄' }
  ]
};

// Role-specific use case options
const useCaseOptions = {
  developer: [
    { id: 'web-dev', label: 'Web Development', icon: '🌐' },
    { id: 'mobile-dev', label: 'Mobile Development', icon: '📱' },
    { id: 'data-science', label: 'Data Science & ML', icon: '📊' },
    { id: 'devops', label: 'DevOps & Cloud', icon: '☁️' },
    { id: 'game-dev', label: 'Game Development', icon: '🎮' },
    { id: 'backend', label: 'Backend Development', icon: '⚙️' }
  ],
  designer: [
    { id: 'ui-ux', label: 'UI/UX Design', icon: '🎨' },
    { id: 'graphic-design', label: 'Graphic Design', icon: '✨' },
    { id: 'video-editing', label: 'Video Editing', icon: '🎬' },
    { id: '3d-modeling', label: '3D Modeling', icon: '🏗️' },
    { id: 'animation', label: 'Animation', icon: '🎭' },
    { id: 'branding', label: 'Branding & Logo', icon: '🏷️' }
  ],
  marketer: [
    { id: 'social-media', label: 'Social Media Marketing', icon: '📱' },
    { id: 'seo', label: 'SEO & SEM', icon: '🔍' },
    { id: 'content-marketing', label: 'Content Marketing', icon: '📝' },
    { id: 'email-marketing', label: 'Email Marketing', icon: '📧' },
    { id: 'analytics', label: 'Analytics & Insights', icon: '📈' },
    { id: 'advertising', label: 'Digital Advertising', icon: '📢' }
  ],
  founder: [
    { id: 'business-planning', label: 'Business Planning', icon: '📋' },
    { id: 'market-research', label: 'Market Research', icon: '🔬' },
    { id: 'product-management', label: 'Product Management', icon: '🚀' },
    { id: 'finance', label: 'Finance & Accounting', icon: '💰' },
    { id: 'legal', label: 'Legal & Compliance', icon: '⚖️' },
    { id: 'operations', label: 'Operations', icon: '🏭' }
  ],
  writer: [
    { id: 'blog-writing', label: 'Blog Writing', icon: '📝' },
    { id: 'copywriting', label: 'Copywriting', icon: '✍️' },
    { id: 'technical-writing', label: 'Technical Writing', icon: '📚' },
    { id: 'creative-writing', label: 'Creative Writing', icon: '🎭' },
    { id: 'journalism', label: 'Journalism', icon: '📰' },
    { id: 'scriptwriting', label: 'Scriptwriting', icon: '🎬' }
  ],
  student: [
    { id: 'learning', label: 'Learning & Education', icon: '📚' },
    { id: 'research', label: 'Academic Research', icon: '🔬' },
    { id: 'assignments', label: 'Assignment Help', icon: '📝' },
    { id: 'note-taking', label: 'Note Taking', icon: '📓' },
    { id: 'study-planning', label: 'Study Planning', icon: '📅' },
    { id: 'language-learning', label: 'Language Learning', icon: '🌍' }
  ],
  researcher: [
    { id: 'academic-research', label: 'Academic Research', icon: '🔬' },
    { id: 'data-analysis', label: 'Data Analysis', icon: '📊' },
    { id: 'literature-review', label: 'Literature Review', icon: '📖' },
    { id: 'surveys', label: 'Surveys & Polls', icon: '📋' },
    { id: 'experiments', label: 'Experiment Design', icon: '🧪' },
    { id: 'publications', label: 'Publication Writing', icon: '📄' }
  ],
  dataScientist: [
    { id: 'data-analysis', label: 'Data Analysis', icon: '📊' },
    { id: 'machine-learning', label: 'Machine Learning', icon: '🤖' },
    { id: 'data-visualization', label: 'Data Visualization', icon: '📈' },
    { id: 'statistics', label: 'Statistics', icon: '📐' },
    { id: 'big-data', label: 'Big Data Processing', icon: '💾' },
    { id: 'predictive-modeling', label: 'Predictive Modeling', icon: '🔮' }
  ],
  contentCreator: [
    { id: 'video-creation', label: 'Video Creation', icon: '🎬' },
    { id: 'podcast-production', label: 'Podcast Production', icon: '🎙️' },
    { id: 'social-content', label: 'Social Media Content', icon: '📱' },
    { id: 'blogging', label: 'Blogging', icon: '📝' },
    { id: 'streaming', label: 'Live Streaming', icon: '📺' },
    { id: 'photography', label: 'Photography', icon: '📸' }
  ]
};

function getSteps() {
  const selectedRole = store.userProfile.role;
  
  const baseSteps = [
    {
      id: 1,
      key: 'role',
      question: "What is your primary role?",
      options: [
        { id: 'developer', label: 'Developer', icon: '💻' },
        { id: 'designer', label: 'Designer', icon: '✨' },
        { id: 'marketer', label: 'Marketer', icon: '📈' },
        { id: 'founder', label: 'Founder', icon: '🚀' },
        { id: 'writer', label: 'Writer', icon: '✍️' },
        { id: 'student', label: 'Student', icon: '🎓' },
        { id: 'researcher', label: 'Researcher', icon: '🔬' },
        { id: 'dataScientist', label: 'Data Scientist', icon: '📊' },
        { id: 'contentCreator', label: 'Content Creator', icon: '🎨' }
      ]
    },
    {
      id: 3,
      key: 'budget',
      question: "What's your preferred budget?",
      options: [
        { id: 'free', label: 'Free Only', icon: '🆓' },
        { id: 'freemium', label: 'Freemium OK', icon: '🔓' },
        { id: 'paid', label: 'Willing to Pay', icon: '💳' },
        { id: 'all', label: 'Show Me Everything', icon: '💰' }
      ]
    },
    {
      id: 4,
      key: 'skillLevel',
      question: "What's your technical skill level?",
      options: [
        { id: 'Beginner', label: 'Beginner', icon: '🌱' },
        { id: 'Intermediate', label: 'Intermediate', icon: '🚀' },
        { id: 'Advanced', label: 'Advanced', icon: '⚡' }
      ]
    }
  ];

  // Insert the dynamic useCase step after role selection
  const useCaseStep = {
    id: 2,
    key: 'useCase',
    question: selectedRole ? `What's your main use case as a ${selectedRole}?` : "What's your main use case?",
    options: selectedRole && useCaseOptions[selectedRole] ? useCaseOptions[selectedRole] : [
      { id: 'coding', label: 'Coding & Dev', icon: '⚡' },
      { id: 'design', label: 'Design & Image', icon: '🎨' },
      { id: 'writing', label: 'Writing & SEO', icon: '📝' },
      { id: 'automation', label: 'Automation', icon: '🤖' },
      { id: 'research', label: 'Research', icon: '🔍' }
    ]
  };

  // Insert the dynamic output types step based on selected role
  const outputTypesStep = {
    id: 5,
    key: 'outputTypes',
    multiSelect: true,
    question: selectedRole ? `What output types do you prefer as a ${selectedRole}? (Select one or more)` : "What preferred output types do you need? (Select one or more)",
    options: selectedRole && outputTypeOptions[selectedRole] ? outputTypeOptions[selectedRole] : [
      { id: 'text', label: 'Text', icon: '📄' },
      { id: 'image', label: 'Images / UI', icon: '🖼️' },
      { id: 'code', label: 'Code', icon: '⌨️' },
      { id: 'video', label: 'Video / Audio', icon: '🎬' },
      { id: 'data', label: 'Data / Analytics', icon: '📊' }
    ]
  };

  return [baseSteps[0], useCaseStep, baseSteps[1], baseSteps[2], outputTypesStep];
}

export function renderQuiz(container) {
  let currentStepIndex = 0;
  
  const render = () => {
    const steps = getSteps();
    const step = steps[currentStepIndex];
    const progressPercent = ((currentStepIndex + 1) / steps.length) * 100;
    
    // Check if current step has a selection in store
    const selectedValue = store.userProfile[step.key];
    const isMultiSelect = step.multiSelect || false;

    const optionsHtml = step.options.map(opt => {
      const isSelected = isMultiSelect 
        ? selectedValue.includes(opt.id)
        : selectedValue === opt.id;
      return `
      <div class="quiz-option-tile glass-card ${isSelected ? 'selected' : ''}" data-id="${opt.id}" role="${isMultiSelect ? 'checkbox' : 'radio'}" aria-checked="${isSelected}">
        <span class="quiz-option-icon">${opt.icon}</span>
        <span class="quiz-option-label">${opt.label}</span>
      </div>
    `;
    }).join('');

    container.innerHTML = `
      <section class="quiz-container slide-up">
        <div class="quiz-progress-wrapper" role="progressbar" aria-valuenow="${currentStepIndex + 1}" aria-valuemin="1" aria-valuemax="${steps.length}">
          <div class="quiz-progress-track">
            <div class="quiz-progress-fill" style="width: ${progressPercent}%"></div>
          </div>
        </div>
        
        <div class="quiz-step-header">
          <h2 class="quiz-question">${step.question}</h2>
        </div>
        
        <div class="quiz-options-grid" role="radiogroup">
          ${optionsHtml}
        </div>
        
        <div class="quiz-controls">
          ${currentStepIndex > 0 ? `<button class="btn btn-text" id="quiz-back">← Back</button>` : '<div></div>'}
          <button class="btn btn-secondary glass-card" id="quiz-next" ${isMultiSelect ? (selectedValue.length === 0 ? 'disabled' : '') : (!selectedValue ? 'disabled' : '')}>
            ${currentStepIndex === steps.length - 1 ? 'Show My Results' : 'Next →'}
          </button>
        </div>
      </section>
    `;

    // Event Listeners
    const tiles = container.querySelectorAll('.quiz-option-tile');
    tiles.forEach(tile => {
      tile.addEventListener('click', () => {
        const selectedId = tile.getAttribute('data-id');
        if (isMultiSelect) {
          store.toggleOutputType(selectedId);
        } else {
          store.updateProfile(step.key, selectedId);
        }
        
        // If role changed, clear useCase and outputTypes selections
        if (step.key === 'role') {
          store.updateProfile('useCase', null);
          store.userProfile.outputTypes = []; // Reset output types when role changes
        }
        
        render(); // re-render to update selected state and enable Next button
      });
    });

    const nextBtn = container.querySelector('#quiz-next');
    if(nextBtn) {
      nextBtn.addEventListener('click', () => {
        if(currentStepIndex < steps.length - 1) {
          currentStepIndex++;
          render();
        } else {
          window.location.hash = '#results';
        }
      });
    }

    const backBtn = container.querySelector('#quiz-back');
    if(backBtn) {
      backBtn.addEventListener('click', () => {
        if(currentStepIndex > 0) {
          currentStepIndex--;
          render();
        }
      });
    }
  };

  render();
}
