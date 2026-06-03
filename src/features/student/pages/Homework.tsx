import React, { useState } from 'react';
import {
  BookOpen, User, CalendarDays, Clock, ArrowLeft,
  Heart, MessageCircle, Paperclip, Pin, Search, X, Download, Eye,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/layout/Header/Header';
import StudentSidebar from '../../components/StudentSidebar';
import Footer from '../../components/layout/Footer/Footer';
import '../../styling/homework.css';

const Homework = () => {
    const [timeFilter, setTimeFilter] = useState("Today");
    const [statusFilter, setStatusFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const [homeworkData, setHomeworkData] = useState([
        {
            id: 1,
            subject: "Mathematics",
            teacher: "Mr. Khan",
            desc: "Complete exercise 5.2 from page 78. Solve questions 1 to 10.",
            assigned: "16 Apr 2026",
            deadline: "18 Apr 2026",
            status: "Pending",
            assignedDate: "2026-04-16",
            likes: 5,
            comments: 3,
            isPinned: false,
            isLiked: false,
            showCommentBox: false,
            showAttachmentBox: false,
            commentText: "",
            commentList: [],
            attachments: [
                {
                    id: 101,
                    name: "exercise_guide.pdf",
                    size: "245 KB",
                    type: "application/pdf",
                    date: "16 Apr 2026",
                    // url: "/files/exercise_guide.pdf"  // Server path
                    url: "/files/student.jpg"
                },
                {
                    id: 102,
                    name: "formula_sheet.jpg",
                    size: "180 KB",
                    type: "image/jpeg",
                    date: "15 Apr 2026",
                    url: "/files/math-formula.jpg"
                }
            ]
        },
        {
            id: 2,
            subject: "Science",
            teacher: "Mrs. Siddiqui",
            desc: "Write notes on Photosynthesis and draw diagram.",
            assigned: "15 Apr 2026",
            deadline: "17 Apr 2026",
            status: "Pending",
            assignedDate: "2026-04-15",
            likes: 8,
            comments: 5,
            isPinned: false,
            isLiked: false,
            showCommentBox: false,
            showAttachmentBox: false,
            commentText: "",
            commentList: [],
            attachments: [
                {
                    id: 201,
                    name: "photosynthesis_notes.docx",
                    size: "320 KB",
                    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    date: "14 Apr 2026",
                    url: "/files/photosynthesis_notes.docx"
                }
            ]
        },
        {
            id: 3,
            subject: "English",
            teacher: "Khalid Ahmad",
            desc: "Read chapter 4 and write summary.",
            assigned: "14 Apr 2026",
            deadline: "16 Apr 2026",
            status: "Completed",
            assignedDate: "2026-04-14",
            likes: 3,
            comments: 1,
            isPinned: false,
            isLiked: false,
            showCommentBox: false,
            showAttachmentBox: false,
            commentText: "",
            commentList: [],
            attachments: []
        },
        {
            id: 4,
            subject: "Urdu",
            teacher: "Ms. Fatima",
            desc: "Write essay on 'Allama Iqbal'.",
            assigned: "16 Apr 2026",
            deadline: "19 Apr 2026",
            status: "Pending",
            assignedDate: "2026-04-16",
            likes: 4,
            comments: 2,
            isPinned: false,
            isLiked: false,
            showCommentBox: false,
            showAttachmentBox: false,
            commentText: "",
            commentList: [],
            attachments: [
                {
                    id: 401,
                    name: "essay_reference.pdf",
                    size: "500 KB",
                    type: "application/pdf",
                    date: "16 Apr 2026",
                    url: "/files/essay_reference.pdf"
                }
            ]
        },
        {
            id: 5,
            subject: "Computer",
            teacher: "Sir Ahmed",
            desc: "Create a simple HTML page.",
            assigned: "13 Apr 2026",
            deadline: "15 Apr 2026",
            status: "Overdue",
            assignedDate: "2026-04-13",
            likes: 2,
            comments: 0,
            isPinned: false,
            isLiked: false,
            showCommentBox: false,
            showAttachmentBox: false,
            commentText: "",
            commentList: [],
            attachments: [
                {
                    id: 501,
                    name: "html_template.zip",
                    size: "1.2 MB",
                    type: "application/zip",
                    date: "13 Apr 2026",
                    url: "/files/html_template.zip"
                }
            ]
        },
        {
            id: 6,
            subject: "Physics",
            teacher: "Dr. Sharma",
            desc: "Solve numerical problems from chapter 3.",
            assigned: "16 Apr 2026",
            deadline: "20 Apr 2026",
            status: "Completed",
            assignedDate: "2026-04-16",
            likes: 6,
            comments: 4,
            isPinned: false,
            isLiked: false,
            showCommentBox: false,
            showAttachmentBox: false,
            commentText: "",
            commentList: [],
            attachments: [
                {
                    id: 601,
                    name: "chapter3_problems.pdf",
                    size: "780 KB",
                    type: "application/pdf",
                    date: "16 Apr 2026",
                    url: "/files/chapter3_problems.pdf"
                },
                {
                    id: 602,
                    name: "solution_guide.pdf",
                    size: "450 KB",
                    type: "application/pdf",
                    date: "17 Apr 2026",
                    url: "/files/solution_guide.pdf"
                },
                {
                    id: 603,
                    name: "formula_reference.png",
                    size: "290 KB",
                    type: "image/png",
                    date: "18 Apr 2026",
                    url: "/files/formula_reference.png"
                }
            ]
        },
        {
            id: 7,
            subject: "Chemistry",
            teacher: "Mrs. Gupta",
            desc: "Complete lab report of experiment 5.",
            assigned: "12 Apr 2026",
            deadline: "16 Apr 2026",
            status: "Overdue",
            assignedDate: "2026-04-12",
            likes: 1,
            comments: 1,
            isPinned: false,
            isLiked: false,
            showCommentBox: false,
            showAttachmentBox: false,
            commentText: "",
            commentList: [],
            attachments: [
                {
                    id: 701,
                    name: "lab_report_template.docx",
                    size: "150 KB",
                    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    date: "12 Apr 2026",
                    url: "/files/lab_report_template.docx"
                },
                {
                    id: 702,
                    name: "experiment_5_data.xlsx",
                    size: "95 KB",
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    date: "13 Apr 2026",
                    url: "/files/experiment_5_data.xlsx"
                }
            ]
        }
    ]);

    const getDateString = (date) => {
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

    const handleTimeFilterChange = (filter) => {
        setTimeFilter(filter);
        setStatusFilter("All");
    };

    const handleLikeToggle = (id) => {
        setHomeworkData(prevData =>
            prevData.map(hw => {
                if (hw.id === id) {
                    return {
                        ...hw,
                        isLiked: !hw.isLiked,
                        likes: hw.isLiked ? hw.likes - 1 : hw.likes + 1
                    };
                }
                return hw;
            })
        );
    };

    const handlePinToggle = (id) => {
        setHomeworkData(prevData =>
            prevData.map(hw => {
                if (hw.id === id) {
                    return {
                        ...hw,
                        isPinned: !hw.isPinned
                    };
                }
                return hw;
            })
        );
    };

    const handleCommentToggle = (id) => {
        setHomeworkData(prevData =>
            prevData.map(hw => {
                if (hw.id === id) {
                    return {
                        ...hw,
                        showCommentBox: !hw.showCommentBox,
                        showAttachmentBox: false
                    };
                }
                return { ...hw, showCommentBox: false, showAttachmentBox: false };
            })
        );
    };

    const handleCommentTextChange = (id, text) => {
        setHomeworkData(prevData =>
            prevData.map(hw => {
                if (hw.id === id) {
                    return {
                        ...hw,
                        commentText: text
                    };
                }
                return hw;
            })
        );
    };

    const handleCommentSubmit = (id) => {
        setHomeworkData(prevData =>
            prevData.map(hw => {
                if (hw.id === id && hw.commentText.trim()) {
                    return {
                        ...hw,
                        commentList: [...hw.commentList, { text: hw.commentText, date: new Date().toLocaleDateString() }],
                        comments: hw.comments + 1,
                        commentText: "",
                        showCommentBox: false
                    };
                }
                return hw;
            })
        );
    };

    const handleAttachmentToggle = (id) => {
        setHomeworkData(prevData =>
            prevData.map(hw => {
                if (hw.id === id) {
                    return {
                        ...hw,
                        showAttachmentBox: !hw.showAttachmentBox,
                        showCommentBox: false
                    };
                }
                return { ...hw, showAttachmentBox: false, showCommentBox: false };
            })
        );
    };

    // 🔥 IMPROVED: Proper file download function
    const handleDownloadAttachment = async (attachment) => {
        try {
            // Option 1: Direct download link (simplest - for files in public folder)
            const link = document.createElement('a');
            link.href = attachment.url;
            link.download = attachment.name;
            link.target = '_blank';  // Opens in new tab if download doesn't work
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error('Download failed:', error);
            alert('File download failed. Please try again.');
        }
    };

    // 🔥 NEW: Preview/Open file in new tab
    const handlePreviewAttachment = (attachment) => {
        // For PDFs and images, open in new tab for preview
        if (attachment.type.includes('pdf') || attachment.type.startsWith('image/')) {
            window.open(attachment.url, '_blank');
        } else {
            // For other files, trigger download
            handleDownloadAttachment(attachment);
        }
    };

    const getFileIcon = (type) => {
        if (type.startsWith('image/')) return '🖼️';
        if (type.includes('pdf')) return '📄';
        if (type.includes('word') || type.includes('document')) return '📝';
        if (type.includes('sheet') || type.includes('excel')) return '📊';
        if (type.includes('zip') || type.includes('rar')) return '📦';
        if (type.includes('presentation') || type.includes('powerpoint')) return '📽️';
        if (type.startsWith('video/')) return '🎥';
        if (type.startsWith('audio/')) return '🎵';
        return '📎';
    };

    const getFilteredAndSortedHomework = () => {
        let filtered = homeworkData.filter(hw => {
            let timeMatch = true;
            if (timeFilter === "Today") timeMatch = hw.assignedDate === todayStr;
            else if (timeFilter === "Yesterday") timeMatch = hw.assignedDate === yesterdayStr;
            else if (timeFilter === "Last 7 Days") timeMatch = hw.assignedDate >= last7DaysStr;

            let statusMatch = statusFilter === "All" || hw.status === statusFilter;

            let searchMatch = true;
            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase();
                searchMatch =
                    hw.subject.toLowerCase().includes(query) ||
                    hw.teacher.toLowerCase().includes(query) ||
                    hw.desc.toLowerCase().includes(query) ||
                    hw.status.toLowerCase().includes(query);
            }

            return timeMatch && statusMatch && searchMatch;
        });

        return filtered.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
    };

    const filteredHomework = getFilteredAndSortedHomework();

    const [open, setOpen] = useState(false);

    const getTimeFilterCount = (filter) => {
        return homeworkData.filter(hw => {
            if (filter === "Today") return hw.assignedDate === todayStr;
            if (filter === "Yesterday") return hw.assignedDate === yesterdayStr;
            if (filter === "Last 7 Days") return hw.assignedDate >= last7DaysStr;
            return true;
        }).length;
    };

    return (
        <div>
            <Header open={open} setOpen={setOpen} />

            <div className="hw-layout">
                <Sidebar open={open} />

                <div className="hw-content">
                    <div className="hw-back-nav" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                        <span>Back to Dashboard</span>
                    </div>

                    <h2>Homework</h2>

                    <div className="hw-search-container">
                        <div className="hw-search-bar">
                            <Search size={18} className="hw-search-icon" />
                            <input
                                type="text"
                                placeholder="Search homework by subject, teacher, description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="hw-search-input"
                            />
                            {searchQuery && (
                                <X size={18} className="hw-search-clear" onClick={() => setSearchQuery("")} />
                            )}
                        </div>
                    </div>

                    <div className="hw-filter hw-time-filter">
                        <button className={timeFilter === "All" ? "hw-active" : ""} onClick={() => handleTimeFilterChange("All")}>
                            All <span className="hw-filter-count">{getTimeFilterCount("All")}</span>
                        </button>
                        <button className={timeFilter === "Today" ? "hw-active" : ""} onClick={() => handleTimeFilterChange("Today")}>
                            Today <span className="hw-filter-count">{getTimeFilterCount("Today")}</span>
                        </button>
                        <button className={timeFilter === "Yesterday" ? "hw-active" : ""} onClick={() => handleTimeFilterChange("Yesterday")}>
                            Yesterday <span className="hw-filter-count">{getTimeFilterCount("Yesterday")}</span>
                        </button>
                        <button className={timeFilter === "Last 7 Days" ? "hw-active" : ""} onClick={() => handleTimeFilterChange("Last 7 Days")}>
                            Last 7 Days <span className="hw-filter-count">{getTimeFilterCount("Last 7 Days")}</span>
                        </button>
                    </div>

                    <div className="hw-filter hw-status-filter">
                        <button className={statusFilter === "All" ? "hw-active" : ""} onClick={() => setStatusFilter("All")}>All Status</button>
                        <button className={statusFilter === "Completed" ? "hw-active" : ""} onClick={() => setStatusFilter("Completed")}>Completed</button>
                        <button className={statusFilter === "Pending" ? "hw-active" : ""} onClick={() => setStatusFilter("Pending")}>Pending</button>
                        <button className={statusFilter === "Overdue" ? "hw-active" : ""} onClick={() => setStatusFilter("Overdue")}>Overdue</button>
                    </div>

                    <div className="hw-results-info">
                        Showing {filteredHomework.length} homework
                        {searchQuery && ` for "${searchQuery}"`}
                        {timeFilter !== "All" && ` for ${timeFilter}`}
                        {statusFilter !== "All" && ` • ${statusFilter}`}
                    </div>

                    <div className="hw-homework-container">
                        {filteredHomework.length > 0 ? (
                            filteredHomework.map((hw) => (
                                <div className={`hw-homework-card ${hw.isPinned ? 'hw-pinned' : ''}`} key={hw.id}>
                                    {hw.isPinned && (
                                        <div className="hw-pin-badge">
                                            <Pin size={12} /> Pinned
                                        </div>
                                    )}

                                    <div className="hw-header">
                                        <BookOpen className="hw-icon" />
                                        <div>
                                            <h3>{hw.subject}</h3>
                                            <p className="hw-teacher"><User size={14} /> {hw.teacher}</p>
                                        </div>
                                        <span className={`hw-status-badge ${hw.status.toLowerCase()}`}>{hw.status}</span>
                                    </div>

                                    <p className="hw-desc">{hw.desc}</p>

                                    <div className="hw-meta">
                                        <div className="hw-meta-item">
                                            <CalendarDays size={16} />
                                            <span>Assigned: {hw.assigned}</span>
                                        </div>
                                        <div className="hw-meta-item">
                                            <Clock size={16} />
                                            <span>Deadline: {hw.deadline}</span>
                                        </div>
                                    </div>

                                    <div className="hw-actions">
                                        <button
                                            className={`hw-action-btn ${hw.isLiked ? 'hw-liked' : ''}`}
                                            onClick={() => handleLikeToggle(hw.id)}
                                            title="Like"
                                        >
                                            <Heart size={16} fill={hw.isLiked ? 'currentColor' : 'none'} />
                                            <span>{hw.likes}</span>
                                        </button>
                                        <button
                                            className="hw-action-btn"
                                            onClick={() => handleCommentToggle(hw.id)}
                                            title="Comment"
                                        >
                                            <MessageCircle size={16} />
                                            <span>{hw.comments}</span>
                                        </button>
                                        <button
                                            className={`hw-action-btn ${hw.showAttachmentBox ? 'hw-attachment-active' : ''}`}
                                            onClick={() => handleAttachmentToggle(hw.id)}
                                            title="View Attachments"
                                        >
                                            <Paperclip size={16} />
                                            <span>{hw.attachments.length}</span>
                                        </button>
                                        <button
                                            className={`hw-action-btn hw-pin-btn ${hw.isPinned ? 'hw-pinned-active' : ''}`}
                                            onClick={() => handlePinToggle(hw.id)}
                                            title={hw.isPinned ? "Unpin" : "Pin"}
                                        >
                                            <Pin size={16} fill={hw.isPinned ? 'currentColor' : 'none'} />
                                        </button>
                                    </div>

                                    {hw.showCommentBox && (
                                        <div className="hw-comment-section">
                                            <div className="hw-comment-input-wrapper">
                                                <input
                                                    type="text"
                                                    placeholder="Write a comment..."
                                                    value={hw.commentText}
                                                    onChange={(e) => handleCommentTextChange(hw.id, e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(hw.id)}
                                                    className="hw-comment-input"
                                                />
                                                <button className="hw-comment-submit" onClick={() => handleCommentSubmit(hw.id)}>Post</button>
                                            </div>
                                            {hw.commentList.length > 0 && (
                                                <div className="hw-comment-list">
                                                    {hw.commentList.map((comment, idx) => (
                                                        <div key={idx} className="hw-comment-item">
                                                            <p className="hw-comment-text">{comment.text}</p>
                                                            <span className="hw-comment-date">{comment.date}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {hw.showAttachmentBox && (
                                        <div className="hw-attachment-section">
                                            <div className="hw-attachment-header">
                                                <h4>📎 Attachments ({hw.attachments.length})</h4>
                                            </div>

                                            {hw.attachments.length > 0 ? (
                                                <div className="hw-attachment-list">
                                                    {hw.attachments.map((attachment) => (
                                                        <div key={attachment.id} className="hw-attachment-item">
                                                            <div className="hw-attachment-info">
                                                                <span className="hw-file-icon">{getFileIcon(attachment.type)}</span>
                                                                <div className="hw-file-details">
                                                                    <p className="hw-file-name">{attachment.name}</p>
                                                                    <span className="hw-file-meta">{attachment.size} • {attachment.date}</span>
                                                                </div>
                                                            </div>
                                                            <div className="hw-attachment-actions">
                                                                {/* Preview Button (for PDFs & Images) */}
                                                                {(attachment.type.includes('pdf') || attachment.type.startsWith('image/')) && (
                                                                    <button
                                                                        className="hw-preview-btn"
                                                                        onClick={() => handlePreviewAttachment(attachment)}
                                                                        title="Preview"
                                                                    >
                                                                        <Eye size={14} />
                                                                    </button>
                                                                )}
                                                                {/* Download Button */}
                                                                <button
                                                                    className="hw-download-btn"
                                                                    onClick={() => handleDownloadAttachment(attachment)}
                                                                    title="Download"
                                                                >
                                                                    <Download size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="hw-no-attachments">
                                                    <Paperclip size={20} />
                                                    <p>No attachments available</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="hw-no-homework">
                                <BookOpen size={40} strokeWidth={1} />
                                <p>No homework found</p>
                                <span>Try changing the filters</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Homework;