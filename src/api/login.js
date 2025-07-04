import { axiosInstance } from "@/api/axiosInstance";

export const login = async (username, password, expiresInMins = 60) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      username,
      password,
      expiresInMins,
    });

    if (response.data && response.data.token) {
      // Just return the data - let Redux handle localStorage
      return {
        success: true,
        user: response.data,
      };
    }

    return {
      success: false,
      error: "Invalid response from server",
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Invalid username or password",
    };
  }
};

export const isLoggedIn = async () => {
  const token = localStorage.getItem("token"); // Changed from "accessToken"

  if (!token) {
    return { isLoggedIn: false };
  }

  try {
    const response = await axiosInstance.get("/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // Include cookies for automatic handling
    });

    if (response.data) {
      return {
        isLoggedIn: true,
        user: response.data,
      };
    }

    return { isLoggedIn: false };
  } catch (error) {
    console.error("Error checking login status:", error);
    // If token is invalid or expired, clear stored data
    if (error.response?.status === 401 || error.response?.status === 403) {
      logout();
    }
    return { isLoggedIn: false };
  }
};

export const logout = () => {
  // Remove localStorage operations - let Redux handle this
  // Just clear any authentication cookies if they exist
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Changed from "accessToken"
  document.cookie =
    "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Test
// username: 'emilys'
// password: 'emilyspass'
