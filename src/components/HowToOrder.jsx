import React from 'react';
import './HowToOrder.css';
import { FaShoppingBag, FaShoppingCart, FaCreditCard, FaCheckCircle } from 'react-icons/fa';

const HowToOrder = () => {
    const steps = [
        {
            id: 1,
            icon: <FaShoppingBag />,
            title: "Pilih Produk",
            description: "Jelajahi koleksi Tenun Troso kami dan pilih yang Anda suka."
        },
        {
            id: 2,
            icon: <FaShoppingCart />,
            title: "Masukkan Keranjang",
            description: "Klik tambahkan ke keranjang pada produk pilihan Anda."
        },
        {
            id: 3,
            icon: <FaCreditCard />,
            title: "Checkout & Bayar",
            description: "Isi alamat pengiriman dan lakukan pembayaran dengan aman."
        },
        {
            id: 4,
            icon: <FaCheckCircle />,
            title: "Selesai",
            description: "Pesanan akan diproses dan dikirim ke alamat Anda."
        }
    ];

    return (
        <section className="how-to-order">
            <div className="container">
                <h2 className="section-title">Cara Pemesanan</h2>
                <div className="steps-container">
                    {steps.map((step) => (
                        <div key={step.id} className="step-card">
                            <div className="step-icon">
                                {step.icon}
                                <span className="step-number">{step.id}</span>
                            </div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowToOrder;
