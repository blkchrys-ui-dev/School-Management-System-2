import React, { useState } from 'react';
import "../styles/adminDashboard.css";
import {
    House, Bell, BookOpen, BookText, User, Clock, PanelLeftRightDashed,
    ReceiptIndianRupee, ChartColumn, Calendar, MessageSquare, Bus, Contact,
    TrendingUp, Award, Percent, Info, ArrowLeft, Users, School,
    GraduationCap, DollarSign, Activity, CheckCircle, AlertCircle,
    Search, Filter, MoreVertical, Edit, Trash2, Eye, Plus, Download,
    ChevronRight, Star, BarChart3, Settings, Shield, UserCheck, FileText,
    Mail, Phone, MapPin, CreditCard, BookMarked, FolderOpen, LogOut, UserPlus,
    ClipboardList, User2, CalendarDays, ClipboardCheck, Calendar1Icon,
    IndianRupee, Contact2, Proportions
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/layout/Sidebar/Sidebar';
import Header from '../../../components/layout/Header/Header';
import Footer from '../../../components/layout/Footer/Footer';

const PrincipalDash = () => {
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    // Statistics Data
    const stats = [
        { id: 1, title: "Total Students", value: "1,284", change: "+12%", icon: Users, color: "primary", bgColor: "#eff6ff", iconColor: "#3b82f6" },
        { id: 2, title: "Total Teachers", value: "48", change: "+2", icon: School, color: "success", bgColor: "#f0fdf4", iconColor: "#22c55e" },
        { id: 3, title: "Total Classes", value: "24", change: "0", icon: GraduationCap, color: "purple", bgColor: "#f5f3ff", iconColor: "#8b5cf6" },
        { id: 4, title: "Avg Attendance", value: "92.5%", change: "+2.5%", icon: Activity, color: "orange", bgColor: "#fff7ed", iconColor: "#f97316" }
    ];

    // Recent Students Data
    const recentStudents = [
        { id: 1, name: "Ameen Khan", class: "Class I", section: "A", rollNo: 1, admissionDate: "15 Apr 2026", attendance: "95%", status: "active", email: "ameen@example.com", parentContact: "+91 98765 43210" },
        { id: 2, name: "Sana Mirza", class: "Class II", section: "B", rollNo: 5, admissionDate: "12 Apr 2026", attendance: "88%", status: "active", email: "sana@example.com", parentContact: "+91 98765 43211" },
        { id: 3, name: "Rahul Sharma", class: "Class III", section: "A", rollNo: 12, admissionDate: "10 Apr 2026", attendance: "76%", status: "warning", email: "rahul@example.com", parentContact: "+91 98765 43212" },
        { id: 4, name: "Priya Patel", class: "Class IV", section: "C", rollNo: 8, admissionDate: "08 Apr 2026", attendance: "92%", status: "active", email: "priya@example.com", parentContact: "+91 98765 43213" },
        { id: 5, name: "Mohd Ali", class: "Class V", section: "B", rollNo: 3, admissionDate: "05 Apr 2026", attendance: "84%", status: "active", email: "ali@example.com", parentContact: "+91 98765 43214" }
    ];

    // Recent Teachers Data
    const recentTeachers = [
        { id: 1, name: "Prof. Ayesha Khan", designation: "Senior Teacher", subject: "Mathematics", classes: "Class I-V", students: 156, joiningDate: "01 Apr 2026", experience: "8 years", email: "ayesha@oasis.edu", phone: "+91 98765 43001", status: "active" },
        { id: 2, name: "Prof. Rajesh Kumar", designation: "Head of Department", subject: "Physics", classes: "Class IX-XII", students: 98, joiningDate: "28 Mar 2026", experience: "12 years", email: "rajesh@oasis.edu", phone: "+91 98765 43002", status: "active" },
        { id: 3, name: "Prof. Sunita Verma", designation: "Teacher", subject: "Chemistry", classes: "Class IX-XII", students: 95, joiningDate: "25 Mar 2026", experience: "6 years", email: "sunita@oasis.edu", phone: "+91 98765 43003", status: "inactive" },
        { id: 4, name: "Prof. Vikram Singh", designation: "Senior Teacher", subject: "English", classes: "Class VI-X", students: 120, joiningDate: "20 Mar 2026", experience: "10 years", email: "vikram@oasis.edu", phone: "+91 98765 43004", status: "active" }
    ];

    // Class-wise Performance Data
    const classPerformance = [
        { class: "Class I", students: 42, avgAttendance: "94%", avgMarks: "86%", topPerformer: "Ameen Khan" },
        { class: "Class II", students: 38, avgAttendance: "91%", avgMarks: "84%", topPerformer: "Zara Ahmed" },
        { class: "Class III", students: 45, avgAttendance: "88%", avgMarks: "81%", topPerformer: "Rohan Mehta" },
        { class: "Class IV", students: 40, avgAttendance: "92%", avgMarks: "85%", topPerformer: "Ishita Gupta" },
        { class: "Class V", students: 43, avgAttendance: "89%", avgMarks: "83%", topPerformer: "Arjun Reddy" }
    ];

    // Fee Collection Data
    const feeCollection = {
        total: "₹24,50,000",
        collected: "₹21,30,000",
        pending: "₹3,20,000",
        collectionRate: "87%"
    };

    // Upcoming Events Data
    const upcomingEvents = [
        { day: "20", month: "May", title: "Annual Sports Day", description: "Ground at 9 AM", type: "Sports" },
        { day: "25", month: "May", title: "Parent-Teacher Meeting", description: "Main Hall", type: "Meeting" },
        { day: "01", month: "Jun", title: "Mid-Term Exams Begin", description: "For all classes", type: "Exam" }
    ];

    // Attendance Data
    const attendanceData = {
        studentsPresent: 520,
        studentsTotal: 580,
        studentPercentage: "89.6%",
        teachersPresent: 35,
        teachersTotal: 38,
        teacherPercentage: "92.1%"
    };

    // Today's Date
    const todayDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <>
            <div className="principal-page-wrapper">
                <Header open={open} setOpen={setOpen} />
                <div className="principal-layout">
                    <Sidebar open={open} />
                    <div className="principal-content">

                        {/* Welcome Section */}
                        <div className="principal-welcome-section">
                            <div className="principal-welcome-left">
                                <div className="principal-welcome-icon">
                                    <Shield size={32} />
                                </div>
                                <div className="principal-welcome-text">
                                    <h1>Super Admin Dashboard</h1>
                                    <p>Complete control over students, teachers, and academic management</p>
                                </div>
                            </div>
                            <div className="principal-date-badge">
                                <Calendar size={18} />
                                <span>{todayDate}</span>
                            </div>
                        </div>

                        {/* Statistics Cards */}
                        <div className="principal-stats-grid">
                            {stats.map(stat => (
                                <div key={stat.id} className={`principal-stat-card principal-stat-${stat.color}`}>
                                    <div className="principal-stat-header">
                                        <div className="principal-stat-icon" style={{ background: stat.bgColor, color: stat.iconColor }}>
                                            <stat.icon size={22} />
                                        </div>
                                        <span className="principal-stat-change positive">{stat.change}</span>
                                    </div>
                                    <div className="principal-stat-value">{stat.value}</div>
                                    <div className="principal-stat-title">{stat.title}</div>
                                </div>
                            ))}
                        </div>

                        {/* Tabs Navigation */}
                        <div className="principal-tabs">
                            <button
                                className={`principal-tab ${activeTab === 'overview' ? 'active' : ''}`}
                                onClick={() => setActiveTab('overview')}
                            >
                                <BarChart3 size={18} />
                                <span>Overview</span>
                            </button>
                            <button
                                className={`principal-tab ${activeTab === 'academics' ? 'active' : ''}`}
                                onClick={() => setActiveTab('academics')}
                            >
                                <BookOpen size={18} />
                                <span>Academics</span>
                            </button>
                            <button
                                className={`principal-tab ${activeTab === 'students' ? 'active' : ''}`}
                                onClick={() => setActiveTab('students')}
                            >
                                <Users size={18} />
                                <span>Students</span>
                            </button>
                            <button
                                className={`principal-tab ${activeTab === 'teachers' ? 'active' : ''}`}
                                onClick={() => setActiveTab('teachers')}
                            >
                                <School size={18} />
                                <span>Teachers</span>
                            </button>
                            <button
                                className={`principal-tab ${activeTab === 'finance' ? 'active' : ''}`}
                                onClick={() => setActiveTab('finance')}
                            >
                                <DollarSign size={18} />
                                <span>Finance</span>
                            </button>
                        </div>

                        {/* Overview Tab Content */}
                        {activeTab === 'overview' && (
                            <>
                                {/* Main Two Column Grid */}
                                <div className="principal-main-grid">
                                    {/* Left Column */}
                                    <div className="principal-left-col">
                                        {/* Class Performance Section */}
                                        <div className="principal-section">
                                            <div className="principal-section-header">
                                                <div className="principal-section-title">
                                                    <TrendingUp size={20} />
                                                    <h3>Class-wise Performance</h3>
                                                </div>
                                                <select className="principal-select">
                                                    <option>All Classes</option>
                                                    <option>Primary (I-V)</option>
                                                    <option>Middle (VI-VIII)</option>
                                                    <option>High (IX-XII)</option>
                                                </select>
                                            </div>
                                            <div className="principal-performance-list">
                                                {classPerformance.map((item, idx) => (
                                                    <div key={idx} className="principal-performance-item">
                                                        <div className="performance-class">
                                                            <span className="class-name">{item.class}</span>
                                                            <span className="class-strength">{item.students} students</span>
                                                        </div>
                                                        <div className="performance-metrics">
                                                            <div className="metric">
                                                                <span className="metric-label">Attendance</span>
                                                                <span className="metric-value">{item.avgAttendance}</span>
                                                            </div>
                                                            <div className="metric">
                                                                <span className="metric-label">Avg Marks</span>
                                                                <span className="metric-value">{item.avgMarks}</span>
                                                            </div>
                                                        </div>
                                                        <div className="performance-top">
                                                            <Star size={14} />
                                                            <span>{item.topPerformer}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Fee Collection Summary */}
                                        <div className="principal-section">
                                            <div className="principal-section-header">
                                                <div className="principal-section-title">
                                                    <DollarSign size={20} />
                                                    <h3>Fee Collection</h3>
                                                </div>
                                                <Link to="/managefeedetails" className="principal-view-btn">
                                                    View Details <ChevronRight size={16} />
                                                </Link>
                                            </div>
                                            <div className="principal-fee-summary">
                                                <div className="fee-stats">
                                                    <div className="fee-stat-item">
                                                        <span className="fee-label">Total</span>
                                                        <span className="fee-amount total">{feeCollection.total}</span>
                                                    </div>
                                                    <div className="fee-stat-item">
                                                        <span className="fee-label">Collected</span>
                                                        <span className="fee-amount collected">{feeCollection.collected}</span>
                                                    </div>
                                                    <div className="fee-stat-item">
                                                        <span className="fee-label">Pending</span>
                                                        <span className="fee-amount pending">{feeCollection.pending}</span>
                                                    </div>
                                                </div>
                                                <div className="fee-progress">
                                                    <div className="fee-progress-label">
                                                        <span>Collection Rate</span>
                                                        <span>{feeCollection.collectionRate}</span>
                                                    </div>
                                                    <div className="fee-progress-bar">
                                                        <div className="fee-progress-fill" style={{ width: feeCollection.collectionRate }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="principal-right-col">
                                        {/* Upcoming Events */}
                                        <div className="principal-section">
                                            <div className="principal-section-header">
                                                <div className="principal-section-title">
                                                    <CalendarDays size={20} />
                                                    <h3>Upcoming Events</h3>
                                                </div>
                                                <Link to="/addacademiccalendar" className="principal-view-link">
                                                    View All <ChevronRight size={16} />
                                                </Link>
                                            </div>
                                            <div className="principal-events-list">
                                                {upcomingEvents.map((event, idx) => (
                                                    <div key={idx} className="principal-event-item">
                                                        <div className="event-date-badge">
                                                            <span className="event-day">{event.day}</span>
                                                            <span className="event-month">{event.month}</span>
                                                        </div>
                                                        <div className="event-info">
                                                            <span className="event-title">{event.title}</span>
                                                            <span className="event-desc">{event.description}</span>
                                                        </div>
                                                        <span className="event-badge">{event.type}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Today's Attendance */}
                                        <div className="principal-section">
                                            <div className="principal-section-header">
                                                <div className="principal-section-title">
                                                    <ClipboardCheck size={20} />
                                                    <h3>Today's Attendance</h3>
                                                </div>
                                                <span className="principal-date-badge-sm">
                                                    <Calendar size={14} />
                                                    {todayDate}
                                                </span>
                                            </div>
                                            <div className="principal-attendance-summary">
                                                <div className="attendance-row">
                                                    <div className="attendance-item students">
                                                        <Users size={18} />
                                                        <div className="attendance-info">
                                                            <span className="attendance-label">Students</span>
                                                            <span className="attendance-count">
                                                                {attendanceData.studentsPresent}/{attendanceData.studentsTotal}
                                                            </span>
                                                        </div>
                                                        <span className="attendance-percent">{attendanceData.studentPercentage}</span>
                                                    </div>
                                                    <div className="attendance-item teachers">
                                                        <UserCheck size={18} />
                                                        <div className="attendance-info">
                                                            <span className="attendance-label">Teachers</span>
                                                            <span className="attendance-count">
                                                                {attendanceData.teachersPresent}/{attendanceData.teachersTotal}
                                                            </span>
                                                        </div>
                                                        <span className="attendance-percent">{attendanceData.teacherPercentage}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions Section */}
                                <div className="principal-quick-actions">
                                    <h3>Quick Actions</h3>
                                    <div className="principal-quick-grid">
                                        <Link to="/addstudent" className="principal-quick-card">
                                            <div className="quick-icon student-add">
                                                <UserPlus size={24} />
                                            </div>
                                            <div className="quick-info">
                                                <h4>Add Student</h4>
                                                <p>Register new student</p>
                                            </div>
                                            <ChevronRight size={16} />
                                        </Link>

                                        <Link to="/addteacher" className="principal-quick-card">
                                            <div className="quick-icon teacher-add">
                                                <UserCheck size={24} />
                                            </div>
                                            <div className="quick-info">
                                                <h4>Add Teacher</h4>
                                                <p>Hire new faculty</p>
                                            </div>
                                            <ChevronRight size={16} />
                                        </Link>

                                        <Link to="/settimetable" className="principal-quick-card">
                                            <div className="quick-icon class-add">
                                                <GraduationCap size={24} />
                                            </div>
                                            <div className="quick-info">
                                                <h4>Manage Classes</h4>
                                                <p>Create/Update sections</p>
                                            </div>
                                            <ChevronRight size={16} />
                                        </Link>

                                        <Link to="/generatereport" className="principal-quick-card">
                                            <div className="quick-icon report-gen">
                                                <FileText size={24} />
                                            </div>
                                            <div className="quick-info">
                                                <h4>Generate Report</h4>
                                                <p>Download analytics</p>
                                            </div>
                                            <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Academics Tab Content */}
                        {activeTab === 'academics' && (
                            <div className="principal-academics-section">
                                <div className="principal-section-header-large">
                                    <div className="header-left">
                                        <h2>Academic Management</h2>
                                        <p>Manage time tables, exams, and academic calendar</p>
                                    </div>
                                </div>

                                <div className="principal-academics-grid">
                                    <Link to="/noticeteacher" className="principal-academic-card">
                                        <div className="academic-icon">
                                            <ClipboardList size={28} />
                                        </div>
                                        <h3>Notice Board</h3>
                                        <p>Manage notices</p>
                                        <button className="academic-btn">Manage</button>
                                    </Link>
                                    <Link to="/addhomework" className="principal-academic-card">
                                        <div className="academic-icon">
                                            <BookOpen size={28} />
                                        </div>
                                        <h3>HomeWork</h3>
                                        <p>Manage HomeWork</p>
                                        <button className="academic-btn">Manage</button>
                                    </Link>
                                    <Link to="/syllabus" className="principal-academic-card">
                                        <div className="academic-icon">
                                            <ClipboardList size={28} />
                                        </div>
                                        <h3>Class Diary</h3>
                                        <p>Manage diary</p>
                                        <button className="academic-btn">Manage</button>
                                    </Link>
                                    <Link to="/studentprofile" className="principal-academic-card">
                                        <div className="academic-icon">
                                            <User2 size={28} />
                                        </div>
                                        <h3>Student Profile</h3>
                                        <p>Manage student profile</p>
                                        <button className="academic-btn">Manage</button>
                                    </Link>
                                    <Link to="/editstudentprofile" className="principal-academic-card">
                                        <div className="academic-icon">
                                            <User2 size={28} />
                                        </div>
                                        <h3>Edit Student Profile</h3>
                                        <p>Manage student details</p>
                                        <button className="academic-btn">Manage</button>
                                    </Link>
                                    <Link to="/settimetable" className="principal-academic-card">
                                        <div className="academic-icon">
                                            <Calendar size={28} />
                                        </div>
                                        <h3>Time Table</h3>
                                        <p>Manage class schedules and teacher assignments</p>
                                        <button className="academic-btn">Manage</button>
                                    </Link>
                                    <Link to="/attendanceteach" className="principal-academic-card">
                                        <div className="academic-icon">
                                            <PanelLeftRightDashed size={28} />
                                        </div>
                                        <h3>Attendance</h3>
                                        <p>Manage attendance of students </p>
                                        <button className="academic-btn">Manage</button>
                                    </Link>
                                    <Link to="/managefeedetails" className="principal-academic-card">
                                        <div className="academic-icon">
                                            <IndianRupee size={28} />
                                        </div>
                                        <h3>Fee</h3>
                                        <p>Manage fee details record</p>
                                        <button className="academic-btn">Manage</button>
                                    </Link>
                                    <Link to="/addacademiccalendar" className="principal-academic-card">
                                        <div className="academic-icon">
                                            <Calendar1Icon size={28} />
                                        </div>
                                        <h3>Academic Calendar</h3>
                                        <p>Plan holidays, events, and important dates</p>
                                        <button className="academic-btn">Manage</button>
                                    </Link>
                                    <Link to="/addacademicreport" className="principal-academic-card">
                                        <div className="academic-icon">
                                            <Proportions size={28} />
                                        </div>
                                        <h3>Academic Report</h3>
                                        <p>Manage academic report</p>
                                        <button className="academic-btn">Manage</button>
                                    </Link>
                                    <Link to="/editcontactdetails" className="principal-academic-card">
                                        <div className="academic-icon">
                                            <Contact2 size={28} />
                                        </div>
                                        <h3>Contact</h3>
                                        <p>Manage contact details</p>
                                        <button className="academic-btn">Manage</button>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Students Tab Content */}
                        {activeTab === 'students' && (
                            <div className="principal-students-section">
                                <div className="principal-section-header-large">
                                    <div className="header-left">
                                        <h2>Student Management</h2>
                                        <p>Manage all students, view profiles, and track performance</p>
                                    </div>
                                    <Link to={'/addstudent'}>
                                        <button className="principal-primary-btn">
                                            <Plus size={18} /> Add New Student
                                        </button>
                                    </Link>
                                </div>

                                <div className="principal-filters">
                                    <div className="filter-search">
                                        <Search size={18} />
                                        <input type="text" placeholder="Search students by name, class, roll no..." />
                                    </div>
                                    <select className="principal-filter-select">
                                        <option>All Classes</option>
                                        <option>Class I</option>
                                        <option>Class II</option>
                                        <option>Class III</option>
                                        <option>Class IV</option>
                                        <option>Class V</option>
                                    </select>
                                    <select className="principal-filter-select">
                                        <option>All Sections</option>
                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                    </select>
                                    {/* <button className="principal-filter-btn">
                                        <Filter size={16} /> Filter
                                    </button> */}
                                    <button className="principal-download-btn">
                                        <Download size={16} /> Export
                                    </button>
                                </div>

                                <div className="principal-table-container">
                                    <table className="principal-full-table">
                                        <thead>
                                            <tr>
                                                <th>Student Name</th>
                                                <th>Class & Section</th>
                                                <th>Roll No</th>
                                                <th>Parent Contact</th>
                                                <th>Attendance</th>
                                                <th>Fees Status</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentStudents.map(student => (
                                                <tr key={student.id}>
                                                    <td>
                                                        <div className="student-info-cell">
                                                            <div className="student-avatar-sm">{student.name.charAt(0)}</div>
                                                            <div>
                                                                <div className="student-name">{student.name}</div>
                                                                <div className="student-email">{student.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{student.class}-{student.section}</td>
                                                    <td>{student.rollNo}</td>
                                                    <td>
                                                        <div className="contact-info">
                                                            <Phone size={12} /> {student.parentContact}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="attendance-cell">
                                                            <div className="attendance-bar" style={{ width: student.attendance }}></div>
                                                            <span>{student.attendance}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="fee-status paid">Paid</span>
                                                    </td>
                                                    <td>
                                                        <span className={`status-badge ${student.status}`}>
                                                            {student.status === 'active' ? 'Active' : 'Warning'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="action-buttons">
                                                            <Eye size={18} className="action-icon" title="View" />
                                                            <Edit size={18} className="action-icon" title="Edit" />
                                                            <Trash2 size={18} className="action-icon" title="Delete" />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Teachers Tab Content */}
                        {activeTab === 'teachers' && (
                            <div className="principal-teachers-section">
                                <div className="principal-section-header-large">
                                    <div className="header-left">
                                        <h2>Teacher Management</h2>
                                        <p>Manage faculty, assign subjects, and track performance</p>
                                    </div>
                                    <Link to={'/addteacher'}>
                                        <button className="principal-primary-btn">
                                            <Plus size={18} /> Add New Teacher
                                        </button>
                                    </Link>
                                </div>

                                <div className="principal-teachers-grid">
                                    {recentTeachers.map(teacher => (
                                        <div key={teacher.id} className="principal-teacher-card">
                                            <div className="teacher-card-header">
                                                <div className="teacher-avatar-large">
                                                    {teacher.name.charAt(0)}
                                                </div>
                                                <div className="teacher-header-info">
                                                    <h4>{teacher.name}</h4>
                                                    <p>{teacher.subject}</p>
                                                </div>
                                                <MoreVertical size={18} className="teacher-menu" />
                                            </div>
                                            <div className="teacher-card-stats">
                                                <div className="teacher-stat">
                                                    <span className="stat-label">Classes</span>
                                                    <span className="stat-value">{teacher.classes}</span>
                                                </div>
                                                <div className="teacher-stat">
                                                    <span className="stat-label">Students</span>
                                                    <span className="stat-value">{teacher.students}</span>
                                                </div>
                                                <div className="teacher-stat">
                                                    <span className="stat-label">Experience</span>
                                                    <span className="stat-value">{teacher.experience}</span>
                                                </div>
                                            </div>
                                            <div className="teacher-card-contact">
                                                <div><Mail size={14} /> {teacher.email}</div>
                                                <div><Phone size={14} /> {teacher.phone}</div>
                                            </div>
                                            <div className="teacher-card-footer">
                                                <span className={`teacher-status ${teacher.status}`}>
                                                    {teacher.status === 'active' ? 'Active' : 'Inactive'}
                                                </span>
                                                <div className="teacher-actions">
                                                    <Eye size={16} />
                                                    <Edit size={16} />
                                                    <MessageSquare size={16} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Finance Tab Content */}
                        {activeTab === 'finance' && (
                            <div className="principal-finance-section">
                                <div className="principal-section-header-large">
                                    <div className="header-left">
                                        <h2>Finance Management</h2>
                                        <p>Track fee collection, expenses, and generate reports</p>
                                    </div>
                                    <button className="principal-primary-btn">
                                        <Download size={18} /> Export Report
                                    </button>
                                </div>

                                <div className="principal-finance-stats">
                                    <div className="finance-stat-card">
                                        <div className="finance-stat-icon total">
                                            <DollarSign size={24} />
                                        </div>
                                        <div className="finance-stat-info">
                                            <span className="finance-stat-label">Total Revenue</span>
                                            <span className="finance-stat-value">₹45,20,000</span>
                                        </div>
                                    </div>
                                    <div className="finance-stat-card">
                                        <div className="finance-stat-icon collected">
                                            <CheckCircle size={24} />
                                        </div>
                                        <div className="finance-stat-info">
                                            <span className="finance-stat-label">Collected</span>
                                            <span className="finance-stat-value">₹39,80,000</span>
                                        </div>
                                    </div>
                                    <div className="finance-stat-card">
                                        <div className="finance-stat-icon pending">
                                            <AlertCircle size={24} />
                                        </div>
                                        <div className="finance-stat-info">
                                            <span className="finance-stat-label">Pending</span>
                                            <span className="finance-stat-value">₹5,40,000</span>
                                        </div>
                                    </div>
                                    <div className="finance-stat-card">
                                        <div className="finance-stat-icon rate">
                                            <TrendingUp size={24} />
                                        </div>
                                        <div className="finance-stat-info">
                                            <span className="finance-stat-label">Collection Rate</span>
                                            <span className="finance-stat-value">88%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="principal-fee-table">
                                    <h3>Recent Fee Transactions</h3>
                                    <table className="principal-full-table">
                                        <thead>
                                            <tr>
                                                <th>Student Name</th>
                                                <th>Class</th>
                                                <th>Amount</th>
                                                <th>Due Date</th>
                                                <th>Status</th>
                                                <th>Payment Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Ameen Khan</td>
                                                <td>I-A</td>
                                                <td>₹25,000</td>
                                                <td>15 May 2026</td>
                                                <td><span className="fee-status paid">Paid</span></td>
                                                <td>10 May 2026</td>
                                            </tr>
                                            <tr>
                                                <td>Sana Mirza</td>
                                                <td>II-B</td>
                                                <td>₹25,000</td>
                                                <td>15 May 2026</td>
                                                <td><span className="fee-status pending">Pending</span></td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <td>Rahul Sharma</td>
                                                <td>III-A</td>
                                                <td>₹28,000</td>
                                                <td>15 May 2026</td>
                                                <td><span className="fee-status paid">Paid</span></td>
                                                <td>12 May 2026</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default PrincipalDash;