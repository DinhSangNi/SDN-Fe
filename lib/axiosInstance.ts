/* eslint-disable */
import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { logout, refreshToken } from '@/services/auth.service';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let isRefreshing = false;
let requestToRefreshQueue: {
  resolve: (token: string | null) => any;
  reject: (err: any) => any;
}[] = [];

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const processRequestToRefreshQueue = (err: any, token: string | null) => {
  requestToRefreshQueue.forEach((promise) => {
    if (err) {
      promise.reject(err);
    } else {
      promise.resolve(token);
    }
  });

  requestToRefreshQueue = [];
};

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest: InternalAxiosRequestConfig | undefined =
      error.config;

    if (!originalRequest) return Promise.reject(error);

    if (
      error.response?.status === 401 &&
      originalRequest.url !== '/auth/refresh' &&
      originalRequest.url !== '/auth/verify-otp' &&
      originalRequest.url !== '/auth/login' &&
      originalRequest.url !== '/auth/register'
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          requestToRefreshQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest) {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              return api(originalRequest);
            }
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        const res = await refreshToken();
        if (res.status === 200) {
          const newAccessToken = res.data.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          processRequestToRefreshQueue(null, newAccessToken);
          return api(originalRequest);
        }
      } catch (error) {
        processRequestToRefreshQueue(error, null);
        await logout();
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
