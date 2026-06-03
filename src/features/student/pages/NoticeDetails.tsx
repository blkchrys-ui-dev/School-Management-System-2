import React, { useState } from 'react'
import Header from '../../../components/layout/Header/Header'
import Sidebar from '../../../components/layout/Sidebar/StudentSidebar'
import Footer from '../../../components/layout/Footer/Footer'
import { Megaphone, ArrowLeft } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import "../styles/noticesDetails.css";

const NoticeDetails = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    return (
        <>
            <div>
                <Header open={open} setOpen={setOpen} />
                <div className="layout">
                    <Sidebar open={open} />
                    <div className="content">
                        <div className="back-nav" onClick={() => navigate(-1)}>
                            <ArrowLeft size={18} />
                            <span>Back to Dashboard</span>
                        </div>
                        <h2>Notice Details</h2>
                        <div className="notice-detail-container">
                            <div className="notice-detail-card">
                                <div className="notice-detail-header">
                                    <span className="notice-detail-icon">
                                        <Megaphone size={24} />
                                    </span>
                                    <div className="notice-detail-head-text">
                                        <p className="notice-detail-title">Annual Sports Day Announcement</p>
                                        <div className="notice-detail-meta">
                                            <span>12 Apr 2026</span>
                                            <span className="dot"></span>
                                            <span>8:00 AM</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="notice-detail-description">
                                    <p>
                                        Dear Parents, we are pleased to inform you that the Annual Sports Day
                                        will be held on 25th March 2022. Students are requested to come in
                                        sports uniform. Events include 100m race, relay, long jump, and more.
                                        Refreshments will be provided.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default NoticeDetails