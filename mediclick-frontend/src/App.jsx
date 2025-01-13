// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Features/auth/Login/Login';
import Signup from './Features/auth/Signup/Signup';
import LandingPage from './Features/landing/LandingPage';
import AboutUs from './Features/AboutUs/AboutUs';
import PatientHomePage from './Features/PatientHomePage/PatientHomePage'; // Import the PatientHomePage component
import DoctorHomePage from './Features/DoctorHomePage/DoctorHomePage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/PatientHomePage" element={<PatientHomePage />} />
        <Route path="/DoctorHomePage" element={<DoctorHomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
