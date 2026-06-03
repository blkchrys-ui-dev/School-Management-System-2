import { lazy } from 'react';
import type { ReactElement } from 'react';

const StudentDashboard = lazy(() => import('../features/student/pages/StudentDashboard'));
const Notices = lazy(() => import('../features/student/pages/Notices'));
const NoticeDetails = lazy(() => import('../features/student/pages/NoticeDetails'));
const Homework = lazy(() => import('../features/student/pages/Homework'));
const ClassDiary = lazy(() => import('../features/student/pages/ClassDiary'));
const StudentProfile = lazy(() => import('../features/student/pages/StudentProfile'));
const TimeTable = lazy(() => import('../features/student/pages/TimeTable'));
const Attendance = lazy(() => import('../features/student/pages/Attendance'));
const FeeDetails = lazy(() => import('../features/student/pages/FeeDetails'));
const AcademicReport = lazy(() => import('../features/student/pages/AcademicReport'));
const AcademicCalendar = lazy(() => import('../features/student/pages/AcademicCalendar'));
const ContactUs = lazy(() => import('../features/student/pages/ContactUs'));

export interface RoleRoute {
  path: string;
  element: ReactElement;
  role: 'student' | 'teacher' | 'admin';
}

export const studentRoutes: RoleRoute[] = [
  { path: '/student/dashboard', element: <StudentDashboard />, role: 'student' },
  { path: '/student/notices', element: <Notices />, role: 'student' },
  { path: '/student/notices/:id', element: <NoticeDetails />, role: 'student' },
  { path: '/student/homework', element: <Homework />, role: 'student' },
  { path: '/student/class-diary', element: <ClassDiary />, role: 'student' },
  { path: '/student/profile', element: <StudentProfile />, role: 'student' },
  { path: '/student/timetable', element: <TimeTable />, role: 'student' },
  { path: '/student/attendance', element: <Attendance />, role: 'student' },
  { path: '/student/fees', element: <FeeDetails />, role: 'student' },
  { path: '/student/academic-report', element: <AcademicReport />, role: 'student' },
  { path: '/student/academic-calendar', element: <AcademicCalendar />, role: 'student' },
  { path: '/student/contact', element: <ContactUs />, role: 'student' },
];
