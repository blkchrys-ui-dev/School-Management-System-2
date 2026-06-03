import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useState } from "react";
import { ArrowLeft, Clock, User, Calendar, GraduationCap, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import '../styling/timeTable.css'

const TimeTable = () => {
    const navigate = useNavigate();
    const [activeDay, setActiveDay] = useState("MON");

    const schedule = {
        MON: [
            { subject: "English", teacher: "Khalid Ahmad", time: "8:00 - 8:40", period: 1, room: "Room 101" },
            { subject: "Mathematics", teacher: "Farooq Khan", time: "8:40 - 9:20", period: 2, room: "Room 102" },
            { subject: "Urdu", teacher: "Ayesha Siddiqui", time: "9:30 - 10:10", period: 3, room: "Room 103" },
            { subject: "Hindi", teacher: "Priya Sharma", time: "10:10 - 10:50", period: 4, room: "Room 104" },
            { subject: "Science", teacher: "Rahul Verma", time: "11:00 - 11:40", period: 5, room: "Lab 1" },
            { subject: "Social Studies", teacher: "Meera Sen", time: "11:40 - 12:20", period: 6, room: "Room 105" }
        ],
        TUE: [
            { subject: "Computer Science", teacher: "Amit Singh", time: "8:00 - 8:40", period: 1, room: "Comp Lab" },
            { subject: "English", teacher: "Khalid Ahmad", time: "8:40 - 9:20", period: 2, room: "Room 101" },
            { subject: "Mathematics", teacher: "Farooq Khan", time: "9:30 - 10:10", period: 3, room: "Room 102" },
            { subject: "Physics", teacher: "Dr. Anil Kumar", time: "10:10 - 10:50", period: 4, room: "Lab 2" },
            { subject: "Chemistry", teacher: "Neha Gupta", time: "11:00 - 11:40", period: 5, room: "Lab 2" },
            { subject: "Physical Education", teacher: "Rajesh Singh", time: "11:40 - 12:20", period: 6, room: "Ground" }
        ],
        WED: [
            { subject: "Mathematics", teacher: "Farooq Khan", time: "8:00 - 8:40", period: 1, room: "Room 102" },
            { subject: "Urdu", teacher: "Ayesha Siddiqui", time: "8:40 - 9:20", period: 2, room: "Room 103" },
            { subject: "English", teacher: "Khalid Ahmad", time: "9:30 - 10:10", period: 3, room: "Room 101" },
            { subject: "History", teacher: "Meera Sen", time: "10:10 - 10:50", period: 4, room: "Room 105" },
            { subject: "Biology", teacher: "Neha Gupta", time: "11:00 - 11:40", period: 5, room: "Lab 3" },
            { subject: "Art", teacher: "Pooja Sharma", time: "11:40 - 12:20", period: 6, room: "Art Room" }
        ],
        THU: [
            { subject: "Hindi", teacher: "Priya Sharma", time: "8:00 - 8:40", period: 1, room: "Room 104" },
            { subject: "Science", teacher: "Rahul Verma", time: "8:40 - 9:20", period: 2, room: "Lab 1" },
            { subject: "Computer Science", teacher: "Amit Singh", time: "9:30 - 10:10", period: 3, room: "Comp Lab" },
            { subject: "Mathematics", teacher: "Farooq Khan", time: "10:10 - 10:50", period: 4, room: "Room 102" },
            { subject: "English", teacher: "Khalid Ahmad", time: "11:00 - 11:40", period: 5, room: "Room 101" },
            { subject: "Geography", teacher: "Meera Sen", time: "11:40 - 12:20", period: 6, room: "Room 105" }
        ],
        FRI: [
            { subject: "Urdu", teacher: "Ayesha Siddiqui", time: "8:00 - 8:40", period: 1, room: "Room 103" },
            { subject: "Hindi", teacher: "Priya Sharma", time: "8:40 - 9:20", period: 2, room: "Room 104" },
            { subject: "Mathematics", teacher: "Farooq Khan", time: "9:30 - 10:10", period: 3, room: "Room 102" },
            { subject: "English", teacher: "Khalid Ahmad", time: "10:10 - 10:50", period: 4, room: "Room 101" },
            { subject: "Physics", teacher: "Dr. Anil Kumar", time: "11:00 - 11:40", period: 5, room: "Lab 2" },
            { subject: "Sports", teacher: "Rajesh Singh", time: "11:40 - 12:20", period: 6, room: "Ground" }
        ],
        SAT: [
            { subject: "Mathematics", teacher: "Farooq Khan", time: "8:00 - 8:40", period: 1, room: "Room 102" },
            { subject: "Science", teacher: "Rahul Verma", time: "8:40 - 9:20", period: 2, room: "Lab 1" },
            { subject: "English", teacher: "Khalid Ahmad", time: "9:30 - 10:10", period: 3, room: "Room 101" },
            { subject: "Computer Science", teacher: "Amit Singh", time: "10:10 - 10:50", period: 4, room: "Comp Lab" }
        ],
        SUN: [
            { subject: "Holiday", teacher: "-", time: "-", period: 0, room: "-", isHoliday: true }
        ]
    };

    const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    const today = new Date().getDay();
    const dayMap = { 1: "MON", 2: "TUE", 3: "WED", 4: "THU", 5: "FRI", 6: "SAT", 0: "SUN" };
    const currentDay = dayMap[today];
    const [open, setOpen] = useState(false);
    
    return (
        <div className="timetable-container">
            <Header open={open} setOpen={setOpen} />
            <div className="timetable-layout">
                <Sidebar open={open} />
                <div className="timetable-content">
                    <div className="back-nav" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                        <span>Back to Dashboard</span>
                    </div>

                    <div className="page-header">
                        <div className="header-left">
                            <div className="header-icon">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <h1>Class Time Table</h1>
                                <p>Academic Year 2025-26 • Class 10-A</p>
                            </div>
                        </div>
                        <div className="current-day-badge">
                            <GraduationCap size={16} />
                            <span>{currentDay === activeDay ? "Today's Schedule" : "Select a day"}</span>
                        </div>
                    </div>

                    <div className="day-selector-wrapper">
                        <div className="day-selector">
                            {weekDays.map((day) => (
                                <button
                                    key={day}
                                    className={`day-pill ${activeDay === day ? "active" : ""} ${currentDay === day ? "today" : ""}`}
                                    onClick={() => setActiveDay(day)}
                                >
                                    <span className="day-short">{day.substring(0, 3)}</span>
                                    <span className="day-full">
                                        {day === "MON" ? "Monday" : day === "TUE" ? "Tuesday" : day === "WED" ? "Wednesday" :
                                            day === "THU" ? "Thursday" : day === "FRI" ? "Friday" : day === "SAT" ? "Saturday" : "Sunday"}
                                    </span>
                                    {currentDay === day && <span className="today-dot">●</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="schedule-stats">
                        <div className="stat-card-ti">
                            <span className="stat-label-ti">Total Periods</span>
                            <span className="stat-value-ti">{schedule[activeDay]?.filter(s => !s.isHoliday).length || 0}</span>
                        </div>
                        <div className="stat-card-ti">
                            <span className="stat-label-ti">Start Time</span>
                            <span className="stat-value-ti">
                                {schedule[activeDay]?.[0]?.time?.split(" - ")[0] || "8:00"}
                            </span>
                        </div>
                        <div className="stat-card-ti">
                            <span className="stat-label-ti">End Time</span>
                            <span className="stat-value-ti">
                                {schedule[activeDay]?.[schedule[activeDay].length - 1]?.time?.split(" - ")[1] || "12:20"}
                            </span>
                        </div>
                    </div>

                    {schedule[activeDay]?.[0]?.isHoliday ? (
                        <div className="holiday-card">
                            <div className="holiday-icon">🎉</div>
                            <h3>No Classes Today</h3>
                            <p>Enjoy your holiday! 📚✨</p>
                        </div>
                    ) : (
                        <div className="schedule-grid">
                            {schedule[activeDay]?.map((item, index) => (
                                <div className="schedule-card" key={index} style={{ animationDelay: `${index * 0.05}s` }}>
                                    <div className="card-main">
                                        <div className="period-badge-main">
                                            <span className="period-number-large">{item.period}</span>
                                        </div>
                                        <div className="card-info">
                                            <h3 className="subject-name">{item.subject}</h3>
                                            <div className="teacher-name">
                                                <User size={12} />
                                                <span>{item.teacher}</span>
                                            </div>
                                            <div className="time-room-mobile">
                                                <div className="time-info-mobile">
                                                    <Clock size={12} />
                                                    <span>{item.time}</span>
                                                </div>
                                                {item.room && item.room !== "-" && (
                                                    <div className="room-info-mobile">
                                                        <MapPin size={12} />
                                                        <span>{item.room}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="time-room-desktop">
                                            <div className="time-info">
                                                <Clock size={12} />
                                                <span>{item.time}</span>
                                            </div>
                                            {item.room && item.room !== "-" && (
                                                <div className="room-info">
                                                    <MapPin size={12} />
                                                    <span>{item.room}</span>
                                                </div>
                                            )}
                                        </div>
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

export default TimeTable;