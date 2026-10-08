import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { IApiResponse, IAuthResponse } from '../types';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _isRetry?: boolean;
}

const $api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (err: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (err) {
      prom.reject(err);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

$api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err: AxiosError) => {
    const originalRequest: CustomAxiosRequestConfig | undefined = err.config;

    if (
      err.response?.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry &&
      !originalRequest.url?.includes('/auth/login') &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => $api(originalRequest));
      }

      originalRequest._isRetry = true;
      isRefreshing = true;

      try {
        const response = await axios.post<IApiResponse<IAuthResponse>>(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const newAccessToken = response.data.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        processQueue(null, newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return $api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('accessToken');

        window.dispatchEvent(new Event('auth:unauthorized'));

        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    }

    throw err;
  },
);

export default $api;
