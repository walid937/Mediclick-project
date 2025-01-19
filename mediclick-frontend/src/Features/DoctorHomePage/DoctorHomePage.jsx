import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../../services/api"; // Import API service
import './DoctorHomePage.css'; // Import the DoctorHomePage styles

const DoctorHomePage = () => {
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Fetch patient data and appointments from the backend
        const fetchDoctorData = async () => {
            try {
                const patientResponse = await api.get('/api/patients');
                const appointmentResponse = await api.get('/api/appointments');
                const notificationResponse = await api.get('/api/notifications');

                setPatients(patientResponse.data);
                setAppointments(appointmentResponse.data);
                setNotifications(notificationResponse.data);
            } catch (err) {
                console.error("Error fetching doctor data:", err);
            }
        };

        fetchDoctorData();
    }, []);

    // Handle appointment confirmation
    const handleConfirm = async (id) => {
        try {
            const response = await api.put(`/api/appointments/confirm/${id}`);
            if (response.data.success) {
                // Update the appointments list locally to reflect the status change
                setAppointments((prevAppointments) =>
                    prevAppointments.map((appointment) =>
                        appointment.id === id
                            ? { ...appointment, status: 'confirmed' }
                            : appointment
                    )
                );
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error confirming appointment:', error);
        }
    };

    return (
        <div className="doctor-homepage">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>Doctor Dashboard</h2>
                </div>
                <ul className="sidebar-nav">
                    <li><Link to="/doctor/home">Home</Link></li>
                    <li><Link to="/doctor/patients">Patients</Link></li>
                    <li><Link to="/doctor/appointments">Appointments</Link></li>
                    <li><Link to="/doctor/settings">Settings</Link></li>
                </ul>
            </div>

            <div className="main-content">
                <div className="top-bar">
                    <h1>Welcome, Dr. John Doe</h1>
                    <div className="notifications">
                        <span>Notifications</span>
                        <ul>
                            {notifications.map((notification, index) => (
                                <li key={index}>{notification.message}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="content">
                    <h2>Upcoming Appointments</h2>
                    <div className="appointments-dashboard">
                        {appointments.length > 0 ? (
                            <table className="appointments-table">
                                <thead>
                                    <tr>
                                        <th>Patient Name</th>
                                        <th>Appointment Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((appointment) => (
                                        <tr key={appointment.id}>
                                            <td>{appointment.patientName}</td>
                                            <td>{new Date(appointment.date).toLocaleString()}</td>
                                            <td>{appointment.status}</td>
                                            <td>
                                                {appointment.status === 'pending' && (
                                                    <button onClick={() => handleConfirm(appointment.id)}>
                                                        Confirm
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No appointments scheduled.</p>
                        )}
                    </div>

                    <h2>Patients</h2>
                    <div className="patients-list">
                        {patients.map((patient) => (
                            <div className="patient-card" key={patient.id}>
                                <h3>{patient.name}</h3>
                                <p>Age: {patient.age}</p>
                                <p>Email: {patient.email}</p>
                                <Link to={`/doctor/patient/${patient.id}`} className="view-details">
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorHomePage;
