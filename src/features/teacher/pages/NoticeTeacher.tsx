import React, { useState } from 'react';
import "./noticeteacher.css";
import {
    House, Bell, BookOpen, BookText, User, Clock, PanelLeftRightDashed,
    ReceiptIndianRupee, ChartColumn, Calendar, MessageSquare, Bus, Contact,
    TrendingUp, Award, Percent, Info, ArrowLeft, Plus, Edit, Trash2,
    Megaphone, X, CheckCircle, AlertCircle, Calendar as CalendarIcon,
    Clock as ClockIcon, MapPin, Users, FolderOpen
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NoticeTeacher = () => {
    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingNotice, setEditingNotice] = useState(null);
    const [notices, setNotices] = useState([
        {
            id: 1,
            title: "Annual Sports Day Announcement",
            description: "The Annual Sports Day will be held on 25th April 2026. All teachers are requested to coordinate with the sports department for event assignments.",
            date: "2026-04-12",
            time: "08:00 AM",
            location: "School Ground",
            targetAudience: "All Teachers & Staff",
            priority: "high",
            category: "Event"
        },
        {
            id: 2,
            title: "Parent-Teacher Meeting Schedule",
            description: "Parent-Teacher Meeting for classes 9-12 will be conducted on 18th April 2026. Please prepare progress reports and student portfolios.",
            date: "2026-04-15",
            time: "10:00 AM",
            location: "Classrooms & Auditorium",
            targetAudience: "All Teachers",
            priority: "medium",
            category: "Meeting"
        },
        {
            id: 3,
            title: "Half-Yearly Examination Routine",
            description: "The half-yearly examinations will commence from 1st May 2026. Please submit question papers by 20th April.",
            date: "2026-04-15",
            time: "10:00 AM",
            location: "Exam Department",
            targetAudience: "Teaching Staff",
            priority: "high",
            category: "Academic"
        },
        {
            id: 4,
            title: "Holiday Notice - Holi",
            description: "The institution will remain closed on 14th March 2026 on account of Holi.",
            date: "2026-04-15",
            time: "10:00 AM",
            location: "N/A",
            targetAudience: "All Staff & Students",
            priority: "low",
            category: "Holiday"
        }
    ]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        targetAudience: '',
        priority: 'medium',
        category: 'General'
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddNotice = () => {
        try {
            if (!formData.title || !formData.title.trim()) {
                alert("Please enter notice title!");
                return;
            }
            if (!formData.description || !formData.description.trim()) {
                alert("Please enter notice description!");
                return;
            }
            if (!formData.date) {
                alert("Please select a date!");
                return;
            }

            if (editingNotice) {
                // Update existing notice
                const updatedNotices = notices.map(notice =>
                    notice.id === editingNotice.id
                        ? {
                            ...formData,
                            id: notice.id,
                            time: formData.time || "12:00 PM",
                            location: formData.location || "N/A",
                            targetAudience: formData.targetAudience || "All Staff"
                        }
                        : notice
                );
                setNotices(updatedNotices);
            } else {
                // Add new notice
                const timestamp = new Date().getTime();
                const newNotice = {
                    id: timestamp,
                    title: formData.title.trim(),
                    description: formData.description.trim(),
                    date: formData.date,
                    time: formData.time || "12:00 PM",
                    location: formData.location || "N/A",
                    targetAudience: formData.targetAudience || "All Staff",
                    priority: formData.priority,
                    category: formData.category
                };
                setNotices([newNotice, ...notices]);
            }

            resetForm();
            setShowModal(false);
        } catch (error) {
            console.error("Error in handleAddNotice:", error);
            alert("An error occurred while saving the notice. Please try again.");
        }
    };

    const handleEditNotice = (notice) => {
        try {
            setEditingNotice(notice);
            setFormData({
                title: notice.title || '',
                description: notice.description || '',
                date: notice.date || '',
                time: notice.time || '',
                location: notice.location || '',
                targetAudience: notice.targetAudience || '',
                priority: notice.priority || 'medium',
                category: notice.category || 'General'
            });
            setShowModal(true);
        } catch (error) {
            console.error("Error in handleEditNotice:", error);
            alert("An error occurred while editing the notice.");
        }
    };

    const handleDeleteNotice = (id) => {
        try {
            if (window.confirm("Are you sure you want to delete this notice?")) {
                setNotices(notices.filter(notice => notice.id !== id));
            }
        } catch (error) {
            console.error("Error in handleDeleteNotice:", error);
            alert("An error occurred while deleting the notice.");
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            date: '',
            time: '',
            location: '',
            targetAudience: '',
            priority: 'medium',
            category: 'General'
        });
        setEditingNotice(null);
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'high': return 't-n-priority-high';
            case 'medium': return 't-n-priority-medium';
            case 'low': return 't-n-priority-low';
            default: return '';
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'high': return <AlertCircle size={14} />;
            case 'medium': return <Info size={14} />;
            case 'low': return <CheckCircle size={14} />;
            default: return null;
        }
    };

    const isUpcoming = (dateString) => {
        try {
            if (!dateString) return false;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const noticeDate = new Date(dateString);
            if (isNaN(noticeDate.getTime())) return false;
            noticeDate.setHours(0, 0, 0, 0);
            return noticeDate >= today;
        } catch (error) {
            console.error("Error in isUpcoming:", error);
            return false;
        }
    };

    const formatDate = (dateString) => {
        try {
            if (!dateString) return 'Date not set';
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return dateString;
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return date.toLocaleDateString(undefined, options);
        } catch (error) {
            console.error("Error in formatDate:", error);
            return dateString || 'Invalid date';
        }
    };

    // Safe notice count for upcoming
    const getUpcomingCount = () => {
        try {
            return notices.filter(n => n.date && isUpcoming(n.date)).length;
        } catch (error) {
            console.error("Error in getUpcomingCount:", error);
            return 0;
        }
    };

    return (
        <>
            <div className="t-n-page-wrapper">
                <Header open={open} setOpen={setOpen} />
                <div className="t-n-layout">
                    <Sidebar open={open} />
                    <div className="t-n-content">
                        {/* Back Navigation */}
                        <div className="t-n-back-nav" onClick={() => navigate(-1)}>
                            <ArrowLeft size={18} />
                            <span>Back to Dashboard</span>
                        </div>

                        {/* Header Section */}
                        <div className="t-n-notice-header">
                            <div className="t-n-notice-title-section">
                                <div className="t-n-notice-icon-wrapper">
                                    <Megaphone size={24} />
                                </div>
                                <div>
                                    <h2>Notice Board</h2>
                                    <p>Manage and publish important announcements for staff and students</p>
                                </div>
                            </div>
                            <button
                                className="t-n-add-notice-btn"
                                onClick={() => {
                                    resetForm();
                                    setShowModal(true);
                                }}
                            >
                                <Plus size={18} />
                                <span>Add New Notice</span>
                            </button>
                        </div>

                        {/* Statistics Cards */}
                        <div className="t-n-notice-stats">
                            <div className="t-n-stat-card">
                                <div className="t-n-stat-icon"><Megaphone size={20} /></div>
                                <div className="t-n-stat-info">
                                    <h4>{notices.length}</h4>
                                    <p>Total Notices</p>
                                </div>
                            </div>
                            <div className="t-n-stat-card">
                                <div className="t-n-stat-icon"><CalendarIcon size={20} /></div>
                                <div className="t-n-stat-info">
                                    <h4>{getUpcomingCount()}</h4>
                                    <p>Upcoming</p>
                                </div>
                            </div>
                            <div className="t-n-stat-card">
                                <div className="t-n-stat-icon"><Users size={20} /></div>
                                <div className="t-n-stat-info">
                                    <h4>{notices.length}</h4>
                                    <p>Active Notices</p>
                                </div>
                            </div>
                        </div>

                        {/* Notices List */}
                        <div className="t-n-schedule-section">
                            {notices.length === 0 ? (
                                <div className="t-n-empty-state">
                                    <FolderOpen size={48} strokeWidth={1.5} />
                                    <h3>No Notices Found</h3>
                                    <p>Click "Add New Notice" to create your first announcement</p>
                                </div>
                            ) : (
                                <div className="t-n-notice-container">
                                    {notices.map((notice) => (
                                        <div key={notice.id} className="t-n-notice-card">
                                            <div className="t-n-notice-left">
                                                <span className="t-n-notice-dot">
                                                    <Megaphone size={18} />
                                                </span>
                                                <div className="t-n-notice-text">
                                                    <div className="t-n-notice-title-row">
                                                        <p className="t-n-notice-title">{notice.title}</p>
                                                        <div className={`t-n-priority-badge ${getPriorityClass(notice.priority)}`}>
                                                            {getPriorityIcon(notice.priority)}
                                                            <span>{notice.priority}</span>
                                                        </div>
                                                    </div>
                                                    <p className="t-n-notice-description">{notice.description}</p>
                                                    <div className="t-n-notice-meta-grid">
                                                        <span className="t-n-meta-item">
                                                            <CalendarIcon size={14} />
                                                            {formatDate(notice.date)}
                                                        </span>
                                                        <span className="t-n-meta-item">
                                                            <ClockIcon size={14} />
                                                            {notice.time}
                                                        </span>
                                                        {notice.location && notice.location !== 'N/A' && (
                                                            <span className="t-n-meta-item">
                                                                <MapPin size={14} />
                                                                {notice.location}
                                                            </span>
                                                        )}
                                                        <span className="t-n-meta-item">
                                                            <Users size={14} />
                                                            {notice.targetAudience}
                                                        </span>
                                                        <span className="t-n-meta-category">{notice.category}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="t-n-notice-actions">
                                                <button
                                                    className="t-n-edit-btn"
                                                    onClick={() => handleEditNotice(notice)}
                                                    title="Edit Notice"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    className="t-n-delete-btn"
                                                    onClick={() => handleDeleteNotice(notice.id)}
                                                    title="Delete Notice"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

            {/* Add/Edit Notice Modal */}
            {showModal && (
                <div className="t-n-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="t-n-modal-container" onClick={(e) => e.stopPropagation()}>
                        <div className="t-n-modal-header">
                            <h3>{editingNotice ? 'Edit Notice' : 'Add New Notice'}</h3>
                            <button className="t-n-close-modal" onClick={() => setShowModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="t-n-modal-body">
                            <div className="t-n-form-group">
                                <label>Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter notice title"
                                />
                            </div>
                            <div className="t-n-form-group">
                                <label>Description *</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    placeholder="Enter detailed notice description"
                                />
                            </div>
                            <div className="t-n-form-row">
                                <div className="t-n-form-group">
                                    <label>Date *</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="t-n-form-group">
                                    <label>Time</label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="t-n-form-row">
                                <div className="t-n-form-group">
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="Venue / Location"
                                    />
                                </div>
                                <div className="t-n-form-group">
                                    <label>Target Audience</label>
                                    <input
                                        type="text"
                                        name="targetAudience"
                                        value={formData.targetAudience}
                                        onChange={handleInputChange}
                                        placeholder="e.g., All Teachers, Class 10 Students"
                                    />
                                </div>
                            </div>
                            <div className="t-n-form-row">
                                <div className="t-n-form-group">
                                    <label>Priority</label>
                                    <select name="priority" value={formData.priority} onChange={handleInputChange}>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                                <div className="t-n-form-group">
                                    <label>Category</label>
                                    <select name="category" value={formData.category} onChange={handleInputChange}>
                                        <option value="General">General</option>
                                        <option value="Event">Event</option>
                                        <option value="Meeting">Meeting</option>
                                        <option value="Academic">Academic</option>
                                        <option value="Holiday">Holiday</option>
                                        <option value="Emergency">Emergency</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="t-n-modal-footer">
                            <button className="t-n-cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="t-n-submit-btn" onClick={handleAddNotice}>
                                {editingNotice ? 'Update Notice' : 'Publish Notice'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NoticeTeacher;