import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
    const { cart, getCartTotal, placeOrder, user } = useShop();
    const navigate = useNavigate();

    // Address State
    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        phone: '',
        address: '',
        city: '',
        zipCode: ''
    });

    // Payment Method State
    const [paymentMethod, setPaymentMethod] = useState('transfer'); // default

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();

        // Simple Validation
        if (!formData.address || !formData.phone || !formData.city) {
            alert("Please fill in all shipping details.");
            return;
        }

        // Simulate Processing
        setTimeout(() => {
            placeOrder({
                address: formData,
                paymentMethod: paymentMethod
            });
            navigate('/order-success');
        }, 1500);
    };

    if (cart.length === 0) {
        return <div className="container" style={{ padding: '5rem', textAlign: 'center' }}><h2>Your cart is empty.</h2></div>;
    }

    return (
        <div className="checkout-page">
            <div className="container">
                <h2 className="page-title">Checkout</h2>

                <div className="checkout-grid">
                    {/* Left Column: Forms */}
                    <div className="checkout-forms">
                        <section className="checkout-section">
                            <h3>1. Shipping Address</h3>
                            <form className="address-form">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="e.g 08123456789"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Street, House No, etc."
                                        rows="3"
                                    ></textarea>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="Jepara"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Zip Code</label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            placeholder="59411"
                                        />
                                    </div>
                                </div>
                            </form>
                        </section>

                        <section className="checkout-section">
                            <h3>2. Payment Method</h3>
                            <div className="payment-methods">
                                <div className="payment-info-box">
                                    <p className="payment-instruction">
                                        Saat ini kami hanya menerima pembayaran melalui Transfer Bank.
                                        Pesanan Anda akan segera diproses setelah pembayaran dikonfirmasi.
                                    </p>

                                    <div className="bank-details-card">
                                        <div className="bank-logo">
                                            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#005CA9' }}>BCA</span>
                                        </div>
                                        <div className="bank-account-info">
                                            <p className="account-number">2470912416</p>
                                            <p className="account-name">A/n Novi Bunga Febiola</p>
                                        </div>
                                    </div>

                                    <div className="whatsapp-contact">
                                        <p>Konfirmasi Bukti Pembayaran:</p>
                                        <a
                                            href="https://wa.me/6289516732721"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="whatsapp-link"
                                        >
                                            <span style={{ marginRight: '8px' }}>📞</span>
                                            0895-1673-2721 (WhatsApp Admin)
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="checkout-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-items">
                            {cart.map(item => (
                                <div key={item.id} className="summary-item">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                        <div className="summary-totals">
                            <div className="total-row">
                                <span>Subtotal</span>
                                <span>Rp {getCartTotal().toLocaleString()}</span>
                            </div>
                            <div className="total-row">
                                <span>Shipping Mode</span>
                                <span>Standard (Free)</span>
                            </div>
                            <div className="total-row final">
                                <span>Total to Pay</span>
                                <span>Rp {getCartTotal().toLocaleString()}</span>
                            </div>
                        </div>

                        <button className="btn btn-primary place-order-btn" onClick={handlePlaceOrder}>
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
