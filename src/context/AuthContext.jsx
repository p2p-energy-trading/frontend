// src/context/AuthContext.jsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { API_BASE_URL } from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const logout = useCallback(async () => {
    try {
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    }
  }, [token]);

  const verifyToken = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        // API returns: { profile: {...}, wallets: [...], meters: [...] }
        setUser({
          ...data.profile,
          wallets: data.wallets || [],
          meters: data.meters || [],
        });
      } else {
        logout();
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      logout();
    } finally {
      setLoading(false);
    }
  }, [token, logout]);

  // Check if token exists on app start
  useEffect(() => {
    if (token) {
      // Verify token with backend
      verifyToken();
    } else {
      setLoading(false);
    }
  }, [token, verifyToken]);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { access_token } = data;

        localStorage.setItem("token", access_token);
        setToken(access_token);

        // Fetch user profile data after successful login
        await verifyTokenAfterLogin(access_token);

        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.message || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Network error" };
    }
  };

  // Helper function to verify token after login/register
  const verifyTokenAfterLogin = async (accessToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        // API returns: { profile: {...}, wallets: [...], meters: [...] }
        setUser({
          ...data.profile,
          wallets: data.wallets || [],
          meters: data.meters || [],
        });
      }
    } catch (error) {
      console.error("Profile fetch after login failed:", error);
    }
  };

  // Function to refresh user data
  const refreshUserData = useCallback(async () => {
    if (!token) return { success: false, error: "No token available" };

    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        // API returns: { profile: {...}, wallets: [...], meters: [...] }
        setUser({
          ...data.profile,
          wallets: data.wallets || [],
          meters: data.meters || [],
        });
        return { success: true, data };
      } else {
        return { success: false, error: "Failed to fetch profile" };
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
      return { success: false, error: "Network error" };
    }
  }, [token]);

  const register = async (email, password, name) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (response.ok) {
        const data = await response.json();
        const { access_token } = data;

        localStorage.setItem("token", access_token);
        setToken(access_token);

        // Fetch user profile data after successful registration
        await verifyTokenAfterLogin(access_token);

        return { success: true };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.message || "Registration failed",
        };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: "Network error" };
    }
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    refreshUserData,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
