import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useState } from "react";
import {
    ArrowLeft, Clock, User, MapPin,
    Plus, Save, Edit3, Trash2, X, Check, Settings, Copy
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import './settimetable.css'

const SetTimeTable = () => {
    const navigate = useNavigate();
    const [activeDay, setActiveDay] = useState("MON");
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingPeriod, setEditingPeriod] = useState(null);
    const [open, setOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Form state for adding/editing periods
    const [formData, setFormData] = useState({
        subject: "",
        teacher: "",
        timeFrom: "",
        timeTo: "",
        room: "",
        period: ""
    });

    // Teacher's managed timetable
    const [timetable, setTimetable] = useState({
        MON: [
            { id: 1, subject: "English", teacher: "Khalid Ahmad", time: "8:00 - 8:40 AM", timeFrom: "08:00", timeTo: "08:40", period: 1, room: "Room 101" },
            { id: 2, subject: "Mathematics", teacher: "Farooq Khan", time: "8:40 - 9:20 AM", timeFrom: "08:40", timeTo: "09:20", period: 2, room: "Room 102" },
            { id: 3, subject: "Urdu", teacher: "Ayesha Siddiqui", time: "9:30 - 10:10 AM", timeFrom: "09:30", timeTo: "10:10", period: 3, room: "Room 103" },
            { id: 4, subject: "Hindi", teacher: "Priya Sharma", time: "10:10 - 10:50 AM", timeFrom: "10:10", timeTo: "10:50", period: 4, room: "Room 104" },
            { id: 5, subject: "Science", teacher: "Rahul Verma", time: "11:00 - 11:40 AM", timeFrom: "11:00", timeTo: "11:40", period: 5, room: "Lab 1" },
            { id: 6, subject: "Social Studies", teacher: "Meera Sen", time: "11:40 - 12:20 PM", timeFrom: "11:40", timeTo: "12:20", period: 6, room: "Room 105" }
        ],
        TUE: [
            { id: 7, subject: "Computer Science", teacher: "Amit Singh", time: "8:00 - 8:40 AM", timeFrom: "08:00", timeTo: "08:40", period: 1, room: "Comp Lab" },
            { id: 8, subject: "English", teacher: "Khalid Ahmad", time: "8:40 - 9:20 AM", timeFrom: "08:40", timeTo: "09:20", period: 2, room: "Room 101" },
            { id: 9, subject: "Mathematics", teacher: "Farooq Khan", time: "9:30 - 10:10 AM", timeFrom: "09:30", timeTo: "10:10", period: 3, room: "Room 102" },
            { id: 10, subject: "Physics", teacher: "Dr. Anil Kumar", time: "10:10 - 10:50 AM", timeFrom: "10:10", timeTo: "10:50", period: 4, room: "Lab 2" },
            { id: 11, subject: "Chemistry", teacher: "Neha Gupta", time: "11:00 - 11:40 AM", timeFrom: "11:00", timeTo: "11:40", period: 5, room: "Lab 2" },
            { id: 12, subject: "Physical Education", teacher: "Rajesh Singh", time: "11:40 - 12:20 PM", timeFrom: "11:40", timeTo: "12:20", period: 6, room: "Ground" }
        ],
        WED: [
            { id: 13, subject: "Mathematics", teacher: "Farooq Khan", time: "8:00 - 8:40 AM", timeFrom: "08:00", timeTo: "08:40", period: 1, room: "Room 102" },
            { id: 14, subject: "Urdu", teacher: "Ayesha Siddiqui", time: "8:40 - 9:20 AM", timeFrom: "08:40", timeTo: "09:20", period: 2, room: "Room 103" },
            { id: 15, subject: "English", teacher: "Khalid Ahmad", time: "9:30 - 10:10 AM", timeFrom: "09:30", timeTo: "10:10", period: 3, room: "Room 101" },
            { id: 16, subject: "History", teacher: "Meera Sen", time: "10:10 - 10:50 AM", timeFrom: "10:10", timeTo: "10:50", period: 4, room: "Room 105" },
            { id: 17, subject: "Biology", teacher: "Neha Gupta", time: "11:00 - 11:40 AM", timeFrom: "11:00", timeTo: "11:40", period: 5, room: "Lab 3" },
            { id: 18, subject: "Art", teacher: "Pooja Sharma", time: "11:40 - 12:20 PM", timeFrom: "11:40", timeTo: "12:20", period: 6, room: "Art Room" }
        ],
        THU: [
            { id: 19, subject: "Hindi", teacher: "Priya Sharma", time: "8:00 - 8:40 AM", timeFrom: "08:00", timeTo: "08:40", period: 1, room: "Room 104" },
            { id: 20, subject: "Science", teacher: "Rahul Verma", time: "8:40 - 9:20 AM", timeFrom: "08:40", timeTo: "09:20", period: 2, room: "Lab 1" },
            { id: 21, subject: "Computer Science", teacher: "Amit Singh", time: "9:30 - 10:10 AM", timeFrom: "09:30", timeTo: "10:10", period: 3, room: "Comp Lab" },
            { id: 22, subject: "Mathematics", teacher: "Farooq Khan", time: "10:10 - 10:50 AM", timeFrom: "10:10", timeTo: "10:50", period: 4, room: "Room 102" },
            { id: 23, subject: "English", teacher: "Khalid Ahmad", time: "11:00 - 11:40 AM", timeFrom: "11:00", timeTo: "11:40", period: 5, room: "Room 101" },
            { id: 24, subject: "Geography", teacher: "Meera Sen", time: "11:40 - 12:20 PM", timeFrom: "11:40", timeTo: "12:20", period: 6, room: "Room 105" }
        ],
        FRI: [
            { id: 25, subject: "Urdu", teacher: "Ayesha Siddiqui", time: "8:00 - 8:40 AM", timeFrom: "08:00", timeTo: "08:40", period: 1, room: "Room 103" },
            { id: 26, subject: "Hindi", teacher: "Priya Sharma", time: "8:40 - 9:20 AM", timeFrom: "08:40", timeTo: "09:20", period: 2, room: "Room 104" },
            { id: 27, subject: "Mathematics", teacher: "Farooq Khan", time: "9:30 - 10:10 AM", timeFrom: "09:30", timeTo: "10:10", period: 3, room: "Room 102" },
            { id: 28, subject: "English", teacher: "Khalid Ahmad", time: "10:10 - 10:50 AM", timeFrom: "10:10", timeTo: "10:50", period: 4, room: "Room 101" },
            { id: 29, subject: "Physics", teacher: "Dr. Anil Kumar", time: "11:00 - 11:40 AM", timeFrom: "11:00", timeTo: "11:40", period: 5, room: "Lab 2" },
            { id: 30, subject: "Sports", teacher: "Rajesh Singh", time: "11:40 - 12:20 PM", timeFrom: "11:40", timeTo: "12:20", period: 6, room: "Ground" }
        ],
        SAT: [
            { id: 31, subject: "Mathematics", teacher: "Farooq Khan", time: "8:00 - 8:40 AM", timeFrom: "08:00", timeTo: "08:40", period: 1, room: "Room 102" },
            { id: 32, subject: "Science", teacher: "Rahul Verma", time: "8:40 - 9:20 AM", timeFrom: "08:40", timeTo: "09:20", period: 2, room: "Lab 1" },
            { id: 33, subject: "English", teacher: "Khalid Ahmad", time: "9:30 - 10:10 AM", timeFrom: "09:30", timeTo: "10:10", period: 3, room: "Room 101" },
            { id: 34, subject: "Computer Science", teacher: "Amit Singh", time: "10:10 - 10:50 AM", timeFrom: "10:10", timeTo: "10:50", period: 4, room: "Comp Lab" }
        ],
        SUN: []
    });

    // ID counter for unique IDs
    const [idCounter, setIdCounter] = useState(100);

    const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    // Get today's day
    const getCurrentDay = () => {
        const todayIndex = new Date().getDay();
        const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        return days[todayIndex];
    };

    const currentDay = getCurrentDay();

    // Available subjects
    const availableSubjects = [
        "English", "Mathematics", "Urdu", "Hindi", "Science",
        "Social Studies", "History", "Geography", "Physics",
        "Chemistry", "Biology", "Computer Science", "Art",
        "Physical Education", "Sports"
    ];

    // Available teachers
    const availableTeachers = [
        "Khalid Ahmad", "Farooq Khan", "Ayesha Siddiqui",
        "Priya Sharma", "Rahul Verma", "Meera Sen", "Amit Singh",
        "Dr. Anil Kumar", "Neha Gupta", "Rajesh Singh", "Pooja Sharma"
    ];

    // Generate unique ID
    const generateId = () => {
        const newId = idCounter + 1;
        setIdCounter(newId);
        return newId;
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Open add form
    const handleAddPeriod = () => {
        const nextPeriod = timetable[activeDay].length + 1;
        setFormData({
            subject: "",
            teacher: "",
            timeFrom: "",
            timeTo: "",
            room: "",
            period: String(nextPeriod)
        });
        setEditingPeriod(null);
        setShowAddForm(true);
    };

    // Open edit form
    const handleEditPeriod = (period) => {
        setFormData({
            subject: period.subject,
            teacher: period.teacher,
            timeFrom: period.timeFrom,
            timeTo: period.timeTo,
            room: period.room,
            period: String(period.period)
        });
        setEditingPeriod(period.id);
        setShowAddForm(true);
    };

    // Format time
    const formatTime = (time) => {
        if (!time) return "";
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
        return `${displayHour}:${minutes} ${ampm}`;
    };

    // Save period (add or update)
    const handleSavePeriod = (e) => {
        e.preventDefault();

        if (!formData.subject || !formData.teacher || !formData.timeFrom || !formData.timeTo) {
            alert("Please fill all required fields");
            return;
        }

        const timeDisplay = `${formatTime(formData.timeFrom)} - ${formatTime(formData.timeTo)}`;

        if (editingPeriod !== null) {
            // Update existing period
            setTimetable(prev => ({
                ...prev,
                [activeDay]: prev[activeDay].map(p =>
                    p.id === editingPeriod
                        ? {
                            ...p,
                            subject: formData.subject,
                            teacher: formData.teacher,
                            timeFrom: formData.timeFrom,
                            timeTo: formData.timeTo,
                            time: timeDisplay,
                            room: formData.room,
                            period: parseInt(formData.period)
                        }
                        : p
                )
            }));
            showSuccess("Period updated successfully!");
        } else {
            // Add new period
            const newPeriod = {
                id: generateId(),
                subject: formData.subject,
                teacher: formData.teacher,
                timeFrom: formData.timeFrom,
                timeTo: formData.timeTo,
                time: timeDisplay,
                room: formData.room,
                period: parseInt(formData.period)
            };
            setTimetable(prev => ({
                ...prev,
                [activeDay]: [...prev[activeDay], newPeriod]
            }));
            showSuccess("Period added successfully!");
        }

        setShowAddForm(false);
        setEditingPeriod(null);
    };

    // Delete period
    const handleDeletePeriod = (periodId) => {
        if (window.confirm("Are you sure you want to delete this period?")) {
            setTimetable(prev => ({
                ...prev,
                [activeDay]: prev[activeDay].filter(p => p.id !== periodId)
            }));
            showSuccess("Period deleted successfully!");
        }
    };

    // Toggle holiday
    const toggleHoliday = () => {
        if (timetable[activeDay].length > 0) {
            if (window.confirm("This will remove all periods for this day. Continue?")) {
                setTimetable(prev => ({
                    ...prev,
                    [activeDay]: []
                }));
                showSuccess(`${activeDay} marked as holiday!`);
            }
        } else {
            handleAddPeriod();
        }
    };

    // Copy schedule from another day
    const copySchedule = (fromDay) => {
        if (window.confirm(`Copy schedule from ${fromDay} to ${activeDay}?`)) {
            const copiedPeriods = timetable[fromDay].map(p => ({
                ...p,
                id: generateId()
            }));
            setTimetable(prev => ({
                ...prev,
                [activeDay]: copiedPeriods
            }));
            showSuccess(`Schedule copied from ${fromDay}!`);
        }
    };

    // Show success message
    const showSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    // Save entire timetable
    const handleSaveTimetable = () => {
        console.log("Saving timetable:", timetable);
        showSuccess("Timetable saved successfully! Students can now view it.");
    };

    return (
        <div className="set-timetable-container">
            <Header open={open} setOpen={setOpen} />
            <div className="set-timetable-layout">
                <Sidebar open={open} />
                <div className="set-timetable-content">
                    {/* Success Message */}
                    {successMessage && (
                        <div className="set-success-toast">
                            <Check size={18} />
                            <span>{successMessage}</span>
                        </div>
                    )}

                    {/* Back Navigation */}
                    <div className="set-back-nav" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                        <span>Back to Dashboard</span>
                    </div>

                    {/* Page Header */}
                    <div className="set-page-header">
                        <div className="set-header-left">
                            <div className="set-header-icon">
                                <Settings size={24} />
                            </div>
                            <div>
                                <h1>Manage Time Table</h1>
                                <p>Set and manage class schedule for students</p>
                            </div>
                        </div>
                        <div className="set-header-actions">
                            <button
                                className="set-action-btn set-save-all-btn"
                                onClick={handleSaveTimetable}
                            >
                                <Save size={16} />
                                Save Timetable
                            </button>
                            <button
                                className="set-action-btn set-add-period-btn"
                                onClick={handleAddPeriod}
                            >
                                <Plus size={16} />
                                Add Period
                            </button>
                        </div>
                    </div>

                    {/* Day Selector */}
                    <div className="set-day-selector-wrapper">
                        <div className="set-day-selector">
                            {weekDays.map((day) => (
                                <button
                                    key={day}
                                    className={`set-day-pill ${activeDay === day ? "set-active" : ""} ${currentDay === day ? "set-today" : ""} ${day === "SUN" ? "set-holiday" : ""}`}
                                    onClick={() => {
                                        setActiveDay(day);
                                        setShowAddForm(false);
                                    }}
                                >
                                    <span className="set-day-short">{day}</span>
                                    <span className="set-day-full">
                                        {day === "MON" ? "Monday" : day === "TUE" ? "Tuesday" : day === "WED" ? "Wednesday" :
                                            day === "THU" ? "Thursday" : day === "FRI" ? "Friday" : day === "SAT" ? "Saturday" : "Sunday"}
                                    </span>
                                    <span className="set-period-count">
                                        {timetable[day].length || 0}
                                    </span>
                                    {currentDay === day && <span className="set-today-dot">●</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="set-quick-actions">
                        <div className="set-action-group">
                            <span className="set-action-label">Copy from:</span>
                            {weekDays.filter(d => d !== activeDay && d !== "SUN" && timetable[d].length > 0).map(day => (
                                <button
                                    key={day}
                                    className="set-copy-btn"
                                    onClick={() => copySchedule(day)}
                                >
                                    <Copy size={12} />
                                    {day}
                                </button>
                            ))}
                        </div>
                        <button
                            className="set-holiday-toggle-btn"
                            onClick={toggleHoliday}
                        >
                            {timetable[activeDay].length === 0 ? "Add Schedule" : "Mark as Holiday"}
                        </button>
                    </div>

                    {/* Schedule Stats */}
                    <div className="set-schedule-stats">
                        <div className="set-stat-card">
                            <span className="set-stat-label">Periods</span>
                            <span className="set-stat-value">{timetable[activeDay].length}</span>
                        </div>
                        <div className="set-stat-card">
                            <span className="set-stat-label">Start</span>
                            <span className="set-stat-value">
                                {timetable[activeDay][0]?.timeFrom
                                    ? formatTime(timetable[activeDay][0].timeFrom)
                                    : "—"}
                            </span>
                        </div>
                        <div className="set-stat-card">
                            <span className="set-stat-label">End</span>
                            <span className="set-stat-value">
                                {timetable[activeDay][timetable[activeDay].length - 1]?.timeTo
                                    ? formatTime(timetable[activeDay][timetable[activeDay].length - 1].timeTo)
                                    : "—"}
                            </span>
                        </div>
                    </div>

                    {/* Add/Edit Form */}
                    {showAddForm && (
                        <div className="set-period-form-overlay">
                            <div className="set-period-form">
                                <div className="set-period-form-header">
                                    <h3>
                                        <Edit3 size={18} />
                                        {editingPeriod !== null ? 'Edit Period' : 'Add New Period'}
                                    </h3>
                                    <button
                                        className="set-close-form-btn"
                                        onClick={() => {
                                            setShowAddForm(false);
                                            setEditingPeriod(null);
                                        }}
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                <form onSubmit={handleSavePeriod}>
                                    <div className="set-form-grid">
                                        <div className="set-form-group">
                                            <label>Period No.</label>
                                            <input
                                                type="number"
                                                name="period"
                                                value={formData.period}
                                                onChange={handleInputChange}
                                                min="1"
                                                max="12"
                                                required
                                            />
                                        </div>
                                        <div className="set-form-group">
                                            <label>Subject *</label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">Select Subject</option>
                                                {availableSubjects.map(sub => (
                                                    <option key={sub} value={sub}>{sub}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="set-form-group">
                                            <label>Teacher *</label>
                                            <select
                                                name="teacher"
                                                value={formData.teacher}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">Select Teacher</option>
                                                {availableTeachers.map(t => (
                                                    <option key={t} value={t}>{t}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="set-form-group">
                                            <label>Room</label>
                                            <input
                                                type="text"
                                                name="room"
                                                value={formData.room}
                                                onChange={handleInputChange}
                                                placeholder="e.g., Room 101"
                                            />
                                        </div>
                                        <div className="set-form-group">
                                            <label>Time From *</label>
                                            <input
                                                type="time"
                                                name="timeFrom"
                                                value={formData.timeFrom}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="set-form-group">
                                            <label>Time To *</label>
                                            <input
                                                type="time"
                                                name="timeTo"
                                                value={formData.timeTo}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="set-form-actions">
                                        <button
                                            type="button"
                                            className="set-cancel-btn"
                                            onClick={() => {
                                                setShowAddForm(false);
                                                setEditingPeriod(null);
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="set-save-btn">
                                            <Save size={16} />
                                            {editingPeriod !== null ? 'Update' : 'Add Period'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Schedule Display */}
                    {timetable[activeDay].length === 0 ? (
                        <div className="set-holiday-card">
                            <div className="set-holiday-icon">📅</div>
                            <h3>No Classes Scheduled</h3>
                            <p>This day is currently marked as holiday or no periods assigned.</p>
                            <button className="set-add-schedule-btn" onClick={handleAddPeriod}>
                                <Plus size={18} />
                                Add Schedule for {activeDay}
                            </button>
                        </div>
                    ) : (
                        <div className="set-schedule-grid">
                            {timetable[activeDay]
                                .sort((a, b) => a.period - b.period)
                                .map((item) => (
                                    <div
                                        className="set-schedule-card"
                                        key={item.id}
                                    >
                                        <div className="set-card-main">
                                            <div className="set-period-badge-main">
                                                <span className="set-period-number-large">{item.period}</span>
                                            </div>
                                            <div className="set-card-info">
                                                <h3 className="set-subject-name">{item.subject}</h3>
                                                <div className="set-teacher-name">
                                                    <User size={12} />
                                                    <span>{item.teacher}</span>
                                                </div>
                                                <div className="set-time-room-mobile">
                                                    <div className="set-time-info-mobile">
                                                        <Clock size={12} />
                                                        <span>{item.time}</span>
                                                    </div>
                                                    {item.room && (
                                                        <div className="set-room-info-mobile">
                                                            <MapPin size={12} />
                                                            <span>{item.room}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="set-time-room-desktop">
                                                <div className="set-time-info">
                                                    <Clock size={12} />
                                                    <span>{item.time}</span>
                                                </div>
                                                {item.room && (
                                                    <div className="set-room-info">
                                                        <MapPin size={12} />
                                                        <span>{item.room}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {/* Edit/Delete Buttons */}
                                        <div className="set-card-actions">
                                            <button
                                                className="set-card-action-btn set-edit-btn"
                                                onClick={() => handleEditPeriod(item)}
                                                title="Edit period"
                                            >
                                                <Edit3 size={14} />
                                            </button>
                                            <button
                                                className="set-card-action-btn set-delete-btn"
                                                onClick={() => handleDeletePeriod(item.id)}
                                                title="Delete period"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SetTimeTable;