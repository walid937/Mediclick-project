import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./AppointmentButton.css";

const AppointmentButton = ({ doctorId, doctorName, doctorSpecialty }) => {
    const navigate = useNavigate();

    const handleBooking = () => {
        // Navigate to the AppointmentsPage with doctor details
        navigate("/appointments", {
            state: {
                doctorId,
                doctorName,
                doctorSpecialty,
            },
        });
    };

    return (
        <button className="appointment-button" onClick={handleBooking}>
            Book Appointment
        </button>
    );
};

export default AppointmentButton;
