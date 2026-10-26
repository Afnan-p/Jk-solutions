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

// Lightweight In-Flight Request Deduplication & Response Cache
// Eliminates duplicate simultaneous GET calls (e.g. Navbar + ServicesSection + DesignSection all requesting /services)
const cache = new Map();
const inFlightRequests = new Map();
const CACHE_TTL_MS = 60 * 1000; // 60 seconds TTL

// Add a request interceptor for JWT auth token
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
  (error) => Promise.reject(error)
);

// Response interceptor: automatically invalidate cache on any mutation (POST, PUT, DELETE, PATCH)
api.interceptors.response.use(
  (response) => {
    const method = response.config?.method?.toLowerCase();
    if (['post', 'put', 'delete', 'patch'].includes(method)) {
      cache.clear();
      inFlightRequests.clear();
    }
    return response;
  },
  (error) => Promise.reject(error)
);

const originalGet = api.get.bind(api);

api.get = (url, config = {}) => {
  // Bypass cache for admin-only or authenticated dynamic endpoints
  if (config.skipCache || url.startsWith('/auth') || url.startsWith('/stats') || url.startsWith('/enquiries')) {
    return originalGet(url, config);
  }

  const cacheKey = `${url}_${JSON.stringify(config.params || {})}`;

  // 1. Check valid cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return Promise.resolve(cached.response);
  }

  // 2. Check if a duplicate request is already in-flight
  if (inFlightRequests.has(cacheKey)) {
    return inFlightRequests.get(cacheKey);
  }

  // 3. Dispatch fresh request and share promise
  const promise = originalGet(url, config)
    .then((res) => {
      cache.set(cacheKey, { timestamp: Date.now(), response: res });
      inFlightRequests.delete(cacheKey);
      return res;
    })
    .catch((err) => {
      inFlightRequests.delete(cacheKey);
      return Promise.reject(err);
    });

  inFlightRequests.set(cacheKey, promise);
  return promise;
};

api.clearCache = () => {
  cache.clear();
  inFlightRequests.clear();
};

export default api;
