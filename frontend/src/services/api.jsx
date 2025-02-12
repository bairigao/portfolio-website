const API_BASE_URL = 'http://127.0.0.1:5000/api';  // This points to your Flask backend

export const fetchSkills = async () => {
  const response = await fetch(`${API_BASE_URL}/skills`);
  if (!response.ok) throw new Error('Failed to fetch skills');
  return response.json();
};

export const fetchProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
};

export const fetchExperience = async () => {
  const response = await fetch(`${API_BASE_URL}/experience`);
  if (!response.ok) throw new Error('Failed to fetch experience');
  return response.json();
};
