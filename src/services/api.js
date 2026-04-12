// import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();

// const api = axios.create({
//   baseURL: process.env.VITE_API_URL || 'http://localhost:5001/api', // Use env variable or fallback
//   // baseURL: import.meta.env.VITE_API_URL, // Use env variable or fallback
//   withCredentials: true,
// });

import axios from 'axios';

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || 'https://mern-stack-project-01-auth-system-w.vercel.app/api', // Use env variable or fallback
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5001/api'), // Native monorepo routing handle
  withCredentials: true,
});

// Request interceptor to add the Access Token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
