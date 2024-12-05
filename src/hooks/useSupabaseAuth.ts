import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { getCurrentSession, getCurrentUser, signInWithEmail, signOut, onAuthStateChange } from '../lib/supabase/auth';

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Get initial session and user
    async function initializeAuth() {
      try {
        const session = await getCurrentSession();
        if (session) {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize auth'));
      } finally {
        setLoading(false);
      }
    }

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string) => {
    try {
      setLoading(true);
      await signInWithEmail(email);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to sign in'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to sign out'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };
}