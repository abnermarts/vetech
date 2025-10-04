import axios from "axios";

export const api = axios.create({
  baseURL: "https://backend-production-cf07.up.railway.app",
  //baseURL: "http://localhost:3333",
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (originalRequest.url.includes("/refresh")) {
        // Se o refresh falhar, limpa tudo e redireciona
        localStorage.removeItem("Token");
        localStorage.removeItem("RefreshToken");
        localStorage.removeItem("User");
        window.location.href = "/";
        return Promise.reject(error);
      }
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      const refreshToken = localStorage.getItem("RefreshToken");
      try {
        const res = await api.post("/refresh", { refreshToken: refreshToken });
        if (res.status === 200) {
          const newToken = res.data.accessToken;
          localStorage.setItem("Token", newToken);
          api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          processQueue(null, newToken);
          return api(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem("Token");
        localStorage.removeItem("RefreshToken");
        localStorage.removeItem("User");
        window.location.href = "/";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);
