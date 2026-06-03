// ─────────────────────────────────────────────
//  Shared TypeScript Types — Oasis Academy SMS
// ─────────────────────────────────────────────

export type UserRole = 'student' | 'teacher' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
  token: string;
  // Student-specific
  className?: string;
  section?: string;
  rollNumber?: string;
  // Teacher-specific
  subject?: string;
  employeeId?: string;
  // Common
  email?: string;
  profileImage?: string;
}

export interface LoginRequest {
  userId: string;
  password: string;
  role: UserRole;
}

export interface LoginResponse {
  token: string;
  role: UserRole;
  name: string;
  id: string;
  className?: string;
  section?: string;
  rollNumber?: string;
  subject?: string;
  employeeId?: string;
  email?: string;
  profileImage?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginResponse) => void;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
}