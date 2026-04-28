// PRD 13.2 JS Architecture: store.js
export const store = {
  userProfile: {
    role: null,
    useCase: null,
    budget: null,
    skillLevel: null,
    outputTypes: [], // now an array to support multiple selections
  },
  tools: [], // populated from data.js
  results: [], // scored results
  
  updateProfile(key, value) {
    this.userProfile[key] = value;
  },

  // Toggle an output type in the array
  toggleOutputType(outputType) {
    const idx = this.userProfile.outputTypes.indexOf(outputType);
    if (idx > -1) {
      this.userProfile.outputTypes.splice(idx, 1);
    } else {
      this.userProfile.outputTypes.push(outputType);
    }
  },

  resetProfile() {
    this.userProfile = {
      role: null,
      useCase: null,
      budget: null,
      skillLevel: null,
      outputTypes: [],
    };
    this.results = [];
  }
};
