import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const OrderSuccessPage = () => {
    return (
        <div style={{
            paddingTop: '120px',
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: '#FDFBF7'
        }}>
            <FaCheckCircle size={80} color="#4CAF50" style={{ marginBottom: '2rem' }} />
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Order Placed Successfully!</h2>
            <p style={{ maxWidth: '400px', color: '#666', marginBottom: '2rem', lineHeight: '1.6' }}>
                Thank you for shopping with Lostra. Your authentic Tenun Troso is being prepared and will be shipped to your address soon.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/" className="btn btn-primary">Back to Home</Link>
                <Link to="/#shop" className="btn btn-outline">Continue Shopping</Link>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
