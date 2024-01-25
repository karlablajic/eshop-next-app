import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 15000,
  headers: { 'X-Custom-Header': 'foobar' },
});

export default axiosInstance;
