import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getSession, signOut } from "next-auth/react";

/**
 * Axios instance
 */
const authApi = axios.create({
  baseURL: process.env.BACKEND_API_URL,
});

/**
 * Request Interceptor
 * - Attach access token from NextAuth session
 */
authApi.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession();
    console.log("==========session.accessToken", session);
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

/**
 * Response Interceptor
 * - Handle 401 globally
 */
authApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await signOut({ redirect: true, callbackUrl: "/sign-in" });
    }

    return Promise.reject(error);
  },
);

export default authApi;
