import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal'; // Import Modal
import './ProductList.css';
import { useShop } from '../context/ShopContext';

const ProductList = () => {
    const { products } = useShop();
    const [visibleCount, setVisibleCount] = useState(8);

    // State untuk Modal
    const [selectedProduct, setSelectedProduct] = useState(null);

    const showMore = () => {
        setVisibleCount((prevValue) => prevValue + 4);
    };

    // Fungsi handle klik produk
    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    // Fungsi tutup modal
    const closeModal = () => {
        setSelectedProduct(null);
    };

    return (
        <section className="product-list" id="shop">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Latest Collection</h2>
                    <p className="section-subtitle">Exquisite designs for your daily elegance</p>
                </div>

                <div className="product-grid">
                    {products.slice(0, visibleCount).map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onClick={() => handleProductClick(product)} // Pass click handler
                        />
                    ))}
                </div>

                {visibleCount < products.length && (
                    <div className="view-all-container">
                        <button onClick={showMore} className="btn btn-outline">Show More</button>
                    </div>
                )}
            </div>

            {/* Render Modal jika ada produk terpilih */}
            {selectedProduct && (
                <ProductModal product={selectedProduct} onClose={closeModal} />
            )}
        </section>
    );
};

export default ProductList;
