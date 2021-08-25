import axios from 'axios';
import { getTokenFromLocalStorage } from './authToken';

const URL =
  process.env.REACT_APP_WEB_API_URL + '/api/v1' ||
  'http://localhost:5000/api/v1';

const axiosInstance = axios.create({ baseURL: URL });

axiosInstance.interceptors.request.use(config => {
  const token = getTokenFromLocalStorage();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
