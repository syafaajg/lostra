import React, { createContext, useState, useContext } from 'react';
import product1 from '../assets/product1.png'; // Coklat Base
import productRed from '../assets/product_red.png';
import productBlue from '../assets/product_blue.png';
import productBlack from '../assets/product_black.png';
import productGreen from '../assets/product_green.png';
import productPurple from '../assets/product_purple.png';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    // --- Data Produk ---
    const [products] = useState([
        { id: 1, name: 'Troso Senja Klasik', category: 'Best Seller', price: 185000, image: product1, filter: 'none', description: 'Tas jinjing dengan motif tenun Troso original berwarna coklat hangat. Original dan otentik.' },
        { id: 2, name: 'Ratu Kalinyamat Emas', category: 'Luxury', price: 245000, image: productBlack, filter: 'none', description: 'Dominasi warna hitam dan aksen emas yang mewah.' },
        { id: 3, name: 'Samudra Hindia', category: 'Casual', price: 155000, image: productBlue, filter: 'none', description: 'Warna biru indigo yang dalam mengingatkan pada lautan Jepara.' },
        { id: 4, name: 'Marun Bara', category: 'Best Seller', price: 175000, image: productRed, filter: 'none', description: 'Keberanian dalam balutan tenun merah marun.' },
        { id: 5, name: 'Hutan Muria', category: 'Nature', price: 165000, image: productGreen, filter: 'none', description: 'Varian hijau segar yang terinspirasi dari keasrian Pegunungan Muria.' },
        { id: 6, name: 'Lembayung Ungu', category: 'Limited', price: 195000, image: productPurple, filter: 'none', description: 'Warna ungu royal yang sangat elegan dan jarang ditemui.' },
        { id: 7, name: 'Tosca Pesisir', category: 'Summer', price: 155000, image: productBlue, filter: 'hue-rotate(-40deg) brightness(1.1)', description: 'Nuansa hijau tosca cerah seperti air laut pantai Jepara.' },
        { id: 8, name: 'Pink Lotus', category: 'Feminine', price: 210000, image: productRed, filter: 'hue-rotate(320deg) saturate(0.8) brightness(1.1)', description: 'Sentuhan pink lembut yang feminin dan manis.' },
        { id: 9, name: 'Kuning Kunyit', category: 'Bright', price: 145000, image: product1, filter: 'hue-rotate(45deg) saturate(1.5)', description: 'Warna kuning kunyit yang cerah dan penuh semangat.' },
        { id: 10, name: 'Abu Mistik', category: 'Monochrome', price: 159000, image: productBlack, filter: 'grayscale(1) brightness(1.5)', description: 'Warna abu-abu monokrom yang modern dan minimalis.' },
        { id: 11, name: 'Hijau Lumut Tua', category: 'Nature', price: 169000, image: productGreen, filter: 'hue-rotate(30deg) contrast(1.2)', description: 'Hijau lumut yang dalam dan menenangkan.' },
        { id: 12, name: 'Coklat Kopi', category: 'Classic', price: 179000, image: product1, filter: 'sepia(0.5) hue-rotate(-10deg) contrast(1.1)', description: 'Warna coklat gelap seperti biji kopi robusta.' },
        { id: 13, name: 'Midnight Weave', category: 'Luxury', price: 235000, image: productBlue, filter: 'brightness(0.6) contrast(1.3)', description: 'Biru navy yang sangat gelap, hampir hitam, sangat elegan.' },
        { id: 14, name: 'Orange Sunset', category: 'Limited', price: 199000, image: productRed, filter: 'hue-rotate(40deg) saturate(1.2)', description: 'Warna oranye senja yang hangat dan menarik perhatian.' },
        { id: 15, name: 'Lavender Dreams', category: 'Pastel', price: 155000, image: productPurple, filter: 'brightness(1.2) saturate(0.8)', description: 'Ungu muda lavender yang lembut dan memukau.' },
        { id: 16, name: 'Mint Fresh', category: 'Nature', price: 185000, image: productGreen, filter: 'hue-rotate(90deg) brightness(1.1)', description: 'Warna mint yang segar dan unik.' },
        { id: 17, name: 'Silver Mist', category: 'Modern', price: 175000, image: productBlack, filter: 'invert(0.2) grayscale(1) brightness(1.2)', description: 'Nuansa perak metalik yang futuristik pada tenun tradisional.' },
        { id: 18, name: 'Deep Ocean', category: 'Art', price: 225000, image: productBlue, filter: 'saturate(1.5) contrast(1.1)', description: 'Biru laut dalam yang intens.' },
        { id: 19, name: 'Ruby Red', category: 'Limited', price: 215000, image: productRed, filter: 'contrast(1.3) brightness(0.9)', description: 'Merah merah delima yang pekat dan berkelas.' },
        { id: 20, name: 'Golden Wheat', category: 'Luxury', price: 265000, image: product1, filter: 'sepia(1) saturate(1.5) hue-rotate(10deg)', description: 'Warna gandum keemasan yang melambangkan kemewahan.' },
    ]);

    // --- Admin Password Logic ---
    const [adminPassword, setAdminPassword] = useState(() => {
        return localStorage.getItem('lostra_admin_password') || 'admin123';
    });

    const changeAdminPassword = (newPassword) => {
        setAdminPassword(newPassword);
        localStorage.setItem('lostra_admin_password', newPassword);
    };

    // --- Auth & Cart Logic ---
    const [user, setUser] = useState(null);
    const login = (email, password) => {
        if (email === 'admin@lostra.com' && password === adminPassword) {
            setUser({ email, name: 'Admin', role: 'admin' });
            return true;
        }
        if (email && password) { setUser({ email, name: email.split('@')[0], role: 'user' }); return true; }
        return false;
    };
    const register = (name, email, password) => { setUser({ name, email, role: 'user' }); return true; };
    const logout = () => { setUser(null); };

    const [cart, setCart] = useState([]);

    // Initialize orders from LocalStorage to persist data
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('lostra_orders');
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    const [wishlist, setWishlist] = useState([]);

    // Save orders to LocalStorage whenever they change
    React.useEffect(() => {
        localStorage.setItem('lostra_orders', JSON.stringify(orders));
    }, [orders]);

    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => setCart((prev) => prev.filter((item) => item.id !== productId));

    const updateQuantity = (productId, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const clearCart = () => setCart([]);

    const placeOrder = (orderDetails) => {
        const newOrder = {
            id: `ORD-${Date.now()}`,
            userEmail: user.email, // Capture user email
            date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
            items: [...cart],
            total: getCartTotal(),
            status: 'Belum Bayar', // Initial status
            shipping: orderDetails
        };
        setOrders(prev => [newOrder, ...prev]);
        clearCart();

        // Simulate sending invoice to email
        alert(`Tagihan pembayaran telah dikirim ke email: ${user?.email}`);
    };

    // Called by User to request confirmation
    const confirmPayment = (orderId) => {
        setOrders(prev => prev.map(order =>
            order.id === orderId ? { ...order, status: 'Menunggu Konfirmasi' } : order
        ));
    };

    // Called by Admin to update status (Confirm, Packing, Ship)
    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prev => prev.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const toggleWishlist = (product) => {
        setWishlist((prev) => {
            const isInWishlist = prev.find((item) => item.id === product.id);
            if (isInWishlist) return prev.filter((item) => item.id !== product.id);
            return [...prev, product];
        });
    };

    const getCartTotal = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <ShopContext.Provider value={{ products, user, login, register, logout, cart, orders, addToCart, removeFromCart, updateQuantity, placeOrder, confirmPayment, updateOrderStatus, changeAdminPassword, getCartTotal, wishlist, toggleWishlist }}>
            {children}
        </ShopContext.Provider>
    );
};
