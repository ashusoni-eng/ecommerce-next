'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Credentials, LoginResponse, RegisterUser } from '@/types/auth';
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
} from './auth-api';

import { jwtDecode } from 'jwt-decode';

// Define the User type based on your LoginResponse
type User = LoginResponse['data']['user'];

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  exp: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User | null; // Add user to the context
  login: (credentials: Credentials) => Promise<LoginResponse | undefined>;
  register: (credentials: RegisterUser) => Promise<LoginResponse | undefined>;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null); // Add user state

  useEffect(() => {
    checkAuth();
  }, []);

  const decodeRoleFromToken = (token: string): string | null => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.role;
    } catch {
      return null;
    }
  };

  const login = async (credentials: Credentials) => {
    try {
      const data = await apiLogin(credentials);
      if (data?.data?.accessToken) {
        setIsAuthenticated(true);
        const role = decodeRoleFromToken(data.data.accessToken);
        setIsAdmin(role === 'admin');
        setUser(data.data.user); // Set the user
      }
      return data;
    } catch (error) {
      setIsAuthenticated(false);
      setIsAdmin(false);
      setUser(null); // Clear user on error
      throw error;
    }
  };

  const register = async (credentials: RegisterUser) => {
    try {
      const data = await apiRegister(credentials);
      if (data?.data?.accessToken) {
        setIsAuthenticated(true);
        const role = decodeRoleFromToken(data.data.accessToken);
        setIsAdmin(role === 'admin');
        setUser(data.data.user); // Set the user
      }
      return data;
    } catch (error) {
      setIsAuthenticated(false);
      setIsAdmin(false);
      setUser(null); // Clear user on error
      console.error('Registration failed', error);
    }
  };

  const logout = () => {
    apiLogout();
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null); // Clear user on logout
  };

  const checkAuth = () => {
    const token = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setIsAuthenticated(true);
      const role = decodeRoleFromToken(token);
      setIsAdmin(role === 'admin');
      setUser(JSON.parse(storedUser)); // Set user from localStorage
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, user, login, register, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
