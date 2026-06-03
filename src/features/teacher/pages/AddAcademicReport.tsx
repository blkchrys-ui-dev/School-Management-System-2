import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "./addacademicreport.css";
import { useState, useEffect } from "react";
import {
    ArrowLeft, Download, Printer, Calendar, BookOpen, Award,
    BarChart3, Save, Edit3, X, Check, GraduationCap,
    User, ChevronDown, Search
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddAcademicReport = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("unitTest");
    const [open, setOpen] = useState(false);
    const [editingMode, setEditingMode] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Dropdown states
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showClassDropdown, setShowClassDropdown] = useState(false);
    const [showStudentDropdown, setShowStudentDropdown] = useState(false);
    const [studentSearch, setStudentSearch] = useState("");

    // Subjects list
    const subjects = ["English Literature", "Hindi", "Mathematics", "EVS", "Urdu"];

    // Months for Unit Test
    const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];

    // Classes data
    const classes = [
        { id: 1, name: "Class 6", sections: ["A", "B", "C"] },
        { id: 2, name: "Class 7", sections: ["A", "B"] },
        { id: 3, name: "Class 8", sections: ["A", "B", "C", "D"] },
        { id: 4, name: "Class 9", sections: ["A", "B"] },
        { id: 5, name: "Class 10", sections: ["A", "B", "C"] },
        { id: 6, name: "Class 11", sections: ["A", "B"] },
        { id: 7, name: "Class 12", sections: ["A", "B"] },
    ];

    // Students data organized by class
    const studentsData = {
        "Class 10": [
            { id: 1, name: "Mohammad Ayan", rollNo: "1001", section: "A" },
            { id: 2, name: "Fatima Zahra", rollNo: "1002", section: "A" },
            { id: 3, name: "Ahmed Raza", rollNo: "1003", section: "A" },
            { id: 4, name: "Ayesha Noor", rollNo: "1004", section: "A" },
            { id: 5, name: "Zain Ali", rollNo: "1005", section: "A" },
            { id: 6, name: "Hassan Rizvi", rollNo: "1006", section: "B" },
            { id: 7, name: "Zara Khan", rollNo: "1007", section: "B" },
            { id: 8, name: "Omar Farooq", rollNo: "1008", section: "B" },
            { id: 9, name: "Sara Ahmed", rollNo: "1009", section: "C" },
            { id: 10, name: "Bilal Hussain", rollNo: "1010", section: "C" },
            { id: 11, name: "Nida Fatima", rollNo: "1011", section: "C" },
            { id: 12, name: "Usman Ghani", rollNo: "1012", section: "C" },
        ],
        "Class 9": [
            { id: 13, name: "Ali Hassan", rollNo: "901", section: "A" },
            { id: 14, name: "Mariam Khan", rollNo: "902", section: "A" },
            { id: 15, name: "Saad Ahmed", rollNo: "903", section: "B" },
            { id: 16, name: "Hira Noor", rollNo: "904", section: "B" },
        ],
        "Class 8": [
            { id: 17, name: "Abdullah Khan", rollNo: "801", section: "A" },
            { id: 18, name: "Aisha Begum", rollNo: "802", section: "A" },
            { id: 19, name: "Imran Ali", rollNo: "803", section: "B" },
            { id: 20, name: "Zainab Fatima", rollNo: "804", section: "C" },
        ],
    };

    // Get students list based on selected class
    const getClassStudents = () => {
        return studentsData[selectedClass] || [];
    };

    // Filter students by search
    const filteredStudents = getClassStudents().filter(student =>
        student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        student.rollNo.includes(studentSearch)
    );

    // ========== UNIT TEST MARKS STATE ==========
    const [unitTestMarks, setUnitTestMarks] = useState({
        maxMarks: [50, 50, 50, 50, 50],
        "English Literature": [42, 38, 45, 40, 39, 44, 41, 43, 47, 46],
        "Hindi": [40, 41, 38, 42, 39, 43, 40, 41, 44, 42],
        "Mathematics": [48, 45, 47, 49, 46, 48, 47, 49, 50, 48],
        "EVS": [44, 42, 43, 41, 45, 44, 42, 43, 46, 45],
        "Urdu": [41, 39, 42, 40, 38, 43, 41, 42, 45, 43]
    });

    // ========== FIRST TERM STATE ==========
    const [firstTermData, setFirstTermData] = useState({
        mm: [50, 50, 50, 50, 50],
        mo: [42, 40, 48, 44, 41],
        grade: ["B+", "B+", "A", "B+", "B"]
    });

    // ========== SECOND TERM STATE ==========
    const [secondTermData, setSecondTermData] = useState({
        mm: [50, 50, 50, 50, 50],
        mo: [45, 43, 49, 45, 44],
        grade: ["A-", "B+", "A", "A-", "B+"]
    });

    // ========== THIRD TERM STATE ==========
    const [thirdTermData, setThirdTermData] = useState({
        maxMarks: [100, 100, 100, 100, 100],
        theory: [60, 60, 60, 60, 60],
        assignmentPractical: [40, 40, 40, 40, 40],
        theoryObtained: [52, 48, 55, 50, 46],
        assignmentPracticalObtained: [35, 34, 38, 36, 32],
        grade: ["A", "B+", "A+", "A-", "B+"]
    });

    // Handle class selection
    const handleClassSelect = (className) => {
        setSelectedClass(className);
        setSelectedStudent(null);
        setShowClassDropdown(false);
        setStudentSearch("");
    };

    // Handle student selection
    const handleStudentSelect = (student) => {
        setSelectedStudent(student);
        setShowStudentDropdown(false);
        setStudentSearch("");
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.report-dropdown-wrapper')) {
                setShowClassDropdown(false);
                setShowStudentDropdown(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Get subject total for Unit Test
    const getSubjectTotal = (subject) => {
        const marks = unitTestMarks[subject];
        return marks.reduce((sum, m) => sum + m, 0);
    };

    // Get third term total
    const getThirdTermTotal = (index) => {
        return thirdTermData.theoryObtained[index] + thirdTermData.assignmentPracticalObtained[index];
    };

    // Handle Unit Test mark change
    const handleUnitTestMarkChange = (subject, monthIndex, value) => {
        const numValue = parseInt(value) || 0;
        const maxMark = unitTestMarks.maxMarks[subjects.indexOf(subject)];
        const finalValue = Math.min(numValue, maxMark);

        setUnitTestMarks(prev => ({
            ...prev,
            [subject]: prev[subject].map((mark, i) => i === monthIndex ? finalValue : mark)
        }));
    };

    // Handle Term mark change
    const handleTermMarkChange = (term, index, value) => {
        const numValue = parseInt(value) || 0;
        if (term === "first") {
            setFirstTermData(prev => ({
                ...prev,
                mo: prev.mo.map((m, i) => i === index ? Math.min(numValue, prev.mm[i]) : m)
            }));
        } else {
            setSecondTermData(prev => ({
                ...prev,
                mo: prev.mo.map((m, i) => i === index ? Math.min(numValue, prev.mm[i]) : m)
            }));
        }
    };

    // Handle grade change
    const handleGradeChange = (term, index, value) => {
        if (term === "first") {
            setFirstTermData(prev => ({
                ...prev,
                grade: prev.grade.map((g, i) => i === index ? value : g)
            }));
        } else if (term === "second") {
            setSecondTermData(prev => ({
                ...prev,
                grade: prev.grade.map((g, i) => i === index ? value : g)
            }));
        } else {
            setThirdTermData(prev => ({
                ...prev,
                grade: prev.grade.map((g, i) => i === index ? value : g)
            }));
        }
    };

    // Handle Third Term marks change
    const handleThirdTermChange = (field, index, value) => {
        const numValue = parseInt(value) || 0;
        let maxValue;
        if (field === "theoryObtained") maxValue = thirdTermData.theory[index];
        else maxValue = thirdTermData.assignmentPractical[index];

        setThirdTermData(prev => ({
            ...prev,
            [field]: prev[field].map((m, i) => i === index ? Math.min(numValue, maxValue) : m)
        }));
    };

    // Save all data
    const handleSaveData = () => {
        if (!selectedStudent) {
            alert("Please select a student first!");
            return;
        }
        const reportData = {
            class: selectedClass,
            student: selectedStudent,
            unitTest: unitTestMarks,
            firstTerm: firstTermData,
            secondTerm: secondTermData,
            thirdTerm: thirdTermData,
            savedAt: new Date().toISOString()
        };
        console.log("Saving report:", reportData);
        showSuccess(`Academic report saved for ${selectedStudent.name}!`);
    };

    // Show success message
    const showSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    // Download report
    const handleDownload = () => {
        if (!selectedStudent) {
            alert("Please select a student first!");
            return;
        }
        handleSaveData();
        alert(`Downloading report for ${selectedStudent.name}...`);
    };

    // Print report
    const handlePrint = () => {
        window.print();
    };

    // Grade options
    const gradeOptions = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"];

    return (
        <div className="report-container">
            <Header open={open} setOpen={setOpen} />
            <div className="report-layout">
                <Sidebar open={open} />
                <div className="add-report-content">
                    {/* Success Message */}
                    {successMessage && (
                        <div className="report-success-toast">
                            <Check size={18} />
                            <span>{successMessage}</span>
                        </div>
                    )}

                    {/* Back Navigation */}
                    <div className="report-back-nav" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                        <span>Back to Dashboard</span>
                    </div>

                    {/* Page Header */}
                    <div className="report-page-header">
                        <div className="report-header-left">
                            <div className="report-header-icon">
                                <GraduationCap size={24} />
                            </div>
                            <div>
                                <h1>Academic Report</h1>
                                <p>Manage student marks & performance</p>
                            </div>
                        </div>
                        <div className="report-action-buttons">
                            <button
                                className={`report-btn report-btn-edit ${editingMode ? 'active' : ''}`}
                                onClick={() => setEditingMode(!editingMode)}
                            >
                                {editingMode ? <X size={18} /> : <Edit3 size={18} />}
                                <span>{editingMode ? 'Exit Edit' : 'Edit Mode'}</span>
                            </button>
                            <button className="report-btn report-btn-save" onClick={handleSaveData}>
                                <Save size={18} />
                                <span>Save</span>
                            </button>
                            <button className="report-btn report-btn-download" onClick={handleDownload}>
                                <Download size={18} />
                                <span>Download</span>
                            </button>
                            <button className="report-btn report-btn-print" onClick={handlePrint}>
                                <Printer size={18} />
                                <span>Print</span>
                            </button>
                        </div>
                    </div>

                    {/* Class & Student Selection */}
                    <div className="report-selection-area">
                        <div className="report-selection-row">
                            {/* Class Dropdown */}
                            <div className="report-dropdown-wrapper">
                                <label className="report-dropdown-label">
                                    <GraduationCap size={16} />
                                    Select Class
                                </label>
                                <div
                                    className={`report-dropdown ${showClassDropdown ? 'open' : ''}`}
                                    onClick={() => {
                                        setShowClassDropdown(!showClassDropdown);
                                        setShowStudentDropdown(false);
                                    }}
                                >
                                    <div className="report-dropdown-selected">
                                        <span className={selectedClass ? '' : 'placeholder'}>
                                            {selectedClass || "Choose Class"}
                                        </span>
                                        <ChevronDown size={18} className={`chevron ${showClassDropdown ? 'rotate' : ''}`} />
                                    </div>
                                    {showClassDropdown && (
                                        <div className="report-dropdown-menu">
                                            {classes.map(cls => (
                                                <div
                                                    key={cls.id}
                                                    className={`report-dropdown-item ${selectedClass === cls.name ? 'selected' : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleClassSelect(cls.name);
                                                    }}
                                                >
                                                    <span>{cls.name}</span>
                                                    <span className="section-count">{cls.sections.length} sections</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Student Dropdown */}
                            <div className="report-dropdown-wrapper">
                                <label className="report-dropdown-label">
                                    <User size={16} />
                                    Select Student
                                </label>
                                <div
                                    className={`report-dropdown ${!selectedClass ? 'disabled' : ''} ${showStudentDropdown ? 'open' : ''}`}
                                    onClick={() => {
                                        if (selectedClass) {
                                            setShowStudentDropdown(!showStudentDropdown);
                                            setShowClassDropdown(false);
                                        }
                                    }}
                                >
                                    <div className="report-dropdown-selected">
                                        <span className={selectedStudent ? '' : 'placeholder'}>
                                            {selectedStudent
                                                ? `${selectedStudent.name} (${selectedStudent.rollNo})`
                                                : selectedClass
                                                    ? "Select Student"
                                                    : "Select class first"}
                                        </span>
                                        <ChevronDown size={18} className={`chevron ${showStudentDropdown ? 'rotate' : ''}`} />
                                    </div>
                                    {showStudentDropdown && selectedClass && (
                                        <div className="report-dropdown-menu">
                                            {/* Search inside student dropdown */}
                                            <div className="dropdown-search">
                                                <Search size={16} />
                                                <input
                                                    type="text"
                                                    placeholder="Search student..."
                                                    value={studentSearch}
                                                    onChange={(e) => setStudentSearch(e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            </div>
                                            {filteredStudents.length > 0 ? (
                                                filteredStudents.map(student => (
                                                    <div
                                                        key={student.id}
                                                        className={`report-dropdown-item ${selectedStudent?.id === student.id ? 'selected' : ''}`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleStudentSelect(student);
                                                        }}
                                                    >
                                                        <div className="student-item-info">
                                                            <span className="student-name">{student.name}</span>
                                                            <span className="student-meta">
                                                                Roll: {student.rollNo} • Section: {student.section}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="dropdown-empty">
                                                    <p>No students found</p>
                                                </div>
                                            )}
                                            <div className="dropdown-footer">
                                                Total: {filteredStudents.length} students
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Selected Student Info */}
                    {selectedStudent && (
                        <div className="report-student-info">
                            <div className="student-info-card">
                                <GraduationCap size={20} />
                                <div>
                                    <h4>{selectedStudent.name}</h4>
                                    <span>
                                        {selectedClass} • Section {selectedStudent.section} • Roll: {selectedStudent.rollNo}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab Navigation - Show only when student is selected */}
                    {selectedStudent && (
                        <>
                            <div className="report-exam-selector">
                                <button
                                    className={`report-exam-btn ${activeTab === "unitTest" ? "active" : ""}`}
                                    onClick={() => setActiveTab("unitTest")}
                                >
                                    <Calendar size={18} />
                                    <span>Unit Test</span>
                                </button>
                                <button
                                    className={`report-exam-btn ${activeTab === "firstTerm" ? "active" : ""}`}
                                    onClick={() => setActiveTab("firstTerm")}
                                >
                                    <BookOpen size={18} />
                                    <span>First Term</span>
                                </button>
                                <button
                                    className={`report-exam-btn ${activeTab === "secondTerm" ? "active" : ""}`}
                                    onClick={() => setActiveTab("secondTerm")}
                                >
                                    <BarChart3 size={18} />
                                    <span>Second Term</span>
                                </button>
                                <button
                                    className={`report-exam-btn ${activeTab === "thirdTerm" ? "active" : ""}`}
                                    onClick={() => setActiveTab("thirdTerm")}
                                >
                                    <Award size={18} />
                                    <span>Third Term</span>
                                </button>
                            </div>

                            {/* ========== UNIT TEST TAB ========== */}
                            {activeTab === "unitTest" && (
                                <div className="report-marks-wrapper">
                                    <div className="report-table-header">
                                        <h3><Calendar size={16} /> Unit Test Marks (Apr - Jan)</h3>
                                        {editingMode && <span className="editing-badge">Editing Mode</span>}
                                    </div>
                                    <div className="report-table-container">
                                        <table className="report-marks-table">
                                            <thead>
                                                <tr>
                                                    <th>Subjects</th>
                                                    <th>MM</th>
                                                    {months.map(month => <th key={month}>{month}</th>)}
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subjects.map((subject, idx) => (
                                                    <tr key={subject}>
                                                        <td className="report-subject-name">{subject}</td>
                                                        <td className="report-max-mark">{unitTestMarks.maxMarks[idx]}</td>
                                                        {unitTestMarks[subject].map((mark, mIdx) => (
                                                            <td key={mIdx} className="report-mark-cell">
                                                                {editingMode ? (
                                                                    <input
                                                                        type="number"
                                                                        className="report-mark-input"
                                                                        value={mark}
                                                                        onChange={(e) => handleUnitTestMarkChange(subject, mIdx, e.target.value)}
                                                                        min="0"
                                                                        max={unitTestMarks.maxMarks[idx]}
                                                                    />
                                                                ) : (mark)}
                                                            </td>
                                                        ))}
                                                        <td className="report-total-mark">{getSubjectTotal(subject)}</td>
                                                    </tr>
                                                ))}
                                                <tr className="report-grand-total">
                                                    <td className="report-subject-name">Total</td>
                                                    <td style={{ fontWeight: "700", color: "#854d0e" }}>
                                                        {unitTestMarks.maxMarks.reduce((a, b) => a + b, 0)}
                                                    </td>
                                                    {months.map((_, mIdx) => {
                                                        const monthTotal = subjects.reduce((sum, sub) => sum + unitTestMarks[sub][mIdx], 0);
                                                        return <td key={mIdx} className="report-month-total">{monthTotal}</td>;
                                                    })}
                                                    <td className="report-grand-value">
                                                        {subjects.reduce((sum, sub) => sum + getSubjectTotal(sub), 0)}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* ========== FIRST TERM TAB ========== */}
                            {activeTab === "firstTerm" && (
                                <div className="report-marks-wrapper">
                                    <div className="report-table-header">
                                        <h3><BookOpen size={16} /> First Term Examination</h3>
                                        {editingMode && <span className="editing-badge">Editing Mode</span>}
                                    </div>
                                    <div className="report-table-container">
                                        <table className="report-marks-table">
                                            <thead>
                                                <tr>
                                                    <th>Subjects</th>
                                                    <th>MM (Max Marks)</th>
                                                    <th>MO (Marks Obtained)</th>
                                                    <th>Grade</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subjects.map((subject, idx) => (
                                                    <tr key={subject}>
                                                        <td className="report-subject-name">{subject}</td>
                                                        <td className="report-max-mark">{firstTermData.mm[idx]}</td>
                                                        <td className="report-mark-cell">
                                                            {editingMode ? (
                                                                <input
                                                                    type="number"
                                                                    className="report-mark-input"
                                                                    value={firstTermData.mo[idx]}
                                                                    onChange={(e) => handleTermMarkChange("first", idx, e.target.value)}
                                                                    min="0"
                                                                    max={firstTermData.mm[idx]}
                                                                />
                                                            ) : (firstTermData.mo[idx])}
                                                        </td>
                                                        <td className="report-grade-cell">
                                                            {editingMode ? (
                                                                <select
                                                                    className="report-grade-select"
                                                                    value={firstTermData.grade[idx]}
                                                                    onChange={(e) => handleGradeChange("first", idx, e.target.value)}
                                                                >
                                                                    {gradeOptions.map(g => (
                                                                        <option key={g} value={g}>{g}</option>
                                                                    ))}
                                                                </select>
                                                            ) : (
                                                                <span className="grade-badge">{firstTermData.grade[idx]}</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr className="report-grand-total">
                                                    <td className="report-subject-name">Total</td>
                                                    <td>{firstTermData.mm.reduce((a, b) => a + b, 0)}</td>
                                                    <td>{firstTermData.mo.reduce((a, b) => a + b, 0)}</td>
                                                    <td>-</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* ========== SECOND TERM TAB ========== */}
                            {activeTab === "secondTerm" && (
                                <div className="report-marks-wrapper">
                                    <div className="report-table-header">
                                        <h3><BarChart3 size={16} /> Second Term Examination</h3>
                                        {editingMode && <span className="editing-badge">Editing Mode</span>}
                                    </div>
                                    <div className="report-table-container">
                                        <table className="report-marks-table">
                                            <thead>
                                                <tr>
                                                    <th>Subjects</th>
                                                    <th>MM (Max Marks)</th>
                                                    <th>MO (Marks Obtained)</th>
                                                    <th>Grade</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subjects.map((subject, idx) => (
                                                    <tr key={subject}>
                                                        <td className="report-subject-name">{subject}</td>
                                                        <td className="report-max-mark">{secondTermData.mm[idx]}</td>
                                                        <td className="report-mark-cell">
                                                            {editingMode ? (
                                                                <input
                                                                    type="number"
                                                                    className="report-mark-input"
                                                                    value={secondTermData.mo[idx]}
                                                                    onChange={(e) => handleTermMarkChange("second", idx, e.target.value)}
                                                                    min="0"
                                                                    max={secondTermData.mm[idx]}
                                                                />
                                                            ) : (secondTermData.mo[idx])}
                                                        </td>
                                                        <td className="report-grade-cell">
                                                            {editingMode ? (
                                                                <select
                                                                    className="report-grade-select"
                                                                    value={secondTermData.grade[idx]}
                                                                    onChange={(e) => handleGradeChange("second", idx, e.target.value)}
                                                                >
                                                                    {gradeOptions.map(g => (
                                                                        <option key={g} value={g}>{g}</option>
                                                                    ))}
                                                                </select>
                                                            ) : (
                                                                <span className="grade-badge">{secondTermData.grade[idx]}</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr className="report-grand-total">
                                                    <td className="report-subject-name">Total</td>
                                                    <td>{secondTermData.mm.reduce((a, b) => a + b, 0)}</td>
                                                    <td>{secondTermData.mo.reduce((a, b) => a + b, 0)}</td>
                                                    <td>-</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* ========== THIRD TERM TAB ========== */}
                            {activeTab === "thirdTerm" && (
                                <div className="report-marks-wrapper">
                                    <div className="report-table-header">
                                        <h3><Award size={16} /> Third Term Examination</h3>
                                        {editingMode && <span className="editing-badge">Editing Mode</span>}
                                    </div>
                                    <div className="report-table-container">
                                        <table className="report-marks-table">
                                            <thead>
                                                <tr>
                                                    <th>Subjects</th>
                                                    <th>Max Marks</th>
                                                    <th>Theory <small>(Max: 60)</small></th>
                                                    <th>Assign+Practical <small>(Max: 40)</small></th>
                                                    <th>Total <small>(60+40)</small></th>
                                                    <th>Grade</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subjects.map((subject, idx) => (
                                                    <tr key={subject}>
                                                        <td className="report-subject-name">{subject}</td>
                                                        <td className="report-max-mark">{thirdTermData.maxMarks[idx]}</td>
                                                        <td className="report-mark-cell">
                                                            {editingMode ? (
                                                                <input
                                                                    type="number"
                                                                    className="report-mark-input"
                                                                    value={thirdTermData.theoryObtained[idx]}
                                                                    onChange={(e) => handleThirdTermChange("theoryObtained", idx, e.target.value)}
                                                                    min="0"
                                                                    max={thirdTermData.theory[idx]}
                                                                />
                                                            ) : (`${thirdTermData.theoryObtained[idx]} / ${thirdTermData.theory[idx]}`)}
                                                        </td>
                                                        <td className="report-mark-cell">
                                                            {editingMode ? (
                                                                <input
                                                                    type="number"
                                                                    className="report-mark-input"
                                                                    value={thirdTermData.assignmentPracticalObtained[idx]}
                                                                    onChange={(e) => handleThirdTermChange("assignmentPracticalObtained", idx, e.target.value)}
                                                                    min="0"
                                                                    max={thirdTermData.assignmentPractical[idx]}
                                                                />
                                                            ) : (`${thirdTermData.assignmentPracticalObtained[idx]} / ${thirdTermData.assignmentPractical[idx]}`)}
                                                        </td>
                                                        <td className="report-total-mark">{getThirdTermTotal(idx)} / 100</td>
                                                        <td className="report-grade-cell">
                                                            {editingMode ? (
                                                                <select
                                                                    className="report-grade-select"
                                                                    value={thirdTermData.grade[idx]}
                                                                    onChange={(e) => handleGradeChange("third", idx, e.target.value)}
                                                                >
                                                                    {gradeOptions.map(g => (
                                                                        <option key={g} value={g}>{g}</option>
                                                                    ))}
                                                                </select>
                                                            ) : (
                                                                <span className="grade-badge">{thirdTermData.grade[idx]}</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr className="report-grand-total">
                                                    <td className="report-subject-name">Total</td>
                                                    <td>{thirdTermData.maxMarks.reduce((a, b) => a + b, 0)}</td>
                                                    <td>{thirdTermData.theoryObtained.reduce((a, b) => a + b, 0)} / {thirdTermData.theory.reduce((a, b) => a + b, 0)}</td>
                                                    <td>{thirdTermData.assignmentPracticalObtained.reduce((a, b) => a + b, 0)} / {thirdTermData.assignmentPractical.reduce((a, b) => a + b, 0)}</td>
                                                    <td className="report-grand-value">
                                                        {thirdTermData.theoryObtained.reduce((a, b) => a + b, 0) + thirdTermData.assignmentPracticalObtained.reduce((a, b) => a + b, 0)} / 500
                                                    </td>
                                                    <td>-</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="report-note-box">
                                        <p>📌 <strong>Note:</strong> Theory = 60 marks, Assignment+Practical = 40 marks, Total per subject = 100 marks</p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* No student selected message */}
                    {!selectedStudent && (
                        <div className="report-no-selection">
                            <div className="no-selection-icon">
                                <User size={48} strokeWidth={1.5} />
                            </div>
                            <h3>Select a Student</h3>
                            <p>Please select a class and student to view or manage their academic report.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddAcademicReport;