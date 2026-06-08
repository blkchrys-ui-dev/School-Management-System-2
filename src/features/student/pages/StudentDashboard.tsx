import React, { useState } from 'react';
import {
  Award,
  Bell,
  BookOpen,
  Calendar,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import Header from '../../../components/layout/Header/Header';
import StudentSidebar from '../../../components/layout/Sidebar/StudentSidebar';
import Footer from '../../../components/layout/Footer/Footer';
import TodaySchedule from '../components/TodaySchedule';
import '../styles/studentdashboard.css';

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

          {/* Today's Schedule */}
          <TodaySchedule />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default StudentDashboard;