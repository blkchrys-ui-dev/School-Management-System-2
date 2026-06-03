import {
    ArrowLeft,
    UserPlus,
    School,
    GraduationCap,
    CalendarDays,
    Droplets,
    Hash,
    Save,
    Trash2,
    AlertCircle,
} from "lucide-react";
import Header from "../../../components/layout/Header/Header";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import Footer from "../../../components/layout/Footer/Footer";
import "../styles/editstudentprofile.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const EditStudentProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get student ID from URL params
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        fatherName: "",
        motherName: "",
        class: "",
        section: "",
        rollNumber: "",
        dateOfBirth: "",
        bloodGroup: "",
        admissionNo: "",
        gender: "",
    });

    // Class options
    const classOptions = [
        "Nursery",
        "LKG",
        "UKG",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
    ];

    // Section options
    const sectionOptions = ["A", "B", "C", "D", "E"];

    // Blood group options
    const bloodGroupOptions = [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
    ];

    // Gender options
    const genderOptions = ["Male", "Female", "Other"];

    // Simulate fetching student data from API
    useEffect(() => {
        const fetchStudentData = async () => {
            setLoading(true);
            setError(null);

            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 800));

            try {
                // Mock student data - in real app, fetch from backend using the id
                // For demo purposes, we'll return different mock data based on id
                const mockStudents = {
                    "1": {
                        firstName: "Rahul",
                        lastName: "Kumar",
                        fatherName: "Rajesh Kumar",
                        motherName: "Sunita Devi",
                        class: "8",
                        section: "B",
                        rollNumber: "24",
                        dateOfBirth: "2010-05-15",
                        bloodGroup: "B+",
                        admissionNo: "ADM-2024-1234",
                        gender: "Male",
                    },
                    "2": {
                        firstName: "Priya",
                        lastName: "Sharma",
                        fatherName: "Amit Sharma",
                        motherName: "Neha Sharma",
                        class: "10",
                        section: "A",
                        rollNumber: "05",
                        dateOfBirth: "2008-11-22",
                        bloodGroup: "O+",
                        admissionNo: "ADM-2023-5678",
                        gender: "Female",
                    },
                };

                const student = mockStudents[id];

                if (student) {
                    setFormData(student);
                } else {
                    // Default mock data if id not found
                    setFormData({
                        firstName: "Demo",
                        lastName: "Student",
                        fatherName: "Demo Father",
                        motherName: "Demo Mother",
                        class: "5",
                        section: "C",
                        rollNumber: "12",
                        dateOfBirth: "2013-03-10",
                        bloodGroup: "A+",
                        admissionNo: `ADM-${new Date().getFullYear()}-${Math.floor(
                            1000 + Math.random() * 9000
                        )}`,
                        gender: "Male",
                    });
                }
            } catch (err) {
                setError("Failed to load student data. Please try again.");
                console.error("Error fetching student:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, [id]);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Generate new admission number (if admin wants to change it)
    const generateAdmissionNo = () => {
        const year = new Date().getFullYear();
        const random = Math.floor(1000 + Math.random() * 9000);
        const newAdmissionNo = `ADM-${year}-${random}`;
        setFormData((prev) => ({
            ...prev,
            admissionNo: newAdmissionNo,
        }));
    };

    // Handle form submission (update student)
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        const requiredFields = [
            "firstName",
            "fatherName",
            "motherName",
            "class",
            "section",
            "rollNumber",
            "dateOfBirth",
            "gender",
        ];

        const emptyFields = requiredFields.filter((field) => !formData[field]);

        if (emptyFields.length > 0) {
            alert(`Please fill all required fields: ${emptyFields.join(", ")}`);
            return;
        }

        // Prepare updated student data
        const updatedStudentData = {
            ...formData,
            fullName: `${formData.firstName} ${formData.lastName}`.trim(),
            lastUpdated: new Date().toISOString(),
            studentId: id,
        };

        console.log("Student updated:", updatedStudentData);

        // Here you would typically:
        // 1. Send to backend API for update
        // 2. Update state management
        // 3. Redirect to student list or profile

        alert(`Student ${updatedStudentData.fullName} updated successfully!`);

        // Navigate back to student list/dashboard
        navigate(-1);
    };

    // Handle delete student
    const handleDelete = () => {
        if (
            window.confirm(
                `Are you sure you want to delete ${formData.firstName} ${formData.lastName}? This action cannot be undone.`
            )
        ) {
            console.log("Student deleted:", { studentId: id, ...formData });
            // Here you would typically call delete API
            alert("Student deleted successfully!");
            navigate("/students"); // Redirect to student list page
        }
    };

    // Handle reset (revert to original data)
    const handleReset = async () => {
        if (window.confirm("Are you sure you want to reset all unsaved changes?")) {
            setLoading(true);
            // Refetch original data
            try {
                await new Promise((resolve) => setTimeout(resolve, 500));
                // In real app, refetch from API
                window.location.reload();
            } catch (err) {
                setError("Could not reset form. Please try again.", err);
                setLoading(false);
            }
        }
    };

    // Loading state
    if (loading) {
        return (
            <div>
                <Header open={open} setOpen={setOpen} />
                <div className="layout">
                    <Sidebar open={open} />
                    <div className="content">
                        <div className="edit-student-loading">
                            <div>Loading student data...</div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="edit-student-container">
            <Header open={open} setOpen={setOpen} />

            <div className="layout">
                <Sidebar open={open} />

                <div className="content">
                    {/* Back Navigation */}
                    <div className="back-nav" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                        <span>Back to Dashboard</span>
                    </div>

                    <h2 className="edit-student-h2">Edit Student Profile</h2>
                    <p className="edit-student-subtitle">
                        Update the student's information below
                    </p>

                    {/* Error Message */}
                    {error && (
                        <div className="edit-student-error">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                            <button onClick={() => setError(null)}>Dismiss</button>
                        </div>
                    )}

                    {/* Student ID Badge (for reference) */}
                    <div className="edit-student-id-badge">
                        <span>Student Admission Number:</span>
                        <span>{formData.admissionNo || "Not assigned"}</span>
                    </div>

                    {/* Edit Student Form */}
                    <form onSubmit={handleSubmit} className="edit-student-form">
                        <div className="edit-student-form-container">
                            {/* Personal Information Section */}
                            <div className="edit-student-form-section">
                                <div className="edit-student-section-header">
                                    <UserPlus size={20} />
                                    <h3>Personal Information</h3>
                                </div>

                                <div className="edit-student-form-grid">
                                    {/* First Name */}
                                    <div className="edit-student-form-group">
                                        <label htmlFor="firstName">
                                            First Name <span className="edit-student-required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder="Enter first name"
                                            required
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div className="edit-student-form-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Enter last name"
                                        />
                                    </div>

                                    {/* Gender */}
                                    <div className="edit-student-form-group">
                                        <label htmlFor="gender">
                                            Gender <span className="edit-student-required">*</span>
                                        </label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Gender</option>
                                            {genderOptions.map((gender) => (
                                                <option key={gender} value={gender}>
                                                    {gender}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Date of Birth */}
                                    <div className="edit-student-form-group">
                                        <label htmlFor="dateOfBirth">
                                            <CalendarDays
                                                size={14}
                                                className="edit-student-label-icon"
                                            />
                                            Date of Birth <span className="edit-student-required">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    {/* Blood Group */}
                                    <div className="edit-student-form-group">
                                        <label htmlFor="bloodGroup">
                                            <Droplets
                                                size={14}
                                                className="edit-student-label-icon"
                                            />
                                            Blood Group
                                        </label>
                                        <select
                                            id="bloodGroup"
                                            name="bloodGroup"
                                            value={formData.bloodGroup}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Blood Group</option>
                                            {bloodGroupOptions.map((bg) => (
                                                <option key={bg} value={bg}>
                                                    {bg}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Parent Information Section */}
                            <div className="edit-student-form-section">
                                <div className="edit-student-section-header">
                                    <School size={20} />
                                    <h3>Parent/Guardian Information</h3>
                                </div>

                                <div className="edit-student-form-grid">
                                    {/* Father's Name */}
                                    <div className="edit-student-form-group">
                                        <label htmlFor="fatherName">
                                            Father's Name{" "}
                                            <span className="edit-student-required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="fatherName"
                                            name="fatherName"
                                            value={formData.fatherName}
                                            onChange={handleInputChange}
                                            placeholder="Enter father's name"
                                            required
                                        />
                                    </div>

                                    {/* Mother's Name */}
                                    <div className="edit-student-form-group">
                                        <label htmlFor="motherName">
                                            Mother's Name{" "}
                                            <span className="edit-student-required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="motherName"
                                            name="motherName"
                                            value={formData.motherName}
                                            onChange={handleInputChange}
                                            placeholder="Enter mother's name"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Academic Information Section */}
                            <div className="edit-student-form-section">
                                <div className="edit-student-section-header">
                                    <GraduationCap size={20} />
                                    <h3>Academic Information</h3>
                                </div>

                                <div className="edit-student-form-grid">
                                    {/* Class */}
                                    <div className="edit-student-form-group">
                                        <label htmlFor="class">
                                            Class <span className="edit-student-required">*</span>
                                        </label>
                                        <select
                                            id="class"
                                            name="class"
                                            value={formData.class}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Class</option>
                                            {classOptions.map((cls) => (
                                                <option key={cls} value={cls}>
                                                    Class {cls}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Section */}
                                    <div className="edit-student-form-group">
                                        <label htmlFor="section">
                                            Section <span className="edit-student-required">*</span>
                                        </label>
                                        <select
                                            id="section"
                                            name="section"
                                            value={formData.section}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Section</option>
                                            {sectionOptions.map((sec) => (
                                                <option key={sec} value={sec}>
                                                    Section {sec}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Roll Number */}
                                    <div className="edit-student-form-group">
                                        <label htmlFor="rollNumber">
                                            <Hash size={14} className="edit-student-label-icon" />
                                            Roll Number <span className="edit-student-required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="rollNumber"
                                            name="rollNumber"
                                            value={formData.rollNumber}
                                            onChange={handleInputChange}
                                            placeholder="Enter roll number"
                                            required
                                        />
                                    </div>

                                    {/* Admission Number */}
                                    <div className="edit-student-form-group">
                                        <label htmlFor="admissionNo">Admission No.</label>
                                        <div className="edit-student-admission-input-group">
                                            <input
                                                type="text"
                                                id="admissionNo"
                                                name="admissionNo"
                                                value={formData.admissionNo}
                                                onChange={handleInputChange}
                                                placeholder="Admission number"
                                                readOnly
                                            />
                                            <button
                                                type="button"
                                                className="edit-student-generate-btn"
                                                onClick={generateAdmissionNo}
                                                title="Generate new Admission Number"
                                            >
                                                Generate New
                                            </button>
                                        </div>
                                        <small style={{ fontSize: "11px", color: "#6b7280" }}>
                                            * Admission number is read-only, use generate to change
                                        </small>
                                    </div>
                                </div>

                                {/* Class-Section Preview */}
                                {formData.class && formData.section && (
                                    <div className="edit-student-class-section-preview">
                                        <GraduationCap size={16} />
                                        <span>
                                            Current Selection: Class {formData.class} - Section{" "}
                                            {formData.section}
                                            {formData.rollNumber &&
                                                ` | Roll No: ${formData.rollNumber}`}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="edit-student-form-actions">
                            <button
                                type="button"
                                className="edit-student-btn-delete"
                                onClick={handleDelete}
                            >
                                <Trash2 size={18} />
                                Delete Student
                            </button>
                            <button
                                type="button"
                                className="edit-student-btn-cancel"
                                onClick={handleReset}
                            >
                                Reset Changes
                            </button>
                            <button type="submit" className="edit-student-btn-submit">
                                <Save size={18} />
                                Update Student
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditStudentProfile;