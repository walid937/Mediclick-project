// src/features/auth/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../AuthService';
import './Signup.css'; // Import the Signup.css file

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('patient'); // Default role is 'patient'
    const [specialty, setSpecialty] = useState(''); // New state for specialty
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const userData = await AuthService.signup({ name, email, password, role, specialty });
            if (userData) {
                navigate('/login'); // Redirect to login page after successful signup
            }
        } catch (err) {
            setError('Failed to create an account. Please try again.');
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
                            <option value="admin">Admin</option> {/* Added Admin role */}
                        </select>
                    </div>

                    {/* Conditional rendering of the specialty input field */}
                    {role === 'doctor' && (
                        <div className="input-group">
                            <label htmlFor="specialty">Enter your specialty</label>
                            <input
                                type="text"
                                id="specialty"
                                value={specialty}
                                onChange={(e) => setSpecialty(e.target.value)}
                                className="signup-input"
                            />
                        </div>
                    )}

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
