import React from 'react';
import PatientHeader from '../../components/PatientHeader/PatientHeader'; // Correct casing
import SearchButton from '../../components/SearchButton/SearchButton';

const PatientHomePage = () => {
    return (
        <div className="patient-homepage">
            <PatientHeader />
            <SearchButton />
            {/* Other content for the Patient Home Page */}
        </div>
    );
};

export default PatientHomePage;
