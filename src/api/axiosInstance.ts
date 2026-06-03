import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// ─────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api';

const USER_STORAGE_KEY = 'oasis_user';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface StoredUser {
  token?: string;
  accessToken?: string;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const getStoredUser = (): StoredUser | null => {
  try {
    const rawData = localStorage.getItem(USER_STORAGE_KEY);

    if (!rawData) {
      return null;
    }

    return JSON.parse(rawData) as StoredUser;
  } catch (error) {
    console.error('Failed to parse stored user:', error);

    localStorage.removeItem(USER_STORAGE_KEY);

    return null;
  }
};

const getAuthToken = (): string | null => {
  const user = getStoredUser();

  return user?.token ?? user?.accessToken ?? null;
};

const clearSession = (): void => {
  localStorage.removeItem(USER_STORAGE_KEY);

  // Remove any additional auth-related keys if used
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');

  sessionStorage.clear();
};

const redirectToLogin = (): void => {
  const currentPath = window.location.pathname;

  const publicRoutes = ['/', '/login'];

  const isPublicRoute = publicRoutes.includes(currentPath);

  if (!isPublicRoute) {
    window.location.replace('/login');
  }
};

// ─────────────────────────────────────────────
// Axios Instance
// ─────────────────────────────────────────────

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
  },
});

// ─────────────────────────────────────────────
// Request Interceptor
// Automatically attach JWT token
// ─────────────────────────────────────────────

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ─────────────────────────────────────────────
// Response Interceptor
// Handles global API errors
// ─────────────────────────────────────────────

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,

  (error: AxiosError) => {
    // Network / Timeout Errors
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        console.error('Request timeout.');
      } else {
        console.error('Network error. Unable to reach server.');
      }

      return Promise.reject(error);
    }

    const status = error.response.status;

    switch (status) {
      case 401:
        console.warn('Session expired. Redirecting to login.');

        clearSession();
        redirectToLogin();
        break;

      case 403:
        console.error('Access denied.');
        break;

      case 404:
        console.error('Resource not found.');
        break;

      case 500:
        console.error('Internal server error.');
        break;

      default:
        console.error(
          `API Error (${status}):`,
          error.response.data
        );
        break;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;