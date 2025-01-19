import React, { useState, useEffect } from "react";
import PatientHeader from "../../components/PatientHeader/PatientHeader"; // Correct casing
import AppointmentButton from "../../components/AppointmentButton/AppointmentButton"; // Import the AppointmentButton
import "./PatientHomePage.css"; // Import the CSS

const PatientHomePage = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [specialtyFilter, setSpecialtyFilter] = useState("");

    // Fetch all doctors when the component mounts
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch("http://localhost:5239/api/doctor"); // Ensure the API URL is correct
                const data = await response.json();
                setDoctors(data); // Update the state with all doctors
                setFilteredDoctors(data); // Initially show all doctors
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        fetchDoctors();
    }, []);

    // Filter doctors by specialty when the specialty input changes
    const handleSpecialtyChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSpecialtyFilter(value);
        setFilteredDoctors(
            doctors.filter((doctor) =>
                doctor.specialty.toLowerCase().includes(value)
            )
        );
    };

    return (
        <div className="patient-homepage">
            <PatientHeader />

            {/* Doctor Table Section */}
            <div className="doctor-table-container">
                <div className="table-header">
                    <h2>Doctors Available :</h2>
                    <input
                        type="text"
                        placeholder="Filter by Specialty"
                        value={specialtyFilter}
                        onChange={handleSpecialtyChange}
                        className="specialty-input"
                    />
                </div>
                <table className="doctor-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Specialty</th>
                            <th>City</th>
                            <th>Action</th> {/* New column for the button */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map((doctor) => (
                                <tr key={doctor.id}>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.specialty}</td>
                                    <td>{doctor.ville || "N/A"}</td>
                                    <td>
                                        {/* Include the AppointmentButton with the necessary props */}
                                        <AppointmentButton
                                            doctorId={doctor.id}
                                            doctorName={doctor.name}  // Pass the doctor's name
                                            doctorSpecialty={doctor.specialty}  // Pass the doctor's specialty
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No doctors found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PatientHomePage;
