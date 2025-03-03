'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load stored user data on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    setError(null);
  
    try {
      // Validate email format
      if (!email.includes('@')) {
        throw new Error('Invalid email format.');
      }
  
      // Handle optional password
      if (password !== undefined && typeof password !== 'string') {
        throw new Error('Invalid password format.');
      }
  
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email,
        phone: '123-456-7890',
      };
  
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (err) {
      if (err instanceof Error) {
        console.error('Login failed:', err.message);
        setError(err.message);
      } else {
        setError('An unknown error occurred during login.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (updatedUser: Partial<User>) => {
    setUser((prevUser) => {
      if (prevUser) {
        const updated = { ...prevUser, ...updatedUser };
        localStorage.setItem('user', JSON.stringify(updated));
        return updated;
      }
      return prevUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isLoading, error }}>
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
