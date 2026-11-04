import axios from 'axios';

// 直接将 baseURL 写死为你最新的 cpolar 公网地址，并带上 /api
const api = axios.create({ baseURL: 'https://538d7c3.r34.cpolar.top/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;