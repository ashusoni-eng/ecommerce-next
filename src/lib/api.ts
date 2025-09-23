import { ApiResponse } from "@/types/api";
import axios, { AxiosError } from "axios";

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
};

// Axios instance
const apiClient = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor → attach token for all requests
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralized error handler
const handleError = (error: AxiosError): never => {
  let message = "An unknown error occurred.";

  if (error.response) {
    const data: any = error.response.data;
    message = data?.message || data?.error || message;
    throw {
      status: error.response.status,
      message,
      data,
    };
  } else if (error.request) {
    throw { status: 0, message: "No response from server" };
  } else {
    throw { status: 0, message: error.message };
  }
};

export const api = {
  get: async <T>(path: string): Promise<ApiResponse<T>> => {
    try {
      const res = await apiClient.get<ApiResponse<T>>(path);
      return res.data;
    } catch (err) {
      throw handleError(err as AxiosError);
    }
  },

  post: async <T>(path: string, data: any): Promise<ApiResponse<T>> => {
    try {
      const res = await apiClient.post<ApiResponse<T>>(path, data);
      return res.data;
    } catch (err) {
      throw handleError(err as AxiosError);
    }
  },

  put: async <T>(path: string, data: any): Promise<ApiResponse<T>> => {
    try {
      const res = await apiClient.put<ApiResponse<T>>(path, data);
      return res.data;
    } catch (err) {
      throw handleError(err as AxiosError);
    }
  },

  patch: async <T>(path: string, data: any): Promise<ApiResponse<T>> => {
    try {
      const res = await apiClient.patch<ApiResponse<T>>(path, data);
      return res.data;
    } catch (err) {
      throw handleError(err as AxiosError);
    }
  },

  delete: async <T>(path: string): Promise<ApiResponse<T>> => {
    try {
      const res = await apiClient.delete<ApiResponse<T>>(path);
      return res.data;
    } catch (err) {
      throw handleError(err as AxiosError);
    }
  },

  upload: async <T>(path: string, formData: FormData): Promise<ApiResponse<T>> => {
    try {
      const res = await apiClient.post<ApiResponse<T>>(path, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (err) {
      throw handleError(err as AxiosError);
    }
  },
};
