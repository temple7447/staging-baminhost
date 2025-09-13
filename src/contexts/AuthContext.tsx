import { ReactNode, createContext, useContext, useState } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'big7' | 'manager' | 'vendor' | 'customer';
  avatar?: string;
  permissions?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const DEMO_USERS: User[] = [
  {
    id: '1',
    email: 'owner@financepro.com',
    name: 'John Smith',
    role: 'owner',
    permissions: ['all']
  },
  {
    id: '2',
    email: 'big7@financepro.com',
    name: 'Sarah Johnson',
    role: 'big7',
    permissions: ['view_allocations', 'manage_portfolio']
  },
  {
    id: '3',
    email: 'manager@financepro.com',
    name: 'Mike Wilson',
    role: 'manager',
    permissions: ['manage_team', 'view_reports']
  },
  {
    id: '4',
    email: 'vendor@financepro.com',
    name: 'Alice Brown',
    role: 'vendor',
    permissions: ['upload_work', 'view_payments']
  },
  {
    id: '5',
    email: 'customer@financepro.com',
    name: 'David Lee',
    role: 'customer',
    permissions: ['view_account', 'make_payments']
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = DEMO_USERS.find(u => u.email === email);
    
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
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