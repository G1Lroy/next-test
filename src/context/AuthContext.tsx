'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { Database } from '@/models/database';

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
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const login = async ({ username, password }: FormDataT) => {
    setError("");
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1300));

      const isAuthenticated = Database.authenticate(username, password);

      if (!isAuthenticated) {
        throw new Error("Неправильный логин или пароль");
      }
      setIsLoggedIn(true)
      Cookies.set('userToken', username);
      return isAuthenticated
    } catch (err: unknown) {
      setError(`Ошибка входа, попробуйте снова. ${String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    Cookies.remove('userToken');
    setIsLoggedIn(false);
    router.replace('/')
    setLoading(false)
  };

  useEffect(() => {
    // Redirect if reload page or manual input adress
    const token = Cookies.get('userToken')
    if (token) {
      setIsLoggedIn(true)
      router.replace('/payments')
    } else {
      setIsLoggedIn(false)
      router.replace('/')
    }
  }, [router])



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