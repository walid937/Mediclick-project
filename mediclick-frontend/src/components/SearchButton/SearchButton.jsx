import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import "./SearchButton.css";
import api from "../../services/api"; // Import the API service

const SearchButton = () => {
    const [searchTerm, setSearchTerm] = useState(""); // State for doctor name
    const [specialty, setSpecialty] = useState(""); // State for specialty
    const [suggestions, setSuggestions] = useState([]); // State for autosuggest suggestions
    const [doctors, setDoctors] = useState([]); // State to store fetched doctors

    // Fetch suggestions from the API based on the input value
    const fetchSuggestions = async (value) => {
        try {
            const response = await api.get("/user/doctors/suggestions", {
                params: { name: value },
            });
            setSuggestions(response.data); // Set fetched suggestions
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    // Called when the user types in the input field
    const onSuggestionsFetchRequested = ({ value }) => {
        fetchSuggestions(value);
    };

    // Clear suggestions when the input is cleared
    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    // Get the value to be displayed in the input field when a suggestion is selected
    const getSuggestionValue = (suggestion) => suggestion.name;

    // Render each suggestion in the dropdown
    const renderSuggestion = (suggestion) => (
        <div className="suggestion-item">
            {suggestion.name} - {suggestion.specialty}
        </div>
    );

    // Fetch doctors based on the search term and specialty
    const handleSearch = async () => {
        try {
            const response = await api.get("/user/doctors", {
                params: { name: searchTerm, specialty },
            });
            setDoctors(response.data);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    return (
        <div className="search-bar-container">
            {/* Search Bar */}
            <div className="search-bar">
                <Autosuggest
                    inputProps={{
                        placeholder: "Doctor Name",
                        value: searchTerm,
                        onChange: (e, { newValue }) => setSearchTerm(newValue),
                    }}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                />
                <select
                    className="location-dropdown"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                >
                    <option value="">Specialty</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    {/* Add more specialties as needed */}
                </select>
                <button className="search-button" onClick={handleSearch}>
                    <img
                        src="/assets/Searchicon.svg"
                        alt="Search"
                        className="button-icon"
                    />
                    <span>Search</span>
                </button>
            </div>

            {/* Doctor List */}
            {searchTerm && (
                <div className="doctor-list">
                    {doctors.map((doctor, index) => (
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
