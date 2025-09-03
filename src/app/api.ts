import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

const API = axios.create({
  baseURL: baseUrl,
});

// Request interceptor
API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

// Response interceptor, expired tokens handling
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Get refresh token
        const refresh = await AsyncStorage.getItem("refreshToken");
        if (!refresh) throw new Error("No refresh token found");

        // Request a new access token
        const res = await axios.post(
          `${baseUrl}/auth/refresh`,
          {
            refreshToken: refresh,
          },
          {
            withCredentials: true, // cookies
            headers: { "Content-Type": "application/json" },
          }
        );

        const newAccessToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken;

        // Store new tokens
        await AsyncStorage.multiSet([
          ["accessToken", newAccessToken],
          ["refreshToken", newRefreshToken || refresh],
        ]);

        // Retry failed request with new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
