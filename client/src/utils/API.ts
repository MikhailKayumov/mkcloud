import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3030/api/v1/',
  timeout: 3000,
});

export default API;
