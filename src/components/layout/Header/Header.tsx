import type { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  LogOut,
  Menu,
  UserCircle2,
  X,
} from 'lucide-react';

import { useAuth } from '../../../context/AuthContext';

import schoolLogo from '../../../assets/images/school-logo.jpg.jpg';
import './header.css';

interface HeaderProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ROLE_LABELS = {
  student: 'Student',
  teacher: 'Teacher',
  admin: 'Super Admin',
} as const;

const Header = ({ open, setOpen }: HeaderProps): React.ReactElement => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const roleLabel = user?.role ? ROLE_LABELS[user.role] : 'Guest';
  const displayName = user?.name?.trim() || 'Guest User';

  const handleSidebarToggle = (): void => {
    setOpen(previousState => !previousState);
  };

  const handleLogout = (): void => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="app-header">
      <div className="app-header__left">
        <button
          type="button"
          className="app-header__menu-btn"
          onClick={handleSidebarToggle}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="app-sidebar"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className="app-header__brand" aria-label="Oasis Academy home">
          <img
            src={schoolLogo}
            alt="Oasis Academy logo"
            className="app-header__logo"
          />

          <div className="app-header__brand-text">
            <span className="app-header__eyebrow">The Oasis Academy</span>
            <h1 className="app-header__title">School Management System</h1>
          </div>
        </div>
      </div>

      <div className="app-header__right">
        <div className="app-header__user" aria-label={`Signed in as ${displayName}`}>
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={`${displayName} profile`}
              className="app-header__avatar-img"
            />
          ) : (
            <div className="app-header__avatar" aria-hidden="true">
              <UserCircle2 size={30} />
            </div>
          )}

          <div className="app-header__user-info">
            <span className="app-header__user-name">{displayName}</span>
            <span className="app-header__user-role">
              <GraduationCap size={14} />
              {roleLabel}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="app-header__logout-btn"
          onClick={handleLogout}
          aria-label="Logout and return to login page"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
