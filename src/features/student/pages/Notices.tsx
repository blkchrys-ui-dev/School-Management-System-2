import React, { useState } from 'react';
import { Info, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../../components/layout/Header/Header';
import StudentSidebar from '../../components/StudentSidebar';
import Footer from '../../components/layout/Footer/Footer';
import '../../styling/notices.css';

// ─────────────────────────────────────────────
// Notices Page
// ─────────────────────────────────────────────

const Notices = (): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <Header open={open} setOpen={setOpen} />
      <div className="layout">
        <StudentSidebar open={open} />
        <div className="content">
          <div className="back-nav" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </div>

          <h2>Notice Board</h2>

          <div className="schedule-section">
            <div className="notice-container">

              {[
                { id: 1, title: 'Annual Sports Day Announcement',    date: '12 Apr 2026', time: '8:00 AM'  },
                { id: 2, title: 'Parent-Teacher Meeting Schedule',   date: '15 Apr 2026', time: '10:00 AM' },
                { id: 3, title: 'Half-Yearly Examination Routine',   date: '15 Apr 2026', time: '10:00 AM' },
                { id: 4, title: 'Holiday Notice - Holi',             date: '15 Apr 2026', time: '10:00 AM' },
              ].map(notice => (
                <Link key={notice.id} to={`/student/notices/${notice.id}`} className="notice-link">
                  <div className="notice-card">
                    <div className="notice-left">
                      <span className="notice-dot">
                        <Info size={18} />
                      </span>
                      <div className="notice-text">
                        <p className="notice-title">{notice.title}</p>
                        <div className="notice-meta">
                          <span>{notice.date}</span>
                          <span>{notice.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Notices;