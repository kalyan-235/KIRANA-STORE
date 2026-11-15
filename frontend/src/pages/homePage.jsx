import React from 'react';
import HeroSection       from '../components/home-components/HeroSection';
import CategoriesSection from '../components/home-components/CategoriesSection';
import BestSellingSection from '../components/home-components/BestSellingSection';
import WhyChooseSection  from '../components/home-components/WhyChooseSection';
import FreshProduceBanner from '../components/home-components/FreshProduceBanner';
import '../styles/homepage.css';

const HomePage = () => {
  return (
    <main className="home">
      <HeroSection />
      <CategoriesSection />
      <BestSellingSection />
      <WhyChooseSection />
      <FreshProduceBanner />
    </main>
  );
};

export default HomePage;
