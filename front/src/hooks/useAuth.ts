'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types';
import api from '@/lib/api';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get('/auth/me')
      .then((res) => setUser(res.data))
      .catch(() => localStorage.removeItem('access_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('access_token', res.data.access_token);
    const me = await api.get('/auth/me');
    setUser(me.data);
    return me.data;
  };

  const register = async (email: string, password: string) => {
    const res = await api.post('/auth/register', { email, password });
    localStorage.setItem('access_token', res.data.access_token);
    const me = await api.get('/auth/me');
    setUser(me.data);
    return me.data;
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    window.location.href = '/';
  };

  return { user, loading, login, register, logout };
}