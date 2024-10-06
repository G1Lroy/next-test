'use client'

import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export type FormDataT = {
  username: string
  password: string
}

interface AuthContextType {
  login: ({ username, password }: FormDataT) => Promise<boolean | undefined>;
  logout: () => void;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async ({ username, password }: FormDataT) => {
    setError("");
    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }


      const { token } = await response.json();
      Cookies.set('userToken', token);

      setIsLoggedIn(true);
      router.push('/payments');
      return true;
    } catch (err: unknown) {
      const errorMessage = (err instanceof Error) ? err.message : 'Ошибка входа, попробуйте снова.';
      setError(`Ошибка входа: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    await fetch('/api/logout', { method: 'POST' });
    Cookies.remove('userToken');
    setIsLoggedIn(false);
    router.push('/');
    setLoading(false);
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading, error }}>
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
