
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AppointmentsPage.css";

const AppointmentsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { doctorId, doctorName, doctorSpecialty } = location.state || {};

    const [appointmentDate, setAppointmentDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    const patientId = JSON.parse(localStorage.getItem("user"))?.id || 1; // Replace with actual patient ID from context or state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage("Booking your appointment...");

        try {
            const response = await fetch("http://localhost:5239/api/appointments/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    doctorId,
                    patientId,
                    appointmentDate,
                    status: "Confirmed",
                    notes: "No additional notes", // Default note
                    timeSlot,
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setStatusMessage("Appointment booked successfully!");
                setTimeout(() => navigate("/PatientHomePage"), 2000); // Redirect after 2 seconds
            } else {
                setStatusMessage(data.message || "Error occurred while booking. Try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setStatusMessage("An unexpected error occurred. Please try again later.");
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
                    <form onSubmit={handleSubmit}>
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
                            <button className="confirm-button" type="submit">
                                Confirm Appointment
                            </button>
                        </div>
                    </form>

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