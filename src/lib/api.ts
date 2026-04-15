import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 — clear session and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ─── Auth ────────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    api.post("/auth/login/", { email, password }),

  logout: () => api.post("/auth/logout/"),

  register: (data: { name: string; email: string; password: string }) =>
    api.post("/auth/register/", data),
};

// ─── Publications (public + authenticated) ───────────────
export const publicationsApi = {
  getAll: (params?: { search?: string; domain?: string; page?: number }) =>
    api.get("/publications/", { params }),

  getById: (id: string) => api.get(`/publications/${id}/`),

  search: (query: string) =>
    api.get("/publications/", { params: { search: query } }),
};

// ─── Researchers (public) ────────────────────────────────
export const researchersApi = {
  getAll: (params?: { search?: string; domain?: string }) =>
    api.get("/researchers/", { params }),

  getById: (id: string) => api.get(`/researchers/${id}/`),
};

// ─── Domains (public) ────────────────────────────────────
export const domainsApi = {
  getAll: () => api.get("/domains/"),
};

// ─── User Account ─────────────────────────────────────────
export const userApi = {
  getProfile: () => api.get("/auth/profile/"),

  updateProfile: (data: { name?: string; email?: string }) =>
    api.patch("/auth/profile/", data),

  changePassword: (data: { old_password: string; new_password: string }) =>
    api.post("/auth/change-password/", data),
};

// ─── News (public) ────────────────────────────────────────
export const newsApi = {
  getPublished: () => api.get("/news/", { params: { published: true } }),
};

// ─── Featured Projects (public) ───────────────────────────
export const featuredProjectsApi = {
  getFeatured: () => api.get("/projects/", { params: { featured: true } }),
};

export default api;
