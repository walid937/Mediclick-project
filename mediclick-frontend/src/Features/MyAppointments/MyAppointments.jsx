import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // For navigation to other pages
import PatientHeader from "../../components/PatientHeader/PatientHeader"; // Correct casing
import './MyAppointments.css';

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('http://localhost:5239/api/appointments'); // Update with the correct API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch appointments');
                }
                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className="appointments-container">
            <PatientHeader /> {/* Replacing the default header with PatientHeader */}

            <h2>My Appointments</h2>

            {isLoading ? (
                <p>Loading...</p>
            ) : appointments.length === 0 ? (
                <p className="empty-message">You have no appointments yet.</p>
            ) : (
                appointments.map((appointment) => (
                    <div key={appointment.id} className="appointment-card">
                        <h3>Appointment with Dr. {appointment.doctorName}</h3>
                        <p><strong>Date:</strong> {appointment.appointmentDate}</p>
                        <p><strong>Time:</strong> {appointment.timeSlot}</p>
                        <p><strong>Status:</strong> <span className="appointment-status">{appointment.status}</span></p>
                        <p><strong>Notes:</strong> {appointment.notes}</p>
                    </div>
                ))
            )}


        </div>
    );
};

export default MyAppointments;
