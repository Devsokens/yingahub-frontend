import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateSubscription: (status: 'none' | 'self' | 'full') => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Base44 Auth Provider (as mentioned in PRD)
export const Base44AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session/token
    const storedUser = localStorage.getItem('yingahub_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login logic - in a real app, this would call Base44 API
      console.log('Logging in with Base44...', email);

      let role: UserRole = 'utilisateur';
      if (email.includes('admin')) {
        role = 'administrateur';
      } else if (email.includes('universite') || email.includes('university')) {
        role = 'university';
      }

      const mockUser: User = {
        id: '1',
        email,
        full_name: email.split('@')[0],
        role,
        subscription_status: (role === 'utilisateur' && email.includes('subscribed')) ? 'self' : 'none',
        profile_completed: email.includes('complete'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setUser(mockUser);
      localStorage.setItem('yingahub_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      setUser(null);
      localStorage.removeItem('yingahub_user');
    } finally {
      setIsLoading(false);
    }
  };

  const updateSubscription = async (status: 'none' | 'self' | 'full') => {
    if (!user) return;
    const updatedUser = { ...user, subscription_status: status };
    setUser(updatedUser);
    localStorage.setItem('yingahub_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isLoading,
        login,
        logout,
        updateSubscription,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a Base44AuthProvider');
  }
  return context;
};
