export const runATSChecks = (resumeData) => {
  const missing = [];
  if (!resumeData.skills || resumeData.skills.length === 0) missing.push('Skills');
  if (!resumeData.experience || resumeData.experience.length === 0) missing.push('Experience');
  if (!resumeData.education || resumeData.education.length === 0) missing.push('Education');
  if (!resumeData.professional_summary) missing.push('Summary');
  // Add more as needed
  return missing;
};

export const getKeywordDensity = (resumeData) => {
 const missing = [];
  if (!resumeData.skills || resumeData.skills.length === 0) missing.push('Skills');
  if (!resumeData.experience || resumeData.experience.length === 0) missing.push('Experience');
  if (!resumeData.education || resumeData.education.length === 0) missing.push('Education');
  if (!resumeData.professional_summary) missing.push('Summary');
  if (!resumeData.personal_info || Object.keys(resumeData.personal_info).length === 0) missing.push('Personal Info');
  if (!resumeData.project || resumeData.project.length === 0) missing.push('Projects');
  // Add more rules/keywords as desired
  return missing;
};
