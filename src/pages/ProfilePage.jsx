import React from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
    const { user, orders, logout, confirmPayment } = useShop();
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="profile-page">
            <div className="container">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="profile-info">
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <button onClick={handleLogout} className="btn btn-outline logout-btn">Logout</button>
                    </div>
                </div>

                <div className="profile-content">
                    <div className="section-title-wrapper">
                        <h3>Order History</h3>
                    </div>

                    {orders.length === 0 ? (
                        <div className="no-orders">
                            <p>You haven't placed any orders yet.</p>
                            <button onClick={() => navigate('/#shop')} className="btn btn-primary">Start Shopping</button>
                        </div>
                    ) : (
                        <div className="orders-list">
                            {orders.map(order => (
                                <div key={order.id} className="order-card">
                                    <div className="order-header">
                                        <span className="order-id">Order ID: {order.id}</span>
                                        <span className="order-date">{order.date}</span>
                                        <span className={`order-status ${order.status === 'Belum Bayar' ? 'pending' :
                                            order.status === 'Dikemas' ? 'dikemas' :
                                                order.status === 'Dikirim' ? 'dikirim' : 'processing'
                                            }`}>
                                            {order.status === 'Belum Bayar' ? 'Belum Melakukan Pembayaran' : order.status}
                                        </span>
                                    </div>
                                    <div className="order-items">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="order-item-row">
                                                <span>{item.name} x {item.quantity}</span>
                                                <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="order-footer">
                                        <div className="order-total-section">
                                            <span>Total Amount</span>
                                            <span className="order-total">Rp {order.total.toLocaleString()}</span>
                                        </div>
                                        {order.status === 'Belum Bayar' && (
                                            <div className="payment-action">
                                                <p className="payment-note">Silakan lakukan pembayaran ke rekening BCA 2470912416 (Novi Bunga Febiola)</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
