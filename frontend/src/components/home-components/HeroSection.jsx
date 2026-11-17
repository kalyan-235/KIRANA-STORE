import React from 'react';
import { Link } from 'react-router-dom';
import { imageUrl } from '../../services/imageUrl';
import MobileSearchBar from '../MobileSearchBar';

const HeroSection = () => {
  return (
    <>
      <MobileSearchBar />
      <section className="hero">

        {/* Full-width background image */}
        <img
          src={imageUrl('/hero-image.png')}
          alt="Fresh groceries"
          className="hero-bg-img"
        />

        {/* Dark overlay */}
        <div className="hero-overlay" />

        {/* Text on top */}
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Your Daily Needs,<br />
              Delivered <span className="hero-highlight">Fresh!</span>
            </h1>
            <p className="hero-sub">
              Premium Quality Groceries<br />at Best Prices
            </p>
            <Link to="/categories" className="hero-btn">
              Shop Now →
            </Link>
          </div>
        </div>

      </section>
    </>
  );
};

export default HeroSection;
