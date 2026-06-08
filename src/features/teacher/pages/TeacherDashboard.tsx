import React, { useState } from "react";
import "../styles/teacherDash.css";
import {
    House, Bell, BookOpen, BookText, User, Clock, PanelLeftRightDashed,
    ReceiptIndianRupee, ChartColumn, Calendar, MessageSquare, Bus, Contact,
    TrendingUp, Award, Percent, Plus, Users, ClipboardList, FileText,
    Video, School, CheckCircle, AlertCircle, Download, Filter,
    Mail, Phone, MapPin, GraduationCap, BookMarked, FolderOpen,
    ChevronRight, Sparkles, Star, ArrowRight, LayoutDashboard,
    User2Icon
} from 'lucide-react';
import { Link } from "react-router-dom";
import Header from "../../../components/layout/Header/Header";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import Footer from "../../../components/layout/Footer/Footer";
import { useAuth } from "../../../context/AuthContext";

const TeacherDashboard = () => {
    const [open, setOpen] = useState(false);
    const { user } = useAuth();
    const teacherName = user?.name ?? "Teacher";
    const teacherSubject = user?.subject ?? "All Subjects";

    // Today's classes
    const todayClasses = [
        { id: 1, subject: "Mathematics", topic: "Algebra - Quadratic Equations", time: "8:00 - 8:40 AM", class: "10-A", students: 42, room: "Room 201", icon: "📐" },
        { id: 2, subject: "Physics", topic: "Laws of Motion - Newton's First Law", time: "8:40 - 9:20 AM", class: "11-B", students: 38, room: "Lab 3", icon: "⚡" },
        { id: 3, subject: "Chemistry", topic: "Chemical Bonding & Reactions", time: "9:20 - 10:00 AM", class: "11-B", students: 38, room: "Lab 2", icon: "🧪" },
        { id: 4, subject: "Mathematics", topic: "Linear Equations in Two Variables", time: "10:30 - 11:10 AM", class: "9-C", students: 45, room: "Room 105", icon: "📐" },
        { id: 5, subject: "Physics", topic: "Thermodynamics Basics", time: "11:10 - 11:50 AM", class: "12-A", students: 35, room: "Room 301", icon: "⚡" }
    ];

    const today = new Date();
    const currentTime = `${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}`;

    return (
        <>
            <div className="td-page-wrapper">
                <Header open={open} setOpen={setOpen} />
                <div className="td-layout">
                    <Sidebar open={open} />
                    <div className="td-content">
                        {/* Welcome Section */}
                        <div className="td-welcome-section">
                            <div className="td-welcome-left">
                                <div className="td-welcome-avatar">
                                    <GraduationCap size={28} />
                                </div>
                                <div className="td-welcome-text">
                                    <h1>Welcome back, <span>{teacherName}!</span></h1>
                                    <p>{teacherSubject} • Have a great teaching day ahead</p>
                                </div>
                            </div>
                            <div className="td-welcome-right">
                                <div className="td-date-badge">
                                    <Calendar size={18} />
                                    <span>{today.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                </div>
                                <div className="td-time-badge">
                                    <Clock size={18} />
                                    <span>{currentTime}</span>
                                </div>
                            </div>
                        </div>

                        {/* Statistics Cards */}
                        <div className="td-stats-grid">
                            <div className="td-stat-card td-stat-primary">
                                <div className="td-stat-icon-wrap">
                                    <Clock size={22} />
                                </div>
                                <div className="td-stat-content">
                                    <h3>5</h3>
                                    <p>Classes Today</p>
                                </div>
                                <div className="td-stat-trend up">+2</div>
                            </div>
                            <div className="td-stat-card td-stat-success">
                                <div className="td-stat-icon-wrap">
                                    <Users size={22} />
                                </div>
                                <div className="td-stat-content">
                                    <h3>198</h3>
                                    <p>Total Students</p>
                                </div>
                                <div className="td-stat-trend up">+12</div>
                            </div>
                            <div className="td-stat-card td-stat-purple">
                                <div className="td-stat-icon-wrap">
                                    <CheckCircle size={22} />
                                </div>
                                <div className="td-stat-content">
                                    <h3>94.2%</h3>
                                    <p>Avg. Attendance</p>
                                </div>
                                <div className="td-stat-trend up">+1.5%</div>
                            </div>
                            <div className="td-stat-card td-stat-orange">
                                <div className="td-stat-icon-wrap">
                                    <Award size={22} />
                                </div>
                                <div className="td-stat-content">
                                    <h3>87%</h3>
                                    <p>Avg. Performance</p>
                                </div>
                                <div className="td-stat-trend up">+3%</div>
                            </div>
                        </div>

                        {/* Two Column Main Content */}
                        <div className="td-main-grid">
                            {/* Today's Schedule - Left Column */}
                            <div className="td-schedule-section">
                                <div className="td-section-header">
                                    <div className="td-header-left">
                                        <div className="td-header-icon-wrap schedule">
                                            <Clock size={18} />
                                        </div>
                                        <div>
                                            <h3>Today's Schedule</h3>
                                            <p>Your classes for today</p>
                                        </div>
                                    </div>
                                    <Link to="/teacher/timetable" className="td-view-all-btn">
                                        View Full Schedule
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>

                                <div className="td-schedule-cards">
                                    {todayClasses.slice(0, 2).map((item) => (
                                        <div key={item.id} className="td-schedule-card">
                                            <div className="td-schedule-card-top">
                                                <div className="td-subject-icon">
                                                    {item.icon}
                                                </div>
                                                <div className="td-schedule-card-info">
                                                    <h4>{item.subject}</h4>
                                                    <span className="td-card-time">
                                                        <Clock size={12} />
                                                        {item.time}
                                                    </span>
                                                </div>
                                                <div className="td-class-badge-new">
                                                    {item.class}
                                                </div>
                                            </div>
                                            <p className="td-card-topic">{item.topic}</p>
                                            <div className="td-schedule-card-footer">
                                                <span className="td-card-meta">
                                                    <Users size={13} />
                                                    {item.students} students
                                                </span>
                                                <span className="td-card-meta">
                                                    <MapPin size={13} />
                                                    {item.room}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Remaining classes preview */}
                                {todayClasses.length > 2 && (
                                    <div className="td-more-classes">
                                        <div className="td-more-header">
                                            <Sparkles size={14} />
                                            <span>{todayClasses.length - 2} more classes today</span>
                                        </div>
                                        <div className="td-more-list">
                                            {todayClasses.slice(2).map((item) => (
                                                <div key={item.id} className="td-more-item">
                                                    <span className="td-more-time">{item.time}</span>
                                                    <span className="td-more-subject">{item.icon} {item.subject}</span>
                                                    <span className="td-more-class">{item.class}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Quick Actions - Right Column */}
                            <div className="td-quick-section">
                                <div className="td-section-header">
                                    <div className="td-header-left">
                                        <div className="td-header-icon-wrap quick">
                                            <LayoutDashboard size={18} />
                                        </div>
                                        <div>
                                            <h3>Quick Actions</h3>
                                            <p>Frequently used tools</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="td-quick-grid">
                                    <Link to="/teacher/add-homework" className="td-quick-card">
                                        <div className="td-quick-icon homework">
                                            <BookOpen size={20} />
                                        </div>
                                        <div className="td-quick-info">
                                            <h4>Add Homework</h4>
                                            <p>Assign tasks to students</p>
                                        </div>
                                        <ChevronRight size={16} className="td-quick-arrow" />
                                    </Link>

                                    <Link to="/teacher/attendance" className="td-quick-card">
                                        <div className="td-quick-icon attendance">
                                            <CheckCircle size={20} />
                                        </div>
                                        <div className="td-quick-info">
                                            <h4>Take Attendance</h4>
                                            <p>Mark student presence</p>
                                        </div>
                                        <ChevronRight size={16} className="td-quick-arrow" />
                                    </Link>

                                    <Link to="/teacher/add-diary" className="td-quick-card">
                                        <div className="td-quick-icon diary">
                                            <FileText size={20} />
                                        </div>
                                        <div className="td-quick-info">
                                            <h4>Class Diary</h4>
                                            <p>Record daily lessons</p>
                                        </div>
                                        <ChevronRight size={16} className="td-quick-arrow" />
                                    </Link>

                                    <Link to="/teacher/notices" className="td-quick-card">
                                        <div className="td-quick-icon notice">
                                            <ClipboardList size={20} />
                                        </div>
                                        <div className="td-quick-info">
                                            <h4>Post Notice</h4>
                                            <p>Share announcements</p>
                                        </div>
                                        <ChevronRight size={16} className="td-quick-arrow" />
                                    </Link>
                                    <Link to="/teacher/add-student" className="td-quick-card">
                                        <div className="td-quick-icon notice">
                                            <User size={20} />
                                        </div>
                                        <div className="td-quick-info">
                                            <h4>Add Student</h4>
                                            <p>add new student details</p>
                                        </div>
                                        <ChevronRight size={16} className="td-quick-arrow" />
                                    </Link>
                                    <Link to="/teacher/add-student" className="td-quick-card">
                                        <div className="td-quick-icon notice">
                                            <User size={20} />
                                        </div>
                                        <div className="td-quick-info">
                                            <h4>Edit Student Profile</h4>
                                            <p>manage student details</p>
                                        </div>
                                        <ChevronRight size={16} className="td-quick-arrow" />
                                    </Link>

                                    <Link to="/teacher/timetable" className="td-quick-card">
                                        <div className="td-quick-icon timetable">
                                            <ChartColumn size={20} />
                                        </div>
                                        <div className="td-quick-info">
                                            <h4>Time Table</h4>
                                            <p>Manage class schedule</p>
                                        </div>
                                        <ChevronRight size={16} className="td-quick-arrow" />
                                    </Link>

                                    <Link to="/teacher/academic-report" className="td-quick-card">
                                        <div className="td-quick-icon report">
                                            <Award size={20} />
                                        </div>
                                        <div className="td-quick-info">
                                            <h4>Academic Report</h4>
                                            <p>Add exam marks</p>
                                        </div>
                                        <ChevronRight size={16} className="td-quick-arrow" />
                                    </Link>

                                    <Link to="/teacher/academic-calendar" className="td-quick-card">
                                        <div className="td-quick-icon calendar-q">
                                            <Calendar size={20} />
                                        </div>
                                        <div className="td-quick-info">
                                            <h4>Academic Calendar</h4>
                                            <p>Manage events & holidays</p>
                                        </div>
                                        <ChevronRight size={16} className="td-quick-arrow" />
                                    </Link>

                                    <Link to="/teacher/fees" className="td-quick-card">
                                        <div className="td-quick-icon fee">
                                            <ReceiptIndianRupee size={20} />
                                        </div>
                                        <div className="td-quick-info">
                                            <h4>Fee Management</h4>
                                            <p>Track student fees</p>
                                        </div>
                                        <ChevronRight size={16} className="td-quick-arrow" />
                                    </Link>
                                    <Link to="/teacher/contact" className="td-quick-card">
                                        <div className="td-quick-icon fee">
                                            <User2Icon size={16} />
                                        </div>
                                        <div className="td-quick-info">
                                            <h4>Contact</h4>
                                            <p>Edit Contact Details</p>
                                        </div>
                                        <ChevronRight size={16} className="td-quick-arrow" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default TeacherDashboard;