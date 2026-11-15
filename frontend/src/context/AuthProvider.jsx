import React, { useMemo, useState } from 'react';
import AuthContext from './authContext';
import { login as loginRequest, register as registerRequest } from '../services/api';

const STORAGE_KEY = 'kirana-store-auth';

const readStoredAuth = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { user: null, token: null };
  } catch (error) {
    console.error('Unable to load saved sign-in:', error);
    return { user: null, token: null };
  }
};

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(readStoredAuth);

  const saveAuth = (data) => {
    const next = { user: data, token: data.token };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setAuth(next);
    return data;
  };

  const login = async (credentials) => saveAuth(await loginRequest(credentials));
  const register = async (details) => saveAuth(await registerRequest(details));
  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuth({ user: null, token: null });
  };

  const value = useMemo(() => ({
    user: auth.user,
    token: auth.token,
    isAdmin: auth.user?.role === 'admin',
    login,
    register,
    logout,
  }), [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
