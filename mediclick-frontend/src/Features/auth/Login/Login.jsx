// src/Features/auth/Login/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../../services/api"; // Corrected import statement
import './Login.css'; // Import the Login.css file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/users/login', { email, password });
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data)); // Save user data (e.g., JWT token)
                // Check if the role is 'patient' and navigate accordingly
                if (response.data.role === 'patient') {
                    navigate('/PatientHomePage');
                } else {
                    navigate('/dashboard'); // Redirect to dashboard for other roles
                }
            }
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <div className="left-side">
                <img
                    src="/images_Landingpage/Logo2_for_blackbackground.png"
                    alt="Logo"
                    className="login-logo"
                />
            </div>
            <div className="right-side">
                <h3>LOGIN</h3>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="login-input"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="login-input"
                            placeholder="Enter your password"
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
                <p className="forgot-password">
                    <a href="/forgot-password">Forgot Password?</a>
                </p>
                <p>
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
