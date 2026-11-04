import axios from 'axios';

// 直接写死你最新的 cpolar 地址
const api = axios.create({ baseURL: 'https://538d7c3.r34.cpolar.top/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;