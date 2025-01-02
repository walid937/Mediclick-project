// src/LandingPage.jsx
import React, { useRef } from "react";
import SearchButton from "../../components/SearchButton/SearchButton";
import "./LandingPage.css";

const LandingPage = () => {
    const aboutUsRef = useRef(null);

    const scrollToAboutUs = () => {
        aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="landing-page">
            <header className="header">
                <img
                    src="/images_Landingpage/Mediclick_logo.png"
                    alt="Logo"
                    className="logo"
                />
                <nav className="nav">
                    <a href="#home" className="nav-link">Home</a>
                    <button onClick={scrollToAboutUs} className="nav-link button-link">About Us</button>
                    <a href="/login" className="nav-link">Login</a>
                </nav>
            </header>

            {/* Main Content */}
            <div className="main-content">
                {/* SearchButton Component */}
                <SearchButton />

                {/* Hero Text Section */}
                <div className="hero-text">
                    <h1 className="hero-heading">You schedule the appointments We handle the rest.</h1>
                    <p className="hero-subheading">
                        Book, modify, or cancel your appointments faster, anytime, anywhere. Life’s busy—we make healthcare simple, so you can focus on what matters most.
                    </p>
                </div>

                <div className="welcome-section">
                    <img
                        src="/images_Landingpage/Image1_landingpage.png"
                        alt="Welcome"
                        className="welcome-image"
                    />
                </div>
            </div>

            {/* About Us Section */}
            <div className="about-us-section" ref={aboutUsRef}>
                <img
                    src="/images_Landingpage/Image2_landingpage.png"
                    alt="About Us"
                    className="about-image"
                />
                <div className="text-section">
                    <h1>About Us</h1>
                    <p>
                        Welcome to Mediclick! We are dedicated to providing innovative solutions in healthcare technology.
                        Our mission is to make healthcare accessible and efficient for everyone.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
