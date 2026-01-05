import React from 'react';
import './ProductModal.css';
import { useShop } from '../context/ShopContext';
import { FaTimes, FaShoppingCart } from 'react-icons/fa';

const ProductModal = ({ product, onClose }) => {
    const { addToCart } = useShop();

    if (!product) return null;

    const handleAddToCart = () => {
        addToCart(product);
        // Optional: Close modal after adding? or Keep it open
        // onClose(); 
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <FaTimes />
                </button>

                <div className="modal-body">
                    <div className="modal-image-wrapper">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="modal-image"
                            style={{ filter: product.filter || 'none' }}
                        />
                    </div>

                    <div className="modal-details">
                        <span className="modal-category">{product.category}</span>
                        <h2 className="modal-title">{product.name}</h2>
                        <p className="modal-price">{formatPrice(product.price)}</p>

                        <div className="modal-description">
                            <h3>Description</h3>
                            <p>{product.description}</p>
                        </div>

                        <button className="btn btn-primary modal-add-btn" onClick={handleAddToCart}>
                            <FaShoppingCart style={{ marginRight: '8px' }} /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
