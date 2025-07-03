import { API_ROUTES } from '@/utils/api';
import axios from 'axios'
import { log } from 'node:console';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
    id: string,
    name: string | null;
    email: string,
    role: 'USER' | 'SUPER_ADMIN'
}

type AuthStore = {
    user: User | null;
    isLoading: boolean,
    error: string | null,
    isAuthenticated: boolean, // Add this line
    // Then, we'll have some couple of methods (see..authController.ts)
    register: (name: string, email: string, password: string) => Promise<string | null>;    // register method, and accessing all the necessary fields and it will return a Promise, which will be string | null
    login: (email: string, password: string) => Promise<boolean>;
    // logout: () => Promise<void>     // logout will return 'nothing(void)'
    logout: () => Promise<boolean>
    refreshAcessToken: () => Promise<boolean>;
    initializeInterceptor: () => void; // Add this line
};

// now, lets create Axios instance:
const axiosInstance = axios.create({
    baseURL: API_ROUTES.AUTH,
    withCredentials: true,
});

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            isLoading: false,
            error: null,
            isAuthenticated: false,

            //now here, we need to create all the methods that we need.
            register: async (name, email, password) => {
                // this is a normal concept, before calling an APi, we need to make isLoading as true.
                set({ isLoading: true, error: null });
                try {
                    const response = await axiosInstance.post('/register', {
                        name, email, password
                    });

                    set({ isLoading: false });
                    return response.data.userId
                } catch (error) {
                    set({
                        isLoading: false,
                        error: axios.isAxiosError(error)
                            ? error?.response?.data?.error || 'Registration failed'
                            : 'Registration failed',
                    });

                    return null;
                }
            },
            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axiosInstance.post('/login', {
                        email, password
                    });
                    console.log("LoginResponse", response);

                    set({
                        isLoading: false, user: response.data.user, isAuthenticated: true // Set to true on successful login
                    });           // response.data.user  --> check authController.ts (in this file, in login method, we are extracting current user, and hence this data comes from that)
                    return true         // here, returning true bcoz, it will return 'boolean'
                } catch (error) {
                    set({
                        isLoading: false,
                        error: axios.isAxiosError(error)
                            ? error?.response?.data?.error || 'Login failed' : 'Login failed'
                    });

                    return false
                }
            },
            logout: async () => {
                set({ isLoading: true, error: null });
                try {
                    await axiosInstance.post('/logout')
                    set({
                        user: null,
                        isLoading: false,
                        isAuthenticated: false // Set to false on logout
                    })
                    return true;
                } catch (error) {
                    set({
                        isLoading: false,
                        error: axios.isAxiosError(error)
                            ? error?.response?.data?.error || 'Logout failed' : 'Logout failed'
                    });
                    return false;
                }
            },
            refreshAcessToken: async () => {
                try {
                    await axiosInstance.post('/refresh-token');
                    return true
                } catch (e) {
                    console.log(e);
                    // If refresh fails, clear auth state
                    set({
                        user: null,
                        isAuthenticated: false
                    });
                    return false

                }
            },

            // Initialize the interceptor inside the store creation
            initializeInterceptor: () => {
                axiosInstance.interceptors.response.use(
                    response => response,
                    async (error) => {
                        const originalRequest = error.config;

                        if (error.response?.status === 401 && !originalRequest._retry) {
                            originalRequest._retry = true;

                            try {
                                // Use get() from the store closure
                                const refreshed = await get().refreshAcessToken();
                                if (refreshed) {
                                    return axiosInstance(originalRequest);
                                }
                            } catch (refreshError) {
                                console.error("Token refresh failed", refreshError);
                            }

                            // Use set() from the store closure
                            set({
                                user: null,
                                isAuthenticated: false
                            });
                        }

                        return Promise.reject(error);
                    }
                );
            }

        }), {
        name: 'auth-storage',
        partialize: (state) => ({
            user: state.user,
            isAuthenticated: state.isAuthenticated // Include this in persisted state
        })

    }
    )
);
// Then call this when initializing your app
useAuthStore.getState().initializeInterceptor();
