import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import boy from "../assets/boy-img.jpg";
import '../styling/studentProfile.css'
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const StudentProfile = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Header open={open} setOpen={setOpen} />

            <div className="layout">

                <Sidebar open={open} />

                <div className="content">
                    <div className="back-nav" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                        <span>Back to Dashboard</span>
                    </div>
                    <h2>My Profile</h2>

                    <div className="profile-container">

                        {/* Profile Top */}

                        <div className="profile-header">

                            <img src={boy} alt="student" className="profile-img" />

                            <div>
                                <h3>Ameen Khan</h3>
                                <p className="student-class">Class I • Section A • Roll 1</p>
                            </div>

                        </div>

                        {/* Student Details */}

                        <div className="profile-card">

                            <h3 className="card-title">Student Details</h3>

                            <div className="details-grid">

                                <div>
                                    <span>Class</span>
                                    <p>Class I</p>
                                </div>

                                <div>
                                    <span>Section</span>
                                    <p>A</p>
                                </div>

                                <div>
                                    <span>Roll Number</span>
                                    <p>1</p>
                                </div>

                                <div>
                                    <span>Date of Birth</span>
                                    <p>15-06-2015</p>
                                </div>

                                <div>
                                    <span>Blood Group</span>
                                    <p>B+</p>
                                </div>

                                <div>
                                    <span>Admission No.</span>
                                    <p>OAE/2021/001</p>
                                </div>

                            </div>

                        </div>

                        {/* Parent Details */}

                        <div className="profile-card">

                            <h3 className="card-title">Parent Details</h3>

                            <div className="details-grid">

                                <div>
                                    <span>Father's Name</span>
                                    <p>Suraj Paul</p>
                                </div>

                                <div>
                                    <span>Mother's Name</span>
                                    <p>Rima Paul</p>
                                </div>

                                <div>
                                    <span>Contact Number</span>
                                    <p>+91 98765 43210</p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
            <Footer/>
        </div>
    );
};

export default StudentProfile;