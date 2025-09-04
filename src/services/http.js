import axios from 'axios';
import { getToken } from './auth';

const http = axios.create({
  baseURL: 'http://localhost:5000/api', // 👈 SIEMPRE al backend
});

// agrega el token en cada request
http.interceptors.request.use((config) => {
  const t = getToken();
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export default http;

