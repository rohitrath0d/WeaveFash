// import axios from 'axios';
// import { API_ROUTES } from '@/utils/api';
// import { useAuthStore } from '../store/useAuthStore';

// const axiosInstance = axios.create({
//   baseURL: API_ROUTES.AUTH,
//   withCredentials: true,
// });

// export const setupInterceptors = () => {
//   const { getState } = useAuthStore;
  
//   axiosInstance.interceptors.response.use(
//     response => response,
//     async (error) => {
//       const originalRequest = error.config;
      
//       if (error.response?.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
        
//         try {
//           const refreshed = await getState().refreshAcessToken();
//           if (refreshed) {
//             return axiosInstance(originalRequest);
//           }
//         } catch (refreshError) {
//           console.error("Token refresh failed", refreshError);
//         }
        
//         getState().logout();
//       }
      
//       return Promise.reject(error);
//     }
//   );
// };

// export default axiosInstance;



import axios from 'axios';
import { API_ROUTES } from '@/utils/api';
import { useAuthStore } from '@/store/useAuthStore';

const authAxios = axios.create({
  baseURL: API_ROUTES.AUTH,
  withCredentials: true,
});

let isRefreshing = false;
let failedRequests: any[] = [];

authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const authStore = useAuthStore.getState();

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          failedRequests.push(() => resolve(authAxios(originalRequest)));
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshed = await authStore.refreshAcessToken();
        if (refreshed) {
          // Retry all failed requests
          failedRequests.forEach((cb) => cb());
          failedRequests = [];
          return authAxios(originalRequest);
        }
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);
        await authStore.logout();
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default authAxios;
