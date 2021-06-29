import axios from 'axios';
import jwt from 'utils/jwt';
import $jwt from 'utils/jwt';

export const BASE_URL = 'http://localhost:3030/api/v1/';

const $api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true
});

$api.interceptors.request.use((config) => {
  const token = jwt.get();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});
$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${BASE_URL}auth/refresh`, {
          withCredentials: true
        });
        $jwt.set(response.data.token);

        return $api.request(originalRequest);
      } catch (e) {
        location.reload();
      }
    }

    throw error;
  }
);

export default $api;
