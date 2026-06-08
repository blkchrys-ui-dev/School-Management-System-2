import { Suspense, type ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/guards/ProtectedRoute';
import PageLoader from './components/layout/PageLoader/PageLoader';
import { useAuth } from './context/AuthContext';
import ForgotPassword from './features/auth/pages/ForgotPasswordPage';
import Login from './features/auth/pages/LoginPage';
import { adminRoutes } from './router/adminRoutes';
import { studentRoutes } from './router/studentRoutes';
import { teacherRoutes } from './router/teacherRoutes';
import type { UserRole } from './types/auth.types';

const DASHBOARD_MAP: Record<UserRole, string> = {
  student: '/student/dashboard',
  teacher: '/teacher/dashboard',
  admin: '/admin/dashboard',
};

const PROTECTED_ROUTES = [
  ...studentRoutes,
  ...teacherRoutes,
  ...adminRoutes,
];

const App = (): ReactElement => {
  const { isAuthenticated, isLoading, user } = useAuth();

  const defaultRedirect = isAuthenticated && user
    ? DASHBOARD_MAP[user.role]
    : '/login';

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to={defaultRedirect} replace /> : <Login />}
        />
        <Route path="/login" element={isAuthenticated ? <Navigate to={defaultRedirect} replace /> : <Login />} />
        <Route path="/forgot-password" element={isAuthenticated ? <Navigate to={defaultRedirect} replace /> : <ForgotPassword />} />

        {PROTECTED_ROUTES.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={(
              <ProtectedRoute
                element={route.element}
                allowedRoles={[route.role]}
              />
            )}
          />
        ))}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;
