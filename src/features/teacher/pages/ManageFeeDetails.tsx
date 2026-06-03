import Header from "../../../components/layout/Header/Header";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import Footer from "../../../components/layout/Footer/Footer";
import { useState, useEffect } from "react";
import {
    ArrowLeft, Receipt, Calendar, IndianRupee, FileText,
    Download, Printer, CheckCircle, CreditCard, AlertCircle,
    Clock, List, ChevronRight, Eye, History, X, ChevronDown,
    Search, GraduationCap, User, Plus, Save, Edit3
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/managefeedetails.css";

const FeeDetails = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("dues");
    const [open, setOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    // const [expandedRow, setExpandedRow] = useState(null);

    // ============ CLASS & STUDENT SELECTION ============
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showClassDropdown, setShowClassDropdown] = useState(false);
    const [showStudentDropdown, setShowStudentDropdown] = useState(false);
    const [studentSearch, setStudentSearch] = useState("");

    // ============ EDIT MODE FOR FEE MANAGEMENT ============
    const [editingFee, setEditingFee] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

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
            { id: 1, name: "Mohammad Ayan", rollNo: "1001", section: "A", fatherName: "Mr. Rashid Khan" },
            { id: 2, name: "Fatima Zahra", rollNo: "1002", section: "A", fatherName: "Mr. Imran Ali" },
            { id: 3, name: "Ahmed Raza", rollNo: "1003", section: "A", fatherName: "Mr. Salman Khan" },
            { id: 4, name: "Ayesha Noor", rollNo: "1004", section: "A", fatherName: "Mr. Faisal Qureshi" },
            { id: 5, name: "Zain Ali", rollNo: "1005", section: "A", fatherName: "Mr. Waqar Ahmed" },
            { id: 6, name: "Hassan Rizvi", rollNo: "1006", section: "B", fatherName: "Mr. Kamran Rizvi" },
            { id: 7, name: "Zara Khan", rollNo: "1007", section: "B", fatherName: "Mr. Amir Khan" },
            { id: 8, name: "Omar Farooq", rollNo: "1008", section: "B", fatherName: "Mr. Usman Farooq" },
        ],
        "Class 9": [
            { id: 9, name: "Ali Hassan", rollNo: "901", section: "A", fatherName: "Mr. Hassan Ali" },
            { id: 10, name: "Mariam Khan", rollNo: "902", section: "A", fatherName: "Mr. Rafiq Khan" },
            { id: 11, name: "Saad Ahmed", rollNo: "903", section: "B", fatherName: "Mr. Naeem Ahmed" },
            { id: 12, name: "Hira Noor", rollNo: "904", section: "B", fatherName: "Mr. Tariq Noor" },
        ],
    };

    // Get students list based on selected class
    const getClassStudents = () => studentsData[selectedClass] || [];

    // Filter students by search
    const filteredStudents = getClassStudents().filter(student =>
        student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        student.rollNo.includes(studentSearch)
    );

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
            if (!e.target.closest('.fd-dropdown-wrapper')) {
                setShowClassDropdown(false);
                setShowStudentDropdown(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // ============ FEE DATA (Editable for management) ============
    const [feeDues, setFeeDues] = useState({
        session: "2025-2026",
        dueDate: "30-04-2026",
        totalDue: 12500,
        breakdown: [
            { id: 1, name: "Tuition Fee (Term II)", amount: 8500, dueDate: "30-04-2026" },
            { id: 2, name: "Laboratory Fee", amount: 2000, dueDate: "30-04-2026" },
            { id: 3, name: "Library Fee", amount: 1200, dueDate: "30-04-2026" },
            { id: 4, name: "Sports & Activities", amount: 800, dueDate: "30-04-2026" }
        ],
        lateFeeWarning: "Late fee of ₹500 will apply after due date"
    });

    // Last Paid Data
    const lastPaid = {
        session: "2024-2025",
        receiptNumber: "2025/02/0156",
        paymentStatus: "Paid",
        dateOfPayment: "15-02-2025",
        paymentMode: "UPI / Google Pay",
        grandTotal: 11800,
        breakdown: [
            { name: "Tuition Fee (Term I)", amount: 8000 },
            { name: "Development Fee", amount: 1500 },
            { name: "Examination Fee", amount: 1000 },
            { name: "Games & Sports", amount: 500 },
            { name: "Building Fund", amount: 800 }
        ]
    };

    // Fee Structure Data
    const feeStructure = {
        session: "2025-2026",
        categories: [
            {
                category: "Academic Fees",
                items: [
                    { name: "Tuition Fee (Annual)", amount: 42500, frequency: "Per Year" },
                    { name: "Admission Fee", amount: 5000, frequency: "One Time" },
                    { name: "Examination Fee", amount: 2000, frequency: "Per Semester" }
                ]
            },
            {
                category: "Facility & Development",
                items: [
                    { name: "Development Fee", amount: 3500, frequency: "Per Year" },
                    { name: "Laboratory Fee", amount: 2000, frequency: "Per Year" },
                    { name: "Library Fee", amount: 1500, frequency: "Per Year" },
                    { name: "Computer Lab Fee", amount: 1200, frequency: "Per Year" }
                ]
            },
            {
                category: "Activities & Others",
                items: [
                    { name: "Sports Fee", amount: 1500, frequency: "Per Year" },
                    { name: "Cultural Activities", amount: 1000, frequency: "Per Year" },
                    { name: "ID Card & Insurance", amount: 500, frequency: "Per Year" }
                ]
            }
        ],
        totalAnnual: 60800
    };

    // Payment History Data
    const paymentHistoryData = [
        {
            session: "2024-2025", receiptNo: "2025/02/0156", amountPaid: 11800,
            amountToPay: 12500, date: "15-02-2025", status: "Paid",
            paymentMode: "UPI / Google Pay",
            breakdown: [
                { name: "Tuition Fee (Term I)", amount: 8000 },
                { name: "Development Fee", amount: 1500 },
                { name: "Examination Fee", amount: 1000 },
                { name: "Games & Sports", amount: 500 },
                { name: "Building Fund", amount: 800 }
            ]
        },
        {
            session: "2023-2024", receiptNo: "2024/08/0089", amountPaid: 11200,
            amountToPay: 11800, date: "10-08-2024", status: "Paid",
            paymentMode: "Credit Card",
            breakdown: [
                { name: "Tuition Fee (Term I)", amount: 7500 },
                { name: "Development Fee", amount: 1400 },
                { name: "Examination Fee", amount: 900 },
                { name: "Games & Sports", amount: 500 },
                { name: "Building Fund", amount: 900 }
            ]
        },
    ];

    // const recentPayments = paymentHistoryData.slice(0, 2);

    // ============ FEE MANAGEMENT FUNCTIONS ============
    const handleDuesAmountChange = (id, value) => {
        const numValue = parseInt(value) || 0;
        setFeeDues(prev => {
            const updatedBreakdown = prev.breakdown.map(item =>
                item.id === id ? { ...item, amount: numValue } : item
            );
            const newTotal = updatedBreakdown.reduce((sum, item) => sum + item.amount, 0);
            return { ...prev, breakdown: updatedBreakdown, totalDue: newTotal };
        });
    };

    const showSuccess = (msg) => {
        setSuccessMessage(msg);
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    const handleSaveFeeChanges = () => {
        console.log("Saving fee data for:", selectedStudent?.name, feeDues);
        setEditingFee(false);
        showSuccess("Fee details updated successfully!");
    };

    const handleDownloadReceipt = () => alert("Receipt downloading...");
    const handlePrintReceipt = () => window.print();
    const handlePayNow = () => alert("Redirecting to payment gateway...");

    const handleViewDetails = (payment) => {
        setSelectedPayment(payment);
        setShowDetailsModal(true);
    };

    const handleCloseModal = () => {
        setShowDetailsModal(false);
        setSelectedPayment(null);
    };

    // const toggleRowExpand = (index) => {
    //     setExpandedRow(expandedRow === index ? null : index);
    // };

    return (
        <div className="fee-container">
            <Header open={open} setOpen={setOpen} />
            <div className="fee-layout">
                <Sidebar open={open} />
                <div className="fee-content">
                    {/* Success Message */}
                    {successMessage && (
                        <div className="fd-success-toast">
                            <CheckCircle size={18} />
                            <span>{successMessage}</span>
                        </div>
                    )}

                    <div className="back-nav" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                        <span>Back to Dashboard</span>
                    </div>

                    <div className="page-header-fd">
                        <div className="header-left">
                            <div className="header-icon">
                                <Receipt size={24} />
                            </div>
                            <div>
                                <h1>Fee Management</h1>
                                <p>Manage student fees, dues & payments</p>
                            </div>
                        </div>
                    </div>

                    {/* ============ CLASS & STUDENT SELECTION ============ */}
                    <div className="fd-selection-area">
                        <div className="fd-selection-row">
                            {/* Class Dropdown */}
                            <div className="fd-dropdown-wrapper">
                                <label className="fd-dropdown-label">
                                    <GraduationCap size={16} />
                                    Select Class
                                </label>
                                <div 
                                    className={`fd-dropdown ${showClassDropdown ? 'open' : ''}`}
                                    onClick={() => {
                                        setShowClassDropdown(!showClassDropdown);
                                        setShowStudentDropdown(false);
                                    }}
                                >
                                    <div className="fd-dropdown-selected">
                                        <span className={selectedClass ? '' : 'placeholder'}>
                                            {selectedClass || "Choose Class"}
                                        </span>
                                        <ChevronDown size={18} className={`chevron ${showClassDropdown ? 'rotate' : ''}`} />
                                    </div>
                                    {showClassDropdown && (
                                        <div className="fd-dropdown-menu">
                                            {classes.map(cls => (
                                                <div
                                                    key={cls.id}
                                                    className={`fd-dropdown-item ${selectedClass === cls.name ? 'selected' : ''}`}
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
                            <div className="fd-dropdown-wrapper">
                                <label className="fd-dropdown-label">
                                    <User size={16} />
                                    Select Student
                                </label>
                                <div 
                                    className={`fd-dropdown ${!selectedClass ? 'disabled' : ''} ${showStudentDropdown ? 'open' : ''}`}
                                    onClick={() => {
                                        if (selectedClass) {
                                            setShowStudentDropdown(!showStudentDropdown);
                                            setShowClassDropdown(false);
                                        }
                                    }}
                                >
                                    <div className="fd-dropdown-selected">
                                        <span className={selectedStudent ? '' : 'placeholder'}>
                                            {selectedStudent 
                                                ? `${selectedStudent.name} (${selectedStudent.rollNo})` 
                                                : selectedClass ? "Select Student" : "Select class first"}
                                        </span>
                                        <ChevronDown size={18} className={`chevron ${showStudentDropdown ? 'rotate' : ''}`} />
                                    </div>
                                    {showStudentDropdown && selectedClass && (
                                        <div className="fd-dropdown-menu">
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
                                                        className={`fd-dropdown-item ${selectedStudent?.id === student.id ? 'selected' : ''}`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleStudentSelect(student);
                                                        }}
                                                    >
                                                        <div className="student-item-info">
                                                            <span className="student-name">{student.name}</span>
                                                            <span className="student-meta">Roll: {student.rollNo} • Sec: {student.section}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="dropdown-empty"><p>No students found</p></div>
                                            )}
                                            <div className="dropdown-footer">Total: {filteredStudents.length} students</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Selected Student Info */}
                    {selectedStudent && (
                        <div className="fd-student-info-card">
                            <div className="fd-student-card">
                                <GraduationCap size={20} />
                                <div>
                                    <h4>{selectedStudent.name}</h4>
                                    <span>{selectedClass} • Section {selectedStudent.section} • Roll: {selectedStudent.rollNo} • Father: {selectedStudent.fatherName}</span>
                                </div>
                                <button 
                                    className={`fd-edit-btn ${editingFee ? 'active' : ''}`}
                                    onClick={() => {
                                        if (editingFee) handleSaveFeeChanges();
                                        setEditingFee(!editingFee);
                                    }}
                                >
                                    {editingFee ? <Save size={16} /> : <Edit3 size={16} />}
                                    {editingFee ? 'Save' : 'Edit Fees'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Content only shows when student is selected */}
                    {selectedStudent ? (
                        <>
                            {/* Four Tab Navigation */}
                            <div className="tab-navigation four-tabs">
                                <button className={`tab-btn ${activeTab === "dues" ? "active" : ""}`} onClick={() => setActiveTab("dues")}>
                                    <AlertCircle size={18} /><span>Fee Dues</span>
                                </button>
                                <button className={`tab-btn ${activeTab === "last-paid" ? "active" : ""}`} onClick={() => setActiveTab("last-paid")}>
                                    <CheckCircle size={18} /><span>Last Paid</span>
                                </button>
                                <button className={`tab-btn ${activeTab === "payment-history" ? "active" : ""}`} onClick={() => setActiveTab("payment-history")}>
                                    <History size={18} /><span>Payment History</span>
                                </button>
                                <button className={`tab-btn ${activeTab === "structure" ? "active" : ""}`} onClick={() => setActiveTab("structure")}>
                                    <List size={18} /><span>Fee Structure</span>
                                </button>
                            </div>

                            {/* ========== TAB 1: FEE DUES ========== */}
                            {activeTab === "dues" && (
                                <>
                                    <div className="status-banner due">
                                        <div className="status-icon"><AlertCircle size={28} /></div>
                                        <div className="status-info">
                                            <span className="status-label">Payment Due</span>
                                            <span className="status-value">
                                                <IndianRupee size={20} />{feeDues.totalDue.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="status-date"><Clock size={16} /><span>Due by {feeDues.dueDate}</span></div>
                                    </div>

                                    <div className="fee-card dues-card">
                                        <div className="fee-card-header">
                                            <div className="session-info">
                                                <span className="session-label">Current Session</span>
                                                <h2 className="session-year">{feeDues.session}</h2>
                                            </div>
                                            <div className="due-badge">
                                                <AlertCircle size={16} />
                                                <span>{feeDues.lateFeeWarning}</span>
                                            </div>
                                        </div>
                                        <div className="fee-breakdown">
                                            <h3>Outstanding Dues {editingFee && <span className="edit-mode-badge">Editing</span>}</h3>
                                            <div className="breakdown-table">
                                                {feeDues.breakdown.map((item) => (
                                                    <div className="breakdown-row" key={item.id}>
                                                        <div className="fee-info">
                                                            <span className="fee-name">{item.name}</span>
                                                            <span className="fee-due-date"><Calendar size={12} />Due: {item.dueDate}</span>
                                                        </div>
                                                        {editingFee ? (
                                                            <div className="fee-amount-edit">
                                                                <IndianRupee size={14} />
                                                                <input
                                                                    type="number"
                                                                    className="fd-amount-input"
                                                                    value={item.amount}
                                                                    onChange={(e) => handleDuesAmountChange(item.id, e.target.value)}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <span className="fee-amount">
                                                                <IndianRupee size={14} />{item.amount.toLocaleString()}
                                                            </span>
                                                        )}
                                                    </div>
                                                ))}
                                                <div className="breakdown-row grand-total">
                                                    <span className="fee-name">Total Due Amount</span>
                                                    <span className="fee-amount">
                                                        <IndianRupee size={16} />{feeDues.totalDue.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {!editingFee && (
                                            <div className="action-buttons">
                                                <button className="btn-pay-now" onClick={handlePayNow}>
                                                    <CreditCard size={18} /><span>Pay Now</span>
                                                </button>
                                                <button className="btn-download-outline">
                                                    <Download size={18} /><span>Download Invoice</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* ========== TAB 2: LAST PAID ========== */}
                            {activeTab === "last-paid" && (
                                <>
                                    <div className="status-banner paid">
                                        <div className="status-icon"><CheckCircle size={28} /></div>
                                        <div className="status-info">
                                            <span className="status-label">Last Payment Status</span>
                                            <span className="status-value">{lastPaid.paymentStatus}</span>
                                        </div>
                                        <div className="status-date"><Calendar size={16} /><span>Paid on {lastPaid.dateOfPayment}</span></div>
                                    </div>
                                    <div className="fee-card">
                                        <div className="fee-card-header">
                                            <div className="session-info">
                                                <span className="session-label">Academic Session</span>
                                                <h2 className="session-year">{lastPaid.session}</h2>
                                            </div>
                                            <div className="receipt-info">
                                                <span className="receipt-label">Receipt Number</span>
                                                <div className="receipt-number"><FileText size={16} /><span>{lastPaid.receiptNumber}</span></div>
                                            </div>
                                        </div>
                                        <div className="fee-breakdown">
                                            <h3>Fee Breakdown</h3>
                                            <div className="breakdown-table">
                                                {lastPaid.breakdown.map((item, index) => (
                                                    <div className="breakdown-row" key={index}>
                                                        <span className="fee-name">{item.name}</span>
                                                        <span className="fee-amount"><IndianRupee size={14} />{item.amount.toLocaleString()}</span>
                                                    </div>
                                                ))}
                                                <div className="breakdown-row grand-total">
                                                    <span className="fee-name">Grand Total</span>
                                                    <span className="fee-amount"><IndianRupee size={16} />{lastPaid.grandTotal.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="payment-details">
                                            <div className="payment-row">
                                                <span className="payment-label">Payment Mode</span>
                                                <span className="payment-value"><CreditCard size={14} />{lastPaid.paymentMode}</span>
                                            </div>
                                            <div className="payment-row">
                                                <span className="payment-label">Transaction Date</span>
                                                <span className="payment-value"><Calendar size={14} />{lastPaid.dateOfPayment}</span>
                                            </div>
                                        </div>
                                        <div className="action-buttons">
                                            <button className="btn-download" onClick={handleDownloadReceipt}><Download size={18} /><span>Download Receipt</span></button>
                                            <button className="btn-print" onClick={handlePrintReceipt}><Printer size={18} /><span>Print Receipt</span></button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* ========== TAB 3: PAYMENT HISTORY ========== */}
                            {activeTab === "payment-history" && (
                                <>
                                    <div className="payment-history-header">
                                        <h2><History size={22} /> Complete Payment History</h2>
                                        <p>View all past transactions and payment details</p>
                                    </div>
                                    <div className="payment-history-table-container">
                                        <div className="payment-history-table">
                                            <div className="payment-history-header-row">
                                                <span>Session</span><span>Receipt No.</span><span>Amount Paid</span><span>Amount to Pay</span><span>Action</span>
                                            </div>
                                            {paymentHistoryData.map((payment, index) => (
                                                <div className="payment-history-data-row" key={index}>
                                                    <span className="session-data">{payment.session}</span>
                                                    <span className="receipt-data">{payment.receiptNo}</span>
                                                    <span className="amount-paid-data"><IndianRupee size={12} />{payment.amountPaid.toLocaleString()}</span>
                                                    <span className="amount-to-pay-data"><IndianRupee size={12} />{payment.amountToPay.toLocaleString()}</span>
                                                    <span className="action-data">
                                                        <button className="btn-view-details" onClick={() => handleViewDetails(payment)}>
                                                            <Eye size={14} />View Details
                                                        </button>
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* ========== TAB 4: FEE STRUCTURE ========== */}
                            {activeTab === "structure" && (
                                <>
                                    <div className="structure-header-card">
                                        <div className="structure-title"><List size={22} /><h2>Fee Structure · {feeStructure.session}</h2></div>
                                        <p>Complete breakdown of applicable fees for the academic year</p>
                                    </div>
                                    <div className="structure-grid">
                                        {feeStructure.categories.map((cat, idx) => (
                                            <div className="structure-category-card" key={idx}>
                                                <h3 className="category-title">{cat.category}</h3>
                                                <div className="category-items">
                                                    {cat.items.map((item, i) => (
                                                        <div className="structure-row" key={i}>
                                                            <div className="structure-info">
                                                                <span className="structure-name">{item.name}</span>
                                                                <span className="structure-frequency">{item.frequency}</span>
                                                            </div>
                                                            <span className="structure-amount"><IndianRupee size={14} />{item.amount.toLocaleString()}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="annual-total-card">
                                        <span>Total Annual Fee</span>
                                        <span className="total-value"><IndianRupee size={20} />{feeStructure.totalAnnual.toLocaleString()}</span>
                                    </div>
                                    <div className="note-card">
                                        <AlertCircle size={18} />
                                        <p>Fees can be paid in two installments. Additional charges may apply for late payments.</p>
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        /* No student selected message */
                        <div className="fd-no-selection">
                            <div className="fd-no-selection-icon"><User size={48} strokeWidth={1.5} /></div>
                            <h3>Select a Student</h3>
                            <p>Please select a class and student to manage their fee details.</p>
                        </div>
                    )}

                    {/* Details Modal */}
                    {showDetailsModal && selectedPayment && (
                        <div className="modal-overlay" onClick={handleCloseModal}>
                            <div className="modal-content-f" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-header-f">
                                    <h3>Payment Details</h3>
                                    <button className="modal-close-f" onClick={handleCloseModal}><X size={18} /></button>
                                </div>
                                <div className="modal-body-f">
                                    <div className="modal-info-grid">
                                        <div className="modal-info-item"><span className="modal-label">Session</span><span className="modal-value">{selectedPayment.session}</span></div>
                                        <div className="modal-info-item"><span className="modal-label">Receipt No.</span><span className="modal-value">{selectedPayment.receiptNo}</span></div>
                                        <div className="modal-info-item"><span className="modal-label">Payment Date</span><span className="modal-value">{selectedPayment.date}</span></div>
                                        <div className="modal-info-item"><span className="modal-label">Payment Mode</span><span className="modal-value">{selectedPayment.paymentMode}</span></div>
                                        <div className="modal-info-item"><span className="modal-label">Amount Paid</span><span className="modal-value highlight"><IndianRupee size={12} />{selectedPayment.amountPaid.toLocaleString()}</span></div>
                                        <div className="modal-info-item"><span className="modal-label">Total Amount</span><span className="modal-value"><IndianRupee size={12} />{selectedPayment.amountToPay.toLocaleString()}</span></div>
                                    </div>
                                    <div className="modal-breakdown">
                                        <h4>Fee Breakdown</h4>
                                        {selectedPayment.breakdown.map((item, idx) => (
                                            <div className="modal-breakdown-row" key={idx}><span>{item.name}</span><span><IndianRupee size={10} />{item.amount.toLocaleString()}</span></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn-modal-download" onClick={handleDownloadReceipt}><Download size={14} />Download</button>
                                    <button className="btn-modal-print" onClick={handlePrintReceipt}><Printer size={14} />Print</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FeeDetails;