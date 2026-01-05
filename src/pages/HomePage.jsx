import React from 'react';
import Hero from '../components/Hero';
import LocationSection from '../components/LocationSection';
import ProductList from '../components/ProductList';
import HowToOrder from '../components/HowToOrder';

const HomePage = () => {
    return (
        <>
            <Hero />
            <ProductList />
            <HowToOrder />
            <LocationSection />
        </>
    );
};

export default HomePage;
