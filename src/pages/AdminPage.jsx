import React from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
    const { user, orders, updateOrderStatus, changeAdminPassword, logout } = useShop();
    const navigate = useNavigate();

    // Protect Route
    if (!user || user.role !== 'admin') {
        return (
            <div className="container" style={{ paddingTop: '150px', textAlign: 'center' }}>
                <h2>Access Denied</h2>
                <p>You must be an admin to view this page.</p>
                <button className="btn btn-primary" onClick={() => navigate('/login')}>Login as Admin</button>
            </div>
        );
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const [showPasswordModal, setShowPasswordModal] = React.useState(false);
    const [newPassword, setNewPassword] = React.useState('');

    const handleSubmitPasswordChange = () => {
        if (newPassword.trim()) {
            changeAdminPassword(newPassword);
            alert('Password berhasil diubah!');
            setShowPasswordModal(false);
            setNewPassword('');
        } else {
            alert('Password tidak boleh kosong');
        }
    };

    const getStatusClass = (status) => {
        if (status === 'Belum Bayar') return 'belum-bayar';
        if (status === 'Menunggu Konfirmasi') return 'menunggu-konfirmasi';
        if (status === 'Dikemas') return 'dikemas';
        if (status === 'Dikirim') return 'dikirim';
        return 'diproses';
    };

    return (
        <div className="admin-page">
            <div className="container">
                <div className="admin-header">
                    <div>
                        <h2>Admin Dashboard</h2>
                        <p>Manage orders and payments</p>
                    </div>
                    <div className="admin-controls">
                        <span style={{ marginRight: '1rem' }}>Welcome, Admin</span>
                        <button onClick={() => setShowPasswordModal(true)} className="btn btn-outline" style={{ padding: '0.5rem 1rem', marginRight: '1rem' }}>Change Password</button>
                        <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Logout</button>
                    </div>
                </div>

                {/* Password Change Modal / Section */}
                {showPasswordModal && (
                    <div className="password-modal-overlay">
                        <div className="password-modal">
                            <h3>Change Admin Password</h3>
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', marginTop: '1rem', background: '#333', border: '1px solid #555', color: 'white' }}
                            />
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                <button onClick={() => setShowPasswordModal(false)} className="btn btn-outline">Cancel</button>
                                <button onClick={handleSubmitPasswordChange} className="btn btn-primary">Save Password</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="admin-content">
                    <h3 style={{ marginBottom: '1.5rem', color: 'white' }}>Order Management</h3>

                    {orders.length === 0 ? (
                        <p>No orders found.</p>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table className="admin-orders-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Customer Email</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.date}</td>
                                            <td>{order.userEmail}</td>
                                            <td>Rp {order.total.toLocaleString()}</td>
                                            <td>
                                                <span className={`status-badge ${getStatusClass(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td>
                                                {order.status === 'Menunggu Konfirmasi' && (
                                                    <button
                                                        className="btn-action"
                                                        onClick={() => updateOrderStatus(order.id, 'Dikemas')}
                                                    >
                                                        Konfirmasi & Packing
                                                    </button>
                                                )}
                                                {order.status === 'Dikemas' && (
                                                    <button
                                                        className="btn-action"
                                                        onClick={() => updateOrderStatus(order.id, 'Dikirim')}
                                                        style={{ backgroundColor: '#2196F3', color: 'white' }}
                                                    >
                                                        Serahkan ke Kurir
                                                    </button>
                                                )}
                                                {order.status === 'Belum Bayar' && (
                                                    <button
                                                        className="btn-action"
                                                        onClick={() => updateOrderStatus(order.id, 'Dikemas')}
                                                        style={{ backgroundColor: '#FF9800', color: 'white' }}
                                                    >
                                                        Verifikasi Pembayaran
                                                    </button>
                                                )}
                                                {order.status === 'Dikirim' && (
                                                    <span style={{ color: '#4CAF50' }}>✓ Diserahkan ke Kurir</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
