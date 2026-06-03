import React, { useState } from 'react';
import Header from "../../../components/layout/Header/Header";
import Sidebar from "../../../components/layout/Sidebar/StudentSidebar";
import Footer from "../../../components/layout/Footer/Footer";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft, Calendar, ChevronLeft, ChevronRight,
    Gift, BookOpen, Users, Calendar as EventIcon,
    Star, Sparkles, Trophy, Coffee, Filter,
    Download, Printer, Share2, Bell, MapPin, Clock,
    Grid, List, X,
    BookOpenCheck,
    PartyPopper,
    CalendarSyncIcon,
    UserRound,
    UsersRound
} from "lucide-react";
import "../styles/academicCalendar.css";

const AcademicCalendar = () => {
    const navigate = useNavigate();

    // Event Modal State
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEventModal, setShowEventModal] = useState(false);

    const [currentYear, setCurrentYear] = useState(2022);
    const [currentMonth, setCurrentMonth] = useState(3); // April 2022
    const [viewMode, setViewMode] = useState("month");
    const [selectedYear, setSelectedYear] = useState(2022);
    const [open, setOpen] = useState(false);

    // Yearly Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMonthData, setSelectedMonthData] = useState(null);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const years = [2021, 2022, 2023, 2024, 2025, 2026];

    const eventsData = {
        "2021-12-01": { type: "holiday", title: "Winter Break", description: "School Closed", time: "All Day" },
        "2021-12-10": { type: "event", title: "Science Fair", description: "Annual Science Exhibition", time: "9:00 AM - 3:00 PM", venue: "School Auditorium" },
        "2021-12-14": { type: "exam", title: "Half-Yearly Exam", description: "Mathematics", time: "8:00 AM - 11:00 AM", venue: "Classrooms" },
        "2021-12-15": { type: "exam", title: "Half-Yearly Exam", description: "Science", time: "8:00 AM - 11:00 AM", venue: "Classrooms" },
        "2021-12-16": { type: "exam", title: "Half-Yearly Exam", description: "English", time: "8:00 AM - 11:00 AM", venue: "Classrooms" },
        "2021-12-20": { type: "ptm", title: "Parent-Teacher Meeting", description: "Report Card Distribution", time: "9:00 AM - 2:00 PM", venue: "Classrooms" },
        "2021-12-25": { type: "holiday", title: "Christmas", description: "School Closed", time: "All Day" },
        "2021-12-31": { type: "event", title: "New Year Celebration", description: "School Party", time: "10:00 AM - 12:00 PM", venue: "School Ground" },
        "2022-01-01": { type: "holiday", title: "New Year", description: "School Closed", time: "All Day" },
        "2022-01-12": { type: "event", title: "Swami Vivekananda Jayanti", description: "Special Assembly", time: "8:00 AM - 9:00 AM", venue: "Assembly Hall" },
        "2022-01-15": { type: "ptm", title: "PTM", description: "Class 10 Parent Meeting", time: "10:00 AM - 1:00 PM", venue: "Classrooms" },
        "2022-01-26": { type: "holiday", title: "Republic Day", description: "School Closed", time: "All Day" },
        "2022-02-05": { type: "event", title: "Annual Sports Day", description: "Sports Competition", time: "9:00 AM - 4:00 PM", venue: "Sports Ground" },
        "2022-02-14": { type: "exam", title: "Unit Test", description: "All Subjects", time: "8:00 AM - 12:00 PM", venue: "Classrooms" },
        "2022-02-19": { type: "event", title: "Cultural Fest", description: "Annual Day Function", time: "5:00 PM - 8:00 PM", venue: "School Auditorium" },
        "2022-03-01": { type: "exam", title: "Final Examination", description: "Begins", time: "8:00 AM - 11:00 AM", venue: "Classrooms" },
        "2022-03-15": { type: "ptm", title: "PTM", description: "Final Result Discussion", time: "9:00 AM - 2:00 PM", venue: "Classrooms" },
        "2022-03-17": { type: "holiday", title: "Holi", description: "School Closed", time: "All Day" },
        "2022-03-25": { type: "event", title: "Farewell", description: "Class 10 Farewell", time: "10:00 AM - 2:00 PM", venue: "School Auditorium" },
        "2022-04-01": { type: "holiday", title: "New Session Begins", description: "Academic Year 2022-23", time: "All Day" },
        "2022-04-14": { type: "holiday", title: "Ambedkar Jayanti", description: "School Closed", time: "All Day" },
        "2022-04-15": { type: "event", title: "Orientation Day", description: "New Parents Meeting", time: "10:00 AM - 12:00 PM", venue: "Conference Hall" },
        "2023-01-26": { type: "holiday", title: "Republic Day", description: "School Closed", time: "All Day" },
        "2023-03-08": { type: "event", title: "Women's Day Celebration", description: "Special Assembly", time: "8:00 AM - 9:00 AM", venue: "Assembly Hall" },
        "2024-01-26": { type: "holiday", title: "Republic Day", description: "School Closed", time: "All Day" },
        "2024-08-15": { type: "holiday", title: "Independence Day", description: "School Closed", time: "All Day" },
        "2025-01-26": { type: "holiday", title: "Republic Day", description: "School Closed", time: "All Day" },
        "2026-01-26": { type: "holiday", title: "Republic Day", description: "School Closed", time: "All Day" },
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const getEventForDate = (year, month, day) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return eventsData[dateStr] || null;
    };

    const getEventTypeColor = (type) => {
        switch (type) {
            case 'holiday': return { bg: '#fef3c7', text: '#d97706', border: '#f59e0b', gradient: 'linear-gradient(135deg, #fef3c7, #fde68a)' };
            case 'exam': return { bg: '#fee2e2', text: '#dc2626', border: '#ef4444', gradient: 'linear-gradient(135deg, #fee2e2, #fecaca)' };
            case 'ptm': return { bg: '#dbeafe', text: '#2563eb', border: '#3b82f6', gradient: 'linear-gradient(135deg, #dbeafe, #bfdbfe)' };
            case 'event': return { bg: '#dcfce7', text: '#16a34a', border: '#22c55e', gradient: 'linear-gradient(135deg, #dcfce7, #bbf7d0)' };
            default: return { bg: '#f3f4f6', text: '#6b7280', border: '#9ca3af', gradient: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)' };
        }
    };

    const getEventIcon = (type) => {
        switch (type) {
            case 'holiday': return <Gift size={16} />;
            case 'exam': return <BookOpen size={16} />;
            case 'ptm': return <Users size={16} />;
            case 'event': return <Star size={16} />;
            default: return <EventIcon size={16} />;
        }
    };

    const getEventLabel = (type) => {
        switch (type) {
            case 'holiday': return 'Holiday';
            case 'exam': return 'Exam';
            case 'ptm': return 'PTM';
            case 'event': return 'Event';
            default: return '';
        }
    };

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handleYearChange = (e) => {
        setCurrentYear(parseInt(e.target.value));
    };

    const handleMonthChange = (e) => {
        setCurrentMonth(parseInt(e.target.value));
    };

    // FIXED: renderCalendar function with optional parameters
    const renderCalendar = (year = currentYear, month = currentMonth) => {
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        const today = new Date();
        const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
        const currentDate = today.getDate();

        const calendarDays = [];

        for (let i = 0; i < firstDay; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="cal-day-cell empty"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const event = getEventForDate(year, month, day);
            const isToday = isCurrentMonth && day === currentDate;
            const eventType = event ? event.type : null;
            const eventColors = eventType ? getEventTypeColor(eventType) : null;

            calendarDays.push(
                <div
                    key={day}
                    className={`cal-day-cell ${eventType ? 'has-event' : ''} ${isToday ? 'today' : ''}`}
                    style={eventType ? {
                        background: eventColors.gradient,
                        borderColor: eventColors.border
                    } : {}}
                    onClick={() => {
                        if (event) {
                            handleEventClick(event, day, year, month);
                        }
                    }}
                >
                    <span className="day-number">{day}</span>
                    {eventType && (
                        <span className="day-event-badge" style={{ background: eventColors.text }}>
                            {getEventLabel(eventType)}
                        </span>
                    )}
                </div>
            );
        }

        return calendarDays;
    };

    // Event click handler
    const handleEventClick = (event, day, year, month) => {
        setSelectedEvent({
            ...event,
            day: day,
            date: `${day} ${months[month]} ${year}`
        });
        setShowEventModal(true);
    };

    const closeEventModal = () => {
        setShowEventModal(false);
        setSelectedEvent(null);
    };

    const getCurrentMonthEvents = () => {
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);
        const events = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const event = getEventForDate(currentYear, currentMonth, day);
            if (event) {
                events.push({
                    day,
                    ...event,
                    fullDate: `${day} ${months[currentMonth]} ${currentYear}`
                });
            }
        }

        return events.sort((a, b) => a.day - b.day);
    };

    const getMonthEvents = (year, month) => {
        const daysInMonth = getDaysInMonth(year, month);
        const events = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const event = getEventForDate(year, month, day);
            if (event) {
                events.push({
                    day,
                    ...event
                });
            }
        }
        return events.sort((a, b) => a.day - b.day);
    };

    const renderMiniCalendar = (year, month) => {
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

        const calendarCells = [];

        for (let i = 0; i < 7; i++) {
            calendarCells.push(
                <div key={`header-${i}`} className="mini-cal-weekday">
                    {weekdays[i]}
                </div>
            );
        }

        for (let i = 0; i < firstDay; i++) {
            calendarCells.push(<div key={`empty-${i}`} className="mini-cal-cell empty"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const event = getEventForDate(year, month, day);
            calendarCells.push(
                <div key={day} className={`mini-cal-cell ${event ? 'has-event' : ''}`}>
                    {day}
                </div>
            );
        }

        return calendarCells;
    };

    const currentEvents = getCurrentMonthEvents();
    const holidayCount = currentEvents.filter(e => e.type === 'holiday').length;
    const examCount = currentEvents.filter(e => e.type === 'exam').length;
    const eventCount = currentEvents.filter(e => e.type === 'event').length;
    const ptmCount = currentEvents.filter(e => e.type === 'ptm').length;

    const handleMonthCardClick = (month) => {
        setSelectedMonthData(month);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedMonthData(null);
    };

    // Event Details Modal Component
   const renderEventModal = () => {
    if (!showEventModal || !selectedEvent) return null;

    const colors = getEventTypeColor(selectedEvent.type);
    const eventIcon = getEventIcon(selectedEvent.type);

    return (
        <div className="event-modal-overlay" onClick={closeEventModal}>
            <div className="event-modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Close button moved to top-level of modal content */}
                <button className="event-modal-close-st" onClick={closeEventModal}>
                    <X size={18} />
                </button>

                <div className="event-modal-header" style={{ background: colors.gradient }}>
                    <div className="event-modal-icon">
                        {eventIcon}
                    </div>
                    <h2>{selectedEvent.title}</h2>
                    {/* Removed the close button from here */}
                </div>

                <div className="event-modal-body">
                    <div className="event-info-section">
                        <div className="event-info-row">
                            <div className="event-info-label">
                                <Calendar size={16} />
                                <span>Date</span>
                            </div>
                            <div className="event-info-value">
                                {selectedEvent.date}
                            </div>
                        </div>

                        <div className="event-info-row">
                            <div className="event-info-label">
                                <Clock size={16} />
                                <span>Time</span>
                            </div>
                            <div className="event-info-value">
                                {selectedEvent.time || 'Time TBA'}
                            </div>
                        </div>

                        {selectedEvent.venue && (
                            <div className="event-info-row">
                                <div className="event-info-label">
                                    <MapPin size={16} />
                                    <span>Venue</span>
                                </div>
                                <div className="event-info-value">
                                    {selectedEvent.venue}
                                </div>
                            </div>
                        )}

                        <div className="event-info-row">
                            <div className="event-info-label">
                                <Star size={16} />
                                <span>Type</span>
                            </div>
                            <div className="event-info-value">
                                <span className="event-type-badge" style={{ background: colors.text }}>
                                    {getEventLabel(selectedEvent.type)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="event-description-section">
                        <h3>Description</h3>
                        <p>{selectedEvent.description}</p>
                    </div>

                    {selectedEvent.type === 'exam' && (
                        <div className="event-notes-section">
                            <h3>Important Notes</h3>
                            <ul>
                                <li>Report 15 minutes before the exam time</li>
                                <li>Bring necessary stationery items</li>
                                <li>Admit card is mandatory</li>
                            </ul>
                        </div>
                    )}

                    {selectedEvent.type === 'ptm' && (
                        <div className="event-notes-section">
                            <h3>Instructions</h3>
                            <ul>
                                <li>Parents are requested to be on time</li>
                                <li>Please bring your child's report card</li>
                                <li>Prior appointment may be required</li>
                            </ul>
                        </div>
                    )}
                    
                </div>

                {/* Footer section completely removed */}
            </div>
        </div>
    );
};

    // Yearly Modal Component
    const renderModal = () => {
        if (!modalOpen || !selectedMonthData) return null;

        // const monthEvents = getMonthEvents(selectedMonthData.year, selectedMonthData.monthIndex);

        return (
            <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <div className="modal-title">
                            <Calendar size={24} />
                            <h2>{selectedMonthData.monthName} {selectedMonthData.year}</h2>
                        </div>
                        <button className="modal-close" onClick={closeModal}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="modal-calendar">
                            <div className="modal-weekdays">
                                <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                            </div>
                            <div className="modal-days-grid">
                                {renderCalendar(selectedMonthData.year, selectedMonthData.monthIndex)}
                            </div>
                        </div>

                        {/* <div className="modal-events">
                            <h3>
                                <Bell size={18} />
                                Events & Holidays
                            </h3>
                            {monthEvents.length > 0 ? (
                                <div className="modal-events-list">
                                    {monthEvents.map((event, idx) => {
                                        const colors = getEventTypeColor(event.type);
                                        return (
                                            <div key={idx} className="modal-event-item" style={{ borderLeftColor: colors.text }}>
                                                <div className="modal-event-date">
                                                    <span className="modal-event-day">{event.day}</span>
                                                </div>
                                                <div className="modal-event-details">
                                                    <div className="modal-event-title">
                                                        {getEventIcon(event.type)}
                                                        <span>{event.title}</span>
                                                    </div>
                                                    <div className="modal-event-desc">{event.description}</div>
                                                    <div className="modal-event-meta">
                                                        <span><Clock size={12} /> {event.time || 'Time TBA'}</span>
                                                        {event.venue && <span><MapPin size={12} /> {event.venue}</span>}
                                                    </div>
                                                </div>
                                                <div className="modal-event-badge" style={{ background: colors.text }}>
                                                    {getEventLabel(event.type)}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="modal-no-events">
                                    <Coffee size={48} />
                                    <p>No events scheduled for this month</p>
                                </div>
                            )}
                        </div> */}
                    </div>
                </div>
            </div>
        );
    };

    const renderYearlyView = () => {
        const sessionMonths = [];
        const monthIndices = [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2];

        for (let i = 0; i < monthIndices.length; i++) {
            const monthIndex = monthIndices[i];
            let yearForMonth = selectedYear;

            if (monthIndex === 0 || monthIndex === 1 || monthIndex === 2) {
                yearForMonth = selectedYear + 1;
            }

            sessionMonths.push({
                monthIndex,
                monthName: months[monthIndex],
                year: yearForMonth
            });
        }

        return (
            <div className="yearly-view-container">
                <div className="yearly-header">
                    <h2>Academic Session {selectedYear}-{selectedYear + 1}</h2>
                    <p className="yearly-subtitle">April to March • Complete Year Overview</p>
                </div>
                <div className="yearly-grid-2cols">
                    {sessionMonths.map((month, idx) => {
                        const monthEvents = getMonthEvents(month.year, month.monthIndex);
                        const holidays = monthEvents.filter(e => e.type === 'holiday');
                        const exams = monthEvents.filter(e => e.type === 'exam');
                        const events = monthEvents.filter(e => e.type === 'event');

                        return (
                            <div
                                key={idx}
                                className="yearly-month-card-compact"
                                onClick={() => handleMonthCardClick(month)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="yearly-month-header-compact">
                                    <h3>{month.monthName}</h3>
                                    <span className="yearly-month-year">{month.year}</span>
                                </div>
                                <div className="yearly-month-content-compact">
                                    <div className="yearly-mini-calendar-compact">
                                        <div className="mini-cal-grid-compact">
                                            {renderMiniCalendar(month.year, month.monthIndex)}
                                        </div>
                                    </div>
                                    <div className="yearly-month-events-compact">
                                        {holidays.length > 0 && (
                                            <div className="yearly-event-group-compact">
                                                <div className="yearly-event-group-header-compact">
                                                    <Gift size={12} className="yearly-event-icon holiday-icon" />
                                                    <span>{holidays.length} Holiday{holidays.length !== 1 ? 's' : ''}</span>
                                                </div>
                                            </div>
                                        )}
                                        {exams.length > 0 && (
                                            <div className="yearly-event-group-compact">
                                                <div className="yearly-event-group-header-compact">
                                                    <BookOpen size={12} className="yearly-event-icon exam-icon" />
                                                    <span>{exams.length} Exam{exams.length !== 1 ? 's' : ''}</span>
                                                </div>
                                            </div>
                                        )}
                                        {events.length > 0 && (
                                            <div className="yearly-event-group-compact">
                                                <div className="yearly-event-group-header-compact">
                                                    <Star size={12} className="yearly-event-icon event-icon" />
                                                    <span>{events.length} Event{events.length !== 1 ? 's' : ''}</span>
                                                </div>
                                            </div>
                                        )}
                                        {monthEvents.length === 0 && (
                                            <div className="yearly-no-events-compact">
                                                <span>No events</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {monthEvents.length > 0 && (
                                    <div className="yearly-event-list-compact">
                                        {holidays.slice(0, 2).map((holiday, hidx) => (
                                            <div key={hidx} className="yearly-event-item-compact holiday-item">
                                                <span className="event-dot holiday-dot"></span>
                                                <span className="event-title">{holiday.title}</span>
                                            </div>
                                        ))}
                                        {exams.slice(0, 1).map((exam, eidx) => (
                                            <div key={eidx} className="yearly-event-item-compact exam-item">
                                                <span className="event-dot exam-dot"></span>
                                                <span className="event-title">{exam.title}</span>
                                            </div>
                                        ))}
                                        {monthEvents.length > 3 && (
                                            <div className="yearly-event-more-compact">
                                                +{monthEvents.length - 3} more events
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="academic-calendar-wrapper">
            <Header open={open} setOpen={setOpen} />
            <div className="academic-calendar-layout">
                <Sidebar open={open} />
                <div className="academic-calendar-main">
                    <div className="back-nav" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                        <span>Back to Dashboard</span>
                    </div>

                    <div className="calendar-hero">
                        <div className="hero-bg"></div>
                        <div className="hero-content">
                            <div className="hero-icon">
                                <Calendar size={32} />
                            </div>
                            <div className="hero-text">
                                <h1>Academic Calendar</h1>
                                <p>Stay updated with all school events, holidays, and examinations</p>
                            </div>
                        </div>
                    </div>

                    <div className="calendar-controls">
                        <div className="controls-left">
                            <div className="view-toggle">
                                <button className={`view-btn ${viewMode === 'month' ? 'active' : ''}`} onClick={() => setViewMode('month')}>
                                    <Calendar size={16} />
                                    <span>Month View</span>
                                </button>
                                <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
                                    <List size={16} />
                                    <span>List View</span>
                                </button>
                                <button className={`view-btn ${viewMode === 'year' ? 'active' : ''}`} onClick={() => setViewMode('year')}>
                                    <Grid size={16} />
                                    <span>Yearly View</span>
                                </button>
                            </div>
                        </div>
                        <div className="controls-right">
                            {viewMode !== 'year' ? (
                                <>
                                    <div className="dropdown-group">
                                        <select className="month-select" value={currentMonth} onChange={handleMonthChange}>
                                            {months.map((month, idx) => (
                                                <option key={idx} value={idx}>{month}</option>
                                            ))}
                                        </select>
                                        <select className="year-select" value={currentYear} onChange={handleYearChange}>
                                            {years.map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button className="action-btn"><Download size={16} /></button>
                                    <button className="action-btn"><Printer size={16} /></button>
                                    <button className="action-btn"><Share2 size={16} /></button>
                                </>
                            ) : (
                                <div className="year-selector-wrapper">
                                    <select className="year-select-large" value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}-{year + 1}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>

                    {(viewMode === 'month' || viewMode === 'list') && (
                        <>
                            <div className="calendar-stats-ac">
                                <div className="stat-card-ac holiday-stat">
                                    <div className="stat-icon-ac"><PartyPopper/></div>
                                    <div className="stat-info-ac">
                                        <span className="stat-number-ac">{holidayCount}</span>
                                        <span className="stat-label-ac">Holidays</span>
                                    </div>
                                </div>
                                <div className="stat-card-ac exam-stat-ac">
                                    <div className="stat-icon-ac"><BookOpenCheck /></div>
                                    <div className="stat-info-ac">
                                        <span className="stat-number-ac">{examCount}</span>
                                        <span className="stat-label-ac">Exams</span>
                                    </div>
                                </div>
                                <div className="stat-card-ac event-stat-ac">
                                    <div className="stat-icon-ac"><CalendarSyncIcon/> </div>
                                    <div className="stat-info-ac">
                                        <span className="stat-number-ac">{eventCount}</span>
                                        <span className="stat-label-ac">Events</span>
                                    </div>
                                </div>
                                <div className="stat-card-ac ptm-stat-ac">
                                    <div className="stat-icon-ac"><UsersRound /> </div>
                                    <div className="stat-info-ac">
                                        <span className="stat-number-ac">{ptmCount}</span>
                                        <span className="stat-label-ac">PTM</span>
                                    </div>
                                </div>
                            </div>

                            <div className="month-navigation-bar">
                                <button className="nav-arrow" onClick={handlePrevMonth}><ChevronLeft size={20} /></button>
                                <div className="current-month-display">
                                    <Sparkles size={20} />
                                    <h2>{months[currentMonth]} {currentYear}</h2>
                                </div>
                                <button className="nav-arrow" onClick={handleNextMonth}><ChevronRight size={20} /></button>
                            </div>

                            <div className="calendar-legend-bar">
                                <div className="legend-item"><span className="legend-color holiday"></span><span>Holiday</span></div>
                                <div className="legend-item"><span className="legend-color exam"></span><span>Exam</span></div>
                                <div className="legend-item"><span className="legend-color ptm"></span><span>PTM</span></div>
                                <div className="legend-item"><span className="legend-color event"></span><span>Event</span></div>
                                <div className="legend-item"><span className="legend-color today"></span><span>Today</span></div>
                            </div>
                        </>
                    )}

                    {viewMode === 'month' && (
                        <div className="calendar-grid-container">
                            <div className="calendar-weekdays">
                                <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                            </div>
                            <div className="calendar-days-grid">
                                {renderCalendar()}
                            </div>
                        </div>
                    )}

                    {viewMode === 'list' && (
                        <div className="list-view-container">
                            {currentEvents.length > 0 ? (
                                currentEvents.map((event, idx) => {
                                    const colors = getEventTypeColor(event.type);
                                    return (
                                        <div key={idx} className="list-event-card" style={{ borderLeftColor: colors.text }}>
                                            <div className="list-event-date">
                                                <span className="list-event-day">{event.day}</span>
                                                <span className="list-event-month">{months[currentMonth].substring(0, 3)}</span>
                                            </div>
                                            <div className="list-event-content">
                                                <div className="list-event-title">
                                                    {getEventIcon(event.type)}
                                                    <span>{event.title}</span>
                                                </div>
                                                <div className="list-event-desc">{event.description}</div>
                                                <div className="list-event-meta">
                                                    <span><Clock size={12} /> {event.time || 'Time TBA'}</span>
                                                    {event.venue && <span><MapPin size={12} /> {event.venue}</span>}
                                                </div>
                                            </div>
                                            <div className="list-event-badge" style={{ background: colors.text }}>
                                                {getEventLabel(event.type)}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="no-events-card">
                                    <Coffee size={48} />
                                    <h3>No Events Scheduled</h3>
                                    <p>There are no events or holidays in {months[currentMonth]} {currentYear}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {viewMode === 'year' && renderYearlyView()}

                    {renderModal()}
                    {renderEventModal()}

                    {viewMode === 'month' && currentEvents.length > 0 && (
                        <div className="upcoming-events-preview">
                            <div className="preview-header">
                                <Bell size={18} />
                                <h3>Upcoming Events</h3>
                            </div>
                            <div className="preview-list">
                                {currentEvents.slice(0, 4).map((event, idx) => {
                                    const colors = getEventTypeColor(event.type);
                                    return (
                                        <div key={idx} className="preview-item">
                                            <div className="preview-date">
                                                <span className="preview-day">{event.day}</span>
                                            </div>
                                            <div className="preview-info">
                                                <span className="preview-title">{event.title}</span>
                                                <span className="preview-type" style={{ color: colors.text }}>{getEventLabel(event.type)}</span>
                                            </div>
                                            <ChevronRight size={14} className="preview-arrow" />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AcademicCalendar;