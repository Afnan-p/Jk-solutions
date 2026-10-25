import axios from 'axios';

// Smart Base URL resolution:
// On localhost / 127.0.0.1, prioritize local backend (http://localhost:5000/api) for 0ms local response.
const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (typeof window !== 'undefined') {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocalhost) {
      if (!envUrl || envUrl.includes('onrender.com')) {
        return 'http://localhost:5000/api';
      }
    }
  }
  return envUrl || 'http://localhost:5000/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const adminInfo = localStorage.getItem('adminInfo');
    if (adminInfo) {
      try {
        const parsedInfo = JSON.parse(adminInfo);
        if (parsedInfo && parsedInfo.token) {
          config.headers.Authorization = `Bearer ${parsedInfo.token}`;
        }
      } catch (e) {
        // Ignore malformed localStorage data
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
