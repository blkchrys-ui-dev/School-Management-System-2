import Header from "../../../components/layout/Header/Header";
import Sidebar from "../../../components/layout/Sidebar/StudentSidebar";
import Footer from "../../../components/layout/Footer/Footer";
import "../styles/contactUs.css";
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
    ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../styles/style.css";

// Note: Facebook, Twitter, Instagram, Linkedin icons are not available in lucide-react
// Using alternative icons from lucide-react
// For social icons, we'll use Share2, Twitter, Instagram, Linkedin (these exist)

const ContactUs = () => {
    const navigate = useNavigate();
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
    const [open, setOpen] = useState(false);
    return (
        <div className="contact-container">
            <Header open={open} setOpen={setOpen} />
            <div className="contact-layout">
                <Sidebar open={open} />
                <div className="contact-content">
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
                                <h1 className="contact-hero-title">The Oasis Academy of Education</h1>
                                <p className="contact-hero-subtitle">Nurturing Minds, Building Futures Since 2005</p>
                            </div>
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
                                        <p>10, Pathaar Street Imami Gate, Bhopal - 462001</p>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-icon phone">
                                        <Phone size={22} />
                                    </div>
                                    <div className="info-details">
                                        <h4>Phone</h4>
                                        <p>+91 98765 43210</p>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-icon email">
                                        <Mail size={22} />
                                    </div>
                                    <div className="info-details">
                                        <h4>Email</h4>
                                        <p>info@oasisacademy.edu.in</p>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="info-icon website">
                                        <Globe size={22} />
                                    </div>
                                    <div className="info-details">
                                        <h4>Website</h4>
                                        <p>www.oasisacademy.edu.in</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="social-section">
                                <h3>Follow Us</h3>
                                <div className="social-icons">
                                    <a href="#" className="social-icon facebook">
                                        <FaFacebook size={20} />
                                    </a>
                                    <a href="#" className="social-icon twitter">
                                        <FaTwitter size={20} />
                                    </a>
                                    <a href="#" className="social-icon instagram">
                                        <FaInstagram size={20} />
                                    </a>
                                    <a href="#" className="social-icon linkedin">
                                        <FaLinkedin size={20} />
                                    </a>
                                </div>
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
                                        <span className="time">9:00 AM - 3:00 PM</span>
                                    </div>
                                    <div className="hour-item">
                                        <span className="day">Saturday</span>
                                        <span className="time">9:00 AM - 12:00 PM</span>
                                    </div>
                                    <div className="hour-item closed">
                                        <span className="day">Sunday</span>
                                        <span className="time">Closed</span>
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
                                        <span className="detail-value">CBSE (No: 123456)</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Established</span>
                                        <span className="detail-value">2005</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Medium</span>
                                        <span className="detail-value">English</span>
                                    </div>
                                </div>
                            </div>
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
                                    rows={5}
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
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.5210746093585!2d77.39231187028008!3d23.260508758106038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c681bcf7e623b%3A0xe618e91a3b49e01!2sOasis%20Academy%20Of%20Education!5e0!3m2!1sen!2sin!4v1775555840440!5m2!1sen!2sin"
                            style={{ border: 0, width: "100%", height: "400px" }}
                            loading="lazy"
                            allowFullScreen
                        ></iframe>
                        {/* <div className="map-placeholder">
                            <div className="map-content">
                                <MapPin size={32} />
                                <p>📍 123 Education Lane, Kolkata - 700001</p>
                                <span className="map-note">View on Google Maps →</span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContactUs;