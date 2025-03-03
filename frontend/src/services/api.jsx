import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true  
});

// Add request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);

// Skills endpoints
export const getSkills = () => api.get('/skills/');
export const createSkill = async (data) => {
  try {
    console.log('Creating skill with data:', data);
    // Note: removed the trailing slash
    const response = await api.post('/skills', data);
    console.log('Create skill response:', response);
    return response;
    } catch (error) {
      console.error('Create skill error:', error.response?.data);
      throw error;
    }
  };
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/skills/${id}`);

// Experience endpoints
export const getExperience = () => api.get('/experience/');
export const createExperience = (data) => api.post('/experience/', data);
export const updateExperience = (id, data) => api.put(`/experience/${id}`, data);
export const deleteExperience = (id) => api.delete(`/experience/${id}`);

// Projects endpoints
export const getProjects = () => api.get('/projects/');
export const createProject = async (data) => {api.post('/projects/', data);}
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

export default api;