import Header from "../../../components/layout/Header/Header";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";
import Footer from "../../../components/layout/Footer/Footer";
import "../styles/editcontactUs.css";
import { useState } from "react";
import {
    ArrowLeft,
    MapPin,
    Phone,
    Mail,
    Globe,
    Clock,
    Award,
    GraduationCap,
    MessageSquare,
    Send,
    ChevronRight,
    Edit3,
    Save,
    X,
    Check,
    AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const EditContactUs = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [saving, setSaving] = useState(false);

    // ============ EDITABLE CONTACT DETAILS ============
    const [contactDetails, setContactDetails] = useState({
        schoolName: "The Oasis Academy of Education",
        tagline: "Nurturing Minds, Building Futures Since 2005",
        address: "10, Pathaar Street Imami Gate, Bhopal - 462001",
        phone: "+91 98765 43210",
        email: "info@oasisacademy.edu.in",
        website: "www.oasisacademy.edu.in",
        affiliation: "CBSE (No: 123456)",
        established: "2005",
        medium: "English",
        visitingHours: {
            weekdays: "9:00 AM - 3:00 PM",
            saturday: "9:00 AM - 12:00 PM",
            sunday: "Closed"
        },
        socialLinks: {
            facebook: "https://facebook.com/oasisacademy",
            twitter: "https://twitter.com/oasisacademy",
            instagram: "https://instagram.com/oasisacademy",
            linkedin: "https://linkedin.com/company/oasisacademy"
        },
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.5210746093585!2d77.39231187028008!3d23.260508758106038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c681bcf7e623b%3A0xe618e91a3b49e01!2sOasis%20Academy%20Of%20Education!5e0!3m2!1sen!2sin!4v1775555840440!5m2!1sen!2sin"
    });

    // ============ TEMPORARY EDIT STATE ============
    const [editData, setEditData] = useState({ ...contactDetails });

    // ============ CONTACT FORM STATE ============
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message sent successfully! We will get back to you soon.");
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
    };

    // ============ EDIT FUNCTIONS ============
    const handleEditToggle = () => {
        if (isEditing) {
            // Cancel editing - reset to original
            setEditData({ ...contactDetails });
        }
        setIsEditing(!isEditing);
    };

    const handleDetailChange = (field, value) => {
        setEditData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleVisitingHourChange = (day, value) => {
        setEditData(prev => ({
            ...prev,
            visitingHours: {
                ...prev.visitingHours,
                [day]: value
            }
        }));
    };

    const handleSocialLinkChange = (platform, value) => {
        setEditData(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [platform]: value
            }
        }));
    };

    const handleSaveChanges = () => {
        setSaving(true);

        // Simulate API call
        setTimeout(() => {
            setContactDetails({ ...editData });
            setIsEditing(false);
            setSaving(false);
            showSuccess("Contact details updated successfully!");
        }, 800);
    };

    const showSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    // Data to display (either original or edit data)
    const displayData = isEditing ? editData : contactDetails;

    return (
        <div className="contact-container">
            <Header open={open} setOpen={setOpen} />
            <div className="contact-layout">
                <Sidebar open={open} />
                <div className="contact-content">
                    {/* Success Toast */}
                    {successMessage && (
                        <div className="cu-success-toast">
                            <Check size={18} />
                            <span>{successMessage}</span>
                        </div>
                    )}

                    <div className="back-nav" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                        <span>Back to Dashboard</span>
                    </div>

                    {/* Contact Us Hero Section */}
                    <div className="contact-hero-section">
                        <div className="contact-hero-content">
                            <div className="contact-logo-container">
                                <div className="contact-school-logo">
                                    <GraduationCap size={48} />
                                </div>
                            </div>
                            {isEditing ? (
                                <div className="cu-edit-hero">
                                    <input
                                        type="text"
                                        className="cu-hero-input cu-hero-title-input"
                                        value={editData.schoolName}
                                        onChange={(e) => handleDetailChange('schoolName', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        className="cu-hero-input cu-hero-subtitle-input"
                                        value={editData.tagline}
                                        onChange={(e) => handleDetailChange('tagline', e.target.value)}
                                    />
                                </div>
                            ) : (
                                <>
                                    <h1 className="contact-hero-title">{displayData.schoolName}</h1>
                                    <p className="contact-hero-subtitle">{displayData.tagline}</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Edit/Save Button Bar */}
                    <div className="cu-action-bar">
                        <h2>Manage Contact Details</h2>
                        <div className="cu-action-buttons">
                            {isEditing ? (
                                <>
                                    <button className="cu-btn cu-btn-cancel" onClick={handleEditToggle}>
                                        <X size={18} />
                                        Cancel
                                    </button>
                                    <button
                                        className="cu-btn cu-btn-save"
                                        onClick={handleSaveChanges}
                                        disabled={saving}
                                    >
                                        <Save size={18} />
                                        {saving ? "Saving..." : "Save Changes"}
                                    </button>
                                </>
                            ) : (
                                <button className="cu-btn cu-btn-edit" onClick={handleEditToggle}>
                                    <Edit3 size={18} />
                                    Edit Details
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="contact-grid">
                        {/* Contact Information */}
                        <div className="contact-info-section">
                            <h2>Get in Touch</h2>
                            <p className="section-subtitle">We'd love to hear from you. Reach out to us through any of these channels.</p>

                            <div className="info-cards">
                                <div className="info-card">
                                    <div className="info-icon address">
                                        <MapPin size={22} />
                                    </div>
                                    <div className="info-details">
                                        <h4>Address</h4>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="cu-inline-input"
                                                value={editData.address}
                                                onChange={(e) => handleDetailChange('address', e.target.value)}
                                            />
                                        ) : (
                                            <p>{displayData.address}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-icon phone">
                                        <Phone size={22} />
                                    </div>
                                    <div className="info-details">
                                        <h4>Phone</h4>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="cu-inline-input"
                                                value={editData.phone}
                                                onChange={(e) => handleDetailChange('phone', e.target.value)}
                                            />
                                        ) : (
                                            <p>{displayData.phone}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-icon email">
                                        <Mail size={22} />
                                    </div>
                                    <div className="info-details">
                                        <h4>Email</h4>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                className="cu-inline-input"
                                                value={editData.email}
                                                onChange={(e) => handleDetailChange('email', e.target.value)}
                                            />
                                        ) : (
                                            <p>{displayData.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-icon website">
                                        <Globe size={22} />
                                    </div>
                                    <div className="info-details">
                                        <h4>Website</h4>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="cu-inline-input"
                                                value={editData.website}
                                                onChange={(e) => handleDetailChange('website', e.target.value)}
                                            />
                                        ) : (
                                            <p>{displayData.website}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="social-section">
                                <h3>Follow Us</h3>
                                <div className="social-icons">
                                    <a href={displayData.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                                        <FaFacebook size={20} />
                                    </a>
                                    <a href={displayData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                                        <FaTwitter size={20} />
                                    </a>
                                    <a href={displayData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                                        <FaInstagram size={20} />
                                    </a>
                                    <a href={displayData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                                        <FaLinkedin size={20} />
                                    </a>
                                </div>
                                {isEditing && (
                                    <div className="cu-social-edit">
                                        <div className="cu-social-field">
                                            <FaFacebook size={14} />
                                            <input
                                                type="text"
                                                value={editData.socialLinks.facebook}
                                                onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                                                placeholder="Facebook URL"
                                            />
                                        </div>
                                        <div className="cu-social-field">
                                            <FaTwitter size={14} />
                                            <input
                                                type="text"
                                                value={editData.socialLinks.twitter}
                                                onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                                                placeholder="Twitter URL"
                                            />
                                        </div>
                                        <div className="cu-social-field">
                                            <FaInstagram size={14} />
                                            <input
                                                type="text"
                                                value={editData.socialLinks.instagram}
                                                onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                                                placeholder="Instagram URL"
                                            />
                                        </div>
                                        <div className="cu-social-field">
                                            <FaLinkedin size={14} />
                                            <input
                                                type="text"
                                                value={editData.socialLinks.linkedin}
                                                onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                                                placeholder="LinkedIn URL"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Visiting Hours & Details */}
                        <div className="info-details-section">
                            <div className="visiting-hours">
                                <div className="section-header">
                                    <Clock size={22} />
                                    <h3>Visiting Hours</h3>
                                </div>
                                <div className="hours-list">
                                    <div className="hour-item">
                                        <span className="day">Monday - Friday</span>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="cu-small-input"
                                                value={editData.visitingHours.weekdays}
                                                onChange={(e) => handleVisitingHourChange('weekdays', e.target.value)}
                                            />
                                        ) : (
                                            <span className="time">{displayData.visitingHours.weekdays}</span>
                                        )}
                                    </div>
                                    <div className="hour-item">
                                        <span className="day">Saturday</span>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="cu-small-input"
                                                value={editData.visitingHours.saturday}
                                                onChange={(e) => handleVisitingHourChange('saturday', e.target.value)}
                                            />
                                        ) : (
                                            <span className="time">{displayData.visitingHours.saturday}</span>
                                        )}
                                    </div>
                                    <div className="hour-item closed">
                                        <span className="day">Sunday</span>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="cu-small-input"
                                                value={editData.visitingHours.sunday}
                                                onChange={(e) => handleVisitingHourChange('sunday', e.target.value)}
                                            />
                                        ) : (
                                            <span className="time">{displayData.visitingHours.sunday}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="other-details">
                                <div className="section-header">
                                    <Award size={22} />
                                    <h3>Other Details</h3>
                                </div>
                                <div className="details-list">
                                    <div className="detail-item">
                                        <span className="detail-label">Affiliation</span>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="cu-small-input"
                                                value={editData.affiliation}
                                                onChange={(e) => handleDetailChange('affiliation', e.target.value)}
                                            />
                                        ) : (
                                            <span className="detail-value">{displayData.affiliation}</span>
                                        )}
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Established</span>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="cu-small-input"
                                                value={editData.established}
                                                onChange={(e) => handleDetailChange('established', e.target.value)}
                                            />
                                        ) : (
                                            <span className="detail-value">{displayData.established}</span>
                                        )}
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Medium</span>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="cu-small-input"
                                                value={editData.medium}
                                                onChange={(e) => handleDetailChange('medium', e.target.value)}
                                            />
                                        ) : (
                                            <span className="detail-value">{displayData.medium}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Map URL Edit */}
                            {isEditing && (
                                <div className="other-details">
                                    <div className="section-header">
                                        <MapPin size={22} />
                                        <h3>Map Embed URL</h3>
                                    </div>
                                    <textarea
                                        className="cu-map-input"
                                        value={editData.mapEmbedUrl}
                                        onChange={(e) => handleDetailChange('mapEmbedUrl', e.target.value)}
                                        rows="3"
                                        placeholder="Paste Google Maps embed URL here..."
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div className="contact-form-section">
                        <div className="form-header">
                            <MessageSquare size={24} />
                            <h2>Send us a Message</h2>
                            <p>Have questions? Fill out the form and we'll respond within 24 hours.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Your Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Subject *</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    placeholder="What is this regarding?"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="5"
                                    placeholder="Write your message here..."
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-btn">
                                <Send size={18} />
                                <span>Send Message</span>
                                <ChevronRight size={16} />
                            </button>
                        </form>
                    </div>

                    {/* Map Section */}
                    <div className="map-section">
                        <iframe
                            src={displayData.mapEmbedUrl}
                            style={{ border: 0, width: "100%", height: "400px", borderRadius: "16px" }}
                            loading="lazy"
                            allowFullScreen
                            title="School Location Map"
                        ></iframe>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditContactUs;