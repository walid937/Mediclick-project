import React from "react";
import "./SearchButton.css";


const SearchButton = () => {
    return (
        <div className="search-bar">
            {/* Doctor/Specialty Input */}
            <div className="search-input-group">
                <img
                    src="/assets/Searchicon.svg"
                    alt="Search Icon"
                    className="search-icon"
                />
                <input
                    type="text"
                    placeholder="Doctor Name, Specialty"
                    className="search-input"
                />
            </div>

            {/* Location Input */}
            <div className="location-input-group">
                <img
                    src="/assets/Locationicon.svg"
                    alt="Location Icon"
                    className="location-icon"
                />
                <input
                    type="text"
                    placeholder="LOCALISATION"
                    className="location-input"
                />
            </div>

            {/* Search Button */}
            <button className="search-button">
                <img
                    src="/assets/Searchicon.svg"
                    alt="Search"
                    className="button-icon"
                />
                Search
            </button>
        </div>
    );
};

export default SearchButton;
