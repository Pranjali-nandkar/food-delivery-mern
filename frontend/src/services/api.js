import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  withCredentials: true, // ✅ add this to allow cookies / credentials
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // ✅ Only attach token for protected routes
  const publicPaths = ["/restaurants"];
  if (!publicPaths.includes(config.url) && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error("API Error:", message);
    // Optionally, you can show a toast notification here
    return Promise.reject(error);
  }
);

export default API;
