import React from 'react';
import { useShop } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, user } = useShop();
    const navigate = useNavigate();

    const handleProceedCheckout = () => {
        if (!user) {
            alert('Please login to continue checkout.');
            navigate('/login');
        } else {
            navigate('/checkout'); // Redirect to real checkout page
        }
    };

    if (cart.length === 0) {
        return (
            <div className="cart-page empty">
                <div className="container">
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added any Tenun yet.</p>
                    <Link to="/" className="btn btn-primary">Start Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <h2 className="page-title">Shopping Cart</h2>

                <div className="cart-content">
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="cart-item-img"
                                    style={{ filter: item.filter || 'none' }}
                                />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p className="item-price">Rp {item.price.toLocaleString()}</p>
                                </div>
                                <div className="cart-item-actions">
                                    <div className="qty-control">
                                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                    </div>
                                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Summary</h3>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>Rp {getCartTotal().toLocaleString()}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>Rp {getCartTotal().toLocaleString()}</span>
                        </div>

                        <button className="btn btn-primary checkout-btn" onClick={handleProceedCheckout}>
                            Proceed to Checkout
                        </button>
                        {!user && <p className="login-note">*Login required to checkout</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
