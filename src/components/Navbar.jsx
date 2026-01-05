import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo_white.png'; // Use White Logo
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const { cart, user } = useShop();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo-link">
                    <img src={logo} alt="LUSTRA" className="navbar-logo-img" />
                </Link>

                <div className="navbar-links">
                    <Link to="/">Home</Link>
                    <a href="/#shop">Shop</a>
                    <a href="/#about">About</a>
                </div>

                <div className="navbar-actions">
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            {user.role === 'admin' && (
                                <Link to="/admin" style={{ fontSize: '0.9rem', color: '#ffc107', fontWeight: 'bold' }}>
                                    ADMIN DASHBOARD
                                </Link>
                            )}
                            <Link to="/profile" className="user-menu-link">
                                <div className="user-menu">
                                    <span className="user-name">Hi, {user.name}</span>
                                    <div className="user-avatar-small">
                                        <FaUser />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <Link to="/login" className="icon-btn login-link"><FaUser /></Link>
                    )}

                    <Link to="/cart" className="cart-btn">
                        <FaShoppingCart />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
