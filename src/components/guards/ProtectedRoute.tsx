import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import PageLoader from '../layout/PageLoader/PageLoader';

import type { UserRole } from '../../types/auth.types';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface ProtectedRouteProps {
  element: React.ReactElement;
  allowedRoles?: UserRole[];
}

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const DASHBOARD_ROUTES: Record<UserRole, string> = {
  student: '/student/dashboard',
  teacher: '/teacher/dashboard',
  admin: '/admin/dashboard',
};

// ─────────────────────────────────────────────
// Protected Route
// ─────────────────────────────────────────────

const ProtectedRoute = ({
  element,
  allowedRoles,
}: ProtectedRouteProps): React.ReactElement => {
  const {
    user,
    isLoading,
    isAuthenticated,
  } = useAuth();

  // Wait for localStorage/session restoration
  if (isLoading) {
    return <PageLoader />;
  }

  // User not logged in
  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // User logged in but role not allowed
  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return (
      <Navigate
        to={DASHBOARD_ROUTES[user.role]}
        replace
      />
    );
  }

  return element;
};

export default ProtectedRoute;