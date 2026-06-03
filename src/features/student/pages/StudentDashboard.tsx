import React, { useState } from 'react';
import {
  Bell,
  BookOpen,
  BookText,
  User,
  Clock,
  PanelLeftRightDashed,
  ReceiptIndianRupee,
  ChartColumn,
  Calendar,
  TrendingUp,
  Award,
  Percent,
  ClipboardList,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/layout/Header/Header';
import StudentSidebar from '../../components/StudentSidebar';
import Footer from '../../components/layout/Footer/Footer';
import TodaySchedule from '../TodaySchedule';
import '../../styling/studentdashboard.css';

// ─────────────────────────────────────────────
//  Stat Card Type
// ─────────────────────────────────────────────

interface StatCard {
  icon: React.ReactElement;
  value: string | number;
  label: string;
  colorClass: string;
}

// ─────────────────────────────────────────────
//  Quick Access Link Type
// ─────────────────────────────────────────────

interface QuickLink {
  to: string;
  icon: React.ReactElement;
  label: string;
  colorClass: string;
}

// ─────────────────────────────────────────────
//  Static quick access config
// ─────────────────────────────────────────────

const QUICK_LINKS: QuickLink[] = [
  { to: '/student/notices',           icon: <ClipboardList size={24} />,        label: 'Notice Board',    colorClass: 'quick-item-1' },
  { to: '/student/homework',          icon: <BookOpen size={24} />,             label: 'Home Work',       colorClass: 'quick-item-2' },
  { to: '/student/class-diary',       icon: <BookText size={24} />,             label: 'Class Diary',     colorClass: 'quick-item-3' },
  { to: '/student/profile',           icon: <User size={24} />,                 label: 'My Profile',      colorClass: 'quick-item-4' },
  { to: '/student/timetable',         icon: <Calendar size={24} />,             label: 'Time Table',      colorClass: 'quick-item-5' },
  { to: '/student/attendance',        icon: <PanelLeftRightDashed size={24} />, label: 'Attendance',      colorClass: 'quick-item-6' },
  { to: '/student/fees',              icon: <ReceiptIndianRupee size={24} />,   label: 'Fee Details',     colorClass: 'quick-item-7' },
  { to: '/student/academic-report',   icon: <ChartColumn size={24} />,          label: 'Academic Report', colorClass: 'quick-item-8' },
];

// ─────────────────────────────────────────────
//  StudentDashboard Component
// ─────────────────────────────────────────────

const StudentDashboard = (): React.ReactElement => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { user } = useAuth();

  const studentName = user?.name ?? 'Student';

  // ── Stat cards — values will come from API later ──
  // Keeping as local config makes it easy to wire up
  const STAT_CARDS: StatCard[] = [
    {
      icon: <TrendingUp size={22} />,
      value: '75',
      label: 'Attendance %',
      colorClass: 'attendance-col',
    },
    {
      icon: <BookOpen size={22} />,
      value: 5,
      label: 'Homework',
      colorClass: 'homework',
    },
    {
      icon: <Calendar size={22} />,
      value: 'May 10',
      label: 'Next Exam',
      colorClass: 'exam',
    },
    {
      icon: <Award size={22} />,
      value: 5,
      label: 'Rank',
      colorClass: 'rank',
    },
  ];

  return (
    <div className="page-wrapper">
      <Header open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="layout">
        <StudentSidebar open={sidebarOpen} />

        <main className="content">
          {/* Welcome */}
          <div className="welcome-note">
            <h2>Welcome back, {studentName}! 👋</h2>
            <p>Here's what's happening with your studies today.</p>
          </div>

          {/* Stat Cards */}
          <div className="first-section">
            {STAT_CARDS.map(card => (
              <div key={card.label} className="card">
                <span className={`icon ${card.colorClass}`}>{card.icon}</span>
                <p className="card-value">{card.value}</p>
                <p className="card-label">{card.label}</p>
              </div>
            ))}
          </div>

          {/* Notification Banner */}
          <div className="notification-section">
            <div className="notification-icon">
              <Bell size={20} />
            </div>
            <div className="notification-content">
              <h3>Annual Sports Day</h3>
              <p>25th May 2026 &bull; Students come in sports uniform</p>
            </div>
          </div>

          {/* Quick Access */}
          <section className="quick-sections">
            <h3>Quick Access</h3>
            <div className="quick-container">
              {QUICK_LINKS.map(link => (
                <Link key={link.to} to={link.to} className="remove-link">
                  <div className={`quick-item ${link.colorClass}`}>
                    {link.icon}
                    <p>{link.label}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Today's Schedule */}
          <TodaySchedule />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default StudentDashboard;