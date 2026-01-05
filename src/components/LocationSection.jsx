import React from 'react';
import './LocationSection.css';

const LocationSection = () => {
    const mapUrl = "https://maps.app.goo.gl/7AW4L3YBkrdSb6n38";

    return (
        <section className="location-section">
            <div className="container">
                <div className="location-content">
                    <div className="location-icon">
                        {/* Simple SVG Pin Icon */}
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                    </div>
                    <h2 className="location-title">Visit Our Store</h2>
                    <p className="location-address">
                        Experience the finest Tenun Troso firsthand.<br />
                        Jepara, Central Java, Indonesia
                    </p>

                    <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        Open in Google Maps
                    </a>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;
