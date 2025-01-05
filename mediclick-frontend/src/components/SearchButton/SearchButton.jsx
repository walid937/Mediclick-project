import React, { useState } from "react";
import "./SearchButton.css";

const SearchButton = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const doctors = [
        { name: "Dr. Hamza Radi", specialty: "Cardiologue", fee: "$12" },
        { name: "Dr. Anas Haho", specialty: "Cardiologue", fee: "$12" },
        // Add more doctors as needed
    ];

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="search-bar-container">
            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Doctor Name/ Specialty"
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select className="location-dropdown">
                    <option value="">Ville</option>
                </select>
                <button className="search-button">
                    <img
                        src="/assets/Searchicon.svg"
                        alt="Search"
                        className="button-icon"
                    />
                    <span>Search</span>
                </button>
            </div>

            {/* Doctor List (Visible only if searchTerm is not empty) */}
            {searchTerm && (
                <div className="doctor-list">
                    {filteredDoctors.map((doctor, index) => (
                        <div className="doctor-item" key={index}>
                            <div className="doctor-info">
                                <img
                                    src="/assets/Profileicon.svg"
                                    alt="Doctor"
                                    className="doctor-icon"
                                />
                                <div>
                                    <p className="doctor-name">{doctor.name}</p>
                                    <p className="doctor-specialty">{doctor.specialty}</p>
                                    <p className="doctor-fee">{doctor.fee}</p>
                                </div>
                            </div>
                            <button className="arrow-button">
                                <img
                                    src="/assets/Arrowicon.svg"
                                    alt="Arrow"
                                    className="arrow-icon"
                                />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchButton;
