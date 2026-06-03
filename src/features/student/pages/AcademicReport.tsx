import Header from "../../components/layout/Header/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/layout/Footer/Footer";
import "../styling/academicReport.css";
import { useState } from "react";
import { ArrowLeft, FileText, Download, Printer, Calendar, BookOpen, Award, BarChart3, Notebook, Pin, NotebookIcon, Building, Book, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AcademicReport = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("unitTest");
    const [open, setOpen] = useState(false);

    // Subjects list (vertical)
    const subjects = ["English Literature", "Hindi", "Mathematics", "EVS", "Urdu"];

    // Months for Unit Test (Apr to Jan)
    const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];

    // ==================== UNIT TEST DATA ====================
    const unitTestData = {
        maxMarks: [50, 50, 50, 50, 50],
        marks: {
            "English Literature": [42, 38, 45, 40, 39, 44, 41, 43, 47, 46],
            "Hindi": [40, 41, 38, 42, 39, 43, 40, 41, 44, 42],
            "Mathematics": [48, 45, 47, 49, 46, 48, 47, 49, 50, 48],
            "EVS": [44, 42, 43, 41, 45, 44, 42, 43, 46, 45],
            "Urdu": [41, 39, 42, 40, 38, 43, 41, 42, 45, 43]
        }
    };

    const getSubjectTotal = (subject) => {
        const marks = unitTestData.marks[subject];
        return marks.reduce((sum, m) => sum + m, 0);
    };

    // ==================== FIRST TERM & SECOND TERM DATA ====================
    const termData = {
        "First Term": {
            mm: [50, 50, 50, 50, 50],
            mo: [42, 40, 48, 44, 41],
            grade: ["B+", "B+", "A", "B+", "B"]
        },
        "Second Term": {
            mm: [50, 50, 50, 50, 50],
            mo: [45, 43, 49, 45, 44],
            grade: ["A-", "B+", "A", "A-", "B+"]
        }
    };

    // ==================== THIRD TERM DATA ====================
    const thirdTermData = {
        maxMarks: [100, 100, 100, 100, 100],
        theory: [60, 60, 60, 60, 60],  // Theory max is 60 for each subject
        assignmentPractical: [40, 40, 40, 40, 40], // Assignment+Practical max is 40
        theoryObtained: [52, 48, 55, 50, 46],  // Marks obtained in Theory (out of 60)
        assignmentPracticalObtained: [35, 34, 38, 36, 32],  // Marks obtained in Assignment+Practical (out of 40)
        grade: ["A", "B+", "A+", "A-", "B+"]
    };

    const getThirdTermTotal = (index) => {
        return thirdTermData.theoryObtained[index] + thirdTermData.assignmentPracticalObtained[index];
    };

    const handleDownload = () => {
        alert("Downloading Academic Report...");
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="report-container">
            <Header open={open} setOpen={setOpen} />
            <div className="report-layout">
                <Sidebar open={open} />
                <div className="report-content">
                    {/* Back Navigation */}
                    <div className="back-nav" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                        <span>Back to Dashboard</span>
                    </div>

                    {/* Page Header */}
                    <div className="page-header-ar">
                        <div className="header-left">
                            <div className="header-icon">
                                <FileText size={24} />
                            </div>
                            <div>
                                <h1>Academic Report</h1>
                                <p>Unit Tests & Term-wise Performance</p>
                            </div>
                        </div>
                        <div className="action-buttons">
                            <button className="btn-download" onClick={handleDownload}>
                                <Download size={18} />
                                <span>Download</span>
                            </button>
                            <button className="btn-print" onClick={handlePrint}>
                                <Printer size={18} />
                                <span>Print</span>
                            </button>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="exam-selector">
                        <button
                            className={`exam-btn ${activeTab === "copyTab" ? "active" : ""}`}
                            onClick={() => setActiveTab("copyTab")}
                        >
                            <Calendar size={18} />
                            <span>Unit Test(Copy)</span>
                        </button>
                        <button
                            className={`exam-btn ${activeTab === "unitTest" ? "active" : ""}`}
                            onClick={() => setActiveTab("unitTest")}
                        >
                            <Calendar size={18} />
                            <span>Unit Test</span>
                        </button>
                        <button
                            className={`exam-btn ${activeTab === "firstTerm" ? "active" : ""}`}
                            onClick={() => setActiveTab("firstTerm")}
                        >
                            <BookOpen size={18} />
                            <span>First Term</span>
                        </button>
                        <button
                            className={`exam-btn ${activeTab === "secondTerm" ? "active" : ""}`}
                            onClick={() => setActiveTab("secondTerm")}
                        >
                            <BarChart3 size={18} />
                            <span>Second Term</span>
                        </button>
                        <button
                            className={`exam-btn ${activeTab === "thirdTerm" ? "active" : ""}`}
                            onClick={() => setActiveTab("thirdTerm")}
                        >
                            <Award size={18} />
                            <span>Third Term</span>
                        </button>
                    </div>

                    {/* ========== Copy Tab ========== */}
                    {activeTab === "copyTab" && (
                        <div className="marks-table-wrapper">
                            <div className="table-header">
                                <h3><Book size={16}/>First Term Examination (copy)</h3>
                            </div>
                            <div className="table-container">
                                <table className="marks-table">
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
                                                <td className="subject-name">{subject}</td>
                                                <td>{termData["First Term"].mm[idx]}</td>
                                                <td>{termData["First Term"].mo[idx]}</td>
                                                <td className="grade-cell">{termData["First Term"].grade[idx]}</td>
                                            </tr>
                                        ))}
                                        <tr className="grand-total">
                                            <td className="subject-name">Marks Obtained</td>
                                            <td>{termData["First Term"].mm.reduce((a, b) => a + b, 0)}</td>
                                            <td>{termData["First Term"].mo.reduce((a, b) => a + b, 0)}</td>
                                            <td>-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {activeTab === "unitTest" && (
                        <div className="marks-table-wrapper">
                            <div className="table-header">
                                <h3> <Building size={16}/> Unit Test Marks (Apr - Jan)</h3>
                            </div>
                            <div className="table-container">
                                <table className="marks-table">
                                    <thead>
                                        <tr>
                                            <th>Subjects</th>
                                            <th>Max Marks</th>
                                            {months.map(month => (
                                                <th key={month}>{month}</th>
                                            ))}
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subjects.map((subject, idx) => (
                                            <tr key={subject}>
                                                <td className="subject-name">{subject}</td>
                                                <td>{unitTestData.maxMarks[idx]}</td>
                                                {unitTestData.marks[subject].map((mark, mIdx) => (
                                                    <td key={mIdx}>{mark}</td>
                                                ))}
                                                <td className="total-marks">{getSubjectTotal(subject)}</td>
                                            </tr>
                                        ))}
                                        {/* Marks obtained row with Max Marks total */}
                                        <tr className="grand-total">
                                            <td className="subject-name">Marks Obtained</td>
                                            <td style={{ fontWeight: "700", color: "#854d0e" }}>
                                                {unitTestData.maxMarks.reduce((a, b) => a + b, 0)}
                                            </td>
                                            {months.map((_, mIdx) => {
                                                const monthTotal = subjects.reduce((sum, sub) => sum + unitTestData.marks[sub][mIdx], 0);
                                                return <td key={mIdx}>{monthTotal}</td>;
                                            })}
                                            <td className="grand-total-value">
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
                        <div className="marks-table-wrapper">
                            <div className="table-header">
                                <h3> <Book size={16}/> First Term Examination</h3>
                            </div>
                            <div className="table-container">
                                <table className="marks-table">
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
                                                <td className="subject-name">{subject}</td>
                                                <td>{termData["First Term"].mm[idx]}</td>
                                                <td>{termData["First Term"].mo[idx]}</td>
                                                <td className="grade-cell">{termData["First Term"].grade[idx]}</td>
                                            </tr>
                                        ))}
                                        <tr className="grand-total">
                                            <td className="subject-name">Marks Obtained</td>
                                            <td>{termData["First Term"].mm.reduce((a, b) => a + b, 0)}</td>
                                            <td>{termData["First Term"].mo.reduce((a, b) => a + b, 0)}</td>
                                            <td>-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ========== SECOND TERM TAB ========== */}
                    {activeTab === "secondTerm" && (
                        <div className="marks-table-wrapper">
                            <div className="table-header">
                                <h3><Book size={16}/> Second Term Examination</h3>
                            </div>
                            <div className="table-container">
                                <table className="marks-table">
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
                                                <td className="subject-name">{subject}</td>
                                                <td>{termData["Second Term"].mm[idx]}</td>
                                                <td>{termData["Second Term"].mo[idx]}</td>
                                                <td className="grade-cell">{termData["Second Term"].grade[idx]}</td>
                                            </tr>
                                        ))}
                                        <tr className="grand-total">
                                            <td className="subject-name">Marks Obtained</td>
                                            <td>{termData["Second Term"].mm.reduce((a, b) => a + b, 0)}</td>
                                            <td>{termData["Second Term"].mo.reduce((a, b) => a + b, 0)}</td>
                                            <td>-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ========== THIRD TERM TAB ========== */}
                    {/* ========== THIRD TERM TAB ========== */}
                    {activeTab === "thirdTerm" && (
                        <div className="marks-table-wrapper">
                            <div className="table-header">
                                <h3> <Trophy size={16}/> Third Term Examination (Theory: 60 | Assignment+Practical: 40 | Total: 100)</h3>
                            </div>
                            <div className="table-container">
                                <table className="marks-table">
                                    <thead>
                                        <tr>
                                            <th>Subjects</th>
                                            <th>Max Marks</th>
                                            <th>Theory <span style={{ fontSize: "11px" }}>Max:60</span></th>
                                            <th>Assignment+Practical <span style={{ fontSize: "11px" }}>Max:40</span></th>
                                            <th>Total <span style={{ fontSize: "11px" }}>(60+40)</span></th>
                                            <th>Grade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subjects.map((subject, idx) => {
                                            const totalObtained = getThirdTermTotal(idx);
                                            return (
                                                <tr key={subject}>
                                                    <td className="subject-name">{subject}</td>
                                                    <td>{thirdTermData.maxMarks[idx]}</td>
                                                    <td>{thirdTermData.theoryObtained[idx]} / {thirdTermData.theory[idx]}</td>
                                                    <td>{thirdTermData.assignmentPracticalObtained[idx]} / {thirdTermData.assignmentPractical[idx]}</td>
                                                    <td className="total-marks">{totalObtained} / 100</td>
                                                    <td className="grade-cell">{thirdTermData.grade[idx]}</td>
                                                </tr>
                                            );
                                        })}
                                        {/* Marks obtained row */}
                                        <tr className="grand-total">
                                            <td className="subject-name">Marks Obtained</td>
                                            <td>{thirdTermData.maxMarks.reduce((a, b) => a + b, 0)}</td>
                                            <td>{thirdTermData.theoryObtained.reduce((a, b) => a + b, 0)} / {thirdTermData.theory.reduce((a, b) => a + b, 0)}</td>
                                            <td>{thirdTermData.assignmentPracticalObtained.reduce((a, b) => a + b, 0)} / {thirdTermData.assignmentPractical.reduce((a, b) => a + b, 0)}</td>
                                            <td className="grand-total-value">
                                                {thirdTermData.theoryObtained.reduce((a, b) => a + b, 0) + thirdTermData.assignmentPracticalObtained.reduce((a, b) => a + b, 0)} / 500
                                            </td>
                                            <td>-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="note-box">
                                <p> <NotebookIcon size={15}/> Note: Theory = 60 marks, Assignment+Practical = 40 marks, Total per subject = 100 marks</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AcademicReport;