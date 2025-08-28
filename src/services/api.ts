import axios from 'axios';
import cookieServices from './cookies/clientCookie';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://upskilling-egypt.com:3005',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add Authorization header if token exists
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    try {
      // const dataUser = JSON.parse(localStorage.getItem('dataUser') || '{}');
      const token = cookieServices.get('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; 
      }
    } catch (error) {
      console.error('Invalid JSON in localStorage[dataUser]', error);
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
