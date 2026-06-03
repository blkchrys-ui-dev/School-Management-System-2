import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  House,
  BookOpen,
  BookText,
  User,
  Clock,
  Calendar,
  ReceiptIndianRupee,
  ClipboardList,
  ChartColumn,
  PanelLeftRightDashed,
  Contact,
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';

import boy from '../assets/boy-img.jpg';

import '../styling/sidebar.css';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface SidebarProps {
  open: boolean;
}

interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

// ─────────────────────────────────────────────
// Menu Configuration
// ─────────────────────────────────────────────

const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Dashboard',
    path: '/student/dashboard',
    icon: <House size={18} />,
  },
  {
    label: 'Notice Board',
    path: '/student/notices',
    icon: <ClipboardList size={18} />,
  },
  {
    label: 'Homework',
    path: '/student/homework',
    icon: <BookOpen size={18} />,
  },
  {
    label: 'Class Diary',
    path: '/student/class-diary',
    icon: <BookText size={18} />,
  },
  {
    label: 'My Profile',
    path: '/student/profile',
    icon: <User size={18} />,
  },
  {
    label: 'Time Table',
    path: '/student/timetable',
    icon: <Clock size={18} />,
  },
  {
    label: 'Attendance',
    path: '/student/attendance',
    icon: <PanelLeftRightDashed size={18} />,
  },
  {
    label: 'Fee Details',
    path: '/student/fees',
    icon: <ReceiptIndianRupee size={18} />,
  },
  {
    label: 'Academic Report',
    path: '/student/academic-report',
    icon: <ChartColumn size={18} />,
  },
  {
    label: 'Academic Calendar',
    path: '/student/academic-calendar',
    icon: <Calendar size={18} />,
  },
  {
    label: 'Contact Us',
    path: '/student/contact',
    icon: <Contact size={18} />,
  },
];

// ─────────────────────────────────────────────
// Sidebar Component
// ─────────────────────────────────────────────

const Sidebar = ({
  open,
}: SidebarProps): React.ReactElement => {
  const { user } = useAuth();

  return (
    <aside
      className={`sidebar ${open ? 'open' : ''}`}
    >
      {/* School Name */}
      <div className="school-name">
        The Oasis Academy
      </div>

      {/* Student Profile */}
      <div className="student-profile">
        <img
          src={user?.profileImage || boy}
          alt={user?.name || 'Student'}
          className="student-img"
        />

        <h3 className="student-name">
          {user?.name || 'Student Name'}
        </h3>

        <p className="student-class">
          {user?.className
            ? `${user.className} • ${user.section ?? ''}`
            : 'Student'}
        </p>

        {user?.rollNumber && (
          <span className="student-roll">
            Roll No: {user.rollNumber}
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul className="menu">
          {MENU_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-link ${
                    isActive ? 'active' : ''
                  }`
                }
              >
                {item.icon}

                <span>
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;