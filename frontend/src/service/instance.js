import axios from "axios";
import { SERVER_BASE_URL } from "../lib/config";
import { eraseCookie, getCookie } from "../lib/cookie";

const axiosInstance = axios.create({
  baseURL: SERVER_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("call the refresh token api here");
      eraseCookie("token");
      window.history.replace("/login");
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
