import { ReactNode, createContext, useContext, useState } from "react";
import { DEMO_USERS } from "@/data/demoData";

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'big7' | 'manager' | 'vendor' | 'customer';
  avatar?: string;
  permissions?: string[];
  department?: string;
  hourlyRate?: number;
  profitShare?: number;
  workHours?: { total: number; active: number };
  // Vendor specific properties
  commissionRate?: number;
  totalEarnings?: number;
  // Customer specific properties
  customerType?: 'premium' | 'regular';
  totalSpent?: number;
  activeContracts?: number;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = DEMO_USERS.find(u => u.email === email);
    
    if (foundUser && password === 'demo123') {
      setUser(foundUser as User);
      return { success: true };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
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