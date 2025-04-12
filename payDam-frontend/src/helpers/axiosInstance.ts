import axios from "axios";
import { useStore } from "../Zustand/store";

// Chatgpt written code for baseURL and token sending in each 

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL, // Automatically prepends the base URL
  withCredentials: true, // Includes cookies for authentication 
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach the Authorization token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useStore((state) => state.token)
    if (token !="" && token != null && token != undefined) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // If access token expired (401) and not already retried
    if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axiosInstance.get("api/vi/auth/refresh-token");
        if (res.status !== 200) {
          useStore((state)=> state.removeToken())
          return Promise.reject(err);
        }
        const newAccessToken = res.data.access_token;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest); // Retry original request
      } catch (refreshError) {
        console.log("Refresh token failed " + refreshError);
        // logout user or redirect to login
        useStore((state)=> state.removeToken())
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
