import { BookText, ArrowLeft, Plus, Save, Trash2, Edit3, X, Check, Clock, GraduationCap, BookOpen, CalendarDays, Sun, Sparkles, ChevronDown, ChevronUp, Send } from "lucide-react";
import Header from "../../../components/layout/Header/Header";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import Footer from "../../../components/layout/Footer/Footer";
import "../styles/adddiary.css"
import { useNavigate } from "react-router-dom";
import { useState, type ChangeEvent, type FormEvent } from "react";

interface DiaryEntry {
    id: number;
    date: string;
    dateDisplay: string;
    dayName: string;
    subject: string;
    desc: string;
    teacher: string;
    timeFrom: string;
    timeTo: string;
    timeDisplay: string;
    class: string;
    section: string;
    createdAt: string;
}

interface GroupedDiaryEntries {
    date: string;
    dateDisplay: string;
    dayName: string;
    entries: DiaryEntry[];
}

const AddDiary = () => {
    const navigate = useNavigate();

    const [timeFilter, setTimeFilter] = useState("Today");
    const [expandedDays, setExpandedDays] = useState({});
    const [open, setOpen] = useState(false);

    // Form state for adding new diary entry
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingEntry, setEditingEntry] = useState(null);
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        subject: "",
        description: "",
        timeFrom: "",
        timeTo: ""
    });

    // Teacher's subjects (in real app, this would come from teacher's profile)
    const teacherSubjects = [
        "Mathematics",
        "Science",
        "Physics",
        "Chemistry",
        "Biology",
        "Computer"
    ];

    const teacherName = "Mr. Khan"; // This would come from auth context

    // Diary entries that teacher has added (initially some sample data)
    const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([
        {
            id: 1,
            date: "2026-04-16",
            dateDisplay: "16 Apr 2026",
            dayName: "Thursday",
            subject: "Mathematics",
            desc: "Explained Chapter 5: Quadratic Equations. Solved examples 1-5 from textbook. Students practiced problems 1-10 from exercise 5.1. Homework: Complete remaining problems.",
            teacher: "Mr. Khan",
            timeFrom: "08:00",
            timeTo: "08:45",
            timeDisplay: "8:00 AM - 8:45 AM",
            class: "Class 10",
            section: "A",
            createdAt: "2026-04-16T08:45:00"
        },
        {
            id: 2,
            date: "2026-04-16",
            dateDisplay: "16 Apr 2026",
            dayName: "Thursday",
            subject: "Science",
            desc: "Discussion about Photosynthesis process. Drew detailed diagram on board explaining light and dark reactions. Watched educational video on plant life cycle. Students took notes.",
            teacher: "Mr. Khan",
            timeFrom: "08:45",
            timeTo: "09:30",
            timeDisplay: "8:45 AM - 9:30 AM",
            class: "Class 10",
            section: "A",
            createdAt: "2026-04-16T09:30:00"
        },
        {
            id: 3,
            date: "2026-04-15",
            dateDisplay: "15 Apr 2026",
            dayName: "Wednesday",
            subject: "Physics",
            desc: "Newton's Laws of Motion - Explained all three laws with practical demonstrations. Used spring balance and pulleys for experiments. Students participated actively.",
            teacher: "Mr. Khan",
            timeFrom: "09:30",
            timeTo: "10:15",
            timeDisplay: "9:30 AM - 10:15 AM",
            class: "Class 10",
            section: "B",
            createdAt: "2026-04-15T10:15:00"
        },
        {
            id: 4,
            date: "2026-04-14",
            dateDisplay: "14 Apr 2026",
            dayName: "Tuesday",
            subject: "Computer",
            desc: "Introduction to HTML - Basic structure of HTML document, tags, elements. Students created their first webpage with headings, paragraphs and images.",
            teacher: "Mr. Khan",
            timeFrom: "08:00",
            timeTo: "08:45",
            timeDisplay: "8:00 AM - 8:45 AM",
            class: "Class 10",
            section: "A",
            createdAt: "2026-04-14T08:45:00"
        },
        {
            id: 5,
            date: "2026-04-13",
            dateDisplay: "13 Apr 2026",
            dayName: "Monday",
            subject: "Chemistry",
            desc: "Lab Experiment: Testing pH levels of different household solutions. Students worked in groups of 4. Used litmus paper and pH meter. Results documented in lab notebooks.",
            teacher: "Mr. Khan",
            timeFrom: "10:30",
            timeTo: "11:15",
            timeDisplay: "10:30 AM - 11:15 AM",
            class: "Class 10",
            section: "A",
            createdAt: "2026-04-13T11:15:00"
        }
    ]);

    // Get unique dates from entries
    const getDateString = (date: Date | string): string => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const today = new Date();
    const todayStr = getDateString(today);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = getDateString(yesterday);

    const last7Days = new Date(today);
    last7Days.setDate(today.getDate() - 7);
    const last7DaysStr = getDateString(last7Days);

    // Group entries by date
    const groupEntriesByDate = (entries: DiaryEntry[]): GroupedDiaryEntries[] => {
        const grouped: Record<string, GroupedDiaryEntries> = {};
        entries.forEach(entry => {
            if (!grouped[entry.date]) {
                grouped[entry.date] = {
                    date: entry.date,
                    dateDisplay: entry.dateDisplay,
                    dayName: entry.dayName,
                    entries: []
                };
            }
            grouped[entry.date].entries.push(entry);
        });
        return Object.values(grouped).sort((a, b) => b.date.localeCompare(a.date));
    };

    // Filter entries
    const getFilteredEntries = () => {
        let filtered = diaryEntries.filter(entry => {
            if (timeFilter === "Today") return entry.date === todayStr;
            if (timeFilter === "Yesterday") return entry.date === yesterdayStr;
            if (timeFilter === "Last 7 Days") return entry.date >= last7DaysStr;
            return true;
        });
        return groupEntriesByDate(filtered);
    };

    const filteredGroupedData = getFilteredEntries();

    // Handle form input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Format time for display
    const formatTimeDisplay = (time: string): string => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
        return `${displayHour}:${minutes} ${ampm}`;
    };

    // Submit new diary entry
    const handleSubmitEntry = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.subject || !formData.description || !formData.timeFrom || !formData.timeTo) {
            alert("Please fill all required fields");
            return;
        }

        const selectedDate = new Date(formData.date);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const newEntry = {
            id: Date.now(),
            date: formData.date,
            dateDisplay: `${selectedDate.getDate()} ${months[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`,
            dayName: days[selectedDate.getDay()],
            subject: formData.subject,
            desc: formData.description,
            teacher: teacherName,
            timeFrom: formData.timeFrom,
            timeTo: formData.timeTo,
            timeDisplay: `${formatTimeDisplay(formData.timeFrom)} - ${formatTimeDisplay(formData.timeTo)}`,
            class: "Class 10", // This would come from teacher's assigned class
            section: "A",
            createdAt: new Date().toISOString()
        };

        if (editingEntry) {
            // Update existing entry
            setDiaryEntries(prev => prev.map(entry =>
                entry.id === editingEntry ? { ...newEntry, id: editingEntry } : entry
            ));
            setEditingEntry(null);
        } else {
            // Add new entry
            setDiaryEntries(prev => [newEntry, ...prev]);
        }

        // Reset form
        setFormData({
            date: new Date().toISOString().split('T')[0],
            subject: "",
            description: "",
            timeFrom: "",
            timeTo: ""
        });
        setShowAddForm(false);
    };

    // Edit entry
    const handleEditEntry = (entry) => {
        setFormData({
            date: entry.date,
            subject: entry.subject,
            description: entry.desc,
            timeFrom: entry.timeFrom,
            timeTo: entry.timeTo
        });
        setEditingEntry(entry.id);
        setShowAddForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Delete entry
    const handleDeleteEntry = (entryId) => {
        if (window.confirm("Are you sure you want to delete this diary entry? Students will no longer see it.")) {
            setDiaryEntries(prev => prev.filter(entry => entry.id !== entryId));
        }
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setEditingEntry(null);
        setFormData({
            date: new Date().toISOString().split('T')[0],
            subject: "",
            description: "",
            timeFrom: "",
            timeTo: ""
        });
        setShowAddForm(false);
    };

    // Toggle day expansion
    const toggleDayExpansion = (date) => {
        setExpandedDays(prev => ({
            ...prev,
            [date]: !prev[date]
        }));
    };

    // Get time filter count
    const getTimeFilterCount = (filter) => {
        return diaryEntries.filter(entry => {
            if (filter === "Today") return entry.date === todayStr;
            if (filter === "Yesterday") return entry.date === yesterdayStr;
            if (filter === "Last 7 Days") return entry.date >= last7DaysStr;
            return true;
        }).length;
    };

    return (
        <div>
            <Header open={open} setOpen={setOpen} />

            <div className="diary-layout">
                <Sidebar open={open} />

                <div className="diary-content">
                    {/* Back Navigation */}
                    <div className="diary-back-nav" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                        <span>Back to Dashboard</span>
                    </div>

                    {/* Page Header */}
                    <div className="diary-page-header">
                        <div className="diary-title-section">
                            <h2>
                                <BookOpen size={24} />
                                My Class Diary
                            </h2>
                            <p>Record daily lessons for students to view</p>
                        </div>
                        <div className="diary-stats">
                            <div className="diary-stat-item">
                                <GraduationCap size={18} />
                                <span>{teacherName}</span>
                            </div>
                            <div className="diary-stat-item">
                                <BookText size={18} />
                                <span>{diaryEntries.length} Entries</span>
                            </div>
                            <button
                                className="diary-add-btn"
                                onClick={() => {
                                    setShowAddForm(!showAddForm);
                                    setEditingEntry(null);
                                    if (!showAddForm) {
                                        setFormData({
                                            date: new Date().toISOString().split('T')[0],
                                            subject: "",
                                            description: "",
                                            timeFrom: "",
                                            timeTo: ""
                                        });
                                    }
                                }}
                            >
                                {showAddForm ? <X size={18} /> : <Plus size={18} />}
                                {showAddForm ? 'Cancel' : 'Add Entry'}
                            </button>
                        </div>
                    </div>

                    {/* Add/Edit Form */}
                    {showAddForm && (
                        <div className="diary-form-container">
                            <div className="diary-form-header">
                                <h3>
                                    <Edit3 size={18} />
                                    {editingEntry ? 'Edit Diary Entry' : 'Add New Diary Entry'}
                                </h3>
                                <p>This entry will be visible to all students in your class</p>
                            </div>
                            <form className="diary-form" onSubmit={handleSubmitEntry}>
                                <div className="diary-form-grid">
                                    <div className="diary-form-group">
                                        <label>Date *</label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            required
                                            max={getDateString(new Date())}
                                        />
                                    </div>
                                    <div className="diary-form-group">
                                        <label>Subject *</label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Subject</option>
                                            {teacherSubjects.map((subject, index) => (
                                                <option key={index} value={subject}>{subject}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="diary-form-group">
                                        <label>Time From *</label>
                                        <input
                                            type="time"
                                            name="timeFrom"
                                            value={formData.timeFrom}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="diary-form-group">
                                        <label>Time To *</label>
                                        <input
                                            type="time"
                                            name="timeTo"
                                            value={formData.timeTo}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="diary-form-group diary-form-full">
                                        <label>Description *</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Describe what was taught, activities done, homework assigned, etc..."
                                            rows={4}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="diary-form-actions">
                                    <button
                                        type="button"
                                        className="diary-btn-cancel"
                                        onClick={handleCancelEdit}
                                    >
                                        <X size={16} />
                                        Cancel
                                    </button>
                                    <button type="submit" className="diary-btn-save">
                                        <Save size={16} />
                                        {editingEntry ? 'Update Entry' : 'Save Entry'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Time Filter Buttons */}
                    <div className="diary-filter diary-time-filter">
                        <button
                            className={timeFilter === "All" ? "diary-active" : ""}
                            onClick={() => setTimeFilter("All")}
                        >
                            All Entries
                            <span className="diary-filter-count">{getTimeFilterCount("All")}</span>
                        </button>
                        <button
                            className={timeFilter === "Today" ? "diary-active" : ""}
                            onClick={() => setTimeFilter("Today")}
                        >
                            <Sun size={14} />
                            Today
                            <span className="diary-filter-count">{getTimeFilterCount("Today")}</span>
                        </button>
                        <button
                            className={timeFilter === "Yesterday" ? "diary-active" : ""}
                            onClick={() => setTimeFilter("Yesterday")}
                        >
                            Yesterday
                            <span className="diary-filter-count">{getTimeFilterCount("Yesterday")}</span>
                        </button>
                        <button
                            className={timeFilter === "Last 7 Days" ? "diary-active" : ""}
                            onClick={() => setTimeFilter("Last 7 Days")}
                        >
                            Last 7 Days
                            <span className="diary-filter-count">{getTimeFilterCount("Last 7 Days")}</span>
                        </button>
                    </div>

                    {/* Results Info */}
                    {filteredGroupedData.length > 0 && (
                        <div className="diary-results-info">
                            <Sparkles size={16} />
                            Showing <strong>{filteredGroupedData.length}</strong> {filteredGroupedData.length === 1 ? 'day' : 'days'}
                            • <strong>{filteredGroupedData.reduce((total, day) => total + day.entries.length, 0)}</strong> entries
                            {timeFilter !== "All" && ` for ${timeFilter}`}
                        </div>
                    )}

                    {/* Diary Container */}
                    <div className="diary-container">
                        {filteredGroupedData.length > 0 ? (
                            filteredGroupedData.map((day, index) => (
                                <div key={index} className="diary-day-group">
                                    {/* Day Header */}
                                    <div
                                        className="diary-day-header"
                                        onClick={() => toggleDayExpansion(day.date)}
                                    >
                                        <div className="diary-day-info">
                                            <CalendarDays size={20} />
                                            <div>
                                                <h3 className="diary-date">{day.dateDisplay}</h3>
                                                <span className="diary-day-name">{day.dayName}</span>
                                            </div>
                                        </div>
                                        <div className="diary-day-meta">
                                            <span className="diary-task-count">
                                                {day.entries.length} {day.entries.length === 1 ? 'entry' : 'entries'}
                                            </span>
                                            <span className={`diary-expand-icon ${expandedDays[day.date] ? 'expanded' : ''}`}>
                                                {expandedDays[day.date] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Entries */}
                                    <div className={`diary-tasks-wrapper ${expandedDays[day.date] ? 'expanded' : ''}`}>
                                        {day.entries.map((entry) => (
                                            <div className="diary-card" key={entry.id}>
                                                <div className="diary-card-header">
                                                    <div className="diary-card-subject">
                                                        <BookText size={18} />
                                                        <div>
                                                            <h4>{entry.subject}</h4>
                                                            <span className="diary-card-meta">
                                                                {entry.class} - Section {entry.section}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="diary-card-actions">
                                                        <span className="diary-card-time">
                                                            <Clock size={12} /> {entry.timeDisplay}
                                                        </span>
                                                        <button
                                                            className="diary-action-btn diary-edit-btn"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleEditEntry(entry);
                                                            }}
                                                            title="Edit entry"
                                                        >
                                                            <Edit3 size={14} />
                                                        </button>
                                                        <button
                                                            className="diary-action-btn diary-delete-btn"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteEntry(entry.id);
                                                            }}
                                                            title="Delete entry"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="diary-card-body">
                                                    <p>{entry.desc}</p>
                                                </div>
                                                <div className="diary-card-footer">
                                                    <span className="diary-teacher-badge">
                                                        <GraduationCap size={12} />
                                                        {entry.teacher}
                                                    </span>
                                                    <span className="diary-added-time">
                                                        Added: {new Date(entry.createdAt).toLocaleTimeString('en-US', {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="diary-no-entries">
                                <div className="diary-empty-icon">
                                    <BookText size={48} strokeWidth={1.5} />
                                </div>
                                <h3>No diary entries found</h3>
                                <p>Start adding your daily classroom activities for students to view.</p>
                                <button
                                    className="diary-start-btn"
                                    onClick={() => setShowAddForm(true)}
                                >
                                    <Plus size={18} />
                                    Add Your First Entry
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddDiary;