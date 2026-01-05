import React from 'react';
import './Hero.css';
import logo from '../assets/logo_white.png';

const Hero = () => {
    return (
        <section className="hero" id="home">
            <div className="hero-content-center">
                <img src={logo} alt="LUSTRA" className="hero-main-logo" />
                <div className="hero-divider"></div>
                <a href="#shop" className="btn btn-outline hero-cta">Discover Collection</a>
            </div>
            <div className="hero-overlay"></div>
        </section>
    );
};

export default Hero;
