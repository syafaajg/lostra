import React from 'react';
import './ProductCard.css';
import { useShop } from '../context/ShopContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductCard = ({ product, onClick }) => { // Terima prop onClick
    const { addToCart, toggleWishlist, wishlist } = useShop();

    const isInWishlist = wishlist.some(item => item.id === product.id);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="product-card" onClick={onClick}> {/* Trigger onClick saat kartu diklik */}
            <div className="product-image-container">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    style={{ filter: product.filter || 'none' }}
                />

                <button
                    className="wishlist-btn"
                    onClick={(e) => {
                        e.stopPropagation(); // Mencegah modal terbuka saat klik tombol love
                        toggleWishlist(product);
                    }}
                    aria-label="Add to wishlist"
                >
                    {isInWishlist ? <FaHeart color="#8B3A3A" /> : <FaRegHeart />}
                </button>

                <button
                    className="add-to-cart-btn"
                    onClick={(e) => {
                        e.stopPropagation(); // Mencegah modal terbuka saat klik add to cart
                        addToCart(product);
                    }}
                    aria-label="Add to cart"
                >
                    + Add
                </button>
            </div>
            <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{formatPrice(product.price)}</p>
            </div>
        </div>
    );
};

export default ProductCard;
