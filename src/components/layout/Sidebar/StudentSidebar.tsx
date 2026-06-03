import React, { ReactElement, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import {
  House,
  BookOpen,
  BookText,
  User,
  Clock,
  PanelLeftRightDashed,
  ReceiptIndianRupee,
  ChartColumn,
  Calendar,
  MessageSquare,
  Bus,
  Contact,
  ClipboardList,
  UserCircle,
} from 'lucide-react';

import { useAuth } from '../../../context/AuthContext';
import './sidebar.css';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface NavItem {
  to: string;
  icon: ReactNode;
  label: string;
}

interface PlaceholderItem {
  icon: ReactNode;
  label: string;
}

interface StudentSidebarProps {
  open: boolean;
}

// ─────────────────────────────────────────────
// Navigation Configuration
// ─────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  {
    to: '/student/dashboard',
    icon: <House size={18} />,
    label: 'Dashboard',
  },
  {
    to: '/student/notices',
    icon: <ClipboardList size={18} />,
    label: 'Notice Board',
  },
  {
    to: '/student/homework',
    icon: <BookOpen size={18} />,
    label: 'Homework',
  },
  {
    to: '/student/class-diary',
    icon: <BookText size={18} />,
    label: 'Class Diary',
  },
  {
    to: '/student/profile',
    icon: <User size={18} />,
    label: 'My Profile',
  },
  {
    to: '/student/timetable',
    icon: <Clock size={18} />,
    label: 'Time Table',
  },
  {
    to: '/student/attendance',
    icon: <PanelLeftRightDashed size={18} />,
    label: 'Attendance',
  },
  {
    to: '/student/fees',
    icon: <ReceiptIndianRupee size={18} />,
    label: 'Fee Details',
  },
  {
    to: '/student/academic-report',
    icon: <ChartColumn size={18} />,
    label: 'Academic Report',
  },
  {
    to: '/student/academic-calendar',
    icon: <Calendar size={18} />,
    label: 'Academic Calendar',
  },
  {
    to: '/student/contact',
    icon: <Contact size={18} />,
    label: 'Contact Us',
  },
];

// Future Features
const PLACEHOLDER_ITEMS: PlaceholderItem[] = [
  {
    icon: <MessageSquare size={18} />,
    label: 'Feedback',
  },
  {
    icon: <Bus size={18} />,
    label: 'Bus Tracking',
  },
];

// ─────────────────────────────────────────────
// Student Sidebar Component
// ─────────────────────────────────────────────

const StudentSidebar = ({
  open,
}: StudentSidebarProps): ReactElement => {
  const { user } = useAuth();

  const studentName = user?.name ?? 'Student';

  const studentClass = user?.className ?? 'N/A';

  const studentSection = user?.section ?? 'N/A';

  const rollNumber = user?.rollNumber ?? 'N/A';

  return (
    <aside
      className={`sidebar ${open ? 'open' : ''}`}
      aria-label="Student Navigation"
    >
      {/* School Name */}
      <div className="school-name">
        The Oasis Academy
      </div>

      {/* Student Profile Card */}
      <div className="student-profile">
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt={`${studentName} profile`}
            className="student-img"
          />
        ) : (
          <div
            className="student-img-placeholder"
            aria-hidden="true"
          >
            <UserCircle size={60} />
          </div>
        )}

        <h3 className="student-name">
          {studentName}
        </h3>

        <div className="student-meta">
          <span>
            Class {studentClass}
          </span>

          <span>
            Section {studentSection}
          </span>

          <span>
            Roll #{rollNumber}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul className="menu">

          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `menu-link ${
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

          {/* Future Features */}
          {PLACEHOLDER_ITEMS.map((item) => (
            <li
              key={item.label}
              className="menu-link menu-link-disabled"
              aria-disabled="true"
              title="Coming Soon"
            >
              {item.icon}

              <span>
                {item.label}
              </span>
            </li>
          ))}

        </ul>
      </nav>
    </aside>
  );
};

export default StudentSidebar;