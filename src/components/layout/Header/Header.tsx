import React from 'react';


import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Menu,
  UserCircle2,
  GraduationCap,
} from 'lucide-react';

import { useAuth } from '../../../context/AuthContext';

import './header.css';
import schoolLogo from '../../../assets/images/school-logo.jpg.jpg';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface HeaderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const ROLE_LABELS: Record<string, string> = {
  student: 'Student',
  teacher: 'Teacher',
  admin: 'Super Admin',
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

const Header = ({
  open,
  setOpen,
}: HeaderProps): React.ReactElement => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleSidebarToggle = (): void => {
    setOpen((prev) => !prev);
  };

  const handleLogout = (): void => {
    logout();
    navigate('/login', {
      replace: true,
    });
  };

  return (
    <header className="header">

      {/* Left Section */}
      <div className="header-left">

        <button
          type="button"
          className="menu-btn"
          onClick={handleSidebarToggle}
          aria-label={open ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={open}
        >
          <Menu size={22} />
        </button>

        <div className="header-brand">
          <img
            src={schoolLogo}
            alt="Oasis Academy"
            className="header-logo"
          />

          <div className="header-brand-content">
            <h2 className="header-title">
              Oasis Academy
            </h2>

            <span className="header-subtitle">
              School Management System
            </span>
          </div>
        </div>

      </div>

      {/* Right Section */}
      <div className="header-right">

        <div className="header-user">

          <div className="header-user-icon">
            <UserCircle2 size={34} />
          </div>

          <div className="header-user-info">
            <span className="header-user-name">
              {user?.name || 'Guest User'}
            </span>

            <span className="header-user-role">
              <GraduationCap size={14} />
              {ROLE_LABELS[user?.role || 'student']}
            </span>
          </div>

        </div>

        <button
          type="button"
          className="logout-btn"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>

      </div>

    </header>
  );
};

export default Header;