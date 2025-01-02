import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
    return (
        <div className="about-page">
            <div className="content">
                <img
                    src="/images_Landingpage/Image2_landingpage.png"
                    alt="About Us"
                    className="about-image"
                />
                <div className="text-section">
                    <h1>About Us</h1>
                    <p>
                        Welcome to Mediclick! We are dedicated to providing innovative solutions in healthcare technology. Our mission is to make healthcare accessible and efficient for everyone.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;