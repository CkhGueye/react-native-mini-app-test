import { jwtDecode } from "jwt-decode";
import api from "../app/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type DecodedToken = {
  exp: number; // expiration timestamp in seconds
};

let refreshTimer: NodeJS.Timeout | null = null;

export const tokenScheduler = {
  // Start watching the accessToken
  async start() {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!accessToken || !refreshToken) return;

    try {
      const decoded = jwtDecode<DecodedToken>(accessToken);
      const expiresAt = decoded.exp * 1000;
      const now = Date.now();

      // Refresh 1 min before expiry
      const refreshTime = expiresAt - now - 60 * 1000;

      if (refreshTime > 0) {
        refreshTimer = setTimeout(() => this.refresh(), refreshTime);
      } else {
        await this.refresh(); // already expired
      }
    } catch (err) {
      console.error("Failed to decode token:", err);
    }
  },

  // Refresh token API call
  async refresh() {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) return;

    try {
      const res = await api.post("/auth/refresh", { refreshToken });
      const { accessToken, refreshToken: newRefreshToken } = res.data;

      // Update storage
      await AsyncStorage.multiSet([
        ["accessToken", accessToken],
        ["refreshToken", newRefreshToken],
      ]);

      // Restart timer
      this.start();
    } catch (err) {
      console.error("Token refresh failed:", err);
      await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
    }
  },

  // Stop watcher (on logout)
  stop() {
    if (refreshTimer) {
      clearTimeout(refreshTimer);
      refreshTimer = null;
    }
  },
};
