export const API_BASE_URL = 
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

// Helper function untuk API calls dengan bearer token
export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, mergedOptions);

    // Check if token is expired or unauthorized
    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      throw new Error("Token expired");
    }

    return response;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

// Shorthand methods
export const apiGet = (endpoint) => apiCall(endpoint);

export const apiPost = (endpoint, data) => 
  apiCall(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const apiPut = (endpoint, data) => 
  apiCall(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const apiDelete = (endpoint) => 
  apiCall(endpoint, {
    method: "DELETE",
  });