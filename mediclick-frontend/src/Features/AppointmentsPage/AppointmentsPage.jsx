import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation to access navigation state
import "./AppointmentsPage.css";

const AppointmentsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { doctorId, doctorName, doctorSpecialty } = location.state || {};

    // State for managing appointment form data
    const [appointmentDate, setAppointmentDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage("En cours de confirmation...");

        try {
            const response = await fetch("http://localhost:5239/api/appointments/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    doctorId,
                    patientId: 1, // Replace with actual patient ID
                    appointmentDate,
                    status: "En cours de confirmation",
                    notes: "",
                    timeSlot,
                }),
            });

            // Check if the response is successful
            if (!response.ok) {
                throw new Error("Failed to book appointment");
            }

            const data = await response.json();

            if (data.success) {
                setStatusMessage("Votre rendez-vous est en cours de confirmation.");
            } else {
                setStatusMessage("Une erreur est survenue. Veuillez réessayer.");
            }
        } catch (error) {
            console.error("Error:", error);
            setStatusMessage("Une erreur est survenue. Veuillez réessayer.");
        }
    };

    return (
        <div className="appointments-page">
            <h1>Appointment Details</h1>
            {doctorId ? (
                <div className="doctor-details">
                    <h2>Doctor Information</h2>
                    <p><strong>Name:</strong> {doctorName}</p>
                    <p><strong>Specialty:</strong> {doctorSpecialty}</p>

                    {/* Appointment Form */}
                    <div className="appointment-form">
                        <label>
                            Select Appointment Date and Time:
                            <input
                                type="datetime-local"
                                value={appointmentDate}
                                onChange={(e) => setAppointmentDate(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Time Slot:
                            <input
                                type="text"
                                value={timeSlot}
                                onChange={(e) => setTimeSlot(e.target.value)}
                                placeholder="Enter time slot (e.g., 10:00 AM - 11:00 AM)"
                                required
                            />
                        </label>
                        <button className="confirm-button" onClick={handleSubmit}>
                            Confirm Appointment
                        </button>
                    </div>

                    {/* Status Message */}
                    {statusMessage && <p className="status-message">{statusMessage}</p>}
                </div>
            ) : (
                <p>No doctor selected. Please go back and choose a doctor.</p>
            )}
        </div>
    );
};

export default AppointmentsPage;
