import Header from "../../../components/layout/Header/Header";
import Sidebar from "../../../components/layout/Sidebar/StudentSidebar";
import Footer from "../../../components/layout/Footer/Footer";
import '../styles/attendance.css'
import { useState, useEffect } from "react";
import {
    ArrowLeft, Calendar as CalendarIcon, User, CheckCircle,
    XCircle, Moon, TrendingUp, ChevronLeft, ChevronRight,
    Download, Filter, ChevronDown, BarChart3, AlertCircle,
    Info, Award, Clock, ThumbsUp, Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

const Attendance = () => {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [showMonthDropdown, setShowMonthDropdown] = useState(false);
    const [showYearDropdown, setShowYearDropdown] = useState(false);
    const [viewMode, setViewMode] = useState("calendar");
    const [selectedDate, setSelectedDate] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [open, setOpen] = useState(false);
    const [attendanceData, setAttendanceData] = useState({
        year: 2024,
        month: 0,
        totalDays: 0,
        presentDays: 0,
        absentDays: 0,
        holidayDays: 0,
        attendancePercentage: 0,
        records: {}
    });

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Generate years (current year - 3 to current year + 3)
    const currentYearActual = new Date().getFullYear();
    const years = Array.from({ length: 7 }, (_, i) => currentYearActual - 3 + i);

    // Sample attendance data generator based on selected month/year
    const getAttendanceData = () => {
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const records = {};
        let presentCount = 0;
        let absentCount = 0;
        let holidayCount = 0;

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();

            // Weekends (Saturday=6, Sunday=0) as holidays
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                records[dateStr] = { status: "holiday", dayType: "weekend" };
                holidayCount++;
            } else {
                // Mock attendance pattern: 85% present rate
                const randomNum = Math.random();
                if (randomNum < 0.85) {
                    records[dateStr] = { status: "present", dayType: "working" };
                    presentCount++;
                } else {
                    records[dateStr] = { status: "absent", dayType: "working" };
                    absentCount++;
                }
            }
        }

        const totalDays = presentCount + absentCount;
        const attendancePercentage = totalDays > 0 ? ((presentCount / totalDays) * 100).toFixed(1) : 0;

        return {
            year: currentYear,
            month: currentMonth,
            totalDays: totalDays,
            presentDays: presentCount,
            absentDays: absentCount,
            holidayDays: holidayCount,
            attendancePercentage: parseFloat(attendancePercentage),
            records: records
        };
    };

    // Update data when month/year changes
    useEffect(() => {
        setAttendanceData(getAttendanceData());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentMonth, currentYear]);

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "present": return "#10b981";
            case "absent": return "#ef4444";
            case "holiday": return "#f59e0b";
            default: return "#e5e7eb";
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case "present": return "P";
            case "absent": return "A";
            case "holiday": return "H";
            default: return "-";
        }
    };

    const getStatusFullName = (status) => {
        switch (status) {
            case "present": return "Present";
            case "absent": return "Absent";
            case "holiday": return "Holiday";
            default: return "Unknown";
        }
    };

    const handleDateClick = (dateStr, status) => {
        setSelectedDate({ date: dateStr, status });
        setTimeout(() => setSelectedDate(null), 3000);
    };

    const showNotification = (message, type = "success") => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Calendar navigation functions
    const goToPreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(prevYear => prevYear - 1);
        } else {
            setCurrentMonth(prevMonth => prevMonth - 1);
        }
        showNotification(`Switched to ${currentMonth === 0 ? months[11] : months[currentMonth - 1]} ${currentMonth === 0 ? currentYear - 1 : currentYear}`, "info");
    };

    const goToNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(prevYear => prevYear + 1);
        } else {
            setCurrentMonth(prevMonth => prevMonth + 1);
        }
        showNotification(`Switched to ${currentMonth === 11 ? months[0] : months[currentMonth + 1]} ${currentMonth === 11 ? currentYear + 1 : currentYear}`, "info");
    };

    const goToCurrentMonth = () => {
        const today = new Date();
        setCurrentMonth(today.getMonth());
        setCurrentYear(today.getFullYear());
        showNotification(`Switched to ${months[today.getMonth()]} ${today.getFullYear()}`, "success");
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);
        const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
        const today = new Date();
        const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;
        const currentDate = today.getDate();

        const calendarDays = [];

        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="attendance-calendar-day empty"></div>);
        }

        // Add actual days
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const record = attendanceData.records[dateStr];
            const status = record ? record.status : "working";
            const isToday = isCurrentMonth && day === currentDate;
            const isSelected = selectedDate?.date === dateStr;

            calendarDays.push(
                <div
                    key={day}
                    className={`attendance-calendar-day ${status} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleDateClick(dateStr, status)}
                >
                    <span className="day-number">{day}</span>
                    <span className="status-indicator" style={{ backgroundColor: getStatusColor(status) }}>
                        {getStatusLabel(status)}
                    </span>
                </div>
            );
        }

        return calendarDays;
    };

    const handleMonthSelect = (monthIndex) => {
        setCurrentMonth(monthIndex);
        setShowMonthDropdown(false);
        showNotification(`Switched to ${months[monthIndex]} ${currentYear}`, "info");
    };

    const handleYearSelect = (year) => {
        setCurrentYear(year);
        setShowYearDropdown(false);
        showNotification(`Switched to ${months[currentMonth]} ${year}`, "info");
    };

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(prevYear => prevYear - 1);
        } else {
            setCurrentMonth(prevMonth => prevMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(prevYear => prevYear + 1);
        } else {
            setCurrentMonth(prevMonth => prevMonth + 1);
        }
    };

    const handleExportData = () => {
        try {
            const csvData = [
                ["Date", "Status", "Day Type"],
                ...Object.entries(attendanceData.records).map(([date, data]) => [
                    date,
                    data.status,
                    data.dayType
                ])
            ];

            const csvContent = csvData.map(row => row.join(",")).join("\n");
            const blob = new Blob([csvContent], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `attendance_${currentYear}_${months[currentMonth]}.csv`;
            a.click();
            URL.revokeObjectURL(url);
            showNotification("Attendance data exported successfully!", "success");
        } catch (error) {
            showNotification("Error exporting data", error);
        }
    };

    const getAttendanceTrend = () => {
        const currentPercentage = attendanceData.attendancePercentage;
        const targetPercentage = 85;
        const difference = (currentPercentage - targetPercentage).toFixed(1);
        const trendValue = parseFloat(difference);

        if (trendValue > 0) return `+${difference}% above target`;
        if (trendValue < 0) return `${difference}% below target`;
        return "At target";
    };

    const getAttendanceMessage = () => {
        const percentage = attendanceData.attendancePercentage;
        if (percentage >= 90) return "Excellent! Keep it up! 🎉";
        if (percentage >= 75) return "Good job! Can improve further 💪";
        if (percentage >= 60) return "Needs improvement 📚";
        return "Please focus on regular attendance ⚠️";
    };

    const getAttendanceColor = () => {
        const percentage = attendanceData.attendancePercentage;
        if (percentage >= 90) return "#10b981";
        if (percentage >= 75) return "#f59e0b";
        if (percentage >= 60) return "#f97316";
        return "#ef4444";
    };

    return (
        <div className="attendance-container">
            <Header open={open} setOpen={setOpen} />

            {/* Toast Notification */}
            {showToast && (
                <div className={`attendance-toast ${toastType}`}>
                    <div className="toast-content">
                        {toastType === "success" ? <CheckCircle size={18} /> :
                            toastType === "error" ? <AlertCircle size={18} /> :
                                <Info size={18} />}
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}

            <div className="attendance-layout">
                <Sidebar open={open} />
                <div className="attendance-content">
                    <div className="back-nav" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                        <span>Back to Dashboard</span>
                    </div>

                    <div className="page-header-att">
                        <div className="header-left">
                            <div className="header-icon">
                                <User size={24} />
                            </div>
                            <div>
                                <h1>Student Attendance</h1>
                                <p>Class 10-A • Academic Year 2025-26</p>
                            </div>
                        </div>
                        <div className="attendance-header-actions">
                            <button className="attendance-btn-export" onClick={handleExportData}>
                                <Download size={18} />
                                Export Report
                            </button>
                        </div>
                    </div>

                    {/* Enhanced Month/Year Selection */}
                    <div className="attendance-enhanced-month-navigation">
                        <div className="attendance-nav-controls">
                            <button className="attendance-nav-btn-icon" onClick={handlePrevMonth} aria-label="Previous month">
                                <ChevronLeft size={20} />
                            </button>

                            <div className="attendance-date-selectors">
                                <div className="attendance-dropdown-container">
                                    <button
                                        className="attendance-dropdown-btn"
                                        onClick={() => {
                                            setShowMonthDropdown(!showMonthDropdown);
                                            setShowYearDropdown(false);
                                        }}
                                        aria-label="Select month"
                                    >
                                        <CalendarIcon size={18} />
                                        <span className="selected-month-name">{months[currentMonth]}</span>
                                        <ChevronDown size={16} className={`attendance-dropdown-icon ${showMonthDropdown ? 'rotate' : ''}`} />
                                    </button>
                                    {showMonthDropdown && (
                                        <div className="attendance-dropdown-menu attendance-months-menu">
                                            {months.map((month, index) => (
                                                <div
                                                    key={index}
                                                    className={`attendance-dropdown-item ${currentMonth === index ? 'active' : ''}`}
                                                    onClick={() => handleMonthSelect(index)}
                                                >
                                                    {month}
                                                    {currentMonth === index && <CheckCircle size={14} />}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="attendance-dropdown-container">
                                    <button
                                        className="attendance-dropdown-btn"
                                        onClick={() => {
                                            setShowYearDropdown(!showYearDropdown);
                                            setShowMonthDropdown(false);
                                        }}
                                        aria-label="Select year"
                                    >
                                        <CalendarIcon size={18} />
                                        {currentYear}
                                        <ChevronDown size={16} className={`attendance-dropdown-icon ${showYearDropdown ? 'rotate' : ''}`} />
                                    </button>
                                    {showYearDropdown && (
                                        <div className="attendance-dropdown-menu attendance-years-menu">
                                            {years.map((year) => (
                                                <div
                                                    key={year}
                                                    className={`attendance-dropdown-item ${currentYear === year ? 'active' : ''}`}
                                                    onClick={() => handleYearSelect(year)}
                                                >
                                                    {year}
                                                    {currentYear === year && <CheckCircle size={14} />}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button className="attendance-nav-btn-icon" onClick={handleNextMonth} aria-label="Next month">
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        <div className="attendance-trend-badge">
                            <TrendingUp size={16} />
                            <span>{getAttendanceTrend()}</span>
                        </div>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="attendance-view-toggle">
                        <button
                            className={`attendance-toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                            onClick={() => setViewMode('calendar')}
                        >
                            <CalendarIcon size={16} />
                            Calendar View
                        </button>
                        <button
                            className={`attendance-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            <Filter size={16} />
                            List View
                        </button>
                        <button
                            className={`attendance-toggle-btn ${viewMode === 'summary' ? 'active' : ''}`}
                            onClick={() => setViewMode('summary')}
                        >
                            <BarChart3 size={16} />
                            Analytics
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="stats-grid-at">
                        <div className="stat-card-at overall-at">
                            <div className="stat-icon-at">
                                <Activity size={24} />
                            </div>
                            <div className="stat-info-at">
                                <span className="stat-label-at">Overall Attendance</span>
                                <span className="stat-value-at" style={{ color: getAttendanceColor() }}>
                                    {attendanceData.attendancePercentage}%
                                </span>
                                <div className="progress-bar-at">
                                    <div className="progress-fill-at" style={{ width: `${attendanceData.attendancePercentage}%`, background: getAttendanceColor() }}></div>
                                </div>
                                <span className="attendance-message">{getAttendanceMessage()}</span>
                            </div>
                        </div>
                        <div className="stat-card-at present-at">
                            <div className="stat-icon-at">
                                <CheckCircle size={24} />
                            </div>
                            <div className="stat-info-at">
                                <span className="stat-label-at">Present</span>
                                <span className="stat-value-at">{attendanceData.presentDays}</span>
                                <span className="stat-sub-at">days</span>
                                <div className="stat-trend">
                                    <ThumbsUp size={14} />
                                    <span>Good attendance</span>
                                </div>
                            </div>
                        </div>
                        <div className="stat-card-at absent-at">
                            <div className="stat-icon-at">
                                <XCircle size={24} />
                            </div>
                            <div className="stat-info-at">
                                <span className="stat-label-at">Absent</span>
                                <span className="stat-value-at">{attendanceData.absentDays}</span>
                                <span className="stat-sub-at">days</span>
                                <div className="stat-warning">
                                    <AlertCircle size={14} />
                                    <span>Need improvement</span>
                                </div>
                            </div>
                        </div>
                        <div className="stat-card-at holiday-at">
                            <div className="stat-icon-at">
                                <Moon size={24} />
                            </div>
                            <div className="stat-info-at">
                                <span className="stat-label-at">Holidays</span>
                                <span className="stat-value-at">{attendanceData.holidayDays}</span>
                                <span className="stat-sub-at">days</span>
                                <div className="stat-info-text">
                                    <Clock size={14} />
                                    <span>Weekends & breaks</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Conditional Rendering based on viewMode */}
                    {viewMode === 'calendar' && (
                        <div className="calendar-wrapper">
                            <div className="calendar-header">
                                <div className="calendar-title-section">
                                    <h3>Attendance Calendar</h3>
                                    <p className="calendar-subtitle">{months[currentMonth]} {currentYear}</p>
                                </div>
                                {/* Calendar Navigation Buttons */}
                                <div className="calendar-nav-buttons">
                                    <button className="calendar-nav-btn" onClick={goToPreviousMonth} title="Previous Month">
                                        <ChevronLeft size={18} />
                                        <span>Prev</span>
                                    </button>
                                    <button className="calendar-nav-btn current-btn" onClick={goToCurrentMonth} title="Current Month">
                                        <CalendarIcon size={16} />
                                        <span>Current</span>
                                    </button>
                                    <button className="calendar-nav-btn" onClick={goToNextMonth} title="Next Month">
                                        <span>Next</span>
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                                <div className="legend">
                                    <div className="legend-item">
                                        <span className="legend-dot present"></span>
                                        <span>Present</span>
                                    </div>
                                    <div className="legend-item">
                                        <span className="legend-dot absent"></span>
                                        <span>Absent</span>
                                    </div>
                                    <div className="legend-item">
                                        <span className="legend-dot holiday"></span>
                                        <span>Holiday</span>
                                    </div>
                                    <div className="legend-item">
                                        <span className="legend-dot today"></span>
                                        <span>Today</span>
                                    </div>
                                </div>
                            </div>

                            <div className="calendar-grid">
                                <div className="calendar-weekdays">
                                    <span>Sun</span>
                                    <span>Mon</span>
                                    <span>Tue</span>
                                    <span>Wed</span>
                                    <span>Thu</span>
                                    <span>Fri</span>
                                    <span>Sat</span>
                                </div>
                                <div className="calendar-days">
                                    {renderCalendar()}
                                </div>
                            </div>

                            {selectedDate && (
                                <div className="date-tooltip">
                                    <strong>{new Date(selectedDate.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</strong>
                                    <span className={`tooltip-status ${selectedDate.status}`}>
                                        {getStatusFullName(selectedDate.status)}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    {viewMode === 'list' && (
                        <div className="attendance-list-view-wrapper">
                            <div className="list-header">
                                <h3>Daily Attendance Record</h3>
                                <div className="list-stats">
                                    <span>Total: {attendanceData.totalDays} days</span>
                                    <span className="present-count">Present: {attendanceData.presentDays}</span>
                                    <span className="absent-count">Absent: {attendanceData.absentDays}</span>
                                </div>
                            </div>
                            <div className="attendance-list">
                                {Object.entries(attendanceData.records).map(([date, data]) => {
                                    const formattedDate = new Date(date).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    });
                                    return (
                                        <div key={date} className={`attendance-list-item ${data.status}`}>
                                            <div className="attendance-list-item-date">
                                                <CalendarIcon size={16} />
                                                <span>{formattedDate}</span>
                                            </div>
                                            <div className="attendance-list-item-status">
                                                <span
                                                    className="attendance-status-badge"
                                                    style={{ backgroundColor: getStatusColor(data.status) }}
                                                >
                                                    {data.status.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {viewMode === 'summary' && (
                        <div className="attendance-summary-view-wrapper">
                            <h3>Performance Analytics</h3>
                            <div className="attendance-detailed-summary-grid">
                                <div className="attendance-summary-card">
                                    <h4>
                                        <Award size={16} />
                                        Attendance Distribution
                                    </h4>
                                    <div className="attendance-distribution-chart">
                                        <div className="attendance-chart-bar">
                                            <div className="attendance-bar-label">Present</div>
                                            <div className="attendance-bar-bg">
                                                <div
                                                    className="attendance-bar-fill present-fill"
                                                    style={{ width: `${attendanceData.totalDays > 0 ? (attendanceData.presentDays / attendanceData.totalDays) * 100 : 0}%` }}
                                                ></div>
                                            </div>
                                            <div className="attendance-bar-percentage">
                                                {attendanceData.totalDays > 0 ? Math.round((attendanceData.presentDays / attendanceData.totalDays) * 100) : 0}%
                                            </div>
                                        </div>
                                        <div className="attendance-chart-bar">
                                            <div className="attendance-bar-label">Absent</div>
                                            <div className="attendance-bar-bg">
                                                <div
                                                    className="attendance-bar-fill absent-fill"
                                                    style={{ width: `${attendanceData.totalDays > 0 ? (attendanceData.absentDays / attendanceData.totalDays) * 100 : 0}%` }}
                                                ></div>
                                            </div>
                                            <div className="attendance-bar-percentage">
                                                {attendanceData.totalDays > 0 ? Math.round((attendanceData.absentDays / attendanceData.totalDays) * 100) : 0}%
                                            </div>
                                        </div>
                                        <div className="attendance-chart-bar">
                                            <div className="attendance-bar-label">Holidays</div>
                                            <div className="attendance-bar-bg">
                                                <div
                                                    className="attendance-bar-fill holiday-fill"
                                                    style={{ width: `${attendanceData.totalDays > 0 ? (attendanceData.holidayDays / attendanceData.totalDays) * 100 : 0}%` }}
                                                ></div>
                                            </div>
                                            <div className="attendance-bar-percentage">
                                                {attendanceData.totalDays > 0 ? Math.round((attendanceData.holidayDays / attendanceData.totalDays) * 100) : 0}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="attendance-summary-card">
                                    <h4>Attendance Insights</h4>
                                    <div className="attendance-insights">
                                        <div className="insight-item">
                                            <span className="insight-label">Attendance Rate</span>
                                            <span className="insight-value" style={{ color: getAttendanceColor(), fontSize: '32px', fontWeight: 'bold' }}>
                                                {attendanceData.attendancePercentage}%
                                            </span>
                                        </div>
                                        <div className="insight-item">
                                            <span className="insight-label">Status</span>
                                            <span className="insight-status">
                                                {attendanceData.attendancePercentage >= 90 ? 'Excellent' :
                                                    attendanceData.attendancePercentage >= 75 ? 'Good' :
                                                        attendanceData.attendancePercentage >= 60 ? 'Average' : 'Needs Attention'}
                                            </span>
                                        </div>
                                        <div className="insight-item">
                                            <span className="insight-label">Recommendation</span>
                                            <span className="insight-recommendation">
                                                {getAttendanceMessage()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Month Summary */}
                    <div className="month-summary">
                        <h3>Month Summary</h3>
                        <div className="summary-grid-at">
                            <div className="summary-item">
                                <span className="summary-label">Total Working Days</span>
                                <span className="summary-value">{attendanceData.totalDays}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">Days Attended</span>
                                <span className="summary-value">{attendanceData.presentDays}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">Days Missed</span>
                                <span className="summary-value">{attendanceData.absentDays}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">Attendance Rate</span>
                                <span className="summary-value highlight" style={{ color: getAttendanceColor() }}>
                                    {attendanceData.attendancePercentage}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Attendance;