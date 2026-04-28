// PRD 12.2 & 12.3 Matching Algorithm

// Map new specific useCase IDs to existing tool use_cases
const useCaseMapping = {
  'web-dev': ['coding'],
  'mobile-dev': ['coding'],
  'data-science': ['coding', 'research'],
  'devops': ['coding', 'automation'],
  'game-dev': ['coding'],
  'backend': ['coding'],
  'ui-ux': ['design'],
  'graphic-design': ['design'],
  'video-editing': ['design'],
  '3d-modeling': ['design'],
  'animation': ['design'],
  'branding': ['design'],
  'social-media': ['writing', 'automation'],
  'seo': ['writing', 'research'],
  'content-marketing': ['writing'],
  'email-marketing': ['writing', 'automation'],
  'analytics': ['research'],
  'advertising': ['research', 'automation'],
  'business-planning': ['research', 'writing'],
  'market-research': ['research'],
  'product-management': ['research', 'writing'],
  'finance': ['research'],
  'legal': ['research', 'writing'],
  'operations': ['automation'],
  'blog-writing': ['writing'],
  'copywriting': ['writing'],
  'technical-writing': ['writing'],
  'creative-writing': ['writing'],
  'journalism': ['writing', 'research'],
  'scriptwriting': ['writing'],
  'learning': ['research'],
  'research': ['research'],
  'assignments': ['writing', 'research'],
  'note-taking': ['writing'],
  'study-planning': ['research'],
  'language-learning': ['research'],
  'academic-research': ['research'],
  'data-analysis': ['research'],
  'literature-review': ['research'],
  'surveys': ['research'],
  'experiments': ['research'],
  'publications': ['writing', 'research'],
  'machine-learning': ['coding', 'research'],
  'data-visualization': ['design', 'research'],
  'statistics': ['research'],
  'big-data': ['coding', 'research'],
  'predictive-modeling': ['research'],
  'video-creation': ['design'],
  'podcast-production': ['design'],
  'social-content': ['writing', 'design'],
  'blogging': ['writing'],
  'streaming': ['design'],
  'photography': ['design']
};

export function calculateMatchScore(tool, userProfile) {
  let score = 0;

  // Ensure role exists in userProfile before calling toLowerCase
  const roleKey = userProfile.role ? userProfile.role.toLowerCase() : '';
  
  // 1. Role match: +35
  const toolRoles = tool.best_for_roles.map(r => r.toLowerCase());
  if (roleKey && toolRoles.includes(roleKey)) {
    score += 35;
  }
  
  // Boost by match_weight for the role
  if (roleKey && tool.match_weight && tool.match_weight[roleKey] !== undefined) {
    score += tool.match_weight[roleKey] * 10;
  }

  // 2. Use case match: +30 max (proportional)
  if (userProfile.useCase) {
    const ucKey = userProfile.useCase.toLowerCase();
    
    // Get mapped use cases or use the key directly
    const mappedUseCases = useCaseMapping[ucKey] || [ucKey];
    
    const useCaseOverlap = tool.use_cases.filter(uc => 
      mappedUseCases.some(mappedUc => 
        uc.toLowerCase().includes(mappedUc) || mappedUc.includes(uc.toLowerCase())
      )
    ).length;
    score += Math.min(30, useCaseOverlap * 10);
  }

  // 3. Output type match: +20 (check if any selected output type matches)
  if (userProfile.outputTypes && userProfile.outputTypes.length > 0) {
    const toolOutputTypes = tool.output_types.map(t => t.toLowerCase());
    const hasMatch = userProfile.outputTypes.some(selectedType => 
      toolOutputTypes.includes(selectedType.toLowerCase())
    );
    if (hasMatch) {
      score += 20;
    }
  }

  // 4. Pricing match: +15
  if (userProfile.budget === "free") {
    if (["Free", "Freemium"].includes(tool.pricing)) score += 15;
  } else if (userProfile.budget === "freemium") {
    if (["Free", "Freemium", "Paid"].includes(tool.pricing)) score += 15;
  } else if (userProfile.budget === "paid" || userProfile.budget === "all") {
    score += 15; // paid users are not filtered out by price
  }

  // 5. Skill level match: +10 exact, +5 adjacent
  const levels = ["Beginner", "Intermediate", "Advanced"];
  if (tool.skill_level === "All") {
    score += 8;
  } else if (userProfile.skillLevel && tool.skill_level === userProfile.skillLevel) {
    score += 10;
  } else if (userProfile.skillLevel) {
    const toolIdx = levels.indexOf(tool.skill_level);
    const userIdx = levels.indexOf(userProfile.skillLevel);
    if (Math.abs(toolIdx - userIdx) === 1) {
      score += 5;
    }
  }

  return Math.min(100, Math.round(score));
}

export function getRecommendations(tools, userProfile, limit = 10) {
  return tools
    .map(tool => ({ ...tool, matchScore: calculateMatchScore(tool, userProfile) }))
    .filter(tool => tool.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
}
