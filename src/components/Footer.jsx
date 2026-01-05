import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer" id="contact">
            <div className="container footer-container">
                <div className="footer-brand">
                    <h3>LOSTRA</h3>
                    <p>
                        Bringing the heritage of Tenun Troso Jepara to the modern world.
                        Handcrafted with love.
                    </p>
                </div>
                <div className="footer-links">
                    <h4>Explore</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#shop">Shop</a></li>
                        <li><a href="#about">About</a></li>
                    </ul>
                </div>
                <div className="footer-contact">
                    <h4>Contact</h4>
                    <p>Jepara, Central Java, Indonesia</p>
                    <p>hello@lostra.com</p>
                    <div className="social-links">
                        {/* Simple text links for now */}
                        <a href="#">IG</a>
                        <a href="#">FB</a>
                        <a href="#">WA</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 LOSTRA. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
