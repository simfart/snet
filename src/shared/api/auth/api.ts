import axios from 'axios';
import { backendBaseUrl } from 'shared/config';

const BASE_URL = backendBaseUrl;

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    if (config.headers.isTokenNeed) {
      const token = localStorage.getItem('token');
      config.headers['user-token'] = `${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
