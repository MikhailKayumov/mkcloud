import axios, { AxiosTransformer } from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3030/api/v1/',
  timeout: 3000,
  transformRequest: [
    (data, headers) => {
      headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
      return data;
    },
    ...(axios.defaults.transformRequest as AxiosTransformer[])
  ]
});

export default API;
