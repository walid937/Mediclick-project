import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import "./SearchButton.css";
import api from "../../services/api"; // Import the API service

const SearchButton = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState(""); // State for doctor name or specialty
    const [suggestions, setSuggestions] = useState([]); // State for autosuggest suggestions

    // Fetch suggestions from the API based on the input value
    const fetchSuggestions = async (value) => {
        try {
            const response = await api.get("/user/doctors/suggestions", {
                params: { query: value }, // Search both name and specialty
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
    const getSuggestionValue = (suggestion) => suggestion.name || suggestion.specialty;

    // Render each suggestion in the dropdown
    const renderSuggestion = (suggestion) => (
        <div className="suggestion-item">
            <strong>{suggestion.name}</strong> - {suggestion.specialty}
        </div>
    );

    // Fetch doctors based on the search term
    const handleSearch = async () => {
        try {
            const response = await api.get("/doctor/search", {
                params: { query: searchTerm }, // Pass the search term to the backend
            });
            onSearch(response.data);  // Pass the fetched doctors to the parent
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
                        placeholder: "Search by Doctor Name or Specialty",
                        value: searchTerm,
                        onChange: (e, { newValue }) => setSearchTerm(newValue),
                    }}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                />
                <button className="search-button" onClick={handleSearch}>
                    <img
                        src="/assets/Searchicon.svg"
                        alt="Search"
                        className="button-icon"
                    />
                    <span>Search</span>
                </button>
            </div>
        </div>
    );
};

export default SearchButton;