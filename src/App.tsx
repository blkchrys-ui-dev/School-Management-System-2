import React, { lazy, Suspense, ReactElement } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/guards/ProtectedRoute';
import PageLoader from './components/layout/PageLoader/PageLoader';

// ─────────────────────────────────────────────
// Public Pages
// ─────────────────────────────────────────────

import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';

// ─────────────────────────────────────────────
// Student Pages (Lazy)
// ─────────────────────────────────────────────

const StudentDashboard = lazy(() => import('./pages/student/StudentDashboard'));
const Notices = lazy(() => import('./pages/student/Notices'));
const NoticeDetails = lazy(() => import('./pages/student/NoticeDetails'));
const Homework = lazy(() => import('./pages/student/Homework'));
const ClassDiary = lazy(() => import('./pages/student/ClassDiary'));
const StudentProfile = lazy(() => import('./pages/student/StudentProfile'));
const TimeTable = lazy(() => import('./pages/student/TimeTable'));
const Attendance = lazy(() => import('./pages/student/Attendance'));
const FeeDetails = lazy(() => import('./pages/student/FeeDetails'));
const AcademicReport = lazy(() => import('./pages/student/AcademicReport'));
const AcademicCalendar = lazy(() => import('./pages/student/AcademicCalendar'));
const ContactUs = lazy(() => import('./pages/student/ContactUs'));

// ─────────────────────────────────────────────
// Teacher Pages (Lazy)
// ─────────────────────────────────────────────

const TeacherDashboard = lazy(() => import('./features/teacher/pages/TeacherDashboard'));
const NoticeTeacher = lazy(() => import('./features/teacher/pages/NoticeTeacher'));
const AttendanceTeach = lazy(() => import('./features/teacher/pages/AttendanceTeach'));
const AddHomework = lazy(() => import('./features/teacher/pages/AddHomework'));
const AddDiary = lazy(() => import('./features/teacher/pages/AddDiary'));
const SetTimeTable = lazy(() => import('./features/teacher/pages/SetTimeTable'));
const AddAcademicReport = lazy(() => import('./features/teacher/pages/AddAcademicReport'));
const AddAcademicCalendar = lazy(() => import('./features/teacher/pages/AddAcademicCalendar'));
const ManageFeeDetails = lazy(() => import('./features/teacher/pages/ManageFeeDetails'));
const EditContactUs = lazy(() => import('./features/teacher/pages/EditContactUs'));
const AddStudent = lazy(() => import('./features/teacher/pages/AddStudent'));
const EditStudentProfile = lazy(() => import('./features/teacher/pages/EditStudentProfile'));

// ─────────────────────────────────────────────
// Admin Pages (Lazy)
// ─────────────────────────────────────────────

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AddTeacher = lazy(() => import('./pages/admin/AddTeacher'));

// ─────────────────────────────────────────────
// Route Types
// ─────────────────────────────────────────────

type UserRole = 'student' | 'teacher' | 'admin';

interface AppRoute {
  path: string;
  element: ReactElement;
  role: UserRole;
}

// ─────────────────────────────────────────────
// Route Configurations
// ─────────────────────────────────────────────

const STUDENT_ROUTES: AppRoute[] = [
  { path: '/student/dashboard', element: <StudentDashboard />, role: 'student' },
  { path: '/student/notices', element: <Notices />, role: 'student' },
  { path: '/student/notices/:id', element: <NoticeDetails />, role: 'student' },
  { path: '/student/homework', element: <Homework />, role: 'student' },
  { path: '/student/ClassDiary', element: <ClassDiary />, role: 'student' },
  { path: '/student/profile', element: <StudentProfile />, role: 'student' },
  { path: '/student/timetable', element: <TimeTable />, role: 'student' },
  { path: '/student/attendance', element: <Attendance />, role: 'student' },
  { path: '/student/fees', element: <FeeDetails />, role: 'student' },
  { path: '/student/academic-report', element: <AcademicReport />, role: 'student' },
  { path: '/student/academic-calendar', element: <AcademicCalendar />, role: 'student' },
  { path: '/student/contact', element: <ContactUs />, role: 'student' },
];

const TEACHER_ROUTES: AppRoute[] = [
  { path: '/teacher/dashboard', element: <TeacherDashboard />, role: 'teacher' },
  { path: '/teacher/notices', element: <NoticeTeacher />, role: 'teacher' },
  { path: '/teacher/attendance', element: <AttendanceTeach />, role: 'teacher' },
  { path: '/teacher/add-homework', element: <AddHomework />, role: 'teacher' },
  { path: '/teacher/add-diary', element: <AddDiary />, role: 'teacher' },
  { path: '/teacher/timetable', element: <SetTimeTable />, role: 'teacher' },
  { path: '/teacher/academic-report', element: <AddAcademicReport />, role: 'teacher' },
  { path: '/teacher/academic-calendar', element: <AddAcademicCalendar />, role: 'teacher' },
  { path: '/teacher/fees', element: <ManageFeeDetails />, role: 'teacher' },
  { path: '/teacher/contact', element: <EditContactUs />, role: 'teacher' },
  { path: '/teacher/add-student', element: <AddStudent />, role: 'teacher' },
  { path: '/teacher/edit-student/:id', element: <EditStudentProfile />, role: 'teacher' },
];

const ADMIN_ROUTES: AppRoute[] = [
  { path: '/admin/dashboard', element: <AdminDashboard />, role: 'admin' },
  { path: '/admin/add-teacher', element: <AddTeacher />, role: 'admin' },
];

// ─────────────────────────────────────────────
// Redirect Map
// ─────────────────────────────────────────────

const DASHBOARD_MAP: Record<UserRole, string> = {
  student: '/student/dashboard',
  teacher: '/teacher/dashboard',
  admin: '/admin/dashboard',
};

// ─────────────────────────────────────────────
// App Component
// ─────────────────────────────────────────────

const App = (): ReactElement => {
  const { isAuthenticated, user } = useAuth();

  const defaultRedirect =
    isAuthenticated && user
      ? DASHBOARD_MAP[user.role as UserRole]
      : '/login';

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>

        {/* Public Routes */}
        <Route
          path="/"
          element={
            isAuthenticated
              ? <Navigate to={defaultRedirect} replace />
              : <Login />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Student Routes */}
        {STUDENT_ROUTES.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute
                element={route.element}
                allowedRoles={[route.role]}
              />
            }
          />
        ))}

        {/* Teacher Routes */}
        {TEACHER_ROUTES.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute
                element={route.element}
                allowedRoles={[route.role]}
              />
            }
          />
        ))}

        {/* Admin Routes */}
        {ADMIN_ROUTES.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute
                element={route.element}
                allowedRoles={[route.role]}
              />
            }
          />
        ))}

        {/* 404 */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </Suspense>
  );
};

export default App;