import { lazy } from 'react';
import type { RoleRoute } from './studentRoutes';

const AdminDashboard = lazy(() => import('../features/admin/pages/AdminDashboard'));
const AddTeacher = lazy(() => import('../features/admin/pages/AddTeacher'));

export const adminRoutes: RoleRoute[] = [
  { path: '/admin/dashboard', element: <AdminDashboard />, role: 'admin' },
  { path: '/admin/add-teacher', element: <AddTeacher />, role: 'admin' },
];
