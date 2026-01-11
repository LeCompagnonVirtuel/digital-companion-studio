import { useEffect, createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (code: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Auth account used for admin-only access (password = admin access code)
const ADMIN_AUTH_EMAIL = 'lecompagnonvirtuel@gmail.com';

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAdminSession = useCallback(async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      if (!session?.user) {
        setIsAuthenticated(false);
        return;
      }

      const { data: isAdmin, error: roleError } = await supabase.rpc('has_role', {
        _role: 'admin',
        _user_id: session.user.id,
      });

      if (roleError) throw roleError;

      if (!isAdmin) {
        await supabase.auth.signOut();
        setIsAuthenticated(false);
        return;
      }

      setIsAuthenticated(true);
    } catch (e) {
      console.error('Admin session check failed:', e);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      // Re-check role on any auth change
      checkAdminSession();
    });

    // Initial check
    checkAdminSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [checkAdminSession]);

  const login = async (code: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // 1) Validate the code server-side and ensure the admin auth user + role exist
      const response = await fetch(
        `https://ewygzjviarsspoytdgrr.supabase.co/functions/v1/verify-admin-code`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        }
      );

      const data = await response.json();
      if (!data?.success) {
        return { success: false, error: data?.error || 'Code invalide' };
      }

      // 2) Sign in to Supabase Auth (password = code)
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: ADMIN_AUTH_EMAIL,
        password: code,
      });

      if (signInError) {
        return { success: false, error: signInError.message };
      }

      // 3) Ensure the user is admin (defensive)
      await checkAdminSession();

      if (!isAuthenticated) {
        return { success: false, error: 'Accès refusé (rôle admin manquant).' };
      }

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Erreur de connexion' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
