import axios from "axios";

export const TOKEN_STORAGE_KEY = "vacinkse_token";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
