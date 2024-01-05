import axios, {
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosError,
} from 'axios';

import { RefreshResponse } from '@/types/authTypes';

const BASE_URL = 'http://localhost:3000/';

const axiosClient = axios.create({ baseURL: BASE_URL });

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError | Error) => {
    const originalRequest = error.config as AxiosRequestConfig;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get new access token using access token.
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await axios.post<RefreshResponse>(
          `${BASE_URL}auth/token/access`,
          null,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );
        const { accessToken } = res.data;

        // Store new access token @ local storage.
        localStorage.setItem('accessToken', accessToken);

        // Change request header with new access token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        // Redirect to login page if refresh token is also expired.
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
