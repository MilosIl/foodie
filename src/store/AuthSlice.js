import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/api/axiosInstance";

// Async thunks for auth operations
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        username: credentials.username,
        password: credentials.password,
        expiresInMins: 30, // optional, defaults to 60
      });

      const data = response.data;

      // Store token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data));

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      return rejectWithValue(errorMessage);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/add", {
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        age: 25,
        phone: userData.phone || "",
        image: "https://dummyjson.com/icon/user/420",
        address: {
          address: "",
          city: "",
          state: "",
          stateCode: "",
          postalCode: "",
          coordinates: { lat: 0, lng: 0 },
          country: "",
        },
        birthDate: "1993-01-01",
        gender: "",
      });

      const data = response.data;
      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      return rejectWithValue(errorMessage);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const storedRefreshToken = localStorage.getItem("refreshToken");

      if (!storedRefreshToken && !auth.refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axiosInstance.post("/auth/refresh", {
        refreshToken: storedRefreshToken || auth.refreshToken,
        expiresInMins: 30,
      });

      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);

      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Token refresh failed";
      return rejectWithValue(errorMessage);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const response = await axiosInstance.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to get user data";
      return rejectWithValue(errorMessage);
    }
  }
);

// Helper function to load user from localStorage
const loadUserFromStorage = () => {
  try {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      return {
        user: JSON.parse(user),
        token,
        refreshToken: localStorage.getItem("refreshToken"),
        isAuthenticated: true,
      };
    }
  } catch (error) {
    console.error("Error loading user from storage:", error);
  }

  return {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
  };
};

const initialStorageState = loadUserFromStorage();

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialStorageState.user,
    token: initialStorageState.token,
    refreshToken: initialStorageState.refreshToken,
    isAuthenticated: initialStorageState.isAuthenticated,
    loading: false,
    error: null,
  },
  reducers: {
    // Synchronous actions
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },

    clearError: (state) => {
      state.error = null;
    },

    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },

    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

// Export actions
export const { logout, clearError, setUser, updateUser } = AuthSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectToken = (state) => state.auth.token;

// Export reducer
export default AuthSlice.reducer;
