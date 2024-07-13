import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  userId: number | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post<{ message: string, userId: number }>('http://localhost:5001/api/login', { username, password });
      console.log('Login response:', response.data);
      if (response.data && response.data.userId) {
        setIsAuthenticated(true);
        setUserId(response.data.userId);
        console.log('User authenticated');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false);
      setUserId(null);
      throw new Error('Login failed');
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const response = await axios.post<{ message: string, userId: number }>('http://localhost:5001/auth/register', { username, password });
      if (response.data && response.data.userId) {
        setIsAuthenticated(true);
        setUserId(response.data.userId);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setIsAuthenticated(false);
      setUserId(null);
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};