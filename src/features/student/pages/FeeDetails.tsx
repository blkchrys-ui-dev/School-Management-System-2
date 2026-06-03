import Header from "../../../components/layout/Header/Header";
import Sidebar from "../../../components/layout/Sidebar/StudentSidebar";
import Footer from "../../../components/layout/Footer/Footer";
import { useState } from "react";
import {
    ArrowLeft, Receipt, Calendar, IndianRupee, FileText,
    Download, Printer, CheckCircle, CreditCard, AlertCircle,
    Clock, List, ChevronRight, Eye, History, X, ChevronDown
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/feeDetails.css";

const FeeDetails = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("dues"); // dues, last-paid, structure, payment-history
    const [open, setOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [expandedRow, setExpandedRow] = useState(null);

    // Fee Dues Data (Current Pending)
    const feeDues = {
        session: "2025-2026",
        dueDate: "30-04-2026",
        totalDue: 12500,
        breakdown: [
            { name: "Tuition Fee (Term II)", amount: 8500, dueDate: "30-04-2026" },
            { name: "Laboratory Fee", amount: 2000, dueDate: "30-04-2026" },
            { name: "Library Fee", amount: 1200, dueDate: "30-04-2026" },
            { name: "Sports & Activities", amount: 800, dueDate: "30-04-2026" }
        ],
        lateFeeWarning: "Late fee of ₹500 will apply after due date"
    };

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

    // Payment History Data with Amount to Pay
    const paymentHistoryData = [
        {
            session: "2024-2025",
            receiptNo: "2025/02/0156",
            amountPaid: 11800,
            amountToPay: 12500,
            date: "15-02-2025",
            status: "Paid",
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
            session: "2023-2024",
            receiptNo: "2024/08/0089",
            amountPaid: 11200,
            amountToPay: 11800,
            date: "10-08-2024",
            status: "Paid",
            paymentMode: "Credit Card",
            breakdown: [
                { name: "Tuition Fee (Term I)", amount: 7500 },
                { name: "Development Fee", amount: 1400 },
                { name: "Examination Fee", amount: 900 },
                { name: "Games & Sports", amount: 500 },
                { name: "Building Fund", amount: 900 }
            ]
        },
        {
            session: "2022-2023",
            receiptNo: "2023/03/0045",
            amountPaid: 10500,
            amountToPay: 11200,
            date: "05-03-2023",
            status: "Paid",
            paymentMode: "Net Banking",
            breakdown: [
                { name: "Tuition Fee (Term I)", amount: 7000 },
                { name: "Development Fee", amount: 1300 },
                { name: "Examination Fee", amount: 800 },
                { name: "Games & Sports", amount: 500 },
                { name: "Building Fund", amount: 900 }
            ]
        },
        {
            session: "2021-2022",
            receiptNo: "2022/03/0088",
            amountPaid: 9800,
            amountToPay: 10500,
            date: "12-03-2022",
            status: "Paid",
            paymentMode: "Cash",
            breakdown: [
                { name: "Tuition Fee (Term I)", amount: 6500 },
                { name: "Development Fee", amount: 1200 },
                { name: "Examination Fee", amount: 700 },
                { name: "Games & Sports", amount: 500 },
                { name: "Building Fund", amount: 900 }
            ]
        }
    ];

    // Recent payments for preview (first 2)
    const recentPayments = paymentHistoryData.slice(0, 2);

    const handleDownloadReceipt = () => {
        alert("Receipt downloading...");
    };

    const handlePrintReceipt = () => {
        window.print();
    };

    const handlePayNow = () => {
        alert("Redirecting to payment gateway...");
    };

    const handleViewDetails = (payment) => {
        setSelectedPayment(payment);
        setShowDetailsModal(true);
    };

    const handleCloseModal = () => {
        setShowDetailsModal(false);
        setSelectedPayment(null);
    };

    const toggleRowExpand = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    return (
        <div className="fee-container">
            <Header open={open} setOpen={setOpen} />
            <div className="fee-layout">
                <Sidebar open={open} />
                <div className="fee-content">
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
                                <p>Track dues, payments & fee structure</p>
                            </div>
                        </div>
                    </div>

                    {/* Four Tab Navigation */}
                    <div className="tab-navigation four-tabs">
                        <button
                            className={`tab-btn ${activeTab === "dues" ? "active" : ""}`}
                            onClick={() => setActiveTab("dues")}
                        >
                            <AlertCircle size={18} />
                            <span>Fee Dues</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === "last-paid" ? "active" : ""}`}
                            onClick={() => setActiveTab("last-paid")}
                        >
                            <CheckCircle size={18} />
                            <span>Last Paid</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === "payment-history" ? "active" : ""}`}
                            onClick={() => setActiveTab("payment-history")}
                        >
                            <History size={18} />
                            <span>Payment History</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === "structure" ? "active" : ""}`}
                            onClick={() => setActiveTab("structure")}
                        >
                            <List size={18} />
                            <span>Fee Structure</span>
                        </button>
                    </div>

                    {/* ========== TAB 1: FEE DUES ========== */}
                    {activeTab === "dues" && (
                        <>
                            {/* Due Status Banner */}
                            <div className="status-banner due">
                                <div className="status-icon">
                                    <AlertCircle size={28} />
                                </div>
                                <div className="status-info">
                                    <span className="status-label">Payment Due</span>
                                    <span className="status-value">
                                        <IndianRupee size={20} />
                                        {feeDues.totalDue.toLocaleString()}
                                    </span>
                                </div>
                                <div className="status-date">
                                    <Clock size={16} />
                                    <span>Due by {feeDues.dueDate}</span>
                                </div>
                            </div>

                            {/* Dues Card */}
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
                                    <h3>Outstanding Dues</h3>
                                    <div className="breakdown-table">
                                        {feeDues.breakdown.map((item, index) => (
                                            <div className="breakdown-row" key={index}>
                                                <div className="fee-info">
                                                    <span className="fee-name">{item.name}</span>
                                                    <span className="fee-due-date">
                                                        <Calendar size={12} />
                                                        Due: {item.dueDate}
                                                    </span>
                                                </div>
                                                <span className="fee-amount">
                                                    <IndianRupee size={14} />
                                                    {item.amount.toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                        <div className="breakdown-row grand-total">
                                            <span className="fee-name">Total Due Amount</span>
                                            <span className="fee-amount">
                                                <IndianRupee size={16} />
                                                {feeDues.totalDue.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="action-buttons">
                                    <button className="btn-pay-now" onClick={handlePayNow}>
                                        <CreditCard size={18} />
                                        <span>Pay Now</span>
                                    </button>
                                    <button className="btn-download-outline">
                                        <Download size={18} />
                                        <span>Download Invoice</span>
                                    </button>
                                </div>
                            </div>

                            {/* Quick Payment History Preview */}
                            <div className="history-card compact">
                                <h3><Clock size={18} /> Recent Payments</h3>
                                <div className="history-table">
                                    <div className="history-header">
                                        <span>Date</span>
                                        <span>Receipt</span>
                                        <span>Amount</span>
                                        <span>Status</span>
                                    </div>
                                    {recentPayments.map((payment, index) => (
                                        <div className="history-row" key={index}>
                                            <span className="date">{payment.date}</span>
                                            <span className="receipt">{payment.receiptNo}</span>
                                            <span className="amount">
                                                <IndianRupee size={12} />
                                                {payment.amountPaid.toLocaleString()}
                                            </span>
                                            <span className={`status ${payment.status.toLowerCase()}`}>
                                                {payment.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <button className="view-all-link" onClick={() => setActiveTab("payment-history")}>
                                    View all payments <ChevronRight size={16} />
                                </button>
                            </div>
                        </>
                    )}

                    {/* ========== TAB 2: LAST PAID ========== */}
                    {activeTab === "last-paid" && (
                        <>
                            {/* Paid Status Banner */}
                            <div className="status-banner paid">
                                <div className="status-icon">
                                    <CheckCircle size={28} />
                                </div>
                                <div className="status-info">
                                    <span className="status-label">Last Payment Status</span>
                                    <span className="status-value">{lastPaid.paymentStatus}</span>
                                </div>
                                <div className="status-date">
                                    <Calendar size={16} />
                                    <span>Paid on {lastPaid.dateOfPayment}</span>
                                </div>
                            </div>

                            {/* Last Paid Card */}
                            <div className="fee-card">
                                <div className="fee-card-header">
                                    <div className="session-info">
                                        <span className="session-label">Academic Session</span>
                                        <h2 className="session-year">{lastPaid.session}</h2>
                                    </div>
                                    <div className="receipt-info">
                                        <span className="receipt-label">Receipt Number</span>
                                        <div className="receipt-number">
                                            <FileText size={16} />
                                            <span>{lastPaid.receiptNumber}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="fee-breakdown">
                                    <h3>Fee Breakdown</h3>
                                    <div className="breakdown-table">
                                        {lastPaid.breakdown.map((item, index) => (
                                            <div className="breakdown-row" key={index}>
                                                <span className="fee-name">{item.name}</span>
                                                <span className="fee-amount">
                                                    <IndianRupee size={14} />
                                                    {item.amount.toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                        <div className="breakdown-row grand-total">
                                            <span className="fee-name">Grand Total</span>
                                            <span className="fee-amount">
                                                <IndianRupee size={16} />
                                                {lastPaid.grandTotal.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="payment-details">
                                    <div className="payment-row">
                                        <span className="payment-label">Payment Mode</span>
                                        <span className="payment-value">
                                            <CreditCard size={14} />
                                            {lastPaid.paymentMode}
                                        </span>
                                    </div>
                                    <div className="payment-row">
                                        <span className="payment-label">Transaction Date</span>
                                        <span className="payment-value">
                                            <Calendar size={14} />
                                            {lastPaid.dateOfPayment}
                                        </span>
                                    </div>
                                </div>

                                <div className="action-buttons">
                                    <button className="btn-download" onClick={handleDownloadReceipt}>
                                        <Download size={18} />
                                        <span>Download Receipt</span>
                                    </button>
                                    <button className="btn-print" onClick={handlePrintReceipt}>
                                        <Printer size={18} />
                                        <span>Print Receipt</span>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* ========== TAB 3: PAYMENT HISTORY ========== */}
                    {activeTab === "payment-history" && (
                        <>
                            <div className="payment-history-header">
                                <h2><History size={22} /> Complete Payment History</h2>
                                <p>View all your past transactions and payment details</p>
                            </div>

                            <div className="payment-history-table-container">
                                <div className="payment-history-table">
                                    <div className="payment-history-header-row">
                                        <span>Session</span>
                                        <span>Receipt No.</span>
                                        <span>Amount Paid</span>
                                        <span>Amount to Pay</span>
                                        <span>Action</span>
                                    </div>
                                    {paymentHistoryData.map((payment, index) => (
                                        <div className="payment-history-data-row" key={index}>
                                            <span className="session-data">{payment.session}</span>
                                            <span className="receipt-data">{payment.receiptNo}</span>
                                            <span className="amount-paid-data">
                                                <IndianRupee size={12} />
                                                {payment.amountPaid.toLocaleString()}
                                            </span>
                                            <span className="amount-to-pay-data">
                                                <IndianRupee size={12} />
                                                {payment.amountToPay.toLocaleString()}
                                            </span>
                                            <span className="action-data">
                                                <button
                                                    className="btn-view-details"
                                                    onClick={() => handleViewDetails(payment)}
                                                >
                                                    <Eye size={14} />
                                                    View Details
                                                </button>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Card View for Payment History */}
                            <div className="payment-history-mobile">
                                {paymentHistoryData.map((payment, index) => (
                                    <div className="payment-mobile-card" key={index}>
                                        <div
                                            className="mobile-card-header"
                                            onClick={() => toggleRowExpand(index)}
                                        >
                                            <div className="header-left-mobile">
                                                <span className="session-badge">{payment.session}</span>
                                                <span className="receipt-badge">{payment.receiptNo}</span>
                                            </div>
                                            <ChevronDown
                                                size={18}
                                                className={`expand-icon ${expandedRow === index ? 'expanded' : ''}`}
                                            />
                                        </div>
                                        <div className={`mobile-card-body ${expandedRow === index ? 'expanded' : ''}`}>
                                            <div className="mobile-detail-row">
                                                <span className="label">Amount Paid:</span>
                                                <span className="value paid">
                                                    <IndianRupee size={12} />
                                                    {payment.amountPaid.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="mobile-detail-row">
                                                <span className="label">Amount to Pay:</span>
                                                <span className="value due">
                                                    <IndianRupee size={12} />
                                                    {payment.amountToPay.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="mobile-detail-row">
                                                <span className="label">Payment Date:</span>
                                                <span className="value">{payment.date}</span>
                                            </div>
                                            <div className="mobile-detail-row">
                                                <span className="label">Payment Mode:</span>
                                                <span className="value">{payment.paymentMode}</span>
                                            </div>
                                            <button
                                                className="btn-view-details-mobile"
                                                onClick={() => handleViewDetails(payment)}
                                            >
                                                <Eye size={14} />
                                                View Full Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* ========== TAB 4: FEE STRUCTURE ========== */}
                    {activeTab === "structure" && (
                        <>
                            <div className="structure-header-card">
                                <div className="structure-title">
                                    <List size={22} />
                                    <h2>Fee Structure · {feeStructure.session}</h2>
                                </div>
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
                                                    <span className="structure-amount">
                                                        <IndianRupee size={14} />
                                                        {item.amount.toLocaleString()}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="annual-total-card">
                                <span>Total Annual Fee</span>
                                <span className="total-value">
                                    <IndianRupee size={20} />
                                    {feeStructure.totalAnnual.toLocaleString()}
                                </span>
                            </div>

                            <div className="note-card">
                                <AlertCircle size={18} />
                                <p>Fees can be paid in two installments. Additional charges may apply for late payments.</p>
                            </div>
                        </>
                    )}

                    {/* Details Modal */}
                    {showDetailsModal && selectedPayment && (
                        // Modal Component
                        <div className="modal-overlay" onClick={handleCloseModal}>
                            <div className="modal-content-f" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-header-f">
                                    <h3>Payment Details</h3>
                                    <button className="modal-close-f" onClick={handleCloseModal}>
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="modal-body-f">
                                    <div className="modal-info-grid">
                                        <div className="modal-info-item">
                                            <span className="modal-label">Session</span>
                                            <span className="modal-value">{selectedPayment.session}</span>
                                        </div>
                                        <div className="modal-info-item">
                                            <span className="modal-label">Receipt No.</span>
                                            <span className="modal-value">{selectedPayment.receiptNo}</span>
                                        </div>
                                        <div className="modal-info-item">
                                            <span className="modal-label">Payment Date</span>
                                            <span className="modal-value">{selectedPayment.date}</span>
                                        </div>
                                        <div className="modal-info-item">
                                            <span className="modal-label">Payment Mode</span>
                                            <span className="modal-value">{selectedPayment.paymentMode}</span>
                                        </div>
                                        <div className="modal-info-item">
                                            <span className="modal-label">Amount Paid</span>
                                            <span className="modal-value highlight">
                                                <IndianRupee size={12} />
                                                {selectedPayment.amountPaid.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="modal-info-item">
                                            <span className="modal-label">Total Amount</span>
                                            <span className="modal-value">
                                                <IndianRupee size={12} />
                                                {selectedPayment.amountToPay.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="modal-breakdown">
                                        <h4>Fee Breakdown</h4>
                                        {selectedPayment.breakdown.map((item, idx) => (
                                            <div className="modal-breakdown-row" key={idx}>
                                                <span>{item.name}</span>
                                                <span>
                                                    <IndianRupee size={10} />
                                                    {item.amount.toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button className="btn-modal-download" onClick={handleDownloadReceipt}>
                                        <Download size={14} />
                                        Download
                                    </button>
                                    <button className="btn-modal-print" onClick={handlePrintReceipt}>
                                        <Printer size={14} />
                                        Print
                                    </button>
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