import { ArrowLeft, UserPlus, School, GraduationCap, CalendarDays, Droplets, Hash } from "lucide-react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "./addstudent.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddStudent = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

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
        "Nursery", "LKG", "UKG",
        "1", "2", "3", "4", "5",
        "6", "7", "8", "9", "10",
        "11", "12"
    ];

    // Section options
    const sectionOptions = ["A", "B", "C", "D", "E"];

    // Blood group options
    const bloodGroupOptions = [
        "A+", "A-", "B+", "B-",
        "AB+", "AB-", "O+", "O-"
    ];

    // Gender options
    const genderOptions = ["Male", "Female", "Other"];

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Generate admission number
    const generateAdmissionNo = () => {
        const year = new Date().getFullYear();
        const random = Math.floor(1000 + Math.random() * 9000);
        const newAdmissionNo = `ADM-${year}-${random}`;
        setFormData(prev => ({
            ...prev,
            admissionNo: newAdmissionNo
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        const requiredFields = [
            "firstName", "fatherName", "motherName",
            "class", "section", "rollNumber",
            "dateOfBirth", "gender"
        ];

        const emptyFields = requiredFields.filter(field => !formData[field]);

        if (emptyFields.length > 0) {
            alert(`Please fill all required fields: ${emptyFields.join(", ")}`);
            return;
        }

        // Prepare student data
        const studentData = {
            ...formData,
            fullName: `${formData.firstName} ${formData.lastName}`.trim(),
            addedDate: new Date().toISOString(),
            admissionNo: formData.admissionNo || `ADM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        };

        console.log("Student added:", studentData);

        // Here you would typically:
        // 1. Send to backend API
        // 2. Save to state management
        // 3. Redirect to student list

        alert(`Student ${studentData.fullName} added successfully!`);

        // Reset form
        setFormData({
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
    };

    // Handle reset
    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset the form?")) {
            setFormData({
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
        }
    };

    return (
        <div>
            <Header open={open} setOpen={setOpen} />

            <div className="layout">
                <Sidebar open={open} />

                <div className="content">
                    {/* Back Navigation */}
                    <div className="back-nav" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                        <span>Back to Dashboard</span>
                    </div>

                    <h2 className="addstudent-h2">Add New Student</h2>
                    <p className="addstudent-subtitle">
                        Fill in the details below to register a new student
                    </p>

                    {/* Student Form */}
                    <form onSubmit={handleSubmit} className="student-form">
                        <div className="form-container">

                            {/* Personal Information Section */}
                            <div className="form-section">
                                <div className="section-header">
                                    <UserPlus size={20} />
                                    <h3>Personal Information</h3>
                                </div>

                                <div className="form-grid">
                                    {/* First Name */}
                                    <div className="form-group">
                                        <label htmlFor="firstName">
                                            First Name <span className="required">*</span>
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
                                    <div className="form-group">
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
                                    <div className="form-group">
                                        <label htmlFor="gender">
                                            Gender <span className="required">*</span>
                                        </label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Gender</option>
                                            {genderOptions.map(gender => (
                                                <option key={gender} value={gender}>{gender}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Date of Birth */}
                                    <div className="form-group">
                                        <label htmlFor="dateOfBirth">
                                            <CalendarDays size={14} className="label-icon" />
                                            Date of Birth <span className="required">*</span>
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
                                    <div className="form-group">
                                        <label htmlFor="bloodGroup">
                                            <Droplets size={14} className="label-icon" />
                                            Blood Group
                                        </label>
                                        <select
                                            id="bloodGroup"
                                            name="bloodGroup"
                                            value={formData.bloodGroup}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Blood Group</option>
                                            {bloodGroupOptions.map(bg => (
                                                <option key={bg} value={bg}>{bg}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Parent Information Section */}
                            <div className="form-section">
                                <div className="section-header">
                                    <School size={20} />
                                    <h3>Parent/Guardian Information</h3>
                                </div>

                                <div className="form-grid">
                                    {/* Father's Name */}
                                    <div className="form-group">
                                        <label htmlFor="fatherName">
                                            Father's Name <span className="required">*</span>
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
                                    <div className="form-group">
                                        <label htmlFor="motherName">
                                            Mother's Name <span className="required">*</span>
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
                            <div className="form-section">
                                <div className="section-header">
                                    <GraduationCap size={20} />
                                    <h3>Academic Information</h3>
                                </div>

                                <div className="form-grid">
                                    {/* Class */}
                                    <div className="form-group">
                                        <label htmlFor="class">
                                            Class <span className="required">*</span>
                                        </label>
                                        <select
                                            id="class"
                                            name="class"
                                            value={formData.class}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Class</option>
                                            {classOptions.map(cls => (
                                                <option key={cls} value={cls}>Class {cls}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Section */}
                                    <div className="form-group">
                                        <label htmlFor="section">
                                            Section <span className="required">*</span>
                                        </label>
                                        <select
                                            id="section"
                                            name="section"
                                            value={formData.section}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Section</option>
                                            {sectionOptions.map(sec => (
                                                <option key={sec} value={sec}>Section {sec}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Roll Number */}
                                    <div className="form-group">
                                        <label htmlFor="rollNumber">
                                            <Hash size={14} className="label-icon" />
                                            Roll Number <span className="required">*</span>
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
                                    <div className="form-group">
                                        <label htmlFor="admissionNo">
                                            Admission No.
                                        </label>
                                        <div className="admission-input-group">
                                            <input
                                                type="text"
                                                id="admissionNo"
                                                name="admissionNo"
                                                value={formData.admissionNo}
                                                onChange={handleInputChange}
                                                placeholder="Auto-generated or enter manually"
                                            />
                                            <button
                                                type="button"
                                                className="generate-btn"
                                                onClick={generateAdmissionNo}
                                                title="Generate Admission Number"
                                            >
                                                Generate
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Class-Section Preview */}
                                {formData.class && formData.section && (
                                    <div className="class-section-preview">
                                        <GraduationCap size={16} />
                                        <span>
                                            Selected: Class {formData.class} - Section {formData.section}
                                            {formData.rollNumber && ` | Roll No: ${formData.rollNumber}`}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={handleReset}
                            >
                                Reset Form
                            </button>
                            <button type="submit" className="btn-submit">
                                <UserPlus size={18} />
                                Add Student
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddStudent;