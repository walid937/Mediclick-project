// src/components/PatientHeader/PatientHeader.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // For navigation using React Router
import './PatientHeader.css';
import logo from "/images_Landingpage/Mediclick_logo.png"; // Import logo image

const PatientHeader = () => {
    return (
        <header className="patient-header">
            <div className="logo">
                <img src={logo} alt="Mediclick Logo" className="logo-img" />
            </div>
            <div className="nav-container">
                <nav className="nav-links">
                    <ul>
                        <li>
                            <Link to="/Features/PatientHomePage">Home</Link>
                        </li>
                        <li>
                            <Link to="/Features/Appointment">My Appointments</Link>
                        </li>
                        <li>
                            <Link to="/Features/Profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/Features/Settings">Settings</Link>
                        </li>
                    </ul>
                </nav>
                <div className="user-actions">
                    <button className="signout-btn">
                        <Link to="/auth/login">SIGN OUT</Link>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default PatientHeader;
