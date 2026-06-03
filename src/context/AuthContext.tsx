import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type {
  AuthUser,
  AuthContextType,
  LoginResponse,
  UserRole,
} from '../types/auth.types';

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const USER_STORAGE_KEY = 'oasis_user';

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const getStoredUser = (): AuthUser | null => {
  try {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser) as AuthUser;
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
};

const saveUser = (user: AuthUser): void => {
  localStorage.setItem(
    USER_STORAGE_KEY,
    JSON.stringify(user)
  );
};

const clearUser = (): void => {
  localStorage.removeItem(USER_STORAGE_KEY);
};

// ─────────────────────────────────────────────
// Provider Props
// ─────────────────────────────────────────────

interface AuthProviderProps {
  children: ReactNode;
}

// ─────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────

export const AuthProvider = ({
  children,
}: AuthProviderProps): React.ReactElement => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  // Rehydrate session on app startup
  useEffect(() => {
    const storedUser = getStoredUser();

    if (storedUser) {
      setUser(storedUser);
    }

    setIsLoading(false);
  }, []);

  // ───────────────────────────────────────────
  // Login
  // ───────────────────────────────────────────

  const login = (data: LoginResponse): void => {
    const authUser: AuthUser = {
      id: data.id,
      name: data.name,
      role: data.role,
      token: data.token,

      className: data.className,
      section: data.section,
      rollNumber: data.rollNumber,

      subject: data.subject,
      employeeId: data.employeeId,

      email: data.email,
      profileImage: data.profileImage,
    };

    saveUser(authUser);

    setUser(authUser);
  };

  // ───────────────────────────────────────────
  // Logout
  // ───────────────────────────────────────────

  const logout = (): void => {
    clearUser();

    setUser(null);
  };

  // ───────────────────────────────────────────
  // Role Helpers
  // ───────────────────────────────────────────

  const hasRole = (
    role: UserRole
  ): boolean => {
    return user?.role === role;
  };

  // ───────────────────────────────────────────
  // Memoized Context
  // ───────────────────────────────────────────

  const value = useMemo(
    () => ({
      user,

      isLoading,

      isAuthenticated: !!user,

      login,

      logout,

      hasRole,
    }),
    [user, isLoading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    );
  }

  return context;
};

export default AuthContext;