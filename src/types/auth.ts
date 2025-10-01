export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'big7' | 'manager' | 'vendor' | 'customer';
  phone?: string;
  department?: string;
  hourlyRate?: number;
  isActive: boolean;
  emailVerified: boolean;
  lastLogin: string;
  createdAt: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}