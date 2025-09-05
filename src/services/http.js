import axios from 'axios';
import { getToken } from './auth';

const API_BASE = 
  process.env.NODE_ENV === 'production'
    ? 'https://sevicol-backend.onrender.com' // la URL real de Render
    : 'http://localhost:5000';


// agrega el token en cada request
http.interceptors.request.use((config) => {
  const t = getToken();
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export default http;

