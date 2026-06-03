import { BookText, ArrowLeft } from "lucide-react";
import Header from "../../../components/layout/Header/Header";
import Sidebar from "../../../components/layout/Sidebar/StudentSidebar";
import Footer from "../../../components/layout/Footer/Footer";
import "../styles/classDiary.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ClassDiary = () => {
    const navigate = useNavigate();
    
    // Default time filter set to "Today"
    const [timeFilter, setTimeFilter] = useState("Today");
    const [open, setOpen] = useState(false);
    
    const diaryData = [
        {
            date: "16 Apr 2026",
            dateValue: "2026-04-16",
            tasks: [
                {
                    subject: "Mathematics",
                    desc: "Teacher explained Chapter 5 and solved examples 1-5."
                },
                {
                    subject: "Science",
                    desc: "Discussion about Photosynthesis and drew diagram."
                }
            ]
        },
        {
            date: "15 Apr 2026",
            dateValue: "2026-04-15",
            tasks: [
                {
                    subject: "English",
                    desc: "Reading practice from Chapter 4, discussed vocabulary."
                },
                {
                    subject: "History",
                    desc: "Introduction of Mughal Empire and Babur's conquest."
                },
                {
                    subject: "Urdu",
                    desc: "Poetry analysis of Allama Iqbal's work."
                }
            ]
        },
        {
            date: "14 Apr 2026",
            dateValue: "2026-04-14",
            tasks: [
                {
                    subject: "Computer",
                    desc: "Introduction to HTML tags and structure."
                },
                {
                    subject: "Physics",
                    desc: "Explained Newton's Laws of Motion."
                }
            ]
        },
        {
            date: "13 Apr 2026",
            dateValue: "2026-04-13",
            tasks: [
                {
                    subject: "Chemistry",
                    desc: "Lab experiment: Testing pH levels of different solutions."
                },
                {
                    subject: "Biology",
                    desc: "Studied cell structure and functions."
                }
            ]
        },
        {
            date: "10 Apr 2026",
            dateValue: "2026-04-10",
            tasks: [
                {
                    subject: "Geography",
                    desc: "Map reading and identifying continents."
                }
            ]
        }
    ];

    // Helper function to get date string in YYYY-MM-DD format
    const getDateString = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Get today's date and other date ranges
    const today = new Date();
    const todayStr = getDateString(today);
    
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = getDateString(yesterday);
    
    const last7Days = new Date(today);
    last7Days.setDate(today.getDate() - 7);
    const last7DaysStr = getDateString(last7Days);

    // Handle time filter change
    const handleTimeFilterChange = (filter) => {
        setTimeFilter(filter);
    };

    // Filter diary data based on time filter
    const filteredDiaryData = diaryData.filter(day => {
        if (timeFilter === "All") return true;
        if (timeFilter === "Today") return day.dateValue === todayStr;
        if (timeFilter === "Yesterday") return day.dateValue === yesterdayStr;
        if (timeFilter === "Last 7 Days") return day.dateValue >= last7DaysStr;
        return true;
    });

    // Get count of diary entries for each time filter
    const getTimeFilterCount = (filter) => {
        return diaryData.filter(day => {
            if (filter === "Today") return day.dateValue === todayStr;
            if (filter === "Yesterday") return day.dateValue === yesterdayStr;
            if (filter === "Last 7 Days") return day.dateValue >= last7DaysStr;
            return true;
        }).length;
    };

    // Get total tasks count for filtered data
    const getTotalTasks = () => {
        return filteredDiaryData.reduce((total, day) => total + day.tasks.length, 0);
    };

    return (
        <div>
            <Header open={open} setOpen={setOpen} />

            <div className="layout">
                <Sidebar open={open} />

                <div className="content">
                    <div className="back-nav" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                        <span>Back to Dashboard</span>
                    </div>

                    <h2 className="classdiary-h2" >Class Diary</h2>

                    {/* Time Filter Buttons */}
                    <div className="diary-filter time-filter">
                        <button 
                            className={timeFilter === "All" ? "active" : ""} 
                            onClick={() => handleTimeFilterChange("All")}
                        >
                            All
                            <span className="filter-count">{getTimeFilterCount("All")}</span>
                        </button>
                        <button 
                            className={timeFilter === "Today" ? "active" : ""} 
                            onClick={() => handleTimeFilterChange("Today")}
                        >
                            Today
                            <span className="filter-count">{getTimeFilterCount("Today")}</span>
                        </button>
                        <button 
                            className={timeFilter === "Yesterday" ? "active" : ""} 
                            onClick={() => handleTimeFilterChange("Yesterday")}
                        >
                            Yesterday
                            <span className="filter-count">{getTimeFilterCount("Yesterday")}</span>
                        </button>
                        <button 
                            className={timeFilter === "Last 7 Days" ? "active" : ""} 
                            onClick={() => handleTimeFilterChange("Last 7 Days")}
                        >
                            Last 7 Days
                            <span className="filter-count">{getTimeFilterCount("Last 7 Days")}</span>
                        </button>
                    </div>

                    {/* Results info */}
                    {filteredDiaryData.length > 0 && (
                        <div className="results-info">
                            Showing {filteredDiaryData.length} {filteredDiaryData.length === 1 ? 'day' : 'days'} 
                            • {getTotalTasks()} {getTotalTasks() === 1 ? 'task' : 'tasks'}
                            {timeFilter !== "All" && ` for ${timeFilter}`}
                        </div>
                    )}

                    <div className="diary-container">
                        {filteredDiaryData.length > 0 ? (
                            filteredDiaryData.map((day, index) => (
                                <div key={index} className="diary-day">
                                    {/* Date */}
                                    <h3 className="diary-date">{day.date}</h3>

                                    {/* Tasks */}
                                    {day.tasks.map((task, i) => (
                                        <div className="diary-card" key={i}>
                                            <BookText className="diary-icon" />
                                            <div>
                                                <h4>{task.subject}</h4>
                                                <p>{task.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <div className="no-diary">
                                <BookText size={40} strokeWidth={1} />
                                <p>No class diary entries found</p>
                                <span>Try changing the time filter</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ClassDiary;