import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  login: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const auth = useSupabaseAuth();

  // Handle auth state changes
  useEffect(() => {
    if (auth.user) {
      // User is logged in, redirect to dashboard if on auth pages
      const path = window.location.pathname;
      if (path === '/login' || path === '/register') {
        navigate('/dashboard');
      }
    }
  }, [auth.user, navigate]);

  const value = {
    user: auth.user,
    loading: auth.loading,
    error: auth.error,
    login: auth.login,
    signOut: auth.logout,
    isAuthenticated: auth.isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an SupabaseAuthProvider');
  }
  return context;
}