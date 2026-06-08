import { lazy } from 'react';
import type { RoleRoute } from './studentRoutes';

const AdminDashboard = lazy(() => import('../features/admin/pages/AdminDashboard'));
const AddTeacher = lazy(() => import('../features/admin/pages/AddTeacher'));
const NoticeTeacher = lazy(() => import('../features/teacher/pages/NoticeTeacher'));
const AttendanceTeach = lazy(() => import('../features/teacher/pages/AttendanceTeach'));
const AddHomework = lazy(() => import('../features/teacher/pages/AddHomework'));
const AddDiary = lazy(() => import('../features/teacher/pages/AddDiary'));
const SetTimeTable = lazy(() => import('../features/teacher/pages/SetTimeTable'));
const AddAcademicReport = lazy(() => import('../features/teacher/pages/AddAcademicReport'));
const AddAcademicCalendar = lazy(() => import('../features/teacher/pages/AddAcademicCalendar'));
const ManageFeeDetails = lazy(() => import('../features/teacher/pages/ManageFeeDetails'));
const EditContactUs = lazy(() => import('../features/teacher/pages/EditContactUs'));
const AddStudent = lazy(() => import('../features/teacher/pages/AddStudent'));

export const adminRoutes: RoleRoute[] = [
  { path: '/admin/dashboard', element: <AdminDashboard />, role: 'admin' },
  { path: '/admin/add-teacher', element: <AddTeacher />, role: 'admin' },
  { path: '/admin/students', element: <AddStudent />, role: 'admin' },
  { path: '/admin/notices', element: <NoticeTeacher />, role: 'admin' },
  { path: '/admin/attendance', element: <AttendanceTeach />, role: 'admin' },
  { path: '/admin/homework', element: <AddHomework />, role: 'admin' },
  { path: '/admin/diary', element: <AddDiary />, role: 'admin' },
  { path: '/admin/timetable', element: <SetTimeTable />, role: 'admin' },
  { path: '/admin/academic-report', element: <AddAcademicReport />, role: 'admin' },
  { path: '/admin/academic-calendar', element: <AddAcademicCalendar />, role: 'admin' },
  { path: '/admin/fees', element: <ManageFeeDetails />, role: 'admin' },
  { path: '/admin/contact', element: <EditContactUs />, role: 'admin' },
];
