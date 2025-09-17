export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
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