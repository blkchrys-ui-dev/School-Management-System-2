import { useState } from "react";
import {
    BookOpen, User, CalendarDays, Clock, ArrowLeft,
    Plus, X, Upload, FileText, AlertCircle
} from "lucide-react";
import Header from "../../../components/layout/Header/Header";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import Footer from "../../../components/layout/Footer/Footer";
import '../styles/addhomework.css';
import { useNavigate } from "react-router-dom";

const AddHomework = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        subject: "",
        teacher: "",
        description: "",
        assignedDate: "",
        deadline: "",
        class: "",
        section: "",
        maxMarks: "",
        attachments: []
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    // Subject options
    const subjects = [
        "Mathematics", "Science", "English", "Urdu", "Computer",
        "Physics", "Chemistry", "Biology", "History", "Geography",
        "Islamic Studies", "Arabic", "Political Science", "Art", "Physical Education"
    ];

    // Class options
    const classes = [
        "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
        "Class 11", "Class 12"
    ];

    // Section options
    const sections = ["A", "B", "C", "D", "E"];

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    // Handle subject selection
    const handleSubjectSelect = (subject) => {
        setFormData(prev => ({
            ...prev,
            subject
        }));
        if (errors.subject) {
            setErrors(prev => ({
                ...prev,
                subject: ""
            }));
        }
    };

    // Handle file upload
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        addFiles(files);
    };

    const addFiles = (files) => {
        const newFiles = files.map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            size: formatFileSize(file.size),
            type: file.type,
            file: file,
            date: new Date().toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })
        }));

        setFormData(prev => ({
            ...prev,
            attachments: [...prev.attachments, ...newFiles]
        }));
    };

    // Format file size
    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    // Remove attachment
    const removeAttachment = (id) => {
        setFormData(prev => ({
            ...prev,
            attachments: prev.attachments.filter(file => file.id !== id)
        }));
    };

    // Drag and drop handlers
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            addFiles(Array.from(e.dataTransfer.files));
        }
    };

    // Form validation
    const validateForm = () => {
        const newErrors = {};

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
        }
        if (!formData.teacher.trim()) {
            newErrors.teacher = "Teacher name is required";
        }
        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        } else if (formData.description.trim().length < 10) {
            newErrors.description = "Description must be at least 10 characters";
        }
        if (!formData.class) {
            newErrors.class = "Class is required";
        }
        if (!formData.section) {
            newErrors.section = "Section is required";
        }
        if (!formData.assignedDate) {
            newErrors.assignedDate = "Assigned date is required";
        }
        if (!formData.deadline) {
            newErrors.deadline = "Deadline is required";
        } else if (formData.assignedDate && formData.deadline < formData.assignedDate) {
            newErrors.deadline = "Deadline cannot be before assigned date";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Create homework object
            const newHomework = {
                id: Date.now(),
                subject: formData.subject,
                teacher: formData.teacher,
                desc: formData.description,
                class: formData.class,
                section: formData.section,
                maxMarks: formData.maxMarks || "N/A",
                assigned: new Date(formData.assignedDate).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                }),
                deadline: new Date(formData.deadline).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                }),
                assignedDate: formData.assignedDate,
                status: "Pending",
                attachments: formData.attachments,
                likes: 0,
                comments: 0,
                isPinned: false,
                isLiked: false,
                showCommentBox: false,
                showAttachmentBox: false,
                commentText: "",
                commentList: []
            };

            console.log("New homework added:", newHomework);
            setSubmitSuccess(true);

            // Reset form after 2 seconds
            setTimeout(() => {
                setFormData({
                    subject: "",
                    teacher: "",
                    description: "",
                    assignedDate: "",
                    deadline: "",
                    class: "",
                    section: "",
                    maxMarks: "",
                    attachments: []
                });
                setSubmitSuccess(false);
            }, 2000);

        } catch (error) {
            console.error("Error adding homework:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle reset
    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset the form? All data will be lost.")) {
            setFormData({
                subject: "",
                teacher: "",
                description: "",
                assignedDate: "",
                deadline: "",
                class: "",
                section: "",
                maxMarks: "",
                attachments: []
            });
            setErrors({});
        }
    };

    return (
        <div>
            <Header open={open} setOpen={setOpen} />

            <div className="hw-layout">
                <Sidebar open={open} />

                <div className="hw-content">
                    {/* Back Navigation */}
                    <div className="hw-back-nav" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                        <span>Back to Dashboard</span>
                    </div>

                    {/* Page Header */}
                    <div className="hw-page-header">
                        <h2>Add New Homework</h2>
                        <p>Create and assign homework to your students</p>
                    </div>

                    {/* Success Message */}
                    {submitSuccess && (
                        <div className="hw-success-message">
                            <div className="hw-success-icon">✓</div>
                            <div className="hw-success-text">
                                <h4>Homework Added Successfully!</h4>
                                <p>The homework has been assigned to students.</p>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form className="hw-form" onSubmit={handleSubmit}>
                        <div className="hw-form-grid">
                            {/* Left Column */}
                            <div className="hw-form-column">
                                {/* Subject Selection */}
                                <div className="hw-form-group">
                                    <label className="hw-form-label">
                                        <BookOpen size={16} />
                                        Subject <span className="hw-required">*</span>
                                    </label>
                                    <div className="hw-subject-grid">
                                        {subjects.map((subject, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                className={`hw-subject-chip ${formData.subject === subject ? 'hw-subject-active' : ''}`}
                                                onClick={() => handleSubjectSelect(subject)}
                                            >
                                                {subject}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.subject && <span className="hw-error-text"><AlertCircle size={12} /> {errors.subject}</span>}
                                </div>

                                {/* Teacher Name */}
                                <div className="hw-form-group">
                                    <label className="hw-form-label">
                                        <User size={16} />
                                        Teacher Name <span className="hw-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="teacher"
                                        value={formData.teacher}
                                        onChange={handleInputChange}
                                        className={`hw-form-input ${errors.teacher ? 'hw-input-error' : ''}`}
                                        placeholder="Enter teacher name"
                                    />
                                    {errors.teacher && <span className="hw-error-text"><AlertCircle size={12} /> {errors.teacher}</span>}
                                </div>

                                {/* Description */}
                                <div className="hw-form-group">
                                    <label className="hw-form-label">
                                        <FileText size={16} />
                                        Description <span className="hw-required">*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className={`hw-form-textarea ${errors.description ? 'hw-input-error' : ''}`}
                                        placeholder="Enter homework description, instructions, and requirements..."
                                        rows="5"
                                    />
                                    <span className="hw-char-count">{formData.description.length} characters</span>
                                    {errors.description && <span className="hw-error-text"><AlertCircle size={12} /> {errors.description}</span>}
                                </div>

                                {/* File Attachments */}
                                <div className="hw-form-group">
                                    <label className="hw-form-label">
                                        <Upload size={16} />
                                        Attachments
                                    </label>
                                    <div
                                        className={`hw-file-upload ${dragActive ? 'hw-drag-active' : ''}`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                    >
                                        <input
                                            type="file"
                                            id="file-upload"
                                            multiple
                                            onChange={handleFileUpload}
                                            style={{ display: 'none' }}
                                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.zip"
                                        />
                                        <label htmlFor="file-upload" className="hw-file-upload-label">
                                            <Upload size={24} />
                                            <div className="hw-upload-text">
                                                <span>Drag & drop files here</span>
                                                <span>or click to browse</span>
                                            </div>
                                            <span className="hw-upload-hint">PDF, DOC, Images, ZIP (Max 10MB each)</span>
                                        </label>
                                    </div>

                                    {/* File List */}
                                    {formData.attachments.length > 0 && (
                                        <div className="hw-file-list">
                                            {formData.attachments.map((file) => (
                                                <div key={file.id} className="hw-file-item">
                                                    <div className="hw-file-info">
                                                        <span className="hw-file-icon">📎</span>
                                                        <div className="hw-file-details">
                                                            <span className="hw-file-name">{file.name}</span>
                                                            <span className="hw-file-size">{file.size}</span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="hw-file-remove"
                                                        onClick={() => removeAttachment(file.id)}
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="hw-form-column">
                                {/* Class & Section */}
                                <div className="hw-form-row">
                                    <div className="hw-form-group hw-form-half">
                                        <label className="hw-form-label">
                                            Class <span className="hw-required">*</span>
                                        </label>
                                        <select
                                            name="class"
                                            value={formData.class}
                                            onChange={handleInputChange}
                                            className={`hw-form-select ${errors.class ? 'hw-input-error' : ''}`}
                                        >
                                            <option value="">Select Class</option>
                                            {classes.map((cls, index) => (
                                                <option key={index} value={cls}>{cls}</option>
                                            ))}
                                        </select>
                                        {errors.class && <span className="hw-error-text"><AlertCircle size={12} /> {errors.class}</span>}
                                    </div>

                                    <div className="hw-form-group hw-form-half">
                                        <label className="hw-form-label">
                                            Section <span className="hw-required">*</span>
                                        </label>
                                        <select
                                            name="section"
                                            value={formData.section}
                                            onChange={handleInputChange}
                                            className={`hw-form-select ${errors.section ? 'hw-input-error' : ''}`}
                                        >
                                            <option value="">Select Section</option>
                                            {sections.map((sec, index) => (
                                                <option key={index} value={sec}>Section {sec}</option>
                                            ))}
                                        </select>
                                        {errors.section && <span className="hw-error-text"><AlertCircle size={12} /> {errors.section}</span>}
                                    </div>
                                </div>

                                {/* Maximum Marks */}
                                <div className="hw-form-group">
                                    <label className="hw-form-label">
                                        Maximum Marks
                                    </label>
                                    <input
                                        type="number"
                                        name="maxMarks"
                                        value={formData.maxMarks}
                                        onChange={handleInputChange}
                                        className="hw-form-input"
                                        placeholder="e.g., 100"
                                        min="1"
                                        max="500"
                                    />
                                </div>

                                {/* Dates */}
                                <div className="hw-form-row">
                                    <div className="hw-form-group hw-form-half">
                                        <label className="hw-form-label">
                                            <CalendarDays size={16} />
                                            Assigned Date <span className="hw-required">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="assignedDate"
                                            value={formData.assignedDate}
                                            onChange={handleInputChange}
                                            className={`hw-form-input ${errors.assignedDate ? 'hw-input-error' : ''}`}
                                        />
                                        {errors.assignedDate && <span className="hw-error-text"><AlertCircle size={12} /> {errors.assignedDate}</span>}
                                    </div>

                                    <div className="hw-form-group hw-form-half">
                                        <label className="hw-form-label">
                                            <Clock size={16} />
                                            Deadline <span className="hw-required">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="deadline"
                                            value={formData.deadline}
                                            onChange={handleInputChange}
                                            className={`hw-form-input ${errors.deadline ? 'hw-input-error' : ''}`}
                                            min={formData.assignedDate || new Date().toISOString().split('T')[0]}
                                        />
                                        {errors.deadline && <span className="hw-error-text"><AlertCircle size={12} /> {errors.deadline}</span>}
                                    </div>
                                </div>

                                {/* Summary Card */}
                                <div className="hw-summary-card">
                                    <h3>Assignment Summary</h3>
                                    <div className="hw-summary-item">
                                        <span>Subject:</span>
                                        <span className="hw-summary-value">{formData.subject || "—"}</span>
                                    </div>
                                    <div className="hw-summary-item">
                                        <span>Teacher:</span>
                                        <span className="hw-summary-value">{formData.teacher || "—"}</span>
                                    </div>
                                    <div className="hw-summary-item">
                                        <span>Class:</span>
                                        <span className="hw-summary-value">
                                            {formData.class && formData.section
                                                ? `${formData.class} - Section ${formData.section}`
                                                : "—"}
                                        </span>
                                    </div>
                                    <div className="hw-summary-item">
                                        <span>Assigned:</span>
                                        <span className="hw-summary-value">
                                            {formData.assignedDate
                                                ? new Date(formData.assignedDate).toLocaleDateString('en-US', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })
                                                : "—"}
                                        </span>
                                    </div>
                                    <div className="hw-summary-item">
                                        <span>Deadline:</span>
                                        <span className="hw-summary-value">
                                            {formData.deadline
                                                ? new Date(formData.deadline).toLocaleDateString('en-US', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })
                                                : "—"}
                                        </span>
                                    </div>
                                    <div className="hw-summary-item">
                                        <span>Attachments:</span>
                                        <span className="hw-summary-value">{formData.attachments.length} file(s)</span>
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="hw-form-actions">
                                    <button
                                        type="button"
                                        className="hw-btn hw-btn-reset"
                                        onClick={handleReset}
                                        disabled={isSubmitting}
                                    >
                                        <X size={16} />
                                        Reset
                                    </button>
                                    <button
                                        type="submit"
                                        className="hw-btn hw-btn-submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="hw-spinner"></span>
                                                Adding...
                                            </>
                                        ) : (
                                            <>
                                                <Plus size={16} />
                                                Add Homework
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddHomework;