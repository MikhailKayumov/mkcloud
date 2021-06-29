import axios, { AxiosTransformer } from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3030/api/v1/',
  timeout: 3000,
  withCredentials: true
});

API.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default API;
