import Header from "../../../components/layout/Header/Header";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import Footer from "../../../components/layout/Footer/Footer";
import '../styles/attendanceteach.css'
import { useState, useMemo } from "react";  // ✅ useEffect hatao, useMemo add karo
import {
    ArrowLeft, Calendar as CalendarIcon, User, CheckCircle,
    XCircle, ChevronLeft, ChevronRight,
    Download, ChevronDown, AlertCircle,
    Info, Clock, Search,
    Save, RefreshCw, UserCheck,
    UserX, Clock as ClockIcon, CalendarDays,
    Sparkles, Users, List, Grid
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AttendanceTeach = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedClass, setSelectedClass] = useState("10");
    const [selectedSection, setSelectedSection] = useState("A");
    const [showClassDropdown, setShowClassDropdown] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [viewMode, setViewMode] = useState("mark");
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [searchStudent, setSearchStudent] = useState("");

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

    // Students data
    const [students, setStudents] = useState([
        { id: 1, rollNo: 1, name: "Aarav Sharma", status: "present", remark: "", attendanceMarked: false },
        { id: 2, rollNo: 2, name: "Vihaan Kumar", status: "present", remark: "", attendanceMarked: false },
        { id: 3, rollNo: 3, name: "Vivaan Singh", status: "present", remark: "", attendanceMarked: false },
        { id: 4, rollNo: 4, name: "Ananya Verma", status: "present", remark: "", attendanceMarked: false },
        { id: 5, rollNo: 5, name: "Diya Reddy", status: "present", remark: "", attendanceMarked: false },
        { id: 6, rollNo: 6, name: "Advik Malhotra", status: "absent", remark: "Sick", attendanceMarked: false },
        { id: 7, rollNo: 7, name: "Krishna Iyer", status: "present", remark: "", attendanceMarked: false },
        { id: 8, rollNo: 8, name: "Ishita Gupta", status: "present", remark: "", attendanceMarked: false },
        { id: 9, rollNo: 9, name: "Myra Nair", status: "late", remark: "Arrived 10 mins late", attendanceMarked: false },
        { id: 10, rollNo: 10, name: "Reyansh Joshi", status: "present", remark: "", attendanceMarked: false },
        { id: 11, rollNo: 11, name: "Sai Patel", status: "absent", remark: "Family function", attendanceMarked: false },
        { id: 12, rollNo: 12, name: "Aadhya Menon", status: "present", remark: "", attendanceMarked: false },
    ]);

    // Attendance History
    const [attendanceHistory, setAttendanceHistory] = useState({
        "2026-04-15": { 1: "present", 2: "present", 3: "absent", 4: "present", 5: "present", 6: "absent", 7: "present", 8: "present", 9: "late", 10: "present", 11: "present", 12: "present" },
        "2026-04-16": { 1: "present", 2: "absent", 3: "present", 4: "present", 5: "late", 6: "present", 7: "present", 8: "absent", 9: "present", 10: "present", 11: "present", 12: "present" },
        "2026-04-18": { 1: "present", 2: "present", 3: "present", 4: "absent", 5: "present", 6: "absent", 7: "present", 8: "present", 9: "present", 10: "late", 11: "present", 12: "present" },
        "2026-04-20": { 1: "present", 2: "present", 3: "present", 4: "present", 5: "present", 6: "present", 7: "absent", 8: "present", 9: "late", 10: "present", 11: "absent", 12: "present" },
        "2026-04-22": { 1: "absent", 2: "present", 3: "present", 4: "present", 5: "present", 6: "absent", 7: "present", 8: "present", 9: "present", 10: "present", 11: "present", 12: "late" },
        "2026-04-25": { 1: "present", 2: "present", 3: "absent", 4: "late", 5: "present", 6: "present", 7: "present", 8: "present", 9: "absent", 10: "present", 11: "present", 12: "present" },
        "2026-03-10": { 1: "present", 2: "present", 3: "present", 4: "present", 5: "absent", 6: "present", 7: "present", 8: "present", 9: "present", 10: "present", 11: "late", 12: "present" },
        "2026-03-15": { 1: "present", 2: "absent", 3: "present", 4: "present", 5: "present", 6: "absent", 7: "present", 8: "late", 9: "present", 10: "present", 11: "present", 12: "present" },
        "2026-05-02": { 1: "present", 2: "present", 3: "present", 4: "absent", 5: "present", 6: "present", 7: "present", 8: "present", 9: "late", 10: "present", 11: "absent", 12: "present" },
        "2026-05-05": { 1: "present", 2: "present", 3: "absent", 4: "present", 5: "present", 6: "absent", 7: "late", 8: "present", 9: "present", 10: "present", 11: "present", 12: "present" },
    });

    const classes = ["6", "7", "8", "9", "10", "11", "12"];
    const sections = ["A", "B", "C"];

    // ✅ FIXED: useMemo se stats calculate karo - NO useEffect, NO setStats, NO warning
    const stats = useMemo(() => {
        const total = students.length;
        const present = students.filter(s => s.status === "present").length;
        const absent = students.filter(s => s.status === "absent").length;
        const late = students.filter(s => s.status === "late").length;
        const percentage = total > 0 ? ((present + late) / total) * 100 : 0;
        return {
            total,
            present,
            absent,
            late,
            percentage: Math.round(percentage * 10) / 10
        };
    }, [students]);

    const getAttendanceForDate = (dateStr) => attendanceHistory[dateStr] || null;
    const hasAttendanceRecord = (dateStr) => !!attendanceHistory[dateStr];

    const handleDateChange = (dateStr) => {
        setSelectedDate(dateStr);
        const savedAttendance = getAttendanceForDate(dateStr);
        if (savedAttendance) {
            setStudents(prev => prev.map(student => ({
                ...student,
                status: savedAttendance[student.id] || "present",
                attendanceMarked: true,
                remark: ""
            })));
        } else {
            setStudents(prev => prev.map(student => ({
                ...student,
                status: "present",
                remark: "",
                attendanceMarked: false
            })));
        }
    };

    const handleClassSelect = (className) => {
        setSelectedClass(className);
        setShowClassDropdown(false);
    };

    const handleStatusChange = (studentId, newStatus) => {
        setStudents(prevStudents =>
            prevStudents.map(student =>
                student.id === studentId
                    ? { ...student, status: newStatus, attendanceMarked: true }
                    : student
            )
        );
    };

    const handleRemarkChange = (studentId, remark) => {
        setStudents(prevStudents =>
            prevStudents.map(student =>
                student.id === studentId ? { ...student, remark } : student
            )
        );
    };

    const markAllPresent = () => {
        setStudents(prevStudents =>
            prevStudents.map(student => ({ ...student, status: "present", remark: "", attendanceMarked: true }))
        );
        showNotification("All students marked as present", "success");
    };

    const markAllAbsent = () => {
        setStudents(prevStudents =>
            prevStudents.map(student => ({ ...student, status: "absent", remark: "Not present", attendanceMarked: true }))
        );
        showNotification("All students marked as absent", "info");
    };

    const resetAttendance = () => {
        setStudents(prevStudents =>
            prevStudents.map(student => ({ ...student, status: "present", remark: "", attendanceMarked: false }))
        );
        showNotification("Attendance reset", "info");
    };

    const saveAttendance = () => {
        setSaving(true);
        setTimeout(() => {
            const attendanceRecord = {};
            students.forEach(s => { attendanceRecord[s.id] = s.status; });
            setAttendanceHistory(prev => ({ ...prev, [selectedDate]: attendanceRecord }));
            setSaving(false);
            showNotification(`Attendance saved for ${formatDate(selectedDate)}`, "success");
            setStudents(prevStudents =>
                prevStudents.map(student => ({ ...student, attendanceMarked: false }))
            );
        }, 800);
    };

    const showNotification = (message, type = "success") => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    };

    const getMonthCalendar = () => {
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
        const todayStr = new Date().toISOString().split('T')[0];
        const calendarDays = [];

        for (let i = 0; i < firstDay; i++) {
            calendarDays.push({ day: null, empty: true });
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            calendarDays.push({
                day,
                dateStr,
                hasRecord: hasAttendanceRecord(dateStr),
                isToday: dateStr === todayStr,
                isSelected: dateStr === selectedDate
            });
        }
        return calendarDays;
    };

    const handleMonthNav = (direction) => {
        if (direction === 'prev') {
            if (selectedMonth === 0) { setSelectedMonth(11); setSelectedYear(prev => prev - 1); }
            else { setSelectedMonth(prev => prev - 1); }
        } else {
            if (selectedMonth === 11) { setSelectedMonth(0); setSelectedYear(prev => prev + 1); }
            else { setSelectedMonth(prev => prev + 1); }
        }
    };

    const handleYearSelect = (year) => setSelectedYear(year);
    const handleMonthSelect = (monthIndex) => setSelectedMonth(monthIndex);

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
        String(s.rollNo).includes(searchStudent)
    );

    return (
        <div className="at-container">
            <Header open={open} setOpen={setOpen} />
            {showToast && (
                <div className={`at-toast ${toastType}`}>
                    <div className="toast-content">
                        {toastType === "success" ? <CheckCircle size={18} /> : <Info size={18} />}
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}

            <div className="at-layout">
                <Sidebar open={open} />
                <div className="at-content">
                    <div className="at-back-nav" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                        <span>Back to Dashboard</span>
                    </div>

                    <div className="at-page-header">
                        <div className="at-header-left">
                            <div className="at-header-icon"><UserCheck size={24} /></div>
                            <div>
                                <h1>Attendance Management</h1>
                                <p>Mark & track student attendance</p>
                            </div>
                        </div>
                        <div className="at-header-actions">
                            <div className="at-view-toggle">
                                <button className={`at-view-btn ${viewMode === 'mark' ? 'active' : ''}`} onClick={() => setViewMode('mark')}>
                                    <List size={16} /><span>Mark</span>
                                </button>
                                <button className={`at-view-btn ${viewMode === 'monthly' ? 'active' : ''}`} onClick={() => setViewMode('monthly')}>
                                    <CalendarDays size={16} /><span>Calendar</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="at-filters-section">
                        <div className="at-filter-group">
                            <label>Class</label>
                            <div className="at-dropdown-container">
                                <button className="at-filter-dropdown-btn" onClick={() => setShowClassDropdown(!showClassDropdown)}>
                                    <Users size={16} /><span>Class {selectedClass}</span><ChevronDown size={14} />
                                </button>
                                {showClassDropdown && (
                                    <div className="at-dropdown-menu">
                                        {classes.map(className => (
                                            <div key={className} className={`at-dropdown-item ${selectedClass === className ? 'active' : ''}`} onClick={() => handleClassSelect(className)}>
                                                Class {className}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="at-filter-group">
                            <label>Section</label>
                            <div className="at-section-buttons">
                                {sections.map(section => (
                                    <button key={section} className={`at-section-btn ${selectedSection === section ? 'active' : ''}`} onClick={() => setSelectedSection(section)}>
                                        {section}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="at-filter-group">
                            <label>Date</label>
                            <input type="date" className="at-date-input" value={selectedDate} onChange={(e) => handleDateChange(e.target.value)} />
                        </div>
                        <div className="at-filter-group">
                            <label>Search</label>
                            <div className="at-search-box">
                                <Search size={16} />
                                <input type="text" placeholder="Search student..." value={searchStudent} onChange={(e) => setSearchStudent(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="at-stats-grid">
                        <div className="at-stat-card total"><div className="at-stat-icon"><Users size={24} /></div><div className="at-stat-info"><span className="at-stat-label">Total</span><span className="at-stat-value">{stats.total}</span></div></div>
                        <div className="at-stat-card present"><div className="at-stat-icon"><CheckCircle size={24} /></div><div className="at-stat-info"><span className="at-stat-label">Present</span><span className="at-stat-value">{stats.present}</span><span className="at-stat-percent">{stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0}%</span></div></div>
                        <div className="at-stat-card absent"><div className="at-stat-icon"><XCircle size={24} /></div><div className="at-stat-info"><span className="at-stat-label">Absent</span><span className="at-stat-value">{stats.absent}</span></div></div>
                        <div className="at-stat-card late"><div className="at-stat-icon"><ClockIcon size={24} /></div><div className="at-stat-info"><span className="at-stat-label">Late</span><span className="at-stat-value">{stats.late}</span></div></div>
                    </div>

                    {viewMode === 'monthly' && (
                        <div className="at-monthly-view">
                            <div className="at-month-navigation">
                                <button className="at-month-nav-btn" onClick={() => handleMonthNav('prev')}><ChevronLeft size={20} /></button>
                                <div className="at-month-selector-group">
                                    <select className="at-month-select" value={selectedMonth} onChange={(e) => handleMonthSelect(parseInt(e.target.value))}>
                                        {months.map((month, idx) => (<option key={idx} value={idx}>{month}</option>))}
                                    </select>
                                    <select className="at-year-select" value={selectedYear} onChange={(e) => handleYearSelect(parseInt(e.target.value))}>
                                        {years.map(year => (<option key={year} value={year}>{year}</option>))}
                                    </select>
                                </div>
                                <button className="at-month-nav-btn" onClick={() => handleMonthNav('next')}><ChevronRight size={20} /></button>
                            </div>

                            <div className="at-calendar-grid">
                                <div className="at-calendar-header">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (<div key={day} className="at-calendar-header-cell">{day}</div>))}
                                </div>
                                <div className="at-calendar-body">
                                    {getMonthCalendar().map((cell, idx) => (
                                        <div key={idx} className={`at-calendar-cell ${cell.empty ? 'empty' : ''} ${cell.isToday ? 'today' : ''} ${cell.isSelected ? 'selected' : ''} ${cell.hasRecord ? 'has-record' : ''}`}
                                            onClick={() => cell.day && handleDateChange(cell.dateStr)}>
                                            {cell.day && (
                                                <>
                                                    <span className="at-calendar-day">{cell.day}</span>
                                                    {cell.hasRecord && <span className="at-calendar-dot">●</span>}
                                                    {cell.isToday && <span className="at-calendar-today-label">Today</span>}
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="at-calendar-legend">
                                <div className="at-legend-item"><span className="at-legend-dot recorded"></span> Recorded</div>
                                <div className="at-legend-item"><span className="at-legend-dot today"></span> Today</div>
                                <div className="at-legend-item"><span className="at-legend-dot selected"></span> Selected</div>
                            </div>

                            <div className="at-selected-date-summary">
                                <div className="at-summary-header">
                                    <CalendarIcon size={18} />
                                    <h4>{formatDate(selectedDate)}</h4>
                                    {hasAttendanceRecord(selectedDate) ? <span className="at-recorded-badge">Recorded ✓</span> : <span className="at-pending-badge">Not Recorded</span>}
                                </div>
                                {hasAttendanceRecord(selectedDate) && (
                                    <div className="at-summary-stats">
                                        <div className="at-summary-row"><span className="at-summary-label">Present:</span><span className="at-summary-val present">{Object.values(getAttendanceForDate(selectedDate)).filter(v => v === 'present').length}</span></div>
                                        <div className="at-summary-row"><span className="at-summary-label">Absent:</span><span className="at-summary-val absent">{Object.values(getAttendanceForDate(selectedDate)).filter(v => v === 'absent').length}</span></div>
                                        <div className="at-summary-row"><span className="at-summary-label">Late:</span><span className="at-summary-val late">{Object.values(getAttendanceForDate(selectedDate)).filter(v => v === 'late').length}</span></div>
                                    </div>
                                )}
                                <button className="at-go-mark-btn" onClick={() => setViewMode('mark')}>
                                    <UserCheck size={16} />
                                    {hasAttendanceRecord(selectedDate) ? 'Edit Attendance' : 'Mark Attendance'}
                                </button>
                            </div>
                        </div>
                    )}

                    {viewMode === 'mark' && (
                        <>
                            <div className="at-quick-actions-bar">
                                <button className="at-quick-mark-btn present" onClick={markAllPresent}><CheckCircle size={16} />Mark All Present</button>
                                <button className="at-quick-mark-btn absent" onClick={markAllAbsent}><XCircle size={16} />Mark All Absent</button>
                            </div>

                            <div className="at-students-table-wrapper">
                                <div className="at-table-header">
                                    <h3>Class {selectedClass}-{selectedSection} • {formatDate(selectedDate)}</h3>
                                    <div className="at-attendance-summary">
                                        <span className="at-summary-badge present">Present: {stats.present}</span>
                                        <span className="at-summary-badge absent">Absent: {stats.absent}</span>
                                        <span className="at-summary-badge late">Late: {stats.late}</span>
                                        <span className="at-summary-badge total">{stats.percentage}%</span>
                                    </div>
                                </div>
                                <div className="at-students-table">
                                    <table className="at-table">
                                        <thead><tr><th>Roll No</th><th>Student Name</th><th>Status</th><th>Remark</th></tr></thead>
                                        <tbody>
                                            {filteredStudents.map((student) => (
                                                <tr key={student.id} className={student.status !== "present" ? `row-${student.status}` : ""}>
                                                    <td className="at-roll-no">{student.rollNo}</td>
                                                    <td className="at-student-name"><div className="at-student-info"><div className="at-student-avatar">{student.name.charAt(0)}</div><span>{student.name}</span></div></td>
                                                    <td>
                                                        <div className="at-status-buttons">
                                                            <button className={`at-status-btn present ${student.status === 'present' ? 'active' : ''}`} onClick={() => handleStatusChange(student.id, 'present')}><CheckCircle size={16} /><span>Present</span></button>
                                                            <button className={`at-status-btn absent ${student.status === 'absent' ? 'active' : ''}`} onClick={() => handleStatusChange(student.id, 'absent')}><XCircle size={16} /><span>Absent</span></button>
                                                            <button className={`at-status-btn late ${student.status === 'late' ? 'active' : ''}`} onClick={() => handleStatusChange(student.id, 'late')}><ClockIcon size={16} /><span>Late</span></button>
                                                        </div>
                                                    </td>
                                                    <td><input type="text" className="at-remark-input" placeholder="Add remark..." value={student.remark} onChange={(e) => handleRemarkChange(student.id, e.target.value)} /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}

                    {viewMode === 'mark' && (
                        <div className="at-save-footer">
                            <div className="at-footer-info"><Info size={16} /><span>{students.filter(s => !s.attendanceMarked).length} students unchanged</span></div>
                            <div className="at-footer-actions">
                                <button className="at-btn-secondary" onClick={resetAttendance}><RefreshCw size={18} />Reset All</button>
                                <button className="at-btn-primary" onClick={saveAttendance} disabled={saving}><Save size={18} />{saving ? "Saving..." : "Save Attendance"}</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AttendanceTeach;