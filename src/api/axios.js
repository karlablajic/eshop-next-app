import axios from 'axios';
import { store } from '@/store/store';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000/',
  timeout: 15000,
  headers: { Accept: 'application/json' },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      let token = null;
      if (store.getState()?.user?.token) {
        token = store.getState()?.user?.token;
      }
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        config.headers['Authorization'] = '';
      }
    } catch (e) {}

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
