// src/features/auth/AuthService.js
import axios from 'axios';

//const API_URL = 'http://yourapiurl.com/api/auth'; // Replace with your API URL

const AuthService = {
    login: async (credentials) => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data)); // Store user data in localStorage
                return response.data;
            }
            throw new Error('Login failed');
        } catch (error) {
            throw new Error(error.response ? error.response.data.message : error.message);
        }
    },

    signup: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/signup`, userData);
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data)); // Store user data in localStorage
                return response.data;
            }
            throw new Error('Signup failed');
        } catch (error) {
            throw new Error(error.response ? error.response.data.message : error.message);
        }
    },

    logout: () => {
        localStorage.removeItem('user'); // Remove user data from localStorage
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user')); // Get current user data from localStorage
    },
};

export default AuthService;
