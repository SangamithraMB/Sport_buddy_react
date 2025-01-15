import axios from 'axios';

const API_BASE_URL = 'https://sport-buddy-test.onrender.com'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Conditionally add token based on environment or a flag
const isDebugMode = true;  // Set this to false when you're ready to use JWT

api.interceptors.request.use((config) => {
  if (!isDebugMode) {
    const token = localStorage.getItem('jwtToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;