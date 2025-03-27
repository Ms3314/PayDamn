import axios from "axios";

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
    const token = localStorage.getItem("token"); // Get token from localStorage  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
