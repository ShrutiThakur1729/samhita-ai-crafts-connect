import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userType: 'buyer' | 'seller') => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Handle Google OAuth signup - create profile and role if new user
        if (event === 'SIGNED_IN' && session?.user) {
          setTimeout(async () => {
            const pendingUserType = sessionStorage.getItem('pending_user_type') as 'buyer' | 'seller' | null;
            
            // Check if user already has a profile
            const { data: existingProfile } = await supabase
              .from('profiles')
              .select('id')
              .eq('id', session.user.id)
              .single();
            
            if (!existingProfile && pendingUserType) {
              // Create profile for new Google OAuth user
              await supabase.from('profiles').insert({
                id: session.user.id,
                user_type: pendingUserType,
                language_preference: 'en'
              });
              
              // Create role
              await supabase.from('user_roles').insert({
                user_id: session.user.id,
                role: pendingUserType
              });
              
              // If seller, create artisan profile
              if (pendingUserType === 'seller') {
                await supabase.from('artisans').insert({
                  user_id: session.user.id
                });
              }
              
              sessionStorage.removeItem('pending_user_type');
            }
          }, 0);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userType: 'buyer' | 'seller') => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          user_type: userType
        }
      }
    });

    if (!error && data.user) {
      // Create profile
      await supabase.from('profiles').insert({
        id: data.user.id,
        user_type: userType,
        language_preference: 'en'
      });

      // SECURITY: Store role in separate user_roles table
      await supabase.from('user_roles').insert({
        user_id: data.user.id,
        role: userType
      });

      // If seller, create artisan profile
      if (userType === 'seller') {
        await supabase.from('artisans').insert({
          user_id: data.user.id
        });
      }
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };

  const signInWithGoogle = async () => {
    // Store the user type in sessionStorage for use after OAuth redirect
    const userType = new URLSearchParams(window.location.search).get('type') || 'buyer';
    sessionStorage.setItem('pending_user_type', userType);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth?type=${userType}`
      }
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    return { error };
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signInWithGoogle,
      signOut,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
