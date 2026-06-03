import { lazy } from 'react';
import type { RoleRoute } from './studentRoutes';

const TeacherDashboard = lazy(() => import('../features/teacher/pages/TeacherDashboard'));
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
const EditStudentProfile = lazy(() => import('../features/teacher/pages/EditStudentProfile'));

export const teacherRoutes: RoleRoute[] = [
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
