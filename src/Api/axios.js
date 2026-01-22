import axios from 'axios';

export const API_URL = import.meta.env.VITE_SERVER_URL 

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {

      localStorage.removeItem("token");
      window.location.href = "/login"; 
    }

    return Promise.reject(error);
  }
);

export default api;