import React, { useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft, Calendar, ChevronLeft, ChevronRight,
    Gift, BookOpen, Users, Calendar as EventIcon,
    Star, Sparkles, Coffee,
    Download, Printer, Bell, MapPin, Clock,
    Grid, List, X, Plus, Edit3, Trash2, Save, Check,
    BookOpenCheck, PartyPopper, CalendarSyncIcon, UsersRound
} from "lucide-react";
import "./addacademiccalendar.css";

const AddAcademicCalendar = () => {
    const navigate = useNavigate();

    // ============ EXISTING STATES ============
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEventModal, setShowEventModal] = useState(false);
    const [currentYear, setCurrentYear] = useState(2026);
    const [currentMonth, setCurrentMonth] = useState(3); // April
    const [viewMode, setViewMode] = useState("month");
    const [selectedYear, setSelectedYear] = useState(2026);
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMonthData, setSelectedMonthData] = useState(null);

    // ============ NEW MANAGEMENT STATES ============
    const [showMgmtForm, setShowMgmtForm] = useState(false);
    const [editingDateKey, setEditingDateKey] = useState(null);
    const [successMsg, setSuccessMsg] = useState("");
    const [mgmtFormData, setMgmtFormData] = useState({
        date: "",
        type: "event",
        title: "",
        description: "",
        time: "",
        venue: ""
    });

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028];

    // ============ EVENTS DATA - BHAR BHAR KE EVENTS ============
    const [eventsData, setEventsData] = useState({
        // 2021 Events
        "2021-04-01": { id: 1, type: "holiday", title: "New Session Begins", description: "Academic Year 2021-22 starts", time: "All Day", venue: "" },
        "2021-04-14": { id: 2, type: "holiday", title: "Ambedkar Jayanti", description: "School Closed", time: "All Day", venue: "" },
        "2021-04-21": { id: 3, type: "event", title: "Orientation Day", description: "New parents orientation program", time: "10:00 AM - 12:00 PM", venue: "Conference Hall" },
        "2021-05-01": { id: 4, type: "holiday", title: "Labour Day", description: "School Closed", time: "All Day", venue: "" },
        "2021-05-15": { id: 5, type: "ptm", title: "First PTM", description: "Parent-Teacher Meeting for progress discussion", time: "9:00 AM - 2:00 PM", venue: "Classrooms" },
        "2021-06-05": { id: 6, type: "event", title: "World Environment Day", description: "Tree plantation and awareness rally", time: "8:00 AM - 11:00 AM", venue: "School Ground" },
        "2021-07-10": { id: 7, type: "exam", title: "Unit Test 1", description: "First unit test all subjects", time: "8:00 AM - 12:00 PM", venue: "Classrooms" },
        "2021-08-15": { id: 8, type: "holiday", title: "Independence Day", description: "Flag hoisting ceremony", time: "7:00 AM - 10:00 AM", venue: "School Ground" },
        "2021-08-22": { id: 9, type: "event", title: "Raksha Bandhan Celebration", description: "Special assembly and activities", time: "8:00 AM - 10:00 AM", venue: "Assembly Hall" },
        "2021-09-05": { id: 10, type: "event", title: "Teachers Day", description: "Students celebration for teachers", time: "9:00 AM - 12:00 PM", venue: "School Auditorium" },
        "2021-09-15": { id: 11, type: "exam", title: "Half-Yearly Exams Begin", description: "Half-yearly examination", time: "8:00 AM - 11:00 AM", venue: "Classrooms" },
        "2021-10-02": { id: 12, type: "holiday", title: "Gandhi Jayanti", description: "School Closed", time: "All Day", venue: "" },
        "2021-10-15": { id: 13, type: "holiday", title: "Dussehra", description: "School Closed", time: "All Day", venue: "" },
        "2021-11-04": { id: 14, type: "holiday", title: "Diwali Break Begins", description: "School Closed for Diwali", time: "All Day", venue: "" },
        "2021-11-14": { id: 15, type: "event", title: "Children's Day", description: "Fun activities and games", time: "9:00 AM - 3:00 PM", venue: "School Ground" },
        "2021-11-25": { id: 16, type: "ptm", title: "Second PTM", description: "Mid-session progress report", time: "9:00 AM - 2:00 PM", venue: "Classrooms" },
        "2021-12-10": { id: 17, type: "exam", title: "Pre-Board Exam", description: "Pre-board examination for Class 10 & 12", time: "8:00 AM - 12:00 PM", venue: "Classrooms" },
        "2021-12-20": { id: 18, type: "event", title: "Annual Sports Day", description: "Sports competition and prize distribution", time: "9:00 AM - 4:00 PM", venue: "Sports Ground" },
        "2021-12-25": { id: 19, type: "holiday", title: "Christmas", description: "School Closed", time: "All Day", venue: "" },
        "2021-12-31": { id: 20, type: "event", title: "New Year Eve Celebration", description: "Cultural program and party", time: "10:00 AM - 1:00 PM", venue: "School Auditorium" },

        // 2022 Events
        "2022-01-01": { id: 21, type: "holiday", title: "New Year", description: "School Closed", time: "All Day", venue: "" },
        "2022-01-12": { id: 22, type: "event", title: "Swami Vivekananda Jayanti", description: "Special assembly and speech competition", time: "8:00 AM - 10:00 AM", venue: "Assembly Hall" },
        "2022-01-14": { id: 23, type: "holiday", title: "Makar Sankranti", description: "School Closed", time: "All Day", venue: "" },
        "2022-01-26": { id: 24, type: "holiday", title: "Republic Day", description: "Flag hoisting and cultural program", time: "7:00 AM - 10:00 AM", venue: "School Ground" },
        "2022-02-05": { id: 25, type: "event", title: "Science Exhibition", description: "Annual science fair and exhibition", time: "9:00 AM - 3:00 PM", venue: "Science Lab & Hall" },
        "2022-02-14": { id: 26, type: "exam", title: "Unit Test 2", description: "Second unit test all subjects", time: "8:00 AM - 12:00 PM", venue: "Classrooms" },
        "2022-02-28": { id: 27, type: "holiday", title: "Maha Shivratri", description: "School Closed", time: "All Day", venue: "" },
        "2022-03-01": { id: 28, type: "exam", title: "Final Exams Begin", description: "Annual final examination", time: "8:00 AM - 11:00 AM", venue: "Classrooms" },
        "2022-03-15": { id: 29, type: "ptm", title: "Final PTM", description: "Annual result discussion with parents", time: "9:00 AM - 2:00 PM", venue: "Classrooms" },
        "2022-03-17": { id: 30, type: "holiday", title: "Holi", description: "School Closed", time: "All Day", venue: "" },
        "2022-03-25": { id: 31, type: "event", title: "Farewell Party", description: "Farewell for Class 10 & 12 students", time: "10:00 AM - 2:00 PM", venue: "School Auditorium" },
        "2022-04-01": { id: 32, type: "holiday", title: "New Session Begins", description: "Academic Year 2022-23 starts", time: "All Day", venue: "" },
        "2022-04-14": { id: 33, type: "holiday", title: "Ambedkar Jayanti", description: "School Closed", time: "All Day", venue: "" },
        "2022-04-15": { id: 34, type: "event", title: "Orientation Day", description: "New parents meeting", time: "10:00 AM - 12:00 PM", venue: "Conference Hall" },
        "2022-05-01": { id: 35, type: "holiday", title: "Labour Day", description: "School Closed", time: "All Day", venue: "" },
        "2022-05-10": { id: 36, type: "ptm", title: "First PTM", description: "New session progress meeting", time: "9:00 AM - 1:00 PM", venue: "Classrooms" },
        "2022-06-05": { id: 37, type: "event", title: "World Environment Day", description: "Awareness campaign and plantation", time: "8:00 AM - 11:00 AM", venue: "School Ground" },
        "2022-07-05": { id: 38, type: "exam", title: "Unit Test 1", description: "First unit test", time: "8:00 AM - 12:00 PM", venue: "Classrooms" },
        "2022-08-15": { id: 39, type: "holiday", title: "Independence Day", description: "Flag hoisting ceremony", time: "7:00 AM - 10:00 AM", venue: "School Ground" },
        "2022-09-05": { id: 40, type: "event", title: "Teachers Day", description: "Special celebration", time: "9:00 AM - 12:00 PM", venue: "School Auditorium" },
        "2022-09-20": { id: 41, type: "exam", title: "Half-Yearly Exams", description: "Half-yearly examination", time: "8:00 AM - 11:00 AM", venue: "Classrooms" },
        "2022-10-02": { id: 42, type: "holiday", title: "Gandhi Jayanti", description: "School Closed", time: "All Day", venue: "" },
        "2022-10-24": { id: 43, type: "holiday", title: "Diwali Break", description: "School Closed for Diwali", time: "All Day", venue: "" },
        "2022-11-14": { id: 44, type: "event", title: "Children's Day", description: "Fun activities and competitions", time: "9:00 AM - 3:00 PM", venue: "School Ground" },
        "2022-12-05": { id: 45, type: "exam", title: "Pre-Board Exam", description: "Pre-board for Class 10 & 12", time: "8:00 AM - 12:00 PM", venue: "Classrooms" },
        "2022-12-20": { id: 46, type: "event", title: "Annual Day Function", description: "Cultural program and prize distribution", time: "5:00 PM - 8:00 PM", venue: "School Auditorium" },
        "2022-12-25": { id: 47, type: "holiday", title: "Christmas", description: "School Closed", time: "All Day", venue: "" },

        // 2023 Events
        "2023-01-01": { id: 48, type: "holiday", title: "New Year", description: "School Closed", time: "All Day", venue: "" },
        "2023-01-15": { id: 49, type: "event", title: "Republic Day Rehearsal", description: "Practice for republic day parade", time: "8:00 AM - 10:00 AM", venue: "School Ground" },
        "2023-01-26": { id: 50, type: "holiday", title: "Republic Day", description: "Flag hoisting and celebration", time: "7:00 AM - 10:00 AM", venue: "School Ground" },
        "2023-02-10": { id: 51, type: "exam", title: "Unit Test 2", description: "Second unit test", time: "8:00 AM - 12:00 PM", venue: "Classrooms" },
        "2023-03-01": { id: 52, type: "exam", title: "Final Exams", description: "Annual final examination", time: "8:00 AM - 11:00 AM", venue: "Classrooms" },
        "2023-03-08": { id: 53, type: "event", title: "Women's Day", description: "Special celebration and awareness program", time: "9:00 AM - 11:00 AM", venue: "Assembly Hall" },
        "2023-03-18": { id: 54, type: "holiday", title: "Holi", description: "School Closed", time: "All Day", venue: "" },
        "2023-03-25": { id: 55, type: "event", title: "Farewell", description: "Farewell for outgoing batch", time: "10:00 AM - 2:00 PM", venue: "School Auditorium" },
        "2023-04-01": { id: 56, type: "holiday", title: "New Session", description: "Academic Year 2023-24 begins", time: "All Day", venue: "" },
        "2023-05-01": { id: 57, type: "holiday", title: "Labour Day", description: "School Closed", time: "All Day", venue: "" },
        "2023-06-20": { id: 58, type: "event", title: "Yoga Day", description: "International Yoga Day celebration", time: "6:00 AM - 8:00 AM", venue: "School Ground" },
        "2023-08-15": { id: 59, type: "holiday", title: "Independence Day", description: "Flag hoisting ceremony", time: "7:00 AM - 10:00 AM", venue: "School Ground" },
        "2023-09-05": { id: 60, type: "event", title: "Teachers Day", description: "Teachers appreciation day", time: "9:00 AM - 12:00 PM", venue: "School Auditorium" },
        "2023-10-02": { id: 61, type: "holiday", title: "Gandhi Jayanti", description: "School Closed", time: "All Day", venue: "" },
        "2023-11-12": { id: 62, type: "holiday", title: "Diwali", description: "School Closed for Diwali", time: "All Day", venue: "" },
        "2023-12-25": { id: 63, type: "holiday", title: "Christmas", description: "School Closed", time: "All Day", venue: "" },

        // 2024 Events
        "2024-01-01": { id: 64, type: "holiday", title: "New Year", description: "School Closed", time: "All Day", venue: "" },
        "2024-01-26": { id: 65, type: "holiday", title: "Republic Day", description: "Flag hoisting", time: "7:00 AM - 10:00 AM", venue: "School Ground" },
        "2024-02-15": { id: 66, type: "exam", title: "Unit Test", description: "Unit test all subjects", time: "8:00 AM - 12:00 PM", venue: "Classrooms" },
        "2024-03-01": { id: 67, type: "exam", title: "Final Exams", description: "Annual examination", time: "8:00 AM - 11:00 AM", venue: "Classrooms" },
        "2024-03-20": { id: 68, type: "holiday", title: "Holi", description: "School Closed", time: "All Day", venue: "" },
        "2024-04-01": { id: 69, type: "holiday", title: "New Session", description: "Academic Year 2024-25", time: "All Day", venue: "" },
        "2024-05-01": { id: 70, type: "holiday", title: "Labour Day", description: "School Closed", time: "All Day", venue: "" },
        "2024-08-15": { id: 71, type: "holiday", title: "Independence Day", description: "Celebration and flag hoisting", time: "7:00 AM - 10:00 AM", venue: "School Ground" },
        "2024-09-05": { id: 72, type: "event", title: "Teachers Day", description: "Special program by students", time: "9:00 AM - 12:00 PM", venue: "School Auditorium" },
        "2024-10-02": { id: 73, type: "holiday", title: "Gandhi Jayanti", description: "School Closed", time: "All Day", venue: "" },
        "2024-11-01": { id: 74, type: "holiday", title: "Diwali", description: "School Closed", time: "All Day", venue: "" },
        "2024-11-14": { id: 75, type: "event", title: "Children's Day", description: "Fun activities day", time: "9:00 AM - 3:00 PM", venue: "School Ground" },
        "2024-12-20": { id: 76, type: "event", title: "Annual Sports", description: "Sports day competition", time: "9:00 AM - 4:00 PM", venue: "Sports Ground" },
        "2024-12-25": { id: 77, type: "holiday", title: "Christmas", description: "School Closed", time: "All Day", venue: "" },

        // 2025 Events
        "2025-01-01": { id: 78, type: "holiday", title: "New Year", description: "School Closed", time: "All Day", venue: "" },
        "2025-01-26": { id: 79, type: "holiday", title: "Republic Day", description: "Flag hoisting ceremony", time: "7:00 AM - 10:00 AM", venue: "School Ground" },
        "2025-02-10": { id: 80, type: "ptm", title: "PTM", description: "Parent-Teacher Meeting", time: "9:00 AM - 2:00 PM", venue: "Classrooms" },
        "2025-03-05": { id: 81, type: "exam", title: "Final Exams", description: "Annual examination", time: "8:00 AM - 11:00 AM", venue: "Classrooms" },
        "2025-03-15": { id: 82, type: "holiday", title: "Holi", description: "School Closed", time: "All Day", venue: "" },
        "2025-04-01": { id: 83, type: "holiday", title: "New Session", description: "Academic Year 2025-26", time: "All Day", venue: "" },
        "2025-05-01": { id: 84, type: "holiday", title: "Labour Day", description: "School Closed", time: "All Day", venue: "" },
        "2025-08-15": { id: 85, type: "holiday", title: "Independence Day", description: "Flag hoisting", time: "7:00 AM - 10:00 AM", venue: "School Ground" },
        "2025-09-05": { id: 86, type: "event", title: "Teachers Day", description: "Teachers celebration", time: "9:00 AM - 12:00 PM", venue: "School Auditorium" },
        "2025-12-25": { id: 87, type: "holiday", title: "Christmas", description: "School Closed", time: "All Day", venue: "" },

        // 2026 Events (Current Year - Most Events)
        "2026-01-01": { id: 88, type: "holiday", title: "New Year", description: "School Closed", time: "All Day", venue: "" },
        "2026-01-26": { id: 89, type: "holiday", title: "Republic Day", description: "Flag hoisting and parade", time: "7:00 AM - 10:00 AM", venue: "School Ground" },
        "2026-02-08": { id: 90, type: "event", title: "Annual Sports Meet", description: "Inter-house sports competition", time: "9:00 AM - 4:00 PM", venue: "Sports Ground" },
        "2026-02-15": { id: 91, type: "exam", title: "Unit Test 1", description: "First unit test - All subjects", time: "8:00 AM - 12:00 PM", venue: "Classrooms" },
        "2026-02-25": { id: 92, type: "ptm", title: "Parent Teacher Meeting", description: "Progress discussion with parents", time: "9:00 AM - 2:00 PM", venue: "Classrooms" },
        "2026-03-05": { id: 93, type: "exam", title: "Final Exams Begin", description: "Annual final examination starts", time: "8:00 AM - 11:00 AM", venue: "Classrooms" },
        "2026-03-15": { id: 94, type: "holiday", title: "Holi Celebration", description: "School Closed for Holi", time: "All Day", venue: "" },
        "2026-03-22": { id: 95, type: "event", title: "Farewell Party", description: "Farewell for outgoing students", time: "10:00 AM - 2:00 PM", venue: "School Auditorium" },
        "2026-04-01": { id: 96, type: "holiday", title: "New Academic Session", description: "Session 2026-27 begins", time: "All Day", venue: "" },
        "2026-04-05": { id: 97, type: "event", title: "Welcome Assembly", description: "Welcome ceremony for new students", time: "8:00 AM - 9:30 AM", venue: "Assembly Hall" },
        "2026-04-14": { id: 98, type: "holiday", title: "Ambedkar Jayanti", description: "School Closed", time: "All Day", venue: "" },
        "2026-04-18": { id: 99, type: "event", title: "Orientation Program", description: "New parents orientation and school tour", time: "10:00 AM - 12:00 PM", venue: "Conference Hall" },
        "2026-04-25": { id: 100, type: "ptm", title: "Welcome PTM", description: "First parent-teacher meeting of session", time: "9:00 AM - 1:00 PM", venue: "Classrooms" },
        "2026-05-01": { id: 101, type: "holiday", title: "Labour Day", description: "School Closed", time: "All Day", venue: "" },
        "2026-05-10": { id: 102, type: "event", title: "Mother's Day Special", description: "Special assembly and card making", time: "8:00 AM - 10:00 AM", venue: "Assembly Hall" },
        "2026-05-20": { id: 103, type: "exam", title: "Unit Test 2", description: "Second unit test", time: "8:00 AM - 12:00 PM", venue: "Classrooms" },
        "2026-06-05": { id: 104, type: "event", title: "World Environment Day", description: "Tree plantation drive and awareness rally", time: "8:00 AM - 11:00 AM", venue: "School Ground" },
        "2026-06-21": { id: 105, type: "event", title: "International Yoga Day", description: "Yoga session for all students", time: "6:00 AM - 8:00 AM", venue: "School Ground" },
        "2026-07-10": { id: 106, type: "exam", title: "Half-Yearly Exams", description: "Half-yearly examination begins", time: "8:00 AM - 11:00 AM", venue: "Classrooms" },
        "2026-07-25": { id: 107, type: "ptm", title: "Mid-Session PTM", description: "Half-yearly result discussion", time: "9:00 AM - 2:00 PM", venue: "Classrooms" },
        "2026-08-15": { id: 108, type: "holiday", title: "Independence Day", description: "Flag hoisting and cultural program", time: "7:00 AM - 10:00 AM", venue: "School Ground" },
        "2026-08-20": { id: 109, type: "event", title: "Raksha Bandhan", description: "Special assembly for Rakhi celebration", time: "8:00 AM - 10:00 AM", venue: "Assembly Hall" },
        "2026-09-05": { id: 110, type: "event", title: "Teachers Day Celebration", description: "Students program for teachers", time: "9:00 AM - 12:00 PM", venue: "School Auditorium" },
        "2026-09-10": { id: 111, type: "exam", title: "Unit Test 3", description: "Third unit test", time: "8:00 AM - 12:00 PM", venue: "Classrooms" },
        "2026-09-25": { id: 112, type: "event", title: "Science Exhibition", description: "Annual science fair and project display", time: "9:00 AM - 3:00 PM", venue: "Science Block" },
        "2026-10-02": { id: 113, type: "holiday", title: "Gandhi Jayanti", description: "School Closed", time: "All Day", venue: "" },
        "2026-10-10": { id: 114, type: "event", title: "Dussehra Celebration", description: "Special assembly and Ramleela", time: "8:00 AM - 11:00 AM", venue: "School Ground" },
        "2026-10-20": { id: 115, type: "holiday", title: "Diwali Break", description: "School Closed for Diwali vacation", time: "All Day", venue: "" },
        "2026-11-05": { id: 116, type: "event", title: "School Reopens", description: "After Diwali break", time: "All Day", venue: "" },
        "2026-11-14": { id: 117, type: "event", title: "Children's Day", description: "Fun activities, games and competitions", time: "9:00 AM - 3:00 PM", venue: "School Ground" },
        "2026-11-20": { id: 118, type: "ptm", title: "Pre-Board PTM", description: "Discussion before board preparation", time: "9:00 AM - 2:00 PM", venue: "Classrooms" },
        "2026-12-01": { id: 119, type: "exam", title: "Pre-Board Exams", description: "Pre-board for Class 10 & 12", time: "8:00 AM - 12:00 PM", venue: "Classrooms" },
        "2026-12-15": { id: 120, type: "event", title: "Annual Day Function", description: "Cultural program and prize distribution", time: "5:00 PM - 8:00 PM", venue: "School Auditorium" },
        "2026-12-22": { id: 121, type: "event", title: "Winter Carnival", description: "Food stalls, games and fun fair", time: "10:00 AM - 4:00 PM", venue: "School Ground" },
        "2026-12-25": { id: 122, type: "holiday", title: "Christmas", description: "School Closed", time: "All Day", venue: "" },
        "2026-12-31": { id: 123, type: "event", title: "New Year Eve Party", description: "Year-end celebration", time: "10:00 AM - 1:00 PM", venue: "School Auditorium" },

        // 2027 Events
        "2027-01-01": { id: 124, type: "holiday", title: "New Year", description: "School Closed", time: "All Day", venue: "" },
        "2027-01-12": { id: 125, type: "event", title: "National Youth Day", description: "Swami Vivekananda Jayanti celebration", time: "8:00 AM - 10:00 AM", venue: "Assembly Hall" },
        "2027-01-26": { id: 126, type: "holiday", title: "Republic Day", description: "Flag hoisting ceremony", time: "7:00 AM - 10:00 AM", venue: "School Ground" },
        "2027-02-10": { id: 127, type: "exam", title: "Unit Test", description: "Unit test all subjects", time: "8:00 AM - 12:00 PM", venue: "Classrooms" },
        "2027-03-01": { id: 128, type: "exam", title: "Final Exams", description: "Annual examination", time: "8:00 AM - 11:00 AM", venue: "Classrooms" },
        "2027-03-22": { id: 129, type: "holiday", title: "Holi", description: "School Closed", time: "All Day", venue: "" },
    });

    const [idCounter, setIdCounter] = useState(130);

    // ============ HELPER FUNCTIONS ============
    const getDateStr = (year, month, day) => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const getEventForDate = (year, month, day) => {
        const dateStr = getDateStr(year, month, day);
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

    // ============ MANAGEMENT FUNCTIONS ============
    const showMsg = (msg) => {
        setSuccessMsg(msg);
        setTimeout(() => setSuccessMsg(""), 3000);
    };

    const handleOpenAddForm = (presetDate = "") => {
        setMgmtFormData({
            date: presetDate || `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`,
            type: "event",
            title: "",
            description: "",
            time: "",
            venue: ""
        });
        setEditingDateKey(null);
        setShowMgmtForm(true);
    };

    const handleOpenEditForm = (dateKey) => {
        const event = eventsData[dateKey];
        if (!event) return;
        setMgmtFormData({
            date: dateKey,
            type: event.type,
            title: event.title,
            description: event.description,
            time: event.time === "All Day" ? "" : event.time,
            venue: event.venue || ""
        });
        setEditingDateKey(dateKey);
        setShowMgmtForm(true);
        setShowEventModal(false);
    };

    const handleMgmtFormChange = (e) => {
        const { name, value } = e.target;
        setMgmtFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveMgmt = (e) => {
        e.preventDefault();
        if (!mgmtFormData.date || !mgmtFormData.title || !mgmtFormData.description) {
            alert("Please fill all required fields!");
            return;
        }

        const timeDisplay = mgmtFormData.type === "holiday" ? "All Day" : (mgmtFormData.time || "Time TBA");

        if (editingDateKey && editingDateKey !== mgmtFormData.date) {
            setEventsData(prev => {
                const updated = { ...prev };
                delete updated[editingDateKey];
                updated[mgmtFormData.date] = {
                    id: prev[editingDateKey]?.id || idCounter,
                    type: mgmtFormData.type,
                    title: mgmtFormData.title,
                    description: mgmtFormData.description,
                    time: timeDisplay,
                    venue: mgmtFormData.venue
                };
                return updated;
            });
            showMsg("Event updated successfully!");
        } else if (editingDateKey) {
            setEventsData(prev => ({
                ...prev,
                [mgmtFormData.date]: {
                    ...prev[mgmtFormData.date],
                    type: mgmtFormData.type,
                    title: mgmtFormData.title,
                    description: mgmtFormData.description,
                    time: timeDisplay,
                    venue: mgmtFormData.venue
                }
            }));
            showMsg("Event updated successfully!");
        } else {
            setEventsData(prev => ({
                ...prev,
                [mgmtFormData.date]: {
                    id: idCounter,
                    type: mgmtFormData.type,
                    title: mgmtFormData.title,
                    description: mgmtFormData.description,
                    time: timeDisplay,
                    venue: mgmtFormData.venue
                }
            }));
            setIdCounter(c => c + 1);
            showMsg("Event added successfully!");
        }

        setShowMgmtForm(false);
        setEditingDateKey(null);
    };

    const handleDeleteEvent = (dateKey) => {
        if (window.confirm("Are you sure? This will permanently delete this event.")) {
            setEventsData(prev => {
                const updated = { ...prev };
                delete updated[dateKey];
                return updated;
            });
            setShowEventModal(false);
            setSelectedEvent(null);
            showMsg("Event deleted!");
        }
    };

    const handlePrevMonth = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
        else { setCurrentMonth(currentMonth - 1); }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
        else { setCurrentMonth(currentMonth + 1); }
    };

    const handleYearChange = (e) => setCurrentYear(parseInt(e.target.value));
    const handleMonthChange = (e) => setCurrentMonth(parseInt(e.target.value));

    // ============ RENDER CALENDAR ============
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
            const dateStr = getDateStr(year, month, day);

            calendarDays.push(
                <div
                    key={day}
                    className={`cal-day-cell ${eventType ? 'has-event' : ''} ${isToday ? 'today' : ''}`}
                    style={eventType ? { background: eventColors.gradient, borderColor: eventColors.border } : {}}
                    onClick={() => {
                        if (event) {
                            setSelectedEvent({ ...event, day, date: `${day} ${months[month]} ${year}`, dateKey: dateStr });
                            setShowEventModal(true);
                        } else {
                            handleOpenAddForm(dateStr);
                        }
                    }}
                    title={event ? event.title : "Click to add event"}
                >
                    <span className="day-number">{day}</span>
                    {eventType && (
                        <span className="day-event-badge" style={{ background: eventColors.text }}>
                            {getEventLabel(eventType)}
                        </span>
                    )}
                    {!event && <span className="day-add-hint">+</span>}
                </div>
            );
        }
        return calendarDays;
    };

    const getCurrentMonthEvents = () => {
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);
        const events = [];
        for (let day = 1; day <= daysInMonth; day++) {
            const event = getEventForDate(currentYear, currentMonth, day);
            if (event) events.push({ day, dateKey: getDateStr(currentYear, currentMonth, day), ...event });
        }
        return events.sort((a, b) => a.day - b.day);
    };

    const getMonthEvents = (year, month) => {
        const daysInMonth = getDaysInMonth(year, month);
        const events = [];
        for (let day = 1; day <= daysInMonth; day++) {
            const event = getEventForDate(year, month, day);
            if (event) events.push({ day, ...event });
        }
        return events.sort((a, b) => a.day - b.day);
    };

    const renderMiniCalendar = (year, month) => {
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        const cells = [];
        for (let i = 0; i < 7; i++) cells.push(<div key={`mh-${i}`} className="mini-cal-weekday">{weekdays[i]}</div>);
        for (let i = 0; i < firstDay; i++) cells.push(<div key={`me-${i}`} className="mini-cal-cell empty"></div>);
        for (let day = 1; day <= daysInMonth; day++) {
            const event = getEventForDate(year, month, day);
            cells.push(<div key={`md-${day}`} className={`mini-cal-cell ${event ? 'has-event' : ''}`}>{day}</div>);
        }
        return cells;
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

    const closeOldModal = () => { setModalOpen(false); setSelectedMonthData(null); };
    const closeEventDetailModal = () => { setShowEventModal(false); setSelectedEvent(null); };

    // ============ EVENT DETAIL MODAL ============
    const renderEventModal = () => {
        if (!showEventModal || !selectedEvent) return null;
        const colors = getEventTypeColor(selectedEvent.type);
        return (
            <div className="event-modal-overlay" onClick={closeEventDetailModal}>
                <div className="event-modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="event-modal-close" onClick={closeEventDetailModal}><X size={18} /></button>
                    <div className="event-modal-header" style={{ background: colors.gradient }}>
                        <div className="event-modal-icon">{getEventIcon(selectedEvent.type)}</div>
                        <h2>{selectedEvent.title}</h2>
                    </div>
                    <div className="event-modal-body">
                        <div className="event-info-section">
                            <div className="event-info-row"><div className="event-info-label"><Calendar size={16} /><span>Date</span></div><div className="event-info-value">{selectedEvent.date}</div></div>
                            <div className="event-info-row"><div className="event-info-label"><Clock size={16} /><span>Time</span></div><div className="event-info-value">{selectedEvent.time || 'Time TBA'}</div></div>
                            {selectedEvent.venue && <div className="event-info-row"><div className="event-info-label"><MapPin size={16} /><span>Venue</span></div><div className="event-info-value">{selectedEvent.venue}</div></div>}
                            <div className="event-info-row"><div className="event-info-label"><Star size={16} /><span>Type</span></div><div className="event-info-value"><span className="event-type-badge" style={{ background: colors.text }}>{getEventLabel(selectedEvent.type)}</span></div></div>
                        </div>
                        <div className="event-description-section"><h3>Description</h3><p>{selectedEvent.description}</p></div>
                    </div>
                    <div className="event-modal-mgmt-actions">
                        <button className="mgmt-btn mgmt-edit-btn" onClick={() => handleOpenEditForm(selectedEvent.dateKey)}><Edit3 size={14} /> Edit</button>
                        <button className="mgmt-btn mgmt-delete-btn" onClick={() => handleDeleteEvent(selectedEvent.dateKey)}><Trash2 size={14} /> Delete</button>
                    </div>
                </div>
            </div>
        );
    };

    // ============ YEARLY MODAL ============
    const renderOldYearlyModal = () => {
        if (!modalOpen || !selectedMonthData) return null;
        return (
            <div className="modal-overlay" onClick={closeOldModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <div className="modal-title"><Calendar size={24} /><h2>{selectedMonthData.monthName} {selectedMonthData.year}</h2></div>
                        <button className="modal-close" onClick={closeOldModal}><X size={20} /></button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-calendar">
                            <div className="modal-weekdays"><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span></div>
                            <div className="modal-days-grid">{renderCalendar(selectedMonthData.year, selectedMonthData.monthIndex)}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // ============ ADD/EDIT FORM MODAL (Scrollbar fixed inside) ============
    const renderMgmtForm = () => {
        if (!showMgmtForm) return null;
        return (
            <div className="acal-mgmt-overlay" onClick={() => { setShowMgmtForm(false); setEditingDateKey(null); }}>
                <div className="acal-mgmt-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="acal-mgmt-header">
                        <h3><Plus size={18} />{editingDateKey ? 'Edit Event' : 'Add New Event'}</h3>
                        <button className="acal-mgmt-close" onClick={() => { setShowMgmtForm(false); setEditingDateKey(null); }}><X size={18} /></button>
                    </div>
                    <div className="acal-mgmt-scroll">
                        <form onSubmit={handleSaveMgmt} className="acal-mgmt-body">
                            <div className="acal-field"><label>Date *</label><input type="date" name="date" value={mgmtFormData.date} onChange={handleMgmtFormChange} required /></div>
                            <div className="acal-field"><label>Type *</label><select name="type" value={mgmtFormData.type} onChange={handleMgmtFormChange}><option value="event">Event</option><option value="holiday">Holiday</option><option value="exam">Exam</option><option value="ptm">PTM</option></select></div>
                            <div className="acal-field"><label>Title *</label><input type="text" name="title" value={mgmtFormData.title} onChange={handleMgmtFormChange} required /></div>
                            <div className="acal-field"><label>Description *</label><textarea name="description" value={mgmtFormData.description} onChange={handleMgmtFormChange} rows="3" required /></div>
                            {mgmtFormData.type !== "holiday" && <div className="acal-field"><label>Time</label><input type="text" name="time" value={mgmtFormData.time} onChange={handleMgmtFormChange} placeholder="e.g., 9:00 AM - 12:00 PM" /></div>}
                            {mgmtFormData.type !== "holiday" && <div className="acal-field"><label>Venue</label><input type="text" name="venue" value={mgmtFormData.venue} onChange={handleMgmtFormChange} placeholder="e.g., Auditorium" /></div>}
                            <div className="acal-mgmt-actions">
                                <button type="button" className="acal-btn-cancel" onClick={() => { setShowMgmtForm(false); setEditingDateKey(null); }}>Cancel</button>
                                <button type="submit" className="acal-btn-save"><Save size={16} />{editingDateKey ? 'Update' : 'Add Event'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };

    // ============ YEARLY VIEW ============
    const renderYearlyView = () => {
        const sessionMonths = [];
        const monthIndices = [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2];
        for (let i = 0; i < monthIndices.length; i++) {
            const mi = monthIndices[i];
            let yr = selectedYear;
            if (mi === 0 || mi === 1 || mi === 2) yr = selectedYear + 1;
            sessionMonths.push({ monthIndex: mi, monthName: months[mi], year: yr });
        }
        return (
            <div className="yearly-view-container">
                <div className="yearly-header"><h2>Academic Session {selectedYear}-{selectedYear + 1}</h2><p className="yearly-subtitle">April to March</p></div>
                <div className="yearly-grid-2cols">
                    {sessionMonths.map((month, idx) => {
                        const me = getMonthEvents(month.year, month.monthIndex);
                        return (
                            <div key={idx} className="yearly-month-card-compact" onClick={() => handleMonthCardClick(month)} style={{ cursor: 'pointer' }}>
                                <div className="yearly-month-header-compact"><h3>{month.monthName}</h3><span className="yearly-month-year">{month.year}</span></div>
                                <div className="yearly-month-content-compact">
                                    <div className="yearly-mini-calendar-compact"><div className="mini-cal-grid-compact">{renderMiniCalendar(month.year, month.monthIndex)}</div></div>
                                    <div className="yearly-month-events-compact">
                                        {me.filter(e => e.type === 'holiday').length > 0 && <div className="yearly-event-group-compact"><div className="yearly-event-group-header-compact"><Gift size={12} className="yearly-event-icon holiday-icon" /><span>{me.filter(e => e.type === 'holiday').length} Holiday{me.filter(e => e.type === 'holiday').length > 1 ? 's' : ''}</span></div></div>}
                                        {me.filter(e => e.type === 'exam').length > 0 && <div className="yearly-event-group-compact"><div className="yearly-event-group-header-compact"><BookOpen size={12} className="yearly-event-icon exam-icon" /><span>{me.filter(e => e.type === 'exam').length} Exam{me.filter(e => e.type === 'exam').length > 1 ? 's' : ''}</span></div></div>}
                                        {me.filter(e => e.type === 'event').length > 0 && <div className="yearly-event-group-compact"><div className="yearly-event-group-header-compact"><Star size={12} className="yearly-event-icon event-icon" /><span>{me.filter(e => e.type === 'event').length} Event{me.filter(e => e.type === 'event').length > 1 ? 's' : ''}</span></div></div>}
                                        {me.length === 0 && <div className="yearly-no-events-compact"><span>No events</span></div>}
                                    </div>
                                </div>
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
                    {successMsg && <div className="acal-success-toast"><Check size={18} /><span>{successMsg}</span></div>}

                    <div className="back-nav" onClick={() => navigate(-1)}><ArrowLeft size={18} /><span>Back to Dashboard</span></div>

                    <div className="calendar-hero">
                        <div className="hero-bg"></div>
                        <div className="hero-content"><div className="hero-icon"><Calendar size={32} /></div><div className="hero-text"><h1>Manage Academic Calendar</h1><p>Add, edit & manage school events and holidays</p></div></div>
                    </div>

                    <div className="calendar-controls">
                        <div className="controls-left">
                            <div className="view-toggle">
                                <button className={`view-btn ${viewMode === 'month' ? 'active' : ''}`} onClick={() => setViewMode('month')}><Calendar size={16} /><span>Month</span></button>
                                <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}><List size={16} /><span>List</span></button>
                                <button className={`view-btn ${viewMode === 'year' ? 'active' : ''}`} onClick={() => setViewMode('year')}><Grid size={16} /><span>Yearly</span></button>
                            </div>
                        </div>
                        <div className="controls-right">
                            {viewMode !== 'year' ? (
                                <>
                                    <div className="dropdown-group">
                                        <select className="month-select" value={currentMonth} onChange={handleMonthChange}>{months.map((m, i) => <option key={i} value={i}>{m}</option>)}</select>
                                        <select className="year-select" value={currentYear} onChange={handleYearChange}>{years.map(y => <option key={y} value={y}>{y}</option>)}</select>
                                    </div>
                                    <button className="action-btn acal-add-btn" onClick={() => handleOpenAddForm()} title="Add Event"><Plus size={16} /></button>
                                    <button className="action-btn"><Download size={16} /></button>
                                    <button className="action-btn"><Printer size={16} /></button>
                                </>
                            ) : (
                                <div className="year-selector-wrapper">
                                    <select className="year-select-large" value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>{years.map(y => <option key={y} value={y}>{y}-{y + 1}</option>)}</select>
                                </div>
                            )}
                        </div>
                    </div>

                    {(viewMode === 'month' || viewMode === 'list') && (
                        <>
                            <div className="calendar-stats-ac">
                                <div className="stat-card-ac holiday-stat"><div className="stat-icon-ac"><PartyPopper /></div><div className="stat-info-ac"><span className="stat-number-ac">{holidayCount}</span><span className="stat-label-ac">Holidays</span></div></div>
                                <div className="stat-card-ac exam-stat-ac"><div className="stat-icon-ac"><BookOpenCheck /></div><div className="stat-info-ac"><span className="stat-number-ac">{examCount}</span><span className="stat-label-ac">Exams</span></div></div>
                                <div className="stat-card-ac event-stat-ac"><div className="stat-icon-ac"><CalendarSyncIcon /></div><div className="stat-info-ac"><span className="stat-number-ac">{eventCount}</span><span className="stat-label-ac">Events</span></div></div>
                                <div className="stat-card-ac ptm-stat-ac"><div className="stat-icon-ac"><UsersRound /></div><div className="stat-info-ac"><span className="stat-number-ac">{ptmCount}</span><span className="stat-label-ac">PTM</span></div></div>
                            </div>
                            <div className="month-navigation-bar"><button className="nav-arrow" onClick={handlePrevMonth}><ChevronLeft size={20} /></button><div className="current-month-display"><Sparkles size={20} /><h2>{months[currentMonth]} {currentYear}</h2></div><button className="nav-arrow" onClick={handleNextMonth}><ChevronRight size={20} /></button></div>
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
                            <div className="calendar-weekdays"><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span></div>
                            <div className="calendar-days-grid">{renderCalendar()}</div>
                            <p className="calendar-hint">Click empty date to add • Click colored date to view/edit</p>
                        </div>
                    )}

                    {viewMode === 'list' && (
                        <div className="list-view-container">
                            {currentEvents.length > 0 ? currentEvents.map((event, idx) => {
                                const colors = getEventTypeColor(event.type);
                                return (
                                    <div key={idx} className="list-event-card" style={{ borderLeftColor: colors.text }}
                                        onClick={() => { setSelectedEvent({ ...event, date: `${event.day} ${months[currentMonth]} ${currentYear}`, dateKey: event.dateKey }); setShowEventModal(true); }}>
                                        <div className="list-event-date"><span className="list-event-day">{event.day}</span><span className="list-event-month">{months[currentMonth].substring(0, 3)}</span></div>
                                        <div className="list-event-content"><div className="list-event-title">{getEventIcon(event.type)}<span>{event.title}</span></div><div className="list-event-desc">{event.description}</div><div className="list-event-meta"><span><Clock size={12} /> {event.time}</span>{event.venue && <span><MapPin size={12} /> {event.venue}</span>}</div></div>
                                        <div className="list-event-badge" style={{ background: colors.text }}>{getEventLabel(event.type)}</div>
                                    </div>
                                );
                            }) : (
                                <div className="no-events-card"><Coffee size={48} /><h3>No Events</h3><p>No events in {months[currentMonth]} {currentYear}</p><button className="acal-add-first-btn" onClick={() => handleOpenAddForm()}><Plus size={16} /> Add First Event</button></div>
                            )}
                        </div>
                    )}

                    {viewMode === 'year' && renderYearlyView()}

                    {renderOldYearlyModal()}
                    {renderEventModal()}
                    {renderMgmtForm()}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddAcademicCalendar;