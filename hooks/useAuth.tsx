import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api, getToken, setToken as persistToken } from '@/lib/api';

export type User = {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  hydrating: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<User | null>;
  updateProfile: (data: { name: string; avatarUrl?: string }) => Promise<User>;
};

type AuthResponse = {
  token: string;
  user: User;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [hydrating, setHydrating] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const storedToken = await getToken();
      if (!storedToken) {
        setHydrating(false);
        return;
      }

      try {
        setToken(storedToken);
        const profile = await api.get<User>('/profile/me');
        setUser(profile);
      } catch {
        await persistToken(null);
        setUser(null);
        setToken(null);
      } finally {
        setHydrating(false);
      }
    };

    bootstrap();
  }, []);

  const handleAuthSuccess = useCallback(async (payload: AuthResponse) => {
    setUser(payload.user);
    setToken(payload.token);
    await persistToken(payload.token);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await api.post<AuthResponse>('/auth/login', { email, password }, false);
      await handleAuthSuccess(result);
    },
    [handleAuthSuccess]
  );

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      const result = await api.post<AuthResponse>(
        '/auth/register',
        { email, password, name },
        false
      );
      await handleAuthSuccess(result);
    },
    [handleAuthSuccess]
  );

  const logout = useCallback(async () => {
    setUser(null);
    setToken(null);
    await persistToken(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!token) return null;
    try {
      const profile = await api.get<User>('/profile/me');
      setUser(profile);
      return profile;
    } catch {
      return null;
    }
  }, [token]);

  const updateProfile = useCallback(async (data: { name: string; avatarUrl?: string }) => {
    const profile = await api.put<User>('/profile/me', data);
    setUser(profile);
    return profile;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, hydrating, login, register, logout, refreshProfile, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
