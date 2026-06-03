import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  BookOpen,
  Calendar,
  ChartColumn,
  ClipboardList,
  Contact,
  House,
  PanelLeftRightDashed,
  ReceiptIndianRupee,
  School,
  User,
  UserPlus,
  Users,
} from 'lucide-react';

import { useAuth } from '../../../context/AuthContext';
import type { UserRole } from '../../../types/auth.types';

import boy from '../../../assets/images/boy-img.jpg';

import './sidebar.css';

interface SidebarProps {
  open: boolean;
}

interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const MENU_ITEMS: Record<UserRole, MenuItem[]> = {
  student: [
    { label: 'Dashboard', path: '/student/dashboard', icon: <House size={18} /> },
    { label: 'Notice Board', path: '/student/notices', icon: <ClipboardList size={18} /> },
    { label: 'Homework', path: '/student/homework', icon: <BookOpen size={18} /> },
    { label: 'My Profile', path: '/student/profile', icon: <User size={18} /> },
    { label: 'Attendance', path: '/student/attendance', icon: <PanelLeftRightDashed size={18} /> },
    { label: 'Fee Details', path: '/student/fees', icon: <ReceiptIndianRupee size={18} /> },
  ],
  teacher: [
    { label: 'Dashboard', path: '/teacher/dashboard', icon: <House size={18} /> },
    { label: 'Notices', path: '/teacher/notices', icon: <ClipboardList size={18} /> },
    { label: 'Attendance', path: '/teacher/attendance', icon: <PanelLeftRightDashed size={18} /> },
    { label: 'Add Homework', path: '/teacher/add-homework', icon: <BookOpen size={18} /> },
    { label: 'Time Table', path: '/teacher/timetable', icon: <Calendar size={18} /> },
    { label: 'Academic Report', path: '/teacher/academic-report', icon: <ChartColumn size={18} /> },
    { label: 'Fees', path: '/teacher/fees', icon: <ReceiptIndianRupee size={18} /> },
    { label: 'Add Student', path: '/teacher/add-student', icon: <UserPlus size={18} /> },
  ],
  admin: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <House size={18} /> },
    { label: 'Add Teacher', path: '/admin/add-teacher', icon: <UserPlus size={18} /> },
    { label: 'Students', path: '/teacher/add-student', icon: <Users size={18} /> },
    { label: 'Teachers', path: '/admin/add-teacher', icon: <School size={18} /> },
    { label: 'Finance', path: '/teacher/fees', icon: <ReceiptIndianRupee size={18} /> },
    { label: 'Contact', path: '/teacher/contact', icon: <Contact size={18} /> },
  ],
};

const ROLE_LABELS: Record<UserRole, string> = {
  student: 'Student',
  teacher: 'Teacher',
  admin: 'Super Admin',
};

const Sidebar = ({ open }: SidebarProps): React.ReactElement => {
  const { user } = useAuth();
  const role = user?.role ?? 'student';
  const menuItems = MENU_ITEMS[role];

  return (
    <aside id="app-sidebar" className={`sidebar ${open ? 'open' : ''}`} aria-label={`${ROLE_LABELS[role]} navigation`}>
      <div className="school-name">The Oasis Academy</div>

      <div className="student-profile">
        <img src={user?.profileImage || boy} alt={user?.name || ROLE_LABELS[role]} className="student-img" />
        <h3 className="student-name">{user?.name || ROLE_LABELS[role]}</h3>
        <p className="student-class">
          {role === 'student' && user?.className ? `${user.className} • ${user.section ?? ''}` : ROLE_LABELS[role]}
        </p>
        {role === 'student' && user?.rollNumber && <span className="student-roll">Roll No: {user.rollNumber}</span>}
        {role === 'teacher' && user?.subject && <span className="student-roll">{user.subject}</span>}
      </div>

      <nav className="sidebar-nav">
        <ul className="menu">
          {menuItems.map(item => (
            <li key={item.path}>
              <NavLink to={item.path} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
