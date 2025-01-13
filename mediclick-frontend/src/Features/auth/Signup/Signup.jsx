// src/Features/auth/Signup/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../../services/api";
import './Signup.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('patient');
    const [specialty, setSpecialty] = useState('');
    const [license, setLicense] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [ville, setVille] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/users/signup', {
                name,
                email,
                password,
                role,
                specialty,
                license,
                phoneNumber,
                dateOfBirth,
                ville,
            });
            if (response.data) {
                // If the role is 'patient', navigate to PatientHomePage
                if (role === 'patient') {
                    navigate('/PatientHomePage');
                } else {
                    navigate('/login'); // Redirect to login for other roles
                }
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message); // Show server error message
            } else {
                setError('Failed to create an account. Please try again.');
            }
        }
    };

    return (
        <div className="signup-container">
            <div className="left-side">
                <img
                    src="/images_Landingpage/Logo2_for_blackbackground.png"
                    alt="Logo"
                    className="signup-logo"
                />
            </div>
            <div className="right-side">
                <h3>SIGN UP</h3>
                <form onSubmit={handleSignup} className="signup-form">
                    <div className="input-group">
                        <label htmlFor="name">Enter your name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="signup-input"
                            autoComplete="name"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Enter your email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="signup-input"
                            autoComplete="email"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Enter your password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="signup-input"
                            autoComplete="new-password"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="role">Select your role</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="signup-input"
                        >
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {role === 'doctor' && (
                        <>
                            <div className="input-group">
                                <label htmlFor="specialty">Enter your specialty</label>
                                <input
                                    type="text"
                                    id="specialty"
                                    value={specialty}
                                    onChange={(e) => setSpecialty(e.target.value)}
                                    className="signup-input"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="license">Enter your license number</label>
                                <input
                                    type="text"
                                    id="license"
                                    value={license}
                                    onChange={(e) => setLicense(e.target.value)}
                                    className="signup-input"
                                    autoComplete="off"
                                />
                            </div>
                        </>
                    )}

                    <div className="input-group">
                        <label htmlFor="phoneNumber">Enter your phone number</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="signup-input"
                            autoComplete="tel"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="dateOfBirth">Enter your date of birth</label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            className="signup-input"
                            autoComplete="bday"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="ville">Enter your city (Ville)</label>
                        <input
                            type="text"
                            id="ville"
                            value={ville}
                            onChange={(e) => setVille(e.target.value)}
                            className="signup-input"
                            autoComplete="address-level2"
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="signup-button">
                        Sign Up
                    </button>
                </form>
                <p className="already-have-account">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
